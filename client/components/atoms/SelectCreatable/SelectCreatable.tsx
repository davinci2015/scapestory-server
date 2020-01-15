import React, {CSSProperties} from 'react'
import CreatableSelect from 'react-select/creatable'
import {
    ActionMeta,
    ValueType,
    InputActionMeta,
    GroupedOptionsType,
    OptionsType,
    Theme,
} from 'react-select'

import {colors} from 'styles'

export interface Props<OptionType> {
    options: GroupedOptionsType<OptionType> | OptionsType<OptionType>
    onChange: (newValue: ValueType<OptionType>, actionMeta: ActionMeta) => void
    onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
    onCreateOption?: (inputValue: string) => void
    filterOptions?: (option: {}, inputValue: string) => boolean
    placeholder?: React.ReactNode
}

const styles = {
    option: (styles: CSSProperties, {isFocused}: any) => ({
        ...styles,
        backgroundColor: isFocused ? colors.PRIMARY_LIGHT : colors.WHITE,
    }),
}
const theme = (theme: Theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: colors.PRIMARY_LIGHT,
        primary: colors.PRIMARY,
        danger: colors.ERROR,
        neutral0: colors.WHITE,
        neutral10: colors.SHADE_EXTRA_LIGHT,
        neutral50: colors.MID_GRAY,
        neutral90: colors.DARK_GRAY,
    },
})

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
            styles={styles}
            theme={theme}
        />
    )
}

export default SelectCreatable
