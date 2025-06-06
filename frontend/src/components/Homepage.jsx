"use client";
import React from "react";
import { WavyBackground } from "../components/ui/wavy-background";

export function WavyBackgroundDemo() {
  return (
    (<WavyBackground className="max-w-4xl mx-auto pb-40 font-mono">
      <p
        className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Engage Express Evolve
      </p>
      <p
        className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        A dynamic forum where ideas spark, voices unite, and conversations shape the future!
      </p>
    </WavyBackground>)
  );
}
