import { useState, useRef } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import FontInputSlider from "./FontInputSlider";
import FontInputSelect from "./FontInputSelect";
import FontInputCheckbox from "./FontInputCheckbox";
import {
  fontWeightsLabel,
  fontFeaturesLabel,
  textAlignIcons,
} from "../../data/fontShowcaseData";
import "../../styles/rangeSlider.css";
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

  const paragraphStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    fontFeaturesSettings: fontFeatures.length
      ? fontFeatures.map((f) => `"${f}"`).join(", ")
      : "normal",
    textAlign: textAlign as React.CSSProperties["textAlign"],
  };

  return (
    <div className="flex flex-col gap-y-0 px-6 py-12">
      <div className="flex gap-x-2">
        <FontInputSelect
          label={"Font Weight"}
          handleChange={handleFontWeightChange}
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
          handleChange={handleFontSizeChange}
        />
        <div className="ml-auto flex items-center gap-x-2">
          {textAlignIcons.map(({ Icon, value }) => (
            <Icon
              key={value}
              onClick={() => setTextAlign(value)}
              className={`h-[19px] w-auto cursor-pointer ${
              textAlign === value ? "text-black" : "text-zinc-500" }`}
            />
          ))}
          <ReloadIcon
            onClick={resetFont}
            className="h-[13px] w-auto cursor-pointer"
          />
        </div>
      </div>
      <div className="flex gap-x-2">
        {fontFeaturesLabel.map((feature) => (
          <FontInputCheckbox
            label={feature.label}
            key={feature.value}
            value={feature.value}
            checked={fontFeatures.includes(feature.value)}
            handleChange={handleFontFeaturesChange}
          />
        ))}
      </div>
      <p
        ref={fontTextRef}
        className="w-full py-4 -indent-1 leading-none font-extrabold tracking-tight text-red-500
          caret-black focus:outline-none"
        contentEditable
        suppressContentEditableWarning
        style={paragraphStyle}
      >
        {defaultEditableText}
      </p>
    </div>
  );
}
