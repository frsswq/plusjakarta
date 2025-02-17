import { useState, useRef } from "react";
import { SystemUiconsReset } from "@/components/icons/SystemUiconsReset";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleDefault } from "@/components/ui/toggleDefault";
import FontShowcaseSliderSize from "./FontShowcaseSliderSize";
import FontShowcaseSelectWeight from "./FontShowcaseSelectWeight";
import { fontFeaturesLabel } from "@/data/fontShowcaseData";
import { type FontShowcaseProps } from "@/types/commonProps";
import { cn } from "@/lib/utils";
import { MynauiTextAlignLeft } from "../icons/MynauiTextAlignLeft";
import { MynauiTextAlignCenter } from "../icons/MynauiTextAlignCenter";

const DEFAULT_EDITABLE_TEXT =
  "Hijau Betawi / Jingga Bis Kota Kuning Gigi Balang / Biru Abang Pink None & City Collaboration.";

export default function FontShowcase({
  defaultEditableText = DEFAULT_EDITABLE_TEXT,
  defaultFontSize = 75,
  defaultFontWeight = "800",
  defaultTextAlign = "center",
  defaultFontFeatures = [],
  className,
}: FontShowcaseProps) {
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);
  const [fontWeight, setFontWeight] = useState<string>(defaultFontWeight);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    defaultTextAlign,
  );
  const [fontFeatures, setFontFeatures] =
    useState<string[]>(defaultFontFeatures);
  const fontTextRef = useRef<HTMLParagraphElement>(null);

  const addFontFeature: string =
    fontFeatures.length > 0 ? `"${fontFeatures.join(`", "`)}"` : "normal";

  const resetFont = () => {
    setFontSize(defaultFontSize);
    setFontWeight(defaultFontWeight);
    setTextAlign(defaultTextAlign);
    setFontFeatures([]);
    if (fontTextRef.current)
      fontTextRef.current.textContent = defaultEditableText;
  };

  return (
    <div className="fixed-container group/showcase flex flex-col gap-y-1.5 px-8">
      <div className="z-10 flex h-9 flex-wrap items-center gap-1 md:gap-1.5">
        <div title="Font Weight">
          <FontShowcaseSelectWeight
            value={fontWeight}
            onValueChange={setFontWeight}
          />
        </div>
        <div title="Font Size" className="hidden group-hover/showcase:flex">
          <FontShowcaseSliderSize
            value={fontSize}
            min={10}
            max={300}
            step={1}
            onValueChange={setFontSize}
          />
        </div>

        <div className="ml-auto flex h-9 items-center gap-1.5">
          <div
            className="hidden items-center gap-x-0.5 rounded-sm border border-zinc-200 p-0.5
              group-hover/showcase:flex hover:border-zinc-300 hover:shadow-2xs"
          >
            <ToggleDefault
              title="Align left"
              pressed={textAlign === "left"}
              onPressedChange={() => setTextAlign("left")}
            >
              <MynauiTextAlignLeft />
            </ToggleDefault>
            <ToggleDefault
              title="Align center"
              pressed={textAlign === "center"}
              onPressedChange={() => setTextAlign("center")}
            >
              <MynauiTextAlignCenter />
            </ToggleDefault>
          </div>
          <div
            className="hidden items-center rounded-sm border border-zinc-200 p-0.5
              group-hover/showcase:flex hover:border-zinc-300"
          >
            <Button
              onClick={resetFont}
              className="group/reset size-8 cursor-pointer rounded-xs hover:bg-zinc-100"
              aria-label="Reset editor"
              title="Reset editor"
            >
              <SystemUiconsReset className="text-zinc-700 group-hover/reset:text-black" />
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden h-9 items-center gap-1 group-hover/showcase:flex md:gap-1.5">
        {fontFeaturesLabel.map(({ label, value, desc }) => (
          <Toggle
            className="hidden group-hover/showcase:flex"
            key={value}
            title={value}
            aria-label={desc}
            pressed={fontFeatures.includes(value)}
            onPressedChange={(p) =>
              setFontFeatures((prev) =>
                p ? [...prev, value] : prev.filter((f) => f !== value),
              )
            }
          >
            {label}
          </Toggle>
        ))}
      </div>

      <div className="w-full">
        <span
          ref={fontTextRef}
          className={cn(
            `inline-block w-full px-2 pt-2 pb-10 leading-none tracking-tighter
            hover:cursor-text focus:outline-none`,
            className,
          )}
          contentEditable="true"
          autoCorrect="false"
          autoCapitalize="false"
          spellCheck="false"
          suppressContentEditableWarning
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            textAlign: textAlign,
            fontFeatureSettings: addFontFeature,
            fontFamily: `"Plus Jakarta Sans", "Plus Jakarta Sans Variable", sans-serif`,
            textRendering: "geometricPrecision",
          }}
        >
          {defaultEditableText}
        </span>
      </div>
    </div>
  );
}
