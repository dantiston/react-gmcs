// @flow strict

import React from "react";

import {parseDefinition, tokenizeDefinition} from "./DefinitionParser";

describe("DefinitionParser works as intended", () => {
  it("Correctly parses basic example", () => {
    // const actual = parseDefinition("Section welcome \"Welcome\"");
    // const expected = {
    //   sections: [
    //     {
    //       name: "welcome",
    //       friendlyName: "Welcome",
    //       elements: []
    //     }
    //   ]
    // };
    // expect(actual).toEqual(expected);
  });
});

describe("tokenizeDefinition works as intended", () => {
  it("Correctly tokenizes section headings", () => {
    const actual = tokenizeDefinition('Section welcome "Welcome"');
    const expected = [["Section", "welcome", '"Welcome"']];
    expect(actual).toEqual(expected);
  });

  it("Correctly tokenizes sections", () => {
    const actual = tokenizeDefinition(
      'Section welcome "Welcome"\nLabel "<h3>Hello world!</h3>"'
    );
    const expected = [
      ["Section", "welcome", '"Welcome"'],
      ["Label", '"<h3>Hello world!</h3>"']
    ];
    expect(actual).toEqual(expected);
  });

  it("Correctly tokenizes quotes", () => {
    const actual = tokenizeDefinition('Label "Hello world"');
    const expected = [["Label", '"Hello world"']];
    expect(actual).toEqual(expected);
  });

  it("Correctly tokenizes quotes across new lines", () => {
    const actual = tokenizeDefinition('Label "Hello\nworld"');
    const expected = [["Label", '"Hello\nworld"']];
    expect(actual).toEqual(expected);
  });

  it("Correctly tokenizes escaped quotes", () => {
    const actual = tokenizeDefinition('Label "Hello \\"world\\""');
    const expected = [["Label", '"Hello \\"world\\""']];
    expect(actual).toEqual(expected);
  });

  it("Correctly tokenizes quoted HTML", () => {
    const actual = tokenizeDefinition(
      'Label "<h4><span class=\\"feat\\">tense</span></h4>"'
    );
    const expected = [
      ["Label", '"<h4><span class=\\"feat\\">tense</span></h4>"']
    ];
    expect(actual).toEqual(expected);
  });

  it("Correctly tokenizes quoted HTML across lines", () => {
    const actual = tokenizeDefinition(
      'Label "Here is a test <span\nclass=\\"feat\\">span</span> including HTML"'
    );
    const expected = [
      [
        "Label",
        '"Here is a test <span\nclass=\\"feat\\">span</span> including HTML"'
      ]
    ];
    expect(actual).toEqual(expected);
  });

  it("Correctly removes just comments", () => {
    const actual = tokenizeDefinition('# Section welcome "Welcome"');
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it("Correctly removes comments", () => {
    const actual = tokenizeDefinition(
      '# This section is great\nSection welcome "Welcome"'
    );
    const expected = [["Section", "welcome", '"Welcome"']];
    console.log(actual);
    expect(actual).toEqual(expected);
  });
});
