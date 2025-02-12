import { useState, useRef, useCallback } from "react";
import {
  ReloadIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
} from "@radix-ui/react-icons";
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

type TextAlign = "left" | "center" | "right" | "justify";

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

  const handleFontSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFontSize(parseInt(e.target.value));
    },
    [],
  );

  const handleFontWeightChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFontWeight(parseInt(e.target.value));
    },
    [],
  );

  const handleFontFeaturesChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const feature = e.target.value;
      toggleFontFeatures((prev) =>
        e.target.checked
          ? [...prev, feature]
          : prev.filter((f) => f !== feature),
      );
    },
    [],
  );

  const resetFont = useCallback(() => {
    setFontSize(defaultFontSize);
    setFontWeight(defaultFontWeight);
    toggleFontFeatures([]);

    if (fontTextRef.current) {
      fontTextRef.current.textContent = defaultEditableText;
    }
  }, [defaultFontSize, defaultFontWeight, defaultEditableText]);

  return (
    <div className="flex flex-col gap-y-0 px-4">
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
          <button
            onClick={(e) => setTextAlign("left")}
            className={`cursor-pointer ${textAlign === "left" ? "text-black" : "text-zinc-500"}`}
          >
            <TextAlignLeftIcon className="h-[20px] w-auto" />
          </button>
          <button
            onClick={(e) => setTextAlign("center")}
            className={`cursor-pointer ${textAlign === "center" ? "text-black" : "text-zinc-500"}`}
          >
            <TextAlignCenterIcon className="h-[20px] w-auto" />
          </button>
          <button
            onClick={(e) => setTextAlign("right")}
            className={`cursor-pointer ${textAlign === "right" ? "text-black" : "text-zinc-500"}`}
          >
            <TextAlignRightIcon className="h-[20px] w-auto" />
          </button>
          <button
            onClick={(e) => setTextAlign("justify")}
            className={`cursor-pointer ${textAlign === "justify" ? "text-black" : "text-zinc-500"}`}
          >
            <TextAlignJustifyIcon className="h-[20px] w-auto" />
          </button>
          <button onClick={resetFont} className="cursor-pointer">
            <ReloadIcon />
          </button>
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
          focus:outline-none"
        contentEditable
        suppressContentEditableWarning
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: fontWeight,
          fontFeatureSettings: fontFeatures.length
            ? fontFeatures.map((f) => `"${f}"`).join(", ")
            : "normal",
          textAlign: textAlign as TextAlign,
        }}
      >
        {defaultEditableText}
      </p>
    </div>
  );
}
