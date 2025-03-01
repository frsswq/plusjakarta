import { useCallback, useEffect, useRef, useState, useMemo } from "react";

import { Button } from "../ui/button.tsx";
import { Separator } from "../ui/separator.tsx";

import MynauiTextAlignLeft from "../icons/MynauiTextAlignLeft.tsx";
import MynauiTextAlignCenter from "../icons/MynauiTextAlignCenter.tsx";
import TablerItalic from "../icons/TablerItalic.tsx";
import SystemUiconsReset from "../icons/SystemUiconsReset.tsx";

import FontShowcaseSelectWeight from "./FontShowcaseSelectWeight.tsx";
import FontShowcaseSliderSize from "./FontShowcaseSliderSize.tsx";
import FontShowcaseToggle from "./FontShowcaseToggle.tsx";

import { cn } from "@/lib/utils.ts";
import { renderTextWithKerning } from "./FontShowcaseKerningFix.tsx";

import { fontFeaturesLabel, TRACKING_MAP } from "@/data/fontShowcaseData.tsx";
import { type FontShowcaseProps } from "@/types/commonProps.ts";

export default function FontShowcase({
  defaultEditableText,
  defaultFontSize,
  defaultFontWeight = "800",
  defaultFontStyle = "normal",
  defaultTextAlign = "left",
  defaultFontFeatures = [],
  defaultWordSpacing,
  defaultTextContainerSize = [0.99, 0.99],
  enableCustomKerning = false,
  className,
}: FontShowcaseProps) {
  const autoAdjustFontSize = defaultFontSize === undefined;

  // useReducer? maybe next time
  const [initialFontSize, setInitialFontSize] = useState(
    () => defaultFontSize ?? 1,
  );
  const [fontSize, setFontSize] = useState<number>(initialFontSize);
  const [fontWeight, setFontWeight] = useState<string>(defaultFontWeight);
  const [fontStyle, setFontStyle] = useState<"normal" | "italic">(
    defaultFontStyle,
  );
  const [textAlign, setTextAlign] = useState<"left" | "center">(
    defaultTextAlign,
  );
  const [fontFeatures, setFontFeatures] =
    useState<string[]>(defaultFontFeatures);
  const [isAdjusting, setIsAdjusting] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const fontTextRef = useRef<HTMLSpanElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const adjustFontSize = useCallback(() => {
    if (!containerRef.current || !fontTextRef.current || isDraggingRef.current)
      return;

    const containerWidth = containerRef.current.clientWidth;

    const targetContainerWidth =
      containerWidth <= 768
        ? containerWidth * defaultTextContainerSize[0]
        : containerWidth * defaultTextContainerSize[1];

    const textWidth = fontTextRef.current.scrollWidth;
    const currentFontSize = parseFloat(
      globalThis.getComputedStyle(fontTextRef.current).fontSize,
    );

    if (
      Math.abs(textWidth - targetContainerWidth) <
      targetContainerWidth * 0.01
    ) {
      setTimeout(() => setIsAdjusting(false), 100);
      return;
    }

    setIsAdjusting(true);

    if (fontTextRef.current.textContent !== defaultEditableText) {
      fontTextRef.current.textContent = defaultEditableText;
    }

    const newFontSize = Math.round(
      (targetContainerWidth / textWidth) * currentFontSize,
    );

    if (newFontSize !== fontSize) {
      setFontSize(newFontSize);
      setInitialFontSize(newFontSize);
    }
  }, [
    defaultEditableText,
    defaultTextContainerSize,
    autoAdjustFontSize,
    fontSize,
  ]);

  useEffect(() => {
    if (!autoAdjustFontSize || !containerRef.current) return;

    let resizeTimer: NodeJS.Timeout;
    const previousWidth = { current: window.innerWidth };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const currentWidth = window.innerWidth;
        if (currentWidth !== previousWidth.current) {
          previousWidth.current = currentWidth;
          adjustFontSize();
        }
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    adjustFontSize();

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
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

  const textStyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textAlign: textAlign,
      fontFeatureSettings: addFontFeature,
      fontFamily: `"Plus Jakarta Sans", "Plus Jakarta Sans Variable", sans-serif`,
      wordSpacing: defaultWordSpacing || "normal",
    }),
    [
      fontSize,
      fontWeight,
      fontStyle,
      textAlign,
      addFontFeature,
      defaultWordSpacing,
    ],
  );

  const multipleLines = /\n/.test(defaultEditableText);

  const textClasses = useMemo(
    () =>
      cn(
        `inline-block max-w-full bg-white px-2 leading-[1.1] break-all
    hover:cursor-text focus:outline-none py-4 md:pt-4 md:pb-2`,
        !multipleLines ? "md:pt-0 md:pb-8" : "",
        !multipleLines ? TRACKING_MAP[fontWeight] : "tracking-tighter",
        !multipleLines && isAdjusting
          ? "whitespace-nowrap"
          : "whitespace-pre-wrap",
        isAdjusting ? "w-fit" : "w-full",
        className,
      ),
    [fontWeight, isAdjusting, className, multipleLines],
  );

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
              onValueChange={(value: number) => {
                isDraggingRef.current = true;
                setFontSize(value);
              }}
              onValueCommit={() => {
                setTimeout(() => {
                  isDraggingRef.current = false;
                }, 200);
              }}
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
                  onPressedChange={() =>
                    setFontFeatures((prev) =>
                      prev.includes(value)
                        ? prev.filter((f) => f !== value)
                        : [...prev, value],
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
          className={cn(
            "flex w-full bg-transparent",
            defaultTextAlign === "center" ? "justify-center" : "",
          )}
        >
          <span
            ref={fontTextRef}
            className={textClasses}
            contentEditable="true"
            autoCorrect="false"
            autoCapitalize="false"
            spellCheck="false"
            role="textbox"
            aria-live="polite"
            aria-label={`Font tester text: ${defaultEditableText}`}
            suppressContentEditableWarning
            style={{ ...textStyle, willChange: "font-size, font-weight" }}
          >
            {enableCustomKerning
              ? renderTextWithKerning(defaultEditableText)
              : defaultEditableText}
          </span>
        </div>
      </div>
      <hr className="h-px w-full bg-transparent text-zinc-200" />
    </>
  );
}
