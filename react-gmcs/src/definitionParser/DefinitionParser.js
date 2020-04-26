// @flow strict

import type {QuestionnaireDefinition, SectionDefinition} from './Questionnaire.flow';

const Immutable = require('immutable');

export default function parseDefinition(definitionString: string): QuestionnaireDefinition {
  const definitions = definitionString.split(/\n{2,}/)
    .map(definition => definition.trim());

  let result = Immutable.List();
  let name = null;
  let elements = Immutable.List();
  for (const definition of definitions) {
    if (definition.startsWith('Section')) {
      if (name != null) {
        result = result.push({
          name,
          elements: elements.toArray(),
        });
        name = null;
        elements = Immutable.List();
      }
      const parts = tokenizeDefinition(definition);
      name = parts[1];
    } else if (definition.startsWith('Label')) {
      const tokens = tokenizeDefinition(definition);
      elements = elements.push({
        text: tokens[1],
      });
    } else {
      throw new Error(`Unknown definition type: '${definition}'`);
    }
  }
  return {
    sections: result.toArray(),
  };
}

function tokenizeDefinition(definition: string): $ReadOnlyArray<string> {
  return definition.split(/\w+/, 2);
}
