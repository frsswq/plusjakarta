import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "../ui/button.tsx";
import { Separator } from "../ui/separator.tsx";

import { MynauiTextAlignLeft } from "../icons/MynauiTextAlignLeft.tsx";
import { MynauiTextAlignCenter } from "../icons/MynauiTextAlignCenter.tsx";
import { TablerItalic } from "../icons/TablerItalic.tsx";
import { SystemUiconsReset } from "../icons/SystemUiconsReset.tsx";

import FontShowcaseSelectWeight from "./FontShowcaseSelectWeight.tsx";
import FontShowcaseSliderSize from "./FontShowcaseSliderSize.tsx";
import { FontShowcaseToggle } from "./FontShowcaseToggle.tsx";

import { cn } from "../../lib/utils.ts";

import {
  fontFeaturesLabel,
  TRACKING_MAP,
} from "../../data/fontShowcaseData.tsx";
import { type FontShowcaseProps } from "../../types/commonProps.ts";

export default function FontShowcase({
  defaultEditableText,
  defaultFontSize,
  defaultFontWeight = "800",
  defaultFontStyle = "normal",
  defaultTextAlign = "left",
  defaultFontFeatures = [],
  className,
}: FontShowcaseProps) {
  const autoAdjustFontSize = defaultFontSize === undefined;

  const [initialFontSize, setInitialFontSize] = useState(defaultFontSize ?? 50);
  const [fontSize, setFontSize] = useState<number>(initialFontSize);
  const [fontWeight, setFontWeight] = useState<string>(defaultFontWeight);
  const [fontStyle, setFontStyle] = useState<string>(defaultFontStyle);
  const [textAlign, setTextAlign] = useState<
    "left" | "center" | "right" | "justify"
  >(defaultTextAlign);
  const [fontFeatures, setFontFeatures] =
    useState<string[]>(defaultFontFeatures);

  const containerRef = useRef<HTMLDivElement>(null);
  const fontTextRef = useRef<HTMLSpanElement>(null);
  const lastContainerWidthRef = useRef<number>(0);

  const adjustFontSize = useCallback((entries: ResizeObserverEntry[]) => {
    if (containerRef.current && fontTextRef.current) {
      const newContainerWidth = entries[0].contentRect.width;
      if (Math.abs(newContainerWidth - lastContainerWidthRef.current) < 2)
        return;

      lastContainerWidthRef.current = newContainerWidth;

      let containerWidth = newContainerWidth;
      containerWidth *= containerWidth <= 768 ? 0.9 : 0.95;

      const textWidth = fontTextRef.current.scrollWidth;
      const currentFontSize = parseInt(
        globalThis.getComputedStyle(fontTextRef.current).fontSize,
      );
      const newFontSize =
        Math.round(((containerWidth / textWidth) * currentFontSize) / 2) * 2;
      setFontSize(newFontSize);
      setInitialFontSize(newFontSize);
    }
  }, []);

  useEffect(() => {
    if (!autoAdjustFontSize || !containerRef.current) return;

    const observer = new ResizeObserver(adjustFontSize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [adjustFontSize, autoAdjustFontSize]);

  const addFontFeature: string =
    fontFeatures.length > 0 ? `"${fontFeatures.join(`", "`)}"` : "normal";

  const resetFont = () => {
    setFontSize(initialFontSize);
    setFontWeight(defaultFontWeight);
    setTextAlign(defaultTextAlign);
    setFontFeatures([]);
    if (fontTextRef.current) {
      fontTextRef.current.textContent = defaultEditableText;
    }
  };

  return (
    <>
      <div className="fixed-container group/showcase flex flex-col gap-y-0 px-4 py-2 md:px-6 md:py-4">
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
                p-0.5 hover:border-zinc-300 hover:shadow-2xs md:hidden md:h-9 md:rounded-sm
                md:group-hover/showcase:flex"
            >
              {fontFeaturesLabel.map(({ label, value, desc }) => (
                <FontShowcaseToggle
                  className="h-6.5 w-full px-2.5 text-[10px] lowercase md:h-8 md:text-xs"
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
                </FontShowcaseToggle>
              ))}
            </div>

            <div
              className="hidden items-center gap-x-0.5 rounded-sm border border-zinc-200 bg-white p-0.5
                group-hover/showcase:flex hover:border-zinc-300 hover:shadow-2xs"
            >
              <FontShowcaseToggle
                title="Italic"
                pressed={fontStyle === "italic"}
                onPressedChange={() =>
                  setFontStyle((prev) =>
                    prev === "italic" ? "normal" : "italic",
                  )
                }
              >
                <TablerItalic />
              </FontShowcaseToggle>
              <Separator orientation="vertical" className="h-6" />
              <FontShowcaseToggle
                title="Align left"
                pressed={textAlign === "left"}
                onPressedChange={() => setTextAlign("left")}
              >
                <MynauiTextAlignLeft />
              </FontShowcaseToggle>
              <FontShowcaseToggle
                title="Align center"
                pressed={textAlign === "center"}
                onPressedChange={() => setTextAlign("center")}
              >
                <MynauiTextAlignCenter />
              </FontShowcaseToggle>
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
          className="justify-left flex w-full items-start bg-transparent"
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
