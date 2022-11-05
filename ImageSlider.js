// Creating an accordion that toggles text content
// on click of the accordion header

import { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./ImageSlider.module.css";

function ImageSliderPure({
  images,
  currImgIndex,
  onPrevClick,
  onNextClick,
  onCircleClick,
}) {
  return (
    <>
      <button onClick={onPrevClick}>Prev</button>
      <span>image {images[currImgIndex].src}</span>
      <button onClick={onNextClick}>Next</button>
      <div>
        {images.map((item, index) => (
          <span
            onClick={() => onCircleClick(index)}
            className={
              styles.circle +
              (index === currImgIndex ? " " + styles.filled : "")
            }
            key={item.id}
          />
        ))}
      </div>
    </>
  );
}

function ImageSliderLcl({ images }) {
  const [currImgIndex, setCurrImgIndex] = useState(0);

  function setCurrImgIndexPrev() {
    setCurrImgIndex(Math.max(currImgIndex - 1, 0));
  }

  function setCurrImgIndexNext() {
    setCurrImgIndex(Math.min(currImgIndex + 1, images.length - 1));
  }

  return (
    <ImageSliderPure
      images={images}
      currImgIndex={currImgIndex}
      onPrevClick={setCurrImgIndexPrev}
      onNextClick={setCurrImgIndexNext}
      onCircleClick={setCurrImgIndex}
    />
  );
}

export default function ImageSlider() {
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
