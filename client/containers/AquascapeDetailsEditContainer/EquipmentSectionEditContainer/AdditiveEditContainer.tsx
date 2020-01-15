import React from 'react'
import {ValueType, ActionMeta} from 'react-select'
import {useQuery} from 'react-apollo'

import {ListItem} from 'components/molecules'
import {Additive} from 'graphql/generated/types'
import {AdditivesCard} from 'components/sections/AquascapeDetails/EquipmentSection/Cards'
import {SelectCreatable, FormattedMessage} from 'components/atoms'
import {AdditivesQuery} from 'graphql/generated/queries'
import {groupEquipmentByBrand} from 'utils/mappers'
import {EquipmentOptionType} from '.'
import {ADDITIVES} from './queries'

interface Props {
    additives: Pick<Additive, 'id' | 'brand' | 'model'>[]
    onAdditiveSelect(newValue: ValueType<EquipmentOptionType>, actionMeta: ActionMeta): void
    onAdditiveCreate(inputValue: string): void
    onAdditiveDelete(additiveId: number): void
}

const AdditiveEditContainer: React.FunctionComponent<Props> = ({
    additives = [],
    onAdditiveSelect,
    onAdditiveCreate,
    onAdditiveDelete,
}) => {
    const {data: allAdditives} = useQuery<AdditivesQuery>(ADDITIVES)

    return (
        <AdditivesCard>
            {additives.map(additive => (
                <ListItem key={additive.id} onDelete={() => onAdditiveDelete(additive.id)}>
                    {additive.brand?.name} {additive.model}
                </ListItem>
            ))}
            {allAdditives && allAdditives.additives && (
                <SelectCreatable
                    placeholder={
                        <FormattedMessage
                            id="additive.select_additive_placeholder"
                            defaultMessage="Select additive..."
                        />
                    }
                    onChange={onAdditiveSelect}
                    onCreateOption={onAdditiveCreate}
                    options={groupEquipmentByBrand(allAdditives.additives)}
                />
            )}
        </AdditivesCard>
    )
}

export default AdditiveEditContainer
