"use client";

import Lottie from "lottie-react";
import circlesAnimation from "@/public/animations/circles.json";

export default function CirclesLottie({ speed = 0.4 }) {
  return (
    <Lottie
      animationData={circlesAnimation}
      loop
      autoplay
      speed={speed}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
