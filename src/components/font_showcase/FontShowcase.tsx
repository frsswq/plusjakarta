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

  return (
    <div className="section-padding fixed-container flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        <div title="Font Weight">
          <FontShowcaseSelectWeight
            value={fontWeight}
            onValueChange={setFontWeight}
          />
        </div>
        <div title="Font Size">
          <FontShowcaseSliderSize
            value={fontSize}
            onValueChange={setFontSize}
          />
        </div>
        <Button
          onClick={resetFont}
          className="group size-9 cursor-pointer rounded-xs border border-zinc-200 bg-white
            hover:border-zinc-300 hover:bg-zinc-50/10 hover:shadow-2xs"
          aria-label="Reset editor"
          title="Reset Editor"
        >
          <SystemUiconsReset className="text-zinc-700 group-hover:text-black" />
        </Button>
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
