// Creating an accordion that toggles text content
// on click of the accordion header

import { useState } from "react";

function AccordianPure({ headingText, paraText, hidePara, onHeadingClick }) {
  return (
    <>
      <div>
        <button onClick={onHeadingClick}>{headingText}</button>
      </div>
      <div>
        <p style={{ display: hidePara ? "none" : "block" }}>{paraText}</p>
      </div>
    </>
  );
}

function AccordianLcl({ headingText, paraText }) {
  const [hidePara, setHidePara] = useState(true);
  function toggleHidePara() {
    setHidePara((prevHidePara) => !prevHidePara);
  }
  return (
    <AccordianPure
      headingText={headingText}
      paraText={paraText}
      hidePara={hidePara}
      onHeadingClick={toggleHidePara}
    />
  );
}

export default function Accordian() {
  return (
    <>
      <AccordianLcl headingText="heading1" paraText="para1" />
      <AccordianLcl headingText="heading2" paraText="para2" />
      <AccordianLcl headingText="heading3" paraText="para3" />
    </>
  );
}
