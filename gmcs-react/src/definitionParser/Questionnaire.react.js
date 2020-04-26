// @flow strict

import type {QuestionnaireDefinition} from './Questionnaire.flow';

import * as React from 'react';

type Props = $ReadOnly<{|
  definitions: QuestionnaireDefinition,
|}>;

class Questionnaire extends React.Component<Props> {

  render(): React.Node {
    return this.props.definitions.sections.map(section =>
      section.elements.map((element, i) =>
        <div key={i}>Hello world!</div>
      )
    );
  }
}

export default Questionnaire;
