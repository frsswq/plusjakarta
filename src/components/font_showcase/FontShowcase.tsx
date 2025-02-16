import React, { useState, useRef } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import FontShowcaseSelectWeight from "./FontShowcaseSelectWeight";
import FontShowcaseSliderSize from "./FontShowcaseSliderSize";
import { Button } from "@/components/ui/button";
import "../../styles/rangeSliderBall.css";

import { type FontShowcaseProps } from "../../types/commonProps";

const editableText =
  "Hijau Betawi / Jingga Bis Kota Kuning Gigi Balang / Biru Abang Pink None & City Collaboration.";

export default function FontShowcase({
  defaultEditableText = editableText,
  defaultFontSize = 80,
  defaultFontWeight = "800",
}: FontShowcaseProps) {
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);
  const [fontWeight, setFontWeight] = useState<string>(defaultFontWeight);
  const [fontFeatures, toggleFontFeatures] = useState<string[]>([]);
  const fontTextRef = useRef<HTMLParagraphElement>(null);

  // Tooltip logic
  const [tooltipVisible, setTooltipVisible] = useState<string>("");
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMousePosition = (e: React.MouseEvent<HTMLElement>) => {
    setMousePosition({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  const resetFont = () => {
    setFontSize(defaultFontSize);
    setFontWeight(defaultFontWeight);
    toggleFontFeatures([]);
    if (fontTextRef.current)
      fontTextRef.current.textContent = defaultEditableText;
  };

  return (
    <div
      className="section-padding flex flex-col gap-y-1"
      onMouseMove={handleMousePosition}
    >
      <div className="flex items-center gap-x-2">
        <FontShowcaseSelectWeight
          value={fontWeight}
          onValueChange={setFontWeight}
        />
        <div
          className="size-full"
          onMouseEnter={() => setTooltipVisible("Font Size")}
          onMouseLeave={() => setTooltipVisible("")}
        >
          <FontShowcaseSliderSize
            value={fontSize}
            onValueChange={setFontSize}
          />
        </div>
        <div
          className="ml-auto flex rounded-xs border border-zinc-200 bg-white hover:border-zinc-300
            hover:bg-zinc-50/10"
        >
          <Button onClick={resetFont} className="group max-w-10 bg-white">
            <ReloadIcon className="text-zinc-700 group-hover:text-black" />
          </Button>
        </div>
        {tooltipVisible && (
          <div
            className="pointer-events-none fixed z-50 rounded-xs border border-zinc-300 bg-white px-2
              py-1 text-xs"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
            }}
          >
            {tooltipVisible}
          </div>
        )}
      </div>
      <div>
        <p
          ref={fontTextRef}
          className="w-full py-4 -indent-1 leading-none font-extrabold tracking-tight text-red-500
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
