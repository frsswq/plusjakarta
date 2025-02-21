import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "../ui/button.tsx";
import { ToggleDefault } from "../ui/toggleDefault.tsx";
import { Separator } from "../ui/separator.tsx";

import { MynauiTextAlignLeft } from "../icons/MynauiTextAlignLeft.tsx";
import { MynauiTextAlignCenter } from "../icons/MynauiTextAlignCenter.tsx";
import { TablerItalic } from "../icons/TablerItalic.tsx";
import { SystemUiconsReset } from "../icons/SystemUiconsReset.tsx";

import FontShowcaseSelectWeight from "../font_showcase/FontShowcaseSelectWeight.tsx";
import FontShowcaseSliderSize from "../font_showcase/FontShowcaseSliderSize.tsx";

import { cn } from "../../lib/utils.ts";

import { fontFeaturesLabel, TRACKING_MAP } from "../../data/fontShowcaseData.tsx";
import { type FontShowcaseProps } from "../../types/commonProps.ts";

export default function FontShowcase({
  defaultEditableText,
  defaultFontSize = 50,
  defaultFontWeight = "800",
  defaultFontStyle = "normal",
  defaultTextAlign = "center",
  defaultFontFeatures = [],
  className,
}: FontShowcaseProps) {
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);
  const [fontWeight, setFontWeight] = useState<string>(defaultFontWeight);
  const [fontStyle, setFontStyle] = useState<string>(defaultFontStyle);
  const [textAlign, setTextAlign] = useState<
    "left" | "center" | "right" | "justify"
  >(defaultTextAlign);
  const [fontFeatures, setFontFeatures] =
    useState<string[]>(defaultFontFeatures);

  const containerRef = useRef<HTMLDivElement>(null);
  const fontTextRef = useRef<HTMLSpanElement>(null);

  const adjustFontSize = useCallback(
    (_entries: ResizeObserverEntry[], observer: ResizeObserver) => {
      if (containerRef.current && fontTextRef.current) {
        let containerWidth = containerRef.current.clientWidth;
        const textWidth = fontTextRef.current.scrollWidth;

        if (containerWidth <= 768) {
          containerWidth *= 0.9;
        } else {
          containerWidth *= 0.85;
        }

        const currentFontSize = parseFloat(
          globalThis.getComputedStyle(fontTextRef.current).fontSize,
        );
        const newFontSize = Math.round(
          (containerWidth / textWidth) * currentFontSize,
        );
        setFontSize(newFontSize);

        if (Math.abs(textWidth - containerWidth) <= 5) {
          observer.disconnect();
        }
      }
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    const textElement = fontTextRef.current;
    if (!container || !textElement) return;

    const observer = new ResizeObserver(adjustFontSize);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [adjustFontSize]);

  const addFontFeature: string =
    fontFeatures.length > 0 ? `"${fontFeatures.join(`", "`)}"` : "normal";

  const resetFont = () => {
    setFontSize(defaultFontSize);
    setFontWeight(defaultFontWeight);
    setTextAlign(defaultTextAlign);
    setFontFeatures([]);
    if (fontTextRef.current) {
      fontTextRef.current.textContent = defaultEditableText;
    }
  };

  return (
    <>
      <div className="fixed-container group/showcase flex flex-col gap-y-1.5 px-4 py-2 md:px-6 md:py-4">
        <div className="z-10 flex h-7.5 flex-wrap items-center md:h-9 md:gap-1.5">
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

          <div className="ml-auto flex h-7.5 items-center gap-1.5 md:h-9">
            <div
              className="flex h-7.5 items-center gap-x-0.5 rounded-xs border border-zinc-200 bg-white
                p-0.5 hover:border-zinc-300 hover:shadow-2xs md:hidden md:h-9
                md:group-hover/showcase:flex"
            >
              {fontFeaturesLabel.map(({ label, value, desc }) => (
                <ToggleDefault
                  className="h-6.5 w-full text-[10px] lowercase md:h-9 md:px-2.5 md:text-xs"
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
                title="Italic"
                pressed={fontStyle === "italic"}
                onPressedChange={() =>
                  setFontStyle((prev) =>
                    prev === "italic" ? "normal" : "italic",
                  )
                }
              >
                <TablerItalic />
              </ToggleDefault>
              <Separator orientation="vertical" className="h-6" />
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

        <div
          ref={containerRef}
          className="flex w-full items-center justify-center bg-transparent"
        >
          <span
            ref={fontTextRef}
            className={cn(
              `inline-block max-w-full bg-white px-2 py-4 leading-none hover:cursor-text
              focus:outline-none md:pt-2 md:pb-8`,
              TRACKING_MAP[fontWeight] || "tracking-[0em]",
              className,
            )}
            contentEditable="true"
            autoCorrect="false"
            autoCapitalize="false"
            spellCheck="false"
            role="textbox"
            suppressContentEditableWarning
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              fontStyle: fontStyle,
              textAlign: textAlign,
              fontFeatureSettings: addFontFeature,
              fontFamily: `"Plus Jakarta Sans", "Plus Jakarta Sans Variable", sans-serif`,
            }}
          >
            {defaultEditableText}
          </span>
        </div>
      </div>
      <hr className="h-px w-full bg-transparent text-zinc-200" />
    </>
  );
}
