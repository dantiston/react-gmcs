// @flow strict-local

"use strict";

import React from "react";
import {render} from "@testing-library/react";
import App from "./App";

const fetchMock = require("fetch-mock-jest");

it("renders learn react link", () => {
  fetchMock.mock(
    "matrixdef_tiny.txt",
    'Section general "General Information"\n\nLabel "<h3>Hello world!</h3>"'
  );
  const {getByText} = render(<App />);
  const label = getByText(/Hello world!/i);
  expect(label).toBeInTheDocument();
});
