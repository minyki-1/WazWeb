import { IColor } from "../types/design";

function colorToHex(color: number) {
  var hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

export function rgbToHex({ r, g, b }: IColor) {
  return ("#" + colorToHex(r) + colorToHex(g) + colorToHex(b)).toUpperCase();
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