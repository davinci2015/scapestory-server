import React, {ChangeEvent} from 'react'
import Autocomplete from 'react-autocomplete'

export interface Props<ItemType> {
    items: ItemType[]
    value: string
    onSelect(value: string, item: ItemType): void
    onChange(e: ChangeEvent<HTMLInputElement>): void
    getItemValue(item: ItemType): string
    renderItem(item: ItemType, isHighlighted: boolean): React.ReactNode
    shouldItemRender?: (item: ItemType, value: string) => boolean
}

const InputAutocomplete = function<ItemType>({
    renderItem,
    items,
    onChange,
    getItemValue,
    onSelect,
    value,
    shouldItemRender,
}: Props<ItemType>) {
    return (
        <>
            <Autocomplete
                getItemValue={getItemValue}
                items={items}
                renderItem={renderItem}
                value={value}
                onChange={onChange}
                onSelect={onSelect}
                shouldItemRender={shouldItemRender}
            />
            <style jsx>{``}</style>
        </>
    )
}

export default InputAutocomplete
