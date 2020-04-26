// @flow strict

"use strict";

const Immutable = require("immutable");

export type LabelDefinition = $ReadOnly<{|
  text: string
|}>;

export type RadioQuestionDefinition = $ReadOnly<{||}>;

export type RadioOptionDefinition = $ReadOnly<{||}>;

export type IteratorDefinition = $ReadOnly<{|
  name: string,
  elements: $ReadOnlyArray<QuestionDefinition>
|}>;

export type QuestionDefinition =
  | LabelDefinition
  | IteratorDefinition
  | RadioQuestionDefinition
  | RadioOptionDefinition; // | CheckDefinition | TextQuestionDefinition | TextAreaQuestionDefinition | SeparatorDefintion;

export type SectionDefinition = $ReadOnly<{|
  name: string,
  elements: $ReadOnlyArray<QuestionDefinition>
|}>;

export type QuestionnaireDefinition = $ReadOnly<{|
  sections: $ReadOnlyArray<SectionDefinition>
|}>;
