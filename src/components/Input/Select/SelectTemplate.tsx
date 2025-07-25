/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import React from "react";
import { SelectOptionType } from "./Select";

export function OptionTemplateService(
  formatCurrency: (arg: number) => string
): (
  option: SelectOptionType & { name: string; price: number },
  isActive: boolean
) => React.ReactNode {
  const template = (
    option: SelectOptionType & { name: string; price: number },
    isActive: boolean
  ) => (
    <span
      role="button"
      className={cn(
        "flex flex-col gap-y-4 hover:bg-gray-50 min-w-[320px] cursor-pointer",
        isActive && "bg-gray-50 rounded-xl"
      )}
    >
      <div className="p-2 flex flex-col">
        <span className="mb-px">{option.name}</span>
        <span className="text-xs text-gray-3">
          {formatCurrency(
            option.priceToRenderService ||
              option?.prices?.reduce((sum: number, p: any) => sum + +p.price, 0)
          )}
        </span>
      </div>
    </span>
  );

  template.displayName = "OptionTemplateService";
  return template;
}
