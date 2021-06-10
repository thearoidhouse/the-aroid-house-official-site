import { useState, useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { ItemCarouselImage } from "./ItemCarouselImage";

export const ItemCarousel = ({ images }) => {
  const [pause, setPause] = useState(false);
  const timer = useRef();
  const [sliderRef, slider] = useKeenSlider({
    centered: true,
    duration: 3000,
    loop: true,
    mode: "free-snap",
    spacing: 20,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
    slidesPerView: 2,
  });

  useEffect(() => {
    sliderRef.current.addEventListener("mouseover", () => {
      setPause(true);
    });
    sliderRef.current.addEventListener("mouseout", () => {
      setPause(false);
    });
  }, [sliderRef]);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 3000);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider]);

  return (
    <Box
      className="keen-slider"
      width={["100vw", "100vw"]}
      ref={sliderRef}
      backgroundColor="background"
    >
      {images.map((image, i) => {
        return (
          <div key={i} className="keen-slider__slide">
            <ItemCarouselImage src={image} />
          </div>
        );
      })}
    </Box>
  );
};
