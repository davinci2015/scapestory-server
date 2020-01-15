import React from 'react'
import CreatableSelect from 'react-select/creatable'
import {ActionMeta, ValueType, InputActionMeta, GroupedOptionsType, OptionsType} from 'react-select'

export interface Props<OptionType> {
    options: GroupedOptionsType<OptionType> | OptionsType<OptionType>
    onChange: (newValue: ValueType<OptionType>, actionMeta: ActionMeta) => void
    onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
    onCreateOption?: (inputValue: string) => void
    filterOptions?: (option: {}, inputValue: string) => boolean
    placeholder?: React.ReactNode
}

const SelectCreatable = function<OptionType>({
    filterOptions,
    onChange,
    onCreateOption,
    options,
    placeholder,
}: Props<OptionType>) {
    return (
        <CreatableSelect
            onChange={onChange}
            options={options}
            onCreateOption={onCreateOption}
            filterOption={filterOptions}
            placeholder={placeholder}
        />
    )
}

export default SelectCreatable
