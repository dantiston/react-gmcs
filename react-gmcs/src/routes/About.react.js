// @flow strict

import React from "react";

export default () => (
  <>
    <p>
      The LinGO Grammar Matrix is developed at the University of Washington in
      the context of the DELPH-IN Consortium, by Emily M. Bender and colleagues.
      This material is based up work supported by the National Science
      Foundation under Grant No. BCS-0644097. Additional support for Grammar
      Matrix development came from a gift to the Turing Center from the Utilika
      Foundation. Any opinions, findings, and conclusions or recommendations
      expressed in this material are those of the author(s) and do not
      necessarily reflect the views of the National Science Foundation.
    </p>
    <p>
      Publications reporting on work based on grammars derived from this system
      should cite{" "}
      <a href={"http://faculty.washington.edu/ebender/papers/gee03.pdf"}>
        Bender, Flickinger and Oepen 2002
      </a>
      <a
        href={
          "http://faculty.washington.edu/ebender/bibtex/BenFliOep02.bib.txt"
        }
      >
        {" [.bib] "}
      </a>
      and Bender et al 2010{" "}
      <a
        href={
          "http://faculty.washington.edu/ebender/bibtex/BenDreFokPouSal10.bib.txt"
        }
      >
        [.bib]
      </a>
      . Further publications from the project are available on the{" "}
      <a href={"http://matrix.ling.washington.edu/index.html#pubs"}>
        project website
      </a>
      .
    </p>
    <p>
      Filling out this form will produce a starter grammar for a natural
      language, consisting of a language-independent core and customized support
      for the phenomena you describe below. Be advised that this system is
      highly experimental. We are interested in your feedback. If you have
      questions or comments, please email Emily Bender at:{" "}
      <code>ebender at u dot washington dot edu</code>.
    </p>
    <p>
      This website is powered by <code>react-gmcs</code>, an alternative Grammar
      Customization website for creating choices files using modern web
      technologies. It is designed to be equivalent to trunk gmcs, but if you
      have issues, try out{" "}
      <a href={"http://matrix.delph-in.net/customize/matrix.cgi"}>
        matrix.delph-in.net/customize/matrix.cgi
      </a>
      . You can learn more about <code>react-gmcs</code> at{" "}
      <a href={"https://github.com/dantiston/react-gmcs"}>
        github.com/dantiston/react-gmcs
      </a>
      .
    </p>
  </>
);
