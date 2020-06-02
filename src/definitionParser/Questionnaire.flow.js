// @flow strict

"use strict";

const Immutable = require("immutable");

type BaseQuestionDefinition = $ReadOnly<{
  name: string,
  friendlyName: string,
  htmlBefore: string,
  htmlAfter: string
}>;

export type LabelDefinition = $ReadOnly<{|
  text: string
|}>;

export type TextQuestionDefinition = $ReadOnly<
  BaseQuestionDefinition &
    $ReadOnly<{|
      size: number
    |}>
>;

export type TextAreaQuestionDefinition = $ReadOnly<
  BaseQuestionDefinition &
    $ReadOnly<{|
      sizeX: number,
      sizeY: number
    |}>
>;

export type RadioQuestionDefinition = $ReadOnly<
  BaseQuestionDefinition &
    $ReadOnly<{|
      options: $ReadOnlyArray<RadioOptionDefinition>
    |}>
>;

export type RadioOptionDefinition = BaseQuestionDefinition;

export type CheckDefinition = BaseQuestionDefinition;

export type SeparatorDefintion = $ReadOnly<{||}>;

export type IteratorDefinition = $ReadOnly<{|
  name: string,
  elements: $ReadOnlyArray<QuestionDefinition>
|}>;

export type QuestionDefinition =
  | LabelDefinition
  | IteratorDefinition
  | RadioQuestionDefinition
  | RadioOptionDefinition
  | CheckDefinition
  | TextQuestionDefinition; // | TextAreaQuestionDefinition | SeparatorDefintion;

export type SectionDefinition = $ReadOnly<{|
  name: string,
  elements: $ReadOnlyArray<QuestionDefinition>
|}>;

export type QuestionnaireDefinition = $ReadOnly<{|
  sections: $ReadOnlyArray<SectionDefinition>
|}>;
