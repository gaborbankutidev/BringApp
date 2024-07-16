import React, { useState } from "react";
import type { FC } from "react";
import { Button, Icon } from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type { Obj } from "../../types";
import type { ControlByPath, ControlByValue, ControlType } from "../types";
import { useControlContext } from "../context";
import { RangeControl } from "..";
import { isPathControl } from "../utils";
import { objectKeys } from "../../utils";
import { screenSizes } from "../../styles/utils";
import type { ResponsiveLabels } from "../../styles/types";
import { ResponsiveValue } from "../../client-types";

/**
 * Props for the ResponsiveRangeControl component.
 */
type _NumberControl = { min?: number; max?: number };

/**
 * A control component that renders a responsive range control.
 *
 * @template pT - The type of the attributes object.
 *
 * @param props - The props for the ResponsiveRangeControl component.
 * @returns The rendered ResponsiveRangeControl component.
 */
export const ResponsiveRangeControl = <pT extends Obj = {}>(
  props: ControlType<ResponsiveValue, pT> & _NumberControl,
) =>
  isPathControl(props) ? (
    <ResponsiveRangeControlByPath {...props} />
  ) : (
    <ResponsiveRangeControlByValue {...props} />
  );

/**
 * A control component that renders a responsive range control based on a path.
 *
 * @template pT - The type of the attributes object.
 *
 * @param path - The path to the value in the attributes object.
 * @param updateHandling - The update handling strategy.
 * @returns The rendered ResponsiveRangeControlByPath component.
 */
function ResponsiveRangeControlByPath<pT extends Obj>({
  path,
  updateHandling,
  ...props
}: ControlByPath<pT, ResponsiveValue> & _NumberControl) {
  const { attributes, setAttributes } = useControlContext();
  const value = get(attributes, path);

  return (
    <ResponsiveRangeControlByValue
      updateHandling="by-value"
      value={value}
      setValue={(newValue) => {
        const newAttributes = cloneDeep(attributes);
        set(newAttributes, path, newValue);
        setAttributes(newAttributes);
      }}
      {...props}
    />
  );
}

/**
 * A control component that renders a responsive range control based on a value.
 *
 * @param label - The label for the range input.
 * @param value - The value of the range input.
 * @param setValue - The function to set the value of the range input.
 * @param show - Whether to show the range input.
 * @param updateHandling - The update handling strategy.
 * @param defaultValue - The default value for the range input.
 * @param props - The rest of the props for the ResponsiveRangeControlByValue component.
 * @returns The rendered ResponsiveRangeControlByValue component.
 */
const ResponsiveRangeControlByValue: FC<ControlByValue<ResponsiveValue>> = ({
  label,
  value = {},
  setValue,
  show = true,
  updateHandling,
  defaultValue,
  ...props
}) => {
  const [selectedSize, setSelectedSize] = useState<keyof ResponsiveLabels>("");

  return show ? (
    <>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        {objectKeys(screenSizes).map((screenSize) => (
          <Button
            variant={selectedSize === screenSize ? "primary" : "secondary"}
            icon={<Icon icon={screenSizes[screenSize].icon} />}
            onClick={() => setSelectedSize(screenSize)}
            isSmall={true}
            className="responsive-screen-select-button"
          >
            {value[screenSize] !== undefined ? value[screenSize] : "-"}
          </Button>
        ))}
      </div>

      <RangeControl
        updateHandling="by-value"
        label={`${label} - ${screenSizes[selectedSize].label}`}
        value={value ? value[selectedSize] : 0}
        setValue={(newValue) => {
          const newObject = { ...value };
          newObject[selectedSize] = newValue;
          setValue(newObject);
        }}
        defaultValue={defaultValue ? (defaultValue[selectedSize] ?? 0) : 0}
        {...props}
      />
    </>
  ) : null;
};
