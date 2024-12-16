'use client'
import Select from "react-select"
import useCountries from "../hooks/useCountries"

export type CountrySelectValue = {
    label: string
    flag: string
    latlng: number[]
    region: string
    value: string

}

interface CountrySelectProps {
   value?: CountrySelectValue
   onChange: (value: CountrySelectValue | null) => void
}
export default function CountrySelect({
    value,
    onChange,
  }: CountrySelectProps
) {
    const {getAll} = useCountries();
  return (
    <div className="">
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        onChange={(value) => onChange(value as CountrySelectValue)}
        value={value}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div className="">
              {option.flag},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => `p-3 border-2`,
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius:6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6"
          }
        })}
      />
    </div>
  );
}
