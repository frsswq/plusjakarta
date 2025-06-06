import React, { type ReactNode } from 'react';

export interface LabelValueTypes {
	label: string;
	value: string;
	desc?: string;
}

export interface FontInputCheckboxProps {
	label: string;
	checked: boolean;
	value: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FontInputSelectProps {
	label: string;
	defaultValue: number | string;
	arrowIndicator?: boolean;
	handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	children: ReactNode;
}

export interface FontInputSliderProps {
	label: string | React.ReactNode;
	min: number;
	max: number;
	step: number;
	value: number;
	detail?: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FontShowcaseProps {
	defaultEditableText: string;
	defaultFontSize?: { mobile: number; desktop: number };
	defaultFontWeight?: '200' | '300' | '400' | '500' | '600' | '700' | '800';
	defaultFontStyle?: 'normal' | 'italic';
	defaultTextAlign?: 'left' | 'center' | 'justify';
	defaultFontFeatures?: string[];
	defaultWordSpacing?: string;
	defaultTextContainerSize?: { mobile: number; desktop: number };
	className?: string;
}

export interface FontShowcaseToggleProps {
	title: string;
	ariaLabel?: string;
	pressed: boolean;
	onPressedChange: (pressed: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

export interface FontShowcaseSliderSizeProps {
	value: number;
	min: number;
	max: number;
	step: number;
	onValueChange: (value: number) => void;
	onValueCommit: (value: number[]) => void;
}

export interface FontShowcaseSelectWeightProps {
	value: string;
	onValueChange: (value: string) => void;
}
