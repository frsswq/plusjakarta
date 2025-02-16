import React, { useState, useRef } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import FontShowcaseSliderSize from "./FontShowcaseSliderSize";
import FontShowcaseSelectWeight from "./FontShowcaseSelectWeight";

import "@/styles/rangeSliderBall.css";
import { type FontShowcaseProps } from "@/types/commonProps";

const editableText =
  "Hijau Betawi / Jingga Bis Kota Kuning Gigi Balang / Biru Abang Pink None & City Collaboration.";

export default function FontShowcase({
  defaultEditableText = editableText,
  defaultFontSize = 80,
  defaultFontWeight = "800",
}: FontShowcaseProps) {
  // type tester
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);
  const [fontWeight, setFontWeight] = useState<string>(defaultFontWeight);
  const [fontFeatures, toggleFontFeatures] = useState<string[]>([]);
  const fontTextRef = useRef<HTMLParagraphElement>(null);

  const resetFont = () => {
    setFontSize(defaultFontSize);
    setFontWeight(defaultFontWeight);
    toggleFontFeatures([]);
    if (fontTextRef.current)
      fontTextRef.current.textContent = defaultEditableText;
  };

  // tooltip
  const [tooltipVisible, setTooltipVisible] = useState<string>("");
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMousePosition = (e: React.MouseEvent<HTMLElement>) => {
    setMousePosition({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  return (
    <div
      className="section-padding flex flex-col gap-y-2"
      onMouseMove={handleMousePosition}
    >
      <div className="flex items-center gap-x-2">
        <div
          onMouseEnter={() => setTooltipVisible("Font Weight")}
          onMouseLeave={() => setTooltipVisible("")}
        >
          <FontShowcaseSelectWeight
            value={fontWeight}
            onValueChange={setFontWeight}
          />
        </div>
        <div
          onMouseEnter={() => setTooltipVisible("Font Size")}
          onMouseLeave={() => setTooltipVisible("")}
        >
          <FontShowcaseSliderSize
            value={fontSize}
            onValueChange={setFontSize}
          />
        </div>
        <Button
          onClick={resetFont}
          className="group size-9 rounded-xs border border-zinc-200 bg-white hover:border-zinc-300
            hover:bg-zinc-50/10 hover:shadow-2xs"
          onMouseEnter={() => setTooltipVisible("Reset Editor")}
          onMouseLeave={() => setTooltipVisible("")}
        >
          <ReloadIcon className="text-zinc-700 group-hover:text-black" />
        </Button>

        {tooltipVisible && (
          <div
            className="pointer-events-none fixed z-50 rounded-xs border border-zinc-300 bg-white px-2
              py-1 text-xs tracking-tight whitespace-nowrap shadow-2xs"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
            }}
          >
            {tooltipVisible}
          </div>
        )}
      </div>
      <div
        className="group rounded-xs border border-zinc-200 hover:border-zinc-300
          hover:bg-zinc-50/10 hover:shadow-2xs"
      >
        <p
          ref={fontTextRef}
          className="w-full px-2 pt-8 pb-10 leading-none font-extrabold tracking-tight text-red-500
            caret-black hover:cursor-text focus:outline-none"
          contentEditable
          suppressContentEditableWarning
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            fontFeatureSettings: fontFeatures.length
              ? fontFeatures.map((f) => `"${f}"`).join(", ")
              : "normal",
          }}
        >
          {defaultEditableText}
        </p>
      </div>
    </div>
  );
}
