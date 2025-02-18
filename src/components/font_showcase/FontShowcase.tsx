import { useState, useRef, useEffect } from "react";
import { SystemUiconsReset } from "@/components/icons/SystemUiconsReset";
import { Button } from "@/components/ui/button";
import { ToggleDefault } from "@/components/ui/toggleDefault";

import { MynauiTextAlignLeft } from "../icons/MynauiTextAlignLeft";
import { MynauiTextAlignCenter } from "../icons/MynauiTextAlignCenter";

import FontShowcaseSelectWeight from "./FontShowcaseSelectWeight";
import FontShowcaseSliderSize from "./FontShowcaseSliderSize";

import { cn } from "@/lib/utils";

import { fontFeaturesLabel } from "@/data/fontShowcaseData";
import { type FontShowcaseProps } from "@/types/commonProps";

export default function FontShowcase({
  defaultEditableText,
  defaultFontSize = 0,
  defaultFontWeight = "800",
  defaultTextAlign = "center",
  defaultFontFeatures = [],
  className,
}: FontShowcaseProps) {
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);
  const [fontWeight, setFontWeight] = useState<string>(defaultFontWeight);
  const [textAlign, setTextAlign] = useState<
    "left" | "center" | "right" | "justify"
  >(defaultTextAlign);
  const [fontFeatures, setFontFeatures] =
    useState<string[]>(defaultFontFeatures);
  const fontTextRef = useRef<HTMLParagraphElement>(null);

  const addFontFeature: string =
    fontFeatures.length > 0 ? `"${fontFeatures.join(`", "`)}"` : "normal";

  useEffect(() => {
    const resizeText = () => {
      if (fontTextRef.current) {
        const parentWidth = fontTextRef.current.parentElement?.offsetWidth || 0;
        const cappedWidth = Math.min(parentWidth, 1440);
        if (cappedWidth) {
          const rawSize = Math.max(
            Math.min(
              ((cappedWidth * 0.8) / defaultEditableText.length) * 2,
              300,
            ),
            10,
          );

          const roundedSize = Math.round(rawSize / 5) * 5;
          setFontSize(roundedSize);
        }
      }
    };

    const observer = new ResizeObserver(resizeText);
    if (fontTextRef.current)
      observer.observe(fontTextRef.current.parentElement!);

    resizeText();

    return () => observer.disconnect();
  }, []);

  const resetFont = () => {
    setFontSize(defaultFontSize);
    setFontWeight(defaultFontWeight);
    setTextAlign(defaultTextAlign);
    setFontFeatures([]);
    if (fontTextRef.current)
      fontTextRef.current.textContent = defaultEditableText;
  };

  return (
    <div className="fixed-container group/showcase flex flex-col gap-y-1.5 px-4 md:px-6">
      <div className="z-10 flex h-8 flex-wrap items-center gap-1 md:h-9 md:gap-1.5">
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
            className="hidden items-center gap-x-0.5 rounded-sm border border-zinc-200 bg-white p-0.5
              group-hover/showcase:flex hover:border-zinc-300 hover:shadow-2xs"
          >
            {fontFeaturesLabel.map(({ label, value, desc }) => (
              <ToggleDefault
                className="w-full px-2.5 text-xs lowercase"
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
              </ToggleDefault>
            ))}
          </div>

          <div
            className="hidden items-center gap-x-0.5 rounded-sm border border-zinc-200 bg-white p-0.5
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
            className="hidden items-center rounded-sm border border-zinc-200 bg-white p-0.5
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

      <span
        ref={fontTextRef}
        className={cn(
          `font-tester inline-block w-full bg-white px-2 py-4 leading-none tracking-tighter
          hover:cursor-text focus:outline-none md:pt-2 md:pb-10`,
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
        }}
      >
        {defaultEditableText}
      </span>
    </div>
  );
}
