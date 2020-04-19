# Summary
The goal of Grammar Customization is to provide a user friendly UI for producing `choices` files that are the input to the Grammar Matrix for creating a precision HPSG Delph-IN grammar.

`gmcs-react` is a React-based alternative to the Grammar Matrix Customization System trunk UI: `gmcs`.
The goals of `gmcs-react` are to:
* read the same `matrixdef` files as `gmcs`
* read and write the same `choices` files as `gmcs`
* provide immediate choice validation
* utilize core grammar customization to generate grammars

By default, `gmcs-react` uses the same `matrixdef` file as the trunk UI, so no need to worry about feature bifurcation.
