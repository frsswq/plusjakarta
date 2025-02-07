import React, { useState, useRef } from "react";
import InputSlider from "../common/InputSlider";
import InputSelect from "../common/InputSelect";

export default function FontShowcase() {
  const [fontSize, setFontSize] = useState<number>(96);
  const [selectWeight, setSelectWeight] = useState<number>(800);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const changeFontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(event.target.value));
  };

  const changeFontWeight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectWeight(parseInt(event.target.value));
  };

  const fontWeights = [
    { label: "ExtraLight", value: 200 },
    { label: "Light", value: 300 },
    { label: "Regular", value: 400 },
    { label: "Medium", value: 500 },
    { label: "SemiBold", value: 600 },
    { label: "Bold", value: 700 },
    { label: "ExtraBold", value: 800 },
  ];

  return (
    <div className="px-6">
      <div className="flex gap-x-2">
        <InputSelect handleChange={changeFontWeight} defaultValue={800}>
          {fontWeights.map((weight, index) => (
            <option value={weight.value} key={index}>
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
      <p
        ref={paragraphRef}
        className="w-full py-4 -indent-1 leading-none font-extrabold tracking-tight text-red-500
          focus:outline-none"
        contentEditable
        suppressContentEditableWarning
        style={{ fontSize: `${fontSize}px`, fontWeight: `${selectWeight}` }}
      >
        Hijau Betawi / Jingga Bis Kota Kuning Gigi Balang / Biru Abang Pink None
        & City Collaboration.
      </p>
    </div>
  );
}
