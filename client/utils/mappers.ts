import {
    EquipmentOptionType,
    EquipmentInterface,
} from 'containers/AquascapeDetailsEditContainer/EquipmentSectionEditContainer'

export const groupEquipmentByBrand = (equipment: EquipmentInterface[]) => {
    let brand: string
    return Object.values(
        equipment.reduce((acc, item) => {
            brand = item.brand ? item.brand.name : 'Other'
            acc[brand] = acc[brand] || {label: brand, options: []}
            acc[brand].options.push({value: item.id, label: item.model})

            return acc
        }, {} as {[key: string]: {label: string; options: EquipmentOptionType[]}})
    )
}
