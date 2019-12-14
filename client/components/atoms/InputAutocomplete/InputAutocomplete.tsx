import React, {ChangeEvent} from 'react'
import Autocomplete from 'react-autocomplete'

export interface Props<ItemType> {
    items: ItemType[]
    value: string
    onSelect(value: string, item: ItemType): void
    onChange(e: ChangeEvent<HTMLInputElement>): void
    renderItem(item: ItemType, isHighlighted: boolean): React.ReactNode
}

const InputAutocomplete = function<ItemType>({
    renderItem,
    items,
    onChange,
    onSelect,
    value,
}: Props<ItemType>) {
    return (
        <>
            <Autocomplete
                getItemValue={item => item}
                items={items}
                renderItem={renderItem}
                renderMenu={items => <div>{items}</div>}
                value={value}
                onChange={onChange}
                onSelect={onSelect}
            />
            <style jsx>{``}</style>
        </>
    )
}

export default InputAutocomplete
