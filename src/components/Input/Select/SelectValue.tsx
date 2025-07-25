/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
// import { toSentenceCase } from "@/utils/misc";
import React, { useCallback, useMemo } from "react";
// import InputChip from "../InputChip";
import TextInput from "../TextInput";
import { SelectInputType, SelectOptionType } from "./Select";

type Props = Partial<SelectInputType> & {
  value: string | string[];
  open?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  handleSelect?: (option: SelectOptionType) => void;
};

export default function SelectValue(props: Props) {
  const {
    value,
    label,
    placeholder = "Select...",
    open,
    // multiple,
    onClick,
    options,
    itemValue,
    itemText,
    // removeable,
    // handleSelect,
    // onClose,
    valueTemplate,
    prepend,
    valueClass,
    valueInputClass,
  } = props;

  const append = (
    <span
      className={`${
        open && "-rotate-90"
      } transition-all duration-150  transform flex-shrink-0`}
    >
      <i className="pi pi-chevron-down text-sm" />
    </span>
  );

  const fOptions = useMemo(() => {
    const ALL_OPTION = {
      [itemText as string]: "All",
      [itemValue as string]: "all",
    };
    return [...(options || []), ALL_OPTION];
  }, [options, itemText, itemValue]);

  const displayValue = useCallback(
    (arg: any): { value: string; option: SelectOptionType } => {
      // Here, "arg" is the "value" prop
      const value =
        typeof arg === "object" ? arg?.[itemText as keyof typeof arg] : arg;
      const res = fOptions?.find((el) => {
        return (
          el?.[itemValue!] === arg?.[itemValue!] || el?.[itemValue!] === arg
        );
      });

      return { value: value, option: res! };
    },
    [itemValue, itemText, fOptions]
  );

  // const handleRemove = (arg: string) => {
  //   const option = fOptions?.find((el) => el[itemText!] == arg);
  //   if (option) {
  //     handleSelect?.(option);
  //     onClose?.();
  //   }
  // };

  // const computeValue = useMemo(() => {
  //   if (multiple && Array.isArray(value)) {
  //     return value?.map((el) => displayValue(el).option?.[itemText!]);
  //   }
  //   return [];
  // }, [multiple, value, displayValue, itemText]);

  return (
    <>
      {/* {multiple ? (
        <InputChip
          className={valueClass}
          inputClass={valueInputClass}
          chips={computeValue}
          readOnly
          disabled={props?.disabled}
          error={props?.error}
          hint={props?.hint}
          maxVisibleChips={props?.maxVisibleChips}
          removeable={removeable}
          onRemoveChip={handleRemove}
          label={value?.length ? label : undefined}
          placeholder={!value?.length ? placeholder || label : undefined}
          prepend={props?.prepend}
          template={(chip) =>
            valueTemplate?.(
              displayValue(chip)?.value,
              () => handleRemove(chip),
              displayValue(chip)?.option
            ) || undefined
          }
          append={append}
        />
      ) : ( */}
      <TextInput
        className={valueClass}
        prepend={
          (prepend || (valueTemplate && value)) && (
            <div>
              {prepend && prepend}
              {valueTemplate?.(
                displayValue(value as string).value,
                undefined,
                displayValue(value as string)?.option
              )}
            </div>
          )
        }
        value={
          displayValue(value as string)?.option?.[itemText!] ||
          displayValue(value as string)?.value
        }
        onClick={(e) => {
          onClick?.();
          e.stopPropagation();
        }}
        hint={props?.hint}
        readOnly
        disabled={props?.disabled}
        error={props?.error}
        label={value ? label : undefined}
        placeholder={placeholder || label}
        append={append}
        inputClass={cn(valueTemplate && value && "invisible", valueInputClass)}
      />
      {/* )} */}
    </>
  );
}
