import { useEffect, useRef, useState } from 'react';

import { Button } from '../ui/button.tsx';
import { Separator } from '../ui/separator.tsx';

import MynauiTextAlignCenter from '@icons/MynauiTextAlignCenter.tsx';
import MynauiTextAlignLeft from '@icons/MynauiTextAlignLeft.tsx';
import SystemUiconsReset from '@icons/SystemUiconsReset.tsx';
import TablerItalic from '@icons/TablerItalic.tsx';

import FontShowcaseSelectWeight from './FontShowcaseSelectWeight.tsx';
import FontShowcaseSliderSize from './FontShowcaseSliderSize.tsx';
import FontShowcaseToggle from './FontShowcaseToggle.tsx';

import { useIsMobile } from '@lib/isMobile.tsx';
import { cn } from '@lib/utils.ts';

import { fontFeaturesLabel, TRACKING_MAP } from '@data/fontShowcaseData.tsx';
import { type FontShowcaseProps } from '@typeDefs/commonProps';

export default function FontShowcase({
	defaultEditableText,
	defaultFontSize,
	defaultFontWeight = '800',
	defaultFontStyle = 'normal',
	defaultTextAlign = 'left',
	defaultFontFeatures = [],
	defaultWordSpacing,
	defaultTextContainerSize = { mobile: 0.97, desktop: 0.98 },
	className
}: FontShowcaseProps) {
	//@TODO = make the defaultFontSize better

	const isMobile = useIsMobile();
	const autoAdjustFontSize = defaultFontSize === undefined;

	const getResponsiveFontSize = () => {
		if (defaultFontSize !== undefined) {
			return isMobile ? defaultFontSize.mobile : defaultFontSize.desktop;
		}

		return 1;
	};

	// useReducer? maybe next time
	const [initialFontSize, setInitialFontSize] = useState(() => getResponsiveFontSize());
	const [fontSize, setFontSize] = useState<number>(initialFontSize);
	const [fontWeight, setFontWeight] = useState<string>(defaultFontWeight);
	const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>(defaultFontStyle);
	const [textAlign, setTextAlign] = useState<'left' | 'center' | 'justify'>(defaultTextAlign);
	const [fontFeatures, setFontFeatures] = useState<string[]>(defaultFontFeatures);
	const [isAdjusting, setIsAdjusting] = useState<boolean>(true);

	const containerRef = useRef<HTMLDivElement>(null);
	const fontTextRef = useRef<HTMLSpanElement>(null);
	const isDraggingRef = useRef<boolean>(false);

	useEffect(() => {
		if (defaultFontSize !== undefined) {
			const newResponsiveFontSize = getResponsiveFontSize();
			setInitialFontSize(newResponsiveFontSize);
			setFontSize(newResponsiveFontSize);
		}
	}, [isMobile, defaultFontSize, getResponsiveFontSize]);

	const adjustFontSize = () => {
		if (!containerRef.current || !fontTextRef.current || isDraggingRef.current) return;

		const containerWidth = containerRef.current.clientWidth;

		const targetContainerWidth =
			containerWidth <= 768
				? containerWidth * defaultTextContainerSize.mobile
				: containerWidth * defaultTextContainerSize.desktop;

		const textWidth = fontTextRef.current.scrollWidth;
		const currentFontSize = parseFloat(globalThis.getComputedStyle(fontTextRef.current).fontSize);

		if (Math.abs(textWidth - targetContainerWidth) < targetContainerWidth * 0.0075) {
			setTimeout(() => setIsAdjusting(false), 200);
			return;
		}

		setIsAdjusting(true);

		if (fontTextRef.current.textContent !== defaultEditableText) {
			fontTextRef.current.textContent = defaultEditableText;
		}

		const newFontSize = Math.round((targetContainerWidth / textWidth) * currentFontSize);

		if (newFontSize !== fontSize) {
			setFontSize(newFontSize);
			setInitialFontSize(newFontSize);
		}
	};

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

		window.addEventListener('resize', handleResize);
		adjustFontSize();

		return () => {
			clearTimeout(resizeTimer);
			window.removeEventListener('resize', handleResize);
		};
	}, [adjustFontSize, autoAdjustFontSize]);

	const addFontFeature: string =
		fontFeatures.length > 0 ? `"${fontFeatures.join(`", "`)}"` : 'normal';

	const resetFont = () => {
		setFontSize(initialFontSize);
		setFontWeight(defaultFontWeight);
		setTextAlign(defaultTextAlign);
		setFontFeatures(defaultFontFeatures);
		if (fontTextRef.current) {
			fontTextRef.current.textContent = defaultEditableText;
		}
	};

	const textStyle = {
		fontSize: `${fontSize}px`,
		fontWeight: fontWeight,
		fontStyle: fontStyle,
		textAlign: textAlign,
		fontFeatureSettings: addFontFeature,
		fontFamily: `"Plus Jakarta Sans", "Plus Jakarta Sans Variable", sans-serif`,
		wordSpacing: defaultWordSpacing || 'normal'
	};
	const multipleLines = /\n/.test(defaultEditableText);

	const textClasses = cn(
		`inline-block max-w-full bg-white leading-[1.1] break-words
      hover:cursor-text focus:outline-none`,
		!multipleLines ? 'pt-3 pb-4 md:pt-4 md:pb-8' : 'py-5 md:py-10',
		!multipleLines ? TRACKING_MAP[fontWeight] : 'tracking-tighter',
		!multipleLines && isAdjusting ? 'whitespace-nowrap' : 'whitespace-pre-wrap',
		isAdjusting ? 'w-fit' : 'w-full',
		className
	);

	return (
		<>
			<div className="fixed-container group/showcase flex flex-col px-6 py-2 md:px-20 md:py-4">
				<div className="z-10 flex h-7.5 flex-wrap items-center md:h-9 md:gap-1.5">
					<div title="Font Weight">
						<FontShowcaseSelectWeight value={fontWeight} onValueChange={setFontWeight} />
					</div>
					<div title="Font Size" className="hidden lg:group-hover/showcase:flex">
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
							className="flex h-7.5 items-center gap-x-0.5 rounded-xs border border-zinc-200 bg-white p-0.5
								hover:border-zinc-300 hover:shadow-2xs md:hidden md:h-9 md:rounded-sm md:group-hover/showcase:flex"
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
											prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
										)
									}
								>
									{label}
								</FontShowcaseToggle>
							))}
						</div>
						<div
							className="hidden items-center gap-x-0.5 rounded-sm border border-zinc-200 bg-white p-0.5 hover:border-zinc-300
								hover:shadow-2xs md:group-hover/showcase:flex"
						>
							<FontShowcaseToggle
								title="Italic"
								pressed={fontStyle === 'italic'}
								onPressedChange={() =>
									setFontStyle((prev) => (prev === 'italic' ? 'normal' : 'italic'))
								}
							>
								<TablerItalic />
							</FontShowcaseToggle>
							<Separator orientation="vertical" className="h-6" />
							<FontShowcaseToggle
								title="Align left"
								pressed={textAlign === 'left'}
								onPressedChange={() => setTextAlign('left')}
							>
								<MynauiTextAlignLeft />
							</FontShowcaseToggle>
							<FontShowcaseToggle
								title="Align center"
								pressed={textAlign === 'center'}
								onPressedChange={() => setTextAlign('center')}
							>
								<MynauiTextAlignCenter />
							</FontShowcaseToggle>
						</div>
						<div
							className="hidden items-center rounded-sm border border-zinc-200 bg-white p-0.5 hover:border-zinc-300
								md:group-hover/showcase:flex"
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
						'flex w-full bg-transparent',
						defaultTextAlign === 'center' ? 'justify-center' : ''
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
						style={{ ...textStyle, willChange: 'font-size, font-weight' }}
					>
						{defaultEditableText}
					</span>
				</div>
			</div>
			<hr className="h-px w-full bg-transparent text-zinc-200" />
		</>
	);
}
