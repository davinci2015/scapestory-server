import React from 'react'
import {ValueType, ActionMeta} from 'react-select'
import {useQuery} from 'react-apollo'

import {ListItem} from 'components/molecules'
import {Light} from 'graphql/generated/types'
import {LightsCard} from 'components/sections/AquascapeDetails/EquipmentSection/Cards'
import {SelectCreatable, FormattedMessage} from 'components/atoms'
import {LightsQuery} from 'graphql/generated/queries'
import {groupEquipmentByBrand} from 'utils/mappers'
import {EquipmentOptionType} from '../EquipmentSectionEditContainer'
import {LIGHTS} from './queries'

interface Props {
    lights: Pick<Light, 'id' | 'brand' | 'model'>[]
    onLightSelect(newValue: ValueType<EquipmentOptionType>, actionMeta: ActionMeta): void
    onLightCreate(inputValue: string): void
    onLightDelete(lightId: number): void
}

const LightEditContainer: React.FunctionComponent<Props> = ({
    lights = [],
    onLightSelect,
    onLightCreate,
    onLightDelete,
}) => {
    const {data: allLights} = useQuery<LightsQuery>(LIGHTS)

    return (
        <LightsCard>
            {lights.map(light => (
                <ListItem key={light.id} onDelete={() => onLightDelete(light.id)}>
                    {light.brand?.name} {light.model}
                </ListItem>
            ))}
            {allLights && allLights.lights && (
                <SelectCreatable
                    placeholder={
                        <FormattedMessage
                            id="light.select_light_placeholder"
                            defaultMessage="Select light..."
                        />
                    }
                    onChange={onLightSelect}
                    onCreateOption={onLightCreate}
                    options={groupEquipmentByBrand(
                        allLights.lights.filter(x => !lights.some(y => y.id === x.id))
                    )}
                />
            )}
        </LightsCard>
    )
}

export default LightEditContainer
