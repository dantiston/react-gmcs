// @flow strict

import './App.css';

import * as React from 'react';

import type {QuestionnaireDefinition} from './definitionParser/Questionnaire.flow';

import { Alignments, Callout, Cell, Colors, Grid, GridContainer, Menu, MenuItem, Sizes } from 'react-foundation';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// const Immutable = require('immutable');

import Questionnaire from './definitionParser/Questionnaire.react';
import parseDefinition from './definitionParser/DefinitionParser';

const Home = React.lazy(() => import('./routes/Home.react'));
const About = React.lazy(() => import('./routes/About.react'));

type State = {|
  definitions: ?QuestionnaireDefinition,
|};

class App extends React.Component <{}, State> {

  state = {
    definitions: null
  }

  componentDidMount() {
    fetch('/matrixdef_tiny.txt')
      .then(f => f.text())
      .then(text => this.setState({definitions: parseDefinition(text)}));
  }

  render() {
    return (
      <Router>
        <Callout color={Colors.PRIMARY} size={Sizes.LARGE}>
          <div className="text-center">
            <h1>LinGO Grammar Matrix</h1>
            <a href={"http://moin.delph-in.net/MatrixDocTop"}>documentation</a>
          </div>
        </Callout>
        <Menu alignment={Alignments.CENTER}>
          <MenuItem><Link to={"/"}>Home</Link></MenuItem>
          <MenuItem><Link to={"/about"}>About</Link></MenuItem>
        </Menu>
        <GridContainer alignment={Alignments.CENTER}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
            </Switch>
          </React.Suspense>
        </GridContainer>
      </Router>
      // {this.state.definitions == null ? null : <Questionnaire definitions={this.state.definitions}/>}
    );
  }
}

export default App;
