// @flow strict

import type {
  LabelDefinition,
  RadioQuestionDefinition,
  SectionDefinition,
  TextQuestionDefinition,
  QuestionnaireDefinition,
} from './Questionnaire.flow';

const Immutable = require('immutable');


export function processDefinition(definitionString: string): QuestionnaireDefinition {
  const tokens = tokenizeDefinition(definitionString);
  const ast = parseDefinition(tokens);
}

// *** Tokenizer ***

export function tokenizeDefinition(definitionString: string): $ReadOnlyArray<$ReadOnlyArray<string>> {
  // const tokens = definitionString
  //   .split("\n")
  //   .filter(definition => !definition.startsWith("#"))
  //   .join("\n") // string
  //   .match(/\w+|"(?:\\"|[^"])+"/g) || [] // Array<string>
  //   .map(segment => segment.trim()) // Array<string>
  //   .map((segment, i) => i % 2 !== 0
  //     ? [`"${segment.replace("\n", " ")}"`]  // Array<Array<string>>
  //     : segment
  //         .split(/\n+/)  // Array<Array<string>>
  //         .map(line => line.split(/\s+/))  // Array<Array<Array<string>>>
  //   );
  const a = definitionString
    .split("\n")
    .filter(definition => !definition.startsWith("#"))
    .join("\n");
  const b = a
    .match(/[^"]+|(?:\"|[^"])+/g) || []; // Array<string>
  const c = b
    .map(segment => segment.trim()) // Array<string>
    .map((segment, i) => i % 2 == 0
      ? segment
          .split(/\n+/)  // Array<Array<string>>
          .map(line => line.split(/\s+/))  // Array<Array<Array<string>>>
      : [segment.replace("\n", " ")]  // Array<Array<string>>
    )
    // .map(line => line.flat())
    ;
  console.log(a);
  console.log(b);
  console.log(c);
  return c;
}


function flatten<T>(
  arrays: $ReadOnlyArray<$ReadOnlyArray<T>>
): $ReadOnlyArray<T> {
  return [].concat.apply([], arrays);
}


// *** Parser ***

export function parseDefinition(definitionString: string): QuestionnaireDefinition {
  const definitions = definitionString.split(/\n/)
    .map(definition => definition.trim())
    .filter(definition => definition.length > 0)
    .filter(definition => !definition.startsWith("#"));

  let result = Immutable.List();
  let name = null;
  let elements = Immutable.List();
  let i = 0;
  while (i < definitions.length) {
    let definition = definitions[i++];
    let tokens = tokenizeDefinition(definition);
    let sort = tokens[0];
    if (sort === 'Section') {
      if (name != null) {
        result = result.push({
          name,
          elements: elements.toArray(),
        });
        name = null;
        elements = Immutable.List();
      }
      name = tokens[1];
    } else if (sort === 'Label') {
      elements = elements.push(parseLabel(tokens));
    } else if (sort === 'Text') {
      elements = elements.push(parseText(tokens));
    } else if (sort === 'Radio') {
      const [j, radio] = parseRadio(definitions, i);
      i = j;
      elements = elements.push(radio);
    } else {
      throw new Error(`Unknown definition type: '${definition}'`);
    }
  }
  return {
    sections: result.toArray(),
  };
}


function parseLabel(tokens: $ReadOnlyArray<string>): LabelDefinition {
  return {
    text: tokens[1],
  };
}


function parseText(tokens: $ReadOnlyArray<string>): TextQuestionDefinition {
  const [_, name, friendlyName, htmlBefore, htmlAfter, size] = tokens;
  return {
    name, friendlyName, htmlBefore, htmlAfter, size: parseInt(size),
  };
}


function parseRadio(
  definitions: $ReadOnlyArray<string>,
  i: number,
): [number, RadioQuestionDefinition] {
  const options = [];
  let j = i;
  let definition = definitions[j++];
  let tokens = tokenizeDefinition(definition);
  const [_, name, friendlyName, htmlBefore, htmlAfter] = tokens;
  let sort = tokens[0];
  while (j < definitions.length && sort === '.') {
    const [_, optionName, optionFriendlyName, optionhtmlBefore, optionhtmlAfter] = tokens;
    options.push({
      name: optionName,
      friendlyName: optionFriendlyName,
      htmlBefore: optionhtmlBefore,
      htmlAfter: optionhtmlAfter,
    });
    definition = definitions[j++];
    tokens = tokenizeDefinition(definition);
    sort = tokens[0];
  }
  return [j, {name, friendlyName, htmlBefore, htmlAfter, options}];
}
