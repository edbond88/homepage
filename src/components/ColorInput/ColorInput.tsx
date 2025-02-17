import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { useThrottled } from "@/hooks";
import { iconColorAtom, isDarkThemeSelector } from "@/state";

import "./ColorInput.css";

type ColorInputProps = {};

const ColorInput = (_: ColorInputProps) => {
  const [color, setColor] = useRecoilState(iconColorAtom);
  const isDark = useRecoilValue(isDarkThemeSelector);

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value: color },
      } = event;
      if (color[0] === "#") setColor(color);
    },
    [setColor]
  );

  const throttledColorChange = useThrottled(handleColorChange, 100, [
    handleColorChange,
  ]);

  return (
    <div className="color-picker">
      <input
        className="color-input"
        aria-label="Icon Color"
        style={{ backgroundColor: color }}
        type="color"
        onChange={throttledColorChange}
        value={color}
      />
      <span style={{ color: isDark ? "black" : "white" }}>{color}</span>
    </div>
  );
};

export default ColorInput;
