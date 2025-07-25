/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  forwardRef,
  memo,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useElementSize } from "@reactuses/core";
import SelectOptions from "./SelectOptions";
import SelectValue from "./SelectValue";

export type SelectOptionType = {
  [key: string]: any;
};

export type SelectInputType = {
  modal?: boolean;
  multiple?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  autoComplete?: string;
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  removeable?: boolean;
  name?: string;
  required?: boolean;
  valueTemplate?: (
    value: string,
    action?: () => void,
    option?: SelectOptionType
  ) => ReactNode;
  maxVisibleChips?: number;
  id?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  optionItemClass?: string;
  optionContainerClass?: string;
  options: SelectOptionType[];
  optionVertical?: boolean;
  emptyMessage?: string | ReactNode;
  itemText?: string;
  itemValue?: string;
  optionsTemplate?: (
    option: SelectOptionType,
    isActive: boolean
  ) => React.ReactNode;
  selectAllText?: string;
  showSelectAll?: boolean;
  optionHeader?: React.ReactNode;
  hideOptionCheckMark?: boolean;
  valueClass?: string;
  valueInputClass?: string;
  className?: string;
  autoHeight?: boolean;
  height?: string;
  search?: boolean;
  returnObject?: boolean;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  prependClick?: () => void;
  appendClick?: () => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const SelectInput = forwardRef<HTMLDivElement, SelectInputType>((props) => {
  const {
    options = [],
    value,
    itemText = "label",
    itemValue = "value",
    height = "max-h-[300px]",
    returnObject = false,
    multiple = false,
    autoHeight = true,
    removeable = true,
    modal = false,
    className,
    loading,
    hint,
    error,
    emptyMessage = "No available options",
    onChange,
  } = props;

  const [open, setOpen] = useState(false);

  // Reference for measuring container width to set the popover width dynamically
  const containerRef = useRef<HTMLDivElement>(null);
  const [elementWidth] = useElementSize(containerRef, { box: "border-box" });

  // Compute the display value based on whether `returnObject` is true or false
  const computeValue = useMemo(() => {
    if (value === null || value === undefined) return "";

    if (Array.isArray(value)) {
      return value.map((el) => (returnObject ? el[itemValue] : el));
    }

    return typeof value === "object" ? value[itemValue] : value;
  }, [value, itemValue, returnObject]);

  const handleSelect = (option: SelectOptionType) => {
    const returnValue = returnObject ? option : option[itemValue];

    if (multiple) {
      const fValue = Array.isArray(value) ? value : [];
      const isSelected = returnObject
        ? fValue.some((el) => el[itemValue] === option[itemValue])
        : fValue.includes(returnValue);

      const updatedValue = isSelected
        ? fValue.filter((el) =>
            returnObject
              ? el[itemValue] !== option[itemValue]
              : el !== returnValue
          )
        : [...fValue, returnValue];

      onChange?.(updatedValue);
    } else {
      onChange?.(returnValue);
      setOpen(false);
    }
  };

  const allSelected = useMemo(() => {
    if (!Array.isArray(computeValue)) return false;
    return options?.every((option) => {
      return computeValue.includes(option[itemValue]);
    });
  }, [computeValue, options, itemValue]);

  const handleSelectAll = () => {
    if (allSelected) {
      onChange?.([]);
      return;
    }

    const returnValue = returnObject
      ? options
      : options?.map((el) => el[itemValue]);
    onChange?.(returnValue);
  };

  return (
    <Popover
      modal={modal}
      open={open}
      onOpenChange={!props.disabled ? setOpen : undefined}
    >
      <PopoverTrigger asChild>
        <div ref={containerRef} className={cn("inline-block", className)}>
          <SelectValue
            handleSelect={handleSelect}
            value={computeValue}
            itemText={itemText}
            itemValue={itemValue}
            removeable={removeable}
            open={open}
            {...props}
            hint={hint}
            error={error}
            onClick={() => setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => {
          e?.preventDefault();
          e?.stopPropagation();
        }}
        onFocus={(e) => {
          e?.preventDefault();
          e?.stopPropagation();
        }}
        style={{
          width: className?.includes("w-") ? "auto" : elementWidth || "auto",
          minWidth: className?.includes("w-") ? "20px" : undefined,
          border: "1px solid #E5E7EB",
        }}
        className={cn(
          "rounded-xl !px-0 p-2 gap-0",
          (hint || error) && "-mt-4",
          autoHeight ? "max-h-[280px] overflow-y-auto" : height,
          props.optionContainerClass
        )}
      >
        <SelectOptions
          emptyMessage={loading ? null : emptyMessage}
          optionItemClass={props.optionItemClass}
          optionContainerClass={props.optionContainerClass}
          hideOptionCheckMark={props.hideOptionCheckMark}
          optionVertical={props?.optionVertical}
          search={props?.search}
          multiple={multiple}
          loading={loading}
          value={computeValue}
          itemText={itemText}
          itemValue={itemValue}
          onSelectValue={handleSelect}
          onSelectAll={handleSelectAll}
          allSelected={allSelected}
          options={options}
          optionHeader={props?.optionHeader}
          optionsTemplate={props?.optionsTemplate}
          selectAllText={props?.selectAllText}
          showSelectAll={props?.showSelectAll && options?.length > 1}
          modal={modal}
        />
      </PopoverContent>
    </Popover>
  );
});

SelectInput.displayName = "Select";
export default memo(SelectInput);
