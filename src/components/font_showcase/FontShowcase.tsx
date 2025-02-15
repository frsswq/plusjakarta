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

  const handleFontFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const feature = e.target.value;
    toggleFontFeatures((prev) =>
      e.target.checked ? [...prev, feature] : prev.filter((f) => f !== feature),
    );
  };

  const resetFont = () => {
    setFontSize(defaultFontSize);
    setFontWeight(defaultFontWeight);
    toggleFontFeatures([]);

    if (fontTextRef.current) {
      fontTextRef.current.textContent = defaultEditableText;
    }
  };

  return (
    <div className="section-padding flex flex-col gap-y-1">
      <div className="flex items-center gap-x-2">
        <FontShowcaseSelectWeight
          value={fontWeight}
          onValueChange={setFontWeight}
        />
        <FontShowcaseSliderSize value={fontSize} onValueChange={setFontSize} />

        <div
          className="ml-auto flex rounded-xs border border-zinc-200 bg-white shadow-none
            hover:border-zinc-300 hover:bg-zinc-50/10 hover:shadow-2xs"
        >
          <Button onClick={resetFont} className="group max-w-10 bg-white">
            <ReloadIcon className="text-zinc-700 group-hover:text-black" />
          </Button>
        </div>
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
