// Creating an accordion that toggles text content
// on click of the accordion header

import { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./ImageSlider.module.css";

function DisplayImage({ src }) {
  return `displaying image with source: ${src}.`;
}

function DisplayCircle({ filled, onClick }) {
  // render inputs:
  // - filled
  // - setCurrImgIndexI
  let className = styles.circle;
  className += filled ? " " + styles.filled : "";

  return <span className={className} onClick={onClick} />;
}

function DisplayCircles({ images, currImgIndex, setCurrImgIndex }) {
  function getDisplayCircle(item, i) {
    const filled = i === currImgIndex ? true : false;

    function setCurrImgIndexI() {
      setCurrImgIndex(i);
    }

    const handleClick = setCurrImgIndexI;

    return (
      <DisplayCircle filled={filled} onClick={handleClick} key={item.id} />
    );
  }
  return <div>{images.map(getDisplayCircle)}</div>;
}

function ImageSliderLcl({ images }) {
  const [currImgIndex, setCurrImgIndex] = useState(0);

  function setCurrImgIndexPrev() {
    setCurrImgIndex((c) => Math.max(c - 1, 0));
  }

  function setCurrImgIndexNext() {
    setCurrImgIndex((c) => Math.min(c + 1, images.length - 1));
  }

  const handlePrevOnClick = setCurrImgIndexPrev;
  const handleNextOnClick = setCurrImgIndexNext;

  // render inputs:
  // - handlePrevOnClick
  // - handleNextOnClick
  // - images
  // - currImgIndex
  // - setCurrImgIndex
  const src = images[currImgIndex].src;
  return (
    <>
      <button onClick={handlePrevOnClick}>Prev</button>
      <DisplayImage src={src} />
      <button onClick={handleNextOnClick}>Next</button>
      <DisplayCircles {...{ images, currImgIndex, setCurrImgIndex }} />
    </>
  );
}

function ImageSlider() {
  const images = [
    { src: "i1.jpeg", id: nanoid() },
    { src: "i2.jpeg", id: nanoid() },
    { src: "i3.jpeg", id: nanoid() },
    { src: "i4.jpeg", id: nanoid() },
    { src: "i5.jpeg", id: nanoid() },
    { src: "i6.jpeg", id: nanoid() },
  ];
  return <ImageSliderLcl images={images} />;
}

export default ImageSlider;
