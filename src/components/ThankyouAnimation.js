import Lottie from "react-lottie-player";

import thankYouLottie from "public/thankYou_lottie.json";

export default function ThankyouAnimation() {
  return (
    <Lottie
      loop
      animationData={thankYouLottie}
      play
      style={{ width: 350, height: 350 }}
    />
  );
}
