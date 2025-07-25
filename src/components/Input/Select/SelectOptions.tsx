/* eslint-disable react-hooks/exhaustive-deps */
// import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
// import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
// import { toSentenceCase } from "@/utils/misc";
import React, { useMemo, useState } from "react";
// import CheckboxFlat from "../CheckboxFlat";
// import SearchInput from "../SearchInput";
import { SelectInputType, SelectOptionType } from "./Select";

type Props = Pick<
  SelectInputType,
  | "optionsTemplate"
  | "optionVertical"
  | "multiple"
  | "options"
  | "returnObject"
  | "search"
  | "optionHeader"
  | "hideOptionCheckMark"
  | "optionContainerClass"
  | "optionItemClass"
  | "loading"
  | "emptyMessage"
  | "showSelectAll"
  | "selectAllText"
> & {
  value: string | string[];
  itemText: string;
  itemValue: string;
  onSelectValue: (option: SelectOptionType) => void;
  onSelectAll: () => void;
  modal?: boolean;
  allSelected?: boolean;
};

// Main component for rendering select options with search and optional header
export default function SelectOptions({
  itemText,
  itemValue,
  search,
  // multiple,
  value,
  onSelectValue,
  options = [],
  optionsTemplate,
  optionHeader,
  optionVertical = false,
  // hideOptionCheckMark = false,
  optionContainerClass,
  optionItemClass,
  loading,
  emptyMessage,
  showSelectAll = false,
  selectAllText = "Select all",
  allSelected,
  onSelectAll,
}: // modal,
Props) {
  // const isMobile = useMobile();
  const [searchText] = useState("");

  // Filter options based on search text
  const filteredOptions: SelectOptionType[] = useMemo(() => {
    if (!searchText?.trim()) return options;
    // Convert to lowercase for case-insensitive matching
    return options.filter((el) =>
      el[itemText]?.toLowerCase()?.includes(searchText.toLowerCase())
    );
  }, [options, searchText]);

  // Render individual options with custom template or default option item
  const isActive = (option: SelectOptionType) => {
    return Array.isArray(value)
      ? value.includes(option[itemValue])
      : value === option[itemValue];
  };

  // // Render if the search input should auto focus or not.
  // const shouldAutoFocus = useMemo(() => {
  //   if (!search) return false;
  //   else {
  //     if (modal && isMobile) return false;
  //     else if (modal && !isMobile) return false;
  //     else if (!modal && isMobile) return false;
  //     else if (!modal && !isMobile) return true;
  //   }
  // }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* Optional header content */}
      {(optionHeader || search || loading) && (
        <div className="sticky top-0 px-2">
          {optionHeader}
          {/* Display search input if `search` prop is true */}
          {/* {search && (
            <SearchInput
              id={"search-options"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-[38px]"
              autoFocus={shouldAutoFocus}
            />
          )} */}

          {showSelectAll && (
            <div
              className={cn(
                "flex justify-end items-center text-neutral-600 gap-2 text-sm w-full mt-2"
              )}
            >
              <Button
                onClick={onSelectAll}
                size="small"
                variant="ghost"
                className={cn(
                  "font-normal items-center border border-white !py-2",
                  allSelected ? "bg-primary-muted text-primary" : "bg-gray-5"
                )}
              >
                <span>{allSelected ? "Unselect all" : selectAllText}</span>
              </Button>
            </div>
          )}

          {/* {loading && <Spinner />} */}
        </div>
      )}
      {/* Display filtered options list */}
      <div
        className={cn(
          optionVertical ? "flex-wrap" : "flex-col",
          "text-sm sm:text-base flex",
          optionContainerClass
        )}
      >
        {filteredOptions.map((option, index) => (
          <div
            className={cn(
              "cursor-pointer px-4 flex text-neutral-600 font-normal items-center justify-between    hover:bg-neutral-50 ",
              isActive(option) &&
                "text-neutral-700 font-medium  bg-neutral-50 ",
              optionItemClass
            )}
            onClick={() => onSelectValue(option)}
            key={`options-${index}`}
          >
            {optionsTemplate?.(option, isActive(option)) ?? (
              <div className="cursor-pointer flex items-center justify-between gap-4 py-2 rounded-lg">
                {option[itemText]}
                {/* {toSentenceCase(option[itemText])} */}
              </div>
            )}

            {/* {multiple && !hideOptionCheckMark && (
              <CheckboxFlat checked={isActive(option)} />
            )} */}
          </div>
        ))}

        {!filteredOptions?.length && (
          <div className="text-center text-neutral-400 p-1">{emptyMessage}</div>
        )}
      </div>
    </div>
  );
}
