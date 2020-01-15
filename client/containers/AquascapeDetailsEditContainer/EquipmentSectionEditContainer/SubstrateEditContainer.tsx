import React from 'react'
import {ValueType, ActionMeta} from 'react-select'
import {useQuery} from 'react-apollo'

import {ListItem} from 'components/molecules'
import {Substrate} from 'graphql/generated/types'
import {SubstratesCard} from 'components/sections/AquascapeDetails/EquipmentSection/Cards'
import {SelectCreatable, FormattedMessage} from 'components/atoms'
import {SubstratesQuery} from 'graphql/generated/queries'
import {groupEquipmentByBrand} from 'utils/mappers'
import {EquipmentOptionType} from '.'
import {SUBSTRATES} from './queries'

interface Props {
    substrates: Pick<Substrate, 'id' | 'brand' | 'model'>[]
    onSubstrateSelect(newValue: ValueType<EquipmentOptionType>, actionMeta: ActionMeta): void
    onSubstrateCreate(inputValue: string): void
    onSubstrateDelete(substrateId: number): void
}

const SubstrateEditContainer: React.FunctionComponent<Props> = ({
    substrates = [],
    onSubstrateSelect,
    onSubstrateCreate,
    onSubstrateDelete,
}) => {
    const {data: allSubstrates} = useQuery<SubstratesQuery>(SUBSTRATES)

    return (
        <SubstratesCard>
            {substrates.map(substrate => (
                <ListItem key={substrate.id} onDelete={() => onSubstrateDelete(substrate.id)}>
                    {substrate.brand?.name} {substrate.model}
                </ListItem>
            ))}
            {allSubstrates && allSubstrates.substrates && (
                <SelectCreatable
                    placeholder={
                        <FormattedMessage
                            id="substrate.select_substrate_placeholder"
                            defaultMessage="Select substrate..."
                        />
                    }
                    onChange={onSubstrateSelect}
                    onCreateOption={onSubstrateCreate}
                    options={groupEquipmentByBrand(
                        allSubstrates.substrates.filter(x => !substrates.some(y => y.id === x.id))
                    )}
                />
            )}
        </SubstratesCard>
    )
}

export default SubstrateEditContainer
