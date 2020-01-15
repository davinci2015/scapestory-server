import React from 'react'
import CreatableSelect from 'react-select/creatable'
import {ActionMeta, ValueType, InputActionMeta} from 'react-select'

export interface Props<OptionType> {
    options: OptionType[]
    onChange: (newValue: ValueType<OptionType>, actionMeta: ActionMeta) => void
    onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
    onCreateOption?: (inputValue: string) => void
}

const SelectCreatable = function<OptionType>({
    onChange,
    onCreateOption,
    options,
}: Props<OptionType>) {
    return <CreatableSelect onChange={onChange} options={options} onCreateOption={onCreateOption} />
}

export default SelectCreatable
