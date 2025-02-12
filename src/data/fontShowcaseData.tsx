import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";

interface fontLabelValueTypes {
  label: string;
  value: string;
}

export const fontWeightsLabel: fontLabelValueTypes[] = [
  { label: "ExtraLight", value: "200" },
  { label: "Light", value: "300" },
  { label: "Regular", value: "400" },
  { label: "Medium", value: "500" },
  { label: "SemiBold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "ExtraBold", value: "800" },
];

export const fontFeaturesLabel: fontLabelValueTypes[] = [
  { label: "Lurus", value: "ss01" },
  { label: "Lancip", value: "ss02" },
  { label: "Lingkar", value: "ss03" },
];

export const textAlignIcons = [
  { Icon: TextAlignLeftIcon, value: "left" as const },
  { Icon: TextAlignCenterIcon, value: "center" as const },
  { Icon: TextAlignRightIcon, value: "right" as const },
];
