// @flow strict-local

"use strict";

import "@testing-library/jest-dom/extend-expect";

import React from "react";
import {render} from "@testing-library/react";
import App from "./App";

const fetchMock = require("fetch-mock-jest");

it("App renders", () => {
  fetchMock.get(
    "/matrixdef.txt",
    'Section general "General Information"\n\nLabel "<h3>Hello world!</h3>"'
  );
  const {getByText} = render(<App />);
  const label = getByText(/LinGO Grammar Matrix/i);
  expect(label).toBeInTheDocument();
});
