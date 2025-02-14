import React, { type ReactNode } from "react";

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
  defaultEditableText?: string;
  defaultFontSize?: number;
  defaultFontWeight?: number;
  defaultTextJustify?: "left" | "center" | "right" | "justify";
}
