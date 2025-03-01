import React from "react";

export const renderTextWithKerning = (
  text: string,
  kerningMap: Record<string, string>,
): React.ReactNode[] => {
  const keys = Object.keys(kerningMap).sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${keys.join("|")})`, "g");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (kerningMap[part]) {
      return (
        <span key={index} className={kerningMap[part]}>
          {part}
        </span>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};
