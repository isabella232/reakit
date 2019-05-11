import * as React from "react";
import { BoxOptions, BoxHTMLProps, useBox } from "../Box/Box";
import { unstable_createComponent } from "../utils/createComponent";
import { mergeProps } from "../utils/mergeProps";
import { unstable_useCreateElement } from "../utils/useCreateElement";
import { warning } from "../__utils/warning";
import { unstable_createHook } from "../utils/createHook";
import { useRadioState } from "./RadioState";

export type RadioGroupOptions = BoxOptions;

export type RadioGroupHTMLProps = BoxHTMLProps &
  React.FieldsetHTMLAttributes<any>;

export type RadioGroupProps = RadioGroupOptions & RadioGroupHTMLProps;

const useRadioGroup = unstable_createHook<
  RadioGroupOptions,
  RadioGroupHTMLProps
>({
  name: "RadioGroup",
  compose: useBox,
  useState: useRadioState,

  useProps(_, htmlProps) {
    return mergeProps({ role: "radiogroup" } as RadioGroupHTMLProps, htmlProps);
  }
});

export const RadioGroup = unstable_createComponent({
  as: "fieldset",
  useHook: useRadioGroup,
  useCreateElement: (type, props, children) => {
    warning(
      !props["aria-label"] && !props["aria-labelledby"],
      `You should provide either \`aria-label\` or \`aria-labelledby\` props.
See https://www.w3.org/TR/wai-aria-practices-1.1/#wai-aria-roles-states-and-properties-15`,
      "RadioGroup"
    );
    return unstable_useCreateElement(type, props, children);
  }
});
