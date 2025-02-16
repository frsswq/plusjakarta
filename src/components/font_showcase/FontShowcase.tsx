import React, { useState, useRef } from "react";
import { SystemUiconsReset } from "../icons/SystemUiconsReset";
import { Button } from "@/components/ui/button";
import FontShowcaseSliderSize from "./FontShowcaseSliderSize";
import FontShowcaseSelectWeight from "./FontShowcaseSelectWeight";

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

  const showTooltip = (text: string) => {
    setTooltipVisible("");
    setTimeout(() => {
      setTooltipVisible(text);
    }, 500);
  };

  const hideTooltip = () => {
    setTooltipVisible("");
  };

  return (
    <div
      className="section-padding fixed-container flex flex-col gap-y-2"
      onMouseMove={handleMousePosition}
    >
      <div className="flex items-center gap-x-2">
        <FontShowcaseSelectWeight
          value={fontWeight}
          onValueChange={setFontWeight}
          onTriggerMouseEnter={() => showTooltip("Font Weight")}
          onTriggerMouseLeave={() => hideTooltip()}
          onContentMouseEnter={() => hideTooltip()}
        />
        <div
          onMouseEnter={() => showTooltip("Font Size")}
          onMouseLeave={() => hideTooltip()}
        >
          <FontShowcaseSliderSize
            value={fontSize}
            onValueChange={setFontSize}
          />
        </div>
        <Button
          onClick={resetFont}
          className="group size-9 cursor-pointer rounded-xs border border-zinc-200 bg-white
            hover:border-zinc-300 hover:bg-zinc-50/10 hover:shadow-2xs"
          onMouseEnter={() => showTooltip("Reset Editor")}
          onMouseLeave={() => hideTooltip()}
          aria-label="Reset editor"
        >
          <SystemUiconsReset className="text-zinc-700 group-hover:text-black" />
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
