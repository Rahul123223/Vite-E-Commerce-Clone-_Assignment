import React from "react"
import clsx from "clsx"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

type RadioGroupItemProps = {
  label: React.ReactNode
  subLabel?: string
  description?: string | JSX.Element
  prefixIcon?: React.ReactNode
  prefixIconClassName?: string
  isHidden?: boolean
} & RadioGroupPrimitive.RadioGroupItemProps &
  React.RefAttributes<HTMLButtonElement>

type RadioGroupSimpleItemProps = {
  label?: string
  description?: string
} & RadioGroupPrimitive.RadioGroupItemProps &
  React.RefAttributes<HTMLButtonElement>

type DotProps = RadioGroupPrimitive.RadioGroupItemProps &
  React.RefAttributes<HTMLButtonElement>

const Root = RadioGroupPrimitive.Root

const Item = ({
  label,
  subLabel,
  description,
  className,
  disabled,
  prefixIcon,
  children,
  prefixIconClassName,
  isHidden = false,
  ...rest
}: RadioGroupItemProps) => {
  return (
    <label
      className={clsx(
        "relative flex items-center mt-4 small:mt-0 w-full small:w-fit rounded-lg border justify-between border-grey-150 px-2 small:px-5 py-3 gap-3 cursor-pointer",
        { "bg-grey-5 text-grey-40 pointer-events-none": disabled },
        className
      )}
    >
      <div className="truncate">
        <div className="flex items-center">
          {prefixIcon && (
            <span className={prefixIconClassName}>{prefixIcon}</span>
          )}

          <p
            className={`inter-base-semibold truncate ${
              disabled ? "text-grey-40" : "text-grey-130"
            }`}
          >
            {label}{" "}
            {subLabel && (
              <span className="inter-base-regular text-grey-50">
                {subLabel}
              </span>
            )}
          </p>
        </div>
        {description && (
          <p
            className={clsx(
              "text-[13px] font-medium text-black-60 truncate mt-[-3px]",
              {
                "text-grey-40": disabled,
              }
            )}
          >
            {description}
          </p>
        )}
        {children}
      </div>

      <RadioGroupPrimitive.Item
        {...rest}
        id={rest.value}
        disabled={disabled}
        className={clsx(
          "radio-outer-ring outline-0 shadow-grey-20 rounded-circle h-[14px] w-[14px] shrink-0 shadow-[0_0_0_1px]"
        )}
      >
        <RadioGroupPrimitive.Indicator
          className={clsx(
            "indicator-new relative flex h-[14px] w-[14px] items-center justify-center after:bg-grey-130 after:rounded-circle after:absolute after:inset-0 after:m-auto after:block after:h-[8px] after:w-[8px]"
          )}
        />
        <RadioGroupPrimitive.Indicator
          aria-hidden="true"
          className={clsx(
            `${isHidden ? "hidden" : ""} shadow-grey-130 h-full w-full  rounded-rounded absolute inset-0 shadow-[0_0_0_2px]`
          )}
        />
      </RadioGroupPrimitive.Item>
    </label>
  )
}

const SimpleItem: React.FC<RadioGroupSimpleItemProps> = ({
  label,
  description,
  className,
  ...rest
}) => {
  return (
    <label
      className={clsx(
        "mr-large flex items-center last:mr-0",
        {
          ["pointer-events-none select-none opacity-50"]: rest.disabled,
        },
        className
      )}
      htmlFor={rest.value}
    >
      <RadioGroupPrimitive.Item
        {...rest}
        id={rest.value}
        className={clsx(
          "radio-outer-ring outline-0 border-[#1D1D1F]",
          "rounded-circle h-[20px] w-[20px] shrink-0 shadow-[0_0_0_1px] shadow-[#D1D5DB]"
        )}
      >
        <RadioGroupPrimitive.Indicator
          className={clsx(
            "indicator relative flex h-full w-full items-center justify-center",
            "after:bg-grey-130 after:rounded-circle after:absolute after:inset-0 after:m-auto after:block after:h-[12px] after:w-[12px]"
          )}
        />
      </RadioGroupPrimitive.Item>
      <div className="ml-small inter-base-regular w-full cursor-pointer">
        <span>{label}</span>
        <span>{description}</span>
      </div>
    </label>
  )
}

const Dot: React.FC<DotProps> = ({ className, ...rest }) => {
  return (
    <label
      className={clsx(
        {
          ["pointer-events-none select-none opacity-50"]: rest.disabled,
        },
        className
      )}
      htmlFor={rest.value}
    >
      <RadioGroupPrimitive.Item
        {...rest}
        id={rest.value}
        className={clsx(
          "radio-outer-ring outline-0",
          "rounded-circle h-[20px] w-[20px] shrink-0 shadow-[0_0_0_1px] shadow-[#D1D5DB]"
        )}
      >
        <RadioGroupPrimitive.Indicator
          className={clsx(
            "indicator relative flex h-full w-full items-center justify-center",
            "after:bg-grey-130 after:rounded-circle after:absolute after:inset-0 after:m-auto after:block after:h-[12px] after:w-[12px]"
          )}
        />
      </RadioGroupPrimitive.Item>
    </label>
  )
}

export default { Root, Item, SimpleItem, Dot }
