import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";

export default function G_Dropdown({
  className,
  title,
  isRequired,
  placeholder,
  isMultiselect,
  items,
  selected,
  setSelected,
  field,
  isCountry,
  isFilter,
  lazySize = 40,
}) {
  return (
    <div className={`mt-4 ${className}`}>
      <label className="text-sm lg:text-base" htmlFor={title}>
        {title}
        {isRequired && <span className="text-red-400">*</span>}
      </label>
      {isMultiselect ? (
        <MultiSelect
          virtualScrollerOptions={{ itemSize: lazySize }}
          filter={isFilter ? true : false}
          {...field}
          itemClassName="text-sm lg:text-base"
          value={selected}
          onChange={(e) => setSelected(e.value)}
          options={items}
          optionLabel="term"
          display="chip"
          itemTemplate={(value) => (
            <p className="text-white pt-0.5 font-league">
              {value?.term || placeholder}
            </p>
          )}
          placeholder={placeholder}
          maxSelectedLabels={5}
          className="md:w-14rem font-league focus:!outline-none focus:!ring-0 !text-sm flex h-10 w-full border border-glassBorder bg-transparent px-2 !text-white py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mydropdown"
        />
      ) : (
        <Dropdown
          virtualScrollerOptions={{ itemSize: lazySize }}
          aria-description=""
          valueTemplate={(value) => (
            <div className="text-white pt-0.5 font-league">
              <div className="flex items-center gap-3 flex-row ">
                {isCountry && value && (
                  <img
                    className="w-6"
                    src={`https://flagcdn.com/${value.code?.toLowerCase()}.svg`}
                  />
                )}
                {value?.name || placeholder}
              </div>
            </div>
          )}
          itemTemplate={(value) => (
            <p className="text-white pt-0.5 font-league">
              <div className="flex items-center gap-3 flex-row ">
                {isCountry && (
                  <img
                    className="w-6"
                    src={`https://flagcdn.com/${value.code?.toLowerCase()}.svg`}
                  />
                )}
                {value?.name || placeholder}
              </div>
            </p>
          )}
          filter={isFilter ? true : false}
          {...field}
          value={selected}
          panelClassName="text-sm lg:text-base"
          onChange={(e) => setSelected(e.value)}
          options={items}
          optionLabel="name"
          className="md:w-14rem font-league !text-sm flex h-10 w-full border border-glassBorder bg-transparent px-2 !text-white py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mydropdown"
          highlightOnSelect={false}
        />
      )}
    </div>
  );
}
