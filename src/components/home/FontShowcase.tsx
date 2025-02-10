import { useState, useRef } from "react";
import InputSlider from "../common/InputSlider";
import InputSelect from "../common/InputSelect";
import InputCheckbox from "../common/InputCheckbox";
import {
  fontWeightsLabel,
  fontFeaturesLabel,
} from "../../data/fontShowcaseData";
import "../../styles/rangeSlider.css";

export default function FontShowcase() {
  const [fontSize, setFontSize] = useState<number>(96);
  const [fontWeight, setFontWeight] = useState<number>(800);
  const [fontFeatures, toggleFontFeatures] = useState<string[]>([]);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

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
    <div className="flex flex-col gap-y-2 px-4">
      <div className="flex gap-x-2">
        <InputSelect handleChange={changeFontWeight} defaultValue={800}>
          {fontWeightsLabel.map((weight) => (
            <option value={weight.value} key={weight.value}>
              {weight.label}
            </option>
          ))}
        </InputSelect>
        <InputSlider
          label="Font Size"
          min={10}
          max={300}
          step={1}
          value={fontSize}
          handleChange={changeFontSize}
        />
      </div>
      <div className="flex gap-x-2">
        {fontFeaturesLabel.map((feature) => (
          <InputCheckbox
            label={feature.label}
            key={feature.value}
            value={feature.value}
            checked={fontFeatures.includes(feature.value)}
            handleChange={changeFontFeatures}
          />
        ))}
      </div>
      <p
        ref={paragraphRef}
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
        Hijau Betawi / Jingga Bis Kota Kuning Gigi Balang / Biru Abang Pink None
        & City Collaboration.
      </p>
    </div>
  );
}
