import { useState, useRef } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import FontInputSlider from "./FontInputSlider";
import FontInputSelect from "./FontInputSelect";
import FontInputCheckbox from "./FontInputCheckbox";
import {
  fontWeightsLabel,
  fontFeaturesLabel,
} from "../../data/fontShowcaseData";
import "../../styles/rangeSlider.css";
import { type FontShowcaseProps } from "../../types/commonProps";
const editableText =
  "Hijau Betawi / Jingga Bis Kota Kuning Gigi Balang / Biru Abang Pink None & City Collaboration.";

export default function FontShowcase({
  defaultEditableText = editableText,
  defaultFontSize = 80,
  defaultFontWeight = 800,
}: FontShowcaseProps) {
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);
  const [fontWeight, setFontWeight] = useState<number>(defaultFontWeight);
  const fontTextRef = useRef<HTMLParagraphElement>(null);
  const [fontFeatures, toggleFontFeatures] = useState<string[]>([]);

  const resetFont = () => {
    setFontSize(defaultFontSize);
    setFontWeight(defaultFontWeight);
    toggleFontFeatures([]);

    if (fontTextRef.current) {
      fontTextRef.current.textContent = defaultEditableText;
    }
  };

  const changeFontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(event.target.value));
  };

  const changeFontWeight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontWeight(parseInt(event.target.value));
  };

  const changeFontFeatures = (event: React.ChangeEvent<HTMLInputElement>) => {
    const feature = event.target.value;
    toggleFontFeatures((prev) =>
      event.target.checked
        ? [...prev, feature]
        : prev.filter((f) => f !== feature),
    );
  };

  return (
    <div className="flex flex-col gap-y-0 px-4">
      <div className="flex gap-x-2">
        <FontInputSelect
          label={"Font Weight"}
          handleChange={changeFontWeight}
          defaultValue={800}
        >
          {fontWeightsLabel.map((weight) => (
            <option value={weight.value} key={weight.value}>
              {weight.label}
            </option>
          ))}
        </FontInputSelect>
        <FontInputSlider
          label="Font Size"
          min={10}
          max={300}
          step={1}
          value={fontSize}
          handleChange={changeFontSize}
        />
        <button
          onClick={resetFont}
          className="ml-auto flex cursor-pointer items-center"
        >
          <ReloadIcon />
        </button>
      </div>
      <div className="flex gap-x-2">
        {fontFeaturesLabel.map((feature) => (
          <FontInputCheckbox
            label={feature.label}
            key={feature.value}
            value={feature.value}
            checked={fontFeatures.includes(feature.value)}
            handleChange={changeFontFeatures}
          />
        ))}
      </div>
      <p
        ref={fontTextRef}
        className="w-full py-4 -indent-1 leading-none font-extrabold tracking-tight text-red-500
          focus:outline-none"
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
  );
}
