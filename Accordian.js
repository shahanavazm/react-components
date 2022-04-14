// Creating an accordion that toggles text content
// on click of the accordion header

import { useButton } from "./util";

function Para({ paraText, hidePara }) {
  const display = hidePara ? "none" : "inline";
  return <p style={{ display }}>{paraText}</p>;
}

function AccordianPure({ headingText, headingProps, headingClicks, paraText }) {
  const hidePara = (headingClicks + 1) % 2;
  return (
    <>
      <div>
        <button {...headingProps}>{headingText}</button>
      </div>
      <div>
        <Para paraText={paraText} hidePara={hidePara} />
      </div>
    </>
  );
}

function AccordianLcl({ headingText, paraText }) {
  const [headingProps, headingClicks] = useButton();
  return (
    <AccordianPure
      {...{ headingText, headingProps, headingClicks, paraText }}
    />
  );
}

function Accordian() {
  return (
    <>
      <AccordianLcl headingText="heading1" paraText="para1" />
      <AccordianLcl headingText="heading2" paraText="para2" />
      <AccordianLcl headingText="heading3" paraText="para3" />
    </>
  );
}

export default Accordian;
