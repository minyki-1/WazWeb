import { IColor } from "../types/design";

function colorToHex(color: number) {
  var hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

export function rgbToHex(color: IColor | string) {
  if (typeof color === "string") {
    const regex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
    const matches = color.match(regex);
    if (matches) {
      const r = parseInt(matches[1], 10).toString(16).padStart(2, '0');
      const g = parseInt(matches[2], 10).toString(16).padStart(2, '0');
      const b = parseInt(matches[3], 10).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`.toUpperCase();
    }
  } else {
    const { r, g, b } = color
    return ("#" + colorToHex(r) + colorToHex(g) + colorToHex(b)).toUpperCase();
  }

  return "#FFFFFF"
}

export function rgbToRgbStr(color: IColor) {
  const { r, g, b, a } = color
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}


export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (r, g, b) => (r + r + g + g + b + b));
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}