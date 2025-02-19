interface LabelValueTypes {
  label: string;
  value: string;
  desc?: string;
}

export const fontWeightsLabel: LabelValueTypes[] = [
  { label: "ExtraLight", value: "200" },
  { label: "Light", value: "300" },
  { label: "Regular", value: "400" },
  { label: "Medium", value: "500" },
  { label: "SemiBold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "ExtraBold", value: "800" },
];

export const fontFeaturesLabel: LabelValueTypes[] = [
  { label: "Lancip", value: "ss01", desc: "Lancip alternates" },
  { label: "Lurus", value: "ss02", desc: "Lurus alternates" },
  { label: "Lingkar", value: "ss03", desc: "Lingkar alternates" },
];

export const TRACKING_MAP: Record<string, string> = {
  "200": "tracking-[-0.1em]",
  "300": "tracking-[-0.09375em]",
  "400": "tracking-[-0.0875em]",
  "500": "tracking-[-0.08125em]",
  "600": "tracking-[-0.075em]",
  "700": "tracking-[-0.06875em]",
  "800": "tracking-[-0.0625em]",
};
