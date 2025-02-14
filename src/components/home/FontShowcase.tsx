import React, { useState, useRef } from "react";
import { ReloadIcon, FontSizeIcon } from "@radix-ui/react-icons";
import FontInputSlider from "./FontInputSlider";
import FontShowcaseSelectWeight from "./FontShowcaseSelectWeight";
import FontShowcaseCheckboxFeatures from "./FontShowcaseCheckboxFeatures";
import {
  fontWeightsLabel,
  fontFeaturesLabel,
  textAlignIcons,
} from "../../data/fontShowcaseData";
import "../../styles/rangeSliderBall.css";
import { type FontShowcaseProps } from "../../types/commonProps";

const editableText =
  "Hijau Betawi / Jingga Bis Kota Kuning Gigi Balang / Biru Abang Pink None & City Collaboration.";

export default function FontShowcase({
  defaultEditableText = editableText,
  defaultFontSize = 80,
  defaultFontWeight = 800,
  defaultTextJustify = "left",
}: FontShowcaseProps) {
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);
  const [fontWeight, setFontWeight] = useState<number>(defaultFontWeight);
  const [fontFeatures, toggleFontFeatures] = useState<string[]>([]);
  const [textAlign, setTextAlign] = useState<string>(defaultTextJustify);
  const fontTextRef = useRef<HTMLParagraphElement>(null);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value));
  };

  const handleFontWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontWeight(parseInt(e.target.value));
  };

  const handleFontFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const feature = e.target.value;
    toggleFontFeatures((prev) =>
      e.target.checked ? [...prev, feature] : prev.filter((f) => f !== feature),
    );
  };

  const resetFont = () => {
    setFontSize(defaultFontSize);
    setFontWeight(defaultFontWeight);
    setTextAlign(defaultTextJustify);
    toggleFontFeatures([]);

    if (fontTextRef.current) {
      fontTextRef.current.textContent = defaultEditableText;
    }
  };

  return (
    <div className="section-padding flex flex-col gap-y-1">
      <div className="flex items-center gap-x-4">
        <FontShowcaseSelectWeight />
        <FontInputSlider
          label={<FontSizeIcon className="text-zinc-500" />}
          min={10}
          max={300}
          step={1}
          value={fontSize}
          handleChange={handleFontSizeChange}
          detail="px"
        />
        <ReloadIcon
          onClick={resetFont}
          className="cursor-pointer text-zinc-500"
        />
        <div className="ml-auto flex">
          <FontShowcaseCheckboxFeatures />
          {/* {fontFeaturesLabel.map((feature) => (
            <FontInputCheckbox
              label={feature.label}
              key={feature.value}
              value={feature.value}
              checked={fontFeatures.includes(feature.value)}
              handleChange={handleFontFeaturesChange}
            />
          ))} */}
        </div>
      </div>
      <div>
        <p
          ref={fontTextRef}
          className="w-full py-4 -indent-1 leading-none font-extrabold tracking-tight text-red-500
            caret-black focus:outline-none"
          contentEditable
          suppressContentEditableWarning
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            fontFeatureSettings: fontFeatures.length
              ? fontFeatures.map((f) => `"${f}"`).join(", ")
              : "normal",
            textAlign: textAlign as React.CSSProperties["textAlign"],
          }}
        >
          {defaultEditableText}
        </p>
      </div>
    </div>
  );
}
