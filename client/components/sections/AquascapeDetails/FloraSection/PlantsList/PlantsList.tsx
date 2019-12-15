import React, {ChangeEvent} from 'react'
import {noop} from 'lodash'

import {FormattedMessage, Icon, InputAutocomplete} from 'components/atoms'
import {List} from 'components/molecules'
import {colors, spaces} from 'styles'
import {Plant} from 'graphql/generated/types'
import {PlantsQuery} from 'graphql/generated/queries'
import {matchItemToValue} from 'utils/general'

interface Props {
    edit?: boolean
    addPlant?: () => void
    removePlant?: (plantId: number) => void
    onPlantInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onPlantSelect?: (value: string, plant: Pick<Plant, 'id' | 'name'>) => void
    plantInputValue?: string
    allPlants?: PlantsQuery['plants']
    plants: Pick<Plant, 'id' | 'name'>[]
}

const PlantsList: React.FunctionComponent<Props> = ({
    edit,
    onPlantInputChange = noop,
    onPlantSelect = noop,
    plantInputValue = '',
    allPlants = [],
    plants = [],
}) => (
    <>
        <List
            icon={<Icon d={Icon.PLANT} color={colors.WHITE} size={48} viewBox="0 0 48 48" />}
            title={
                <FormattedMessage id="aquascape.flora_and_fauna.plants" defaultMessage="Plants" />
            }
        >
            {plants.length ? (
                plants.map(plant => <List.Item key={plant.id}>{plant.name}</List.Item>)
            ) : (
                <List.Item>
                    <FormattedMessage
                        id="aquascape.flora_and_fauna.no_plants"
                        defaultMessage="No plants added"
                    />
                </List.Item>
            )}

            {edit && (
                <InputAutocomplete
                    value={plantInputValue}
                    getItemValue={item => item.name}
                    shouldItemRender={(item, value) => matchItemToValue(item.name, value)}
                    renderItem={(item, isHighlighted) => (
                        <div
                            key={item.id}
                            style={{background: isHighlighted ? 'lightblue' : 'white'}}
                        >
                            {item.name}
                        </div>
                    )}
                    onChange={onPlantInputChange}
                    onSelect={onPlantSelect}
                    items={allPlants}
                />
            )}
        </List>
        <style jsx>{`
            .section {
                padding: ${spaces.s120} 0;
            }

            .list {
                display: flex;
                margin-top: ${spaces.s90};
            }

            .list :global(.${List.classes.root}) {
                min-width: 470px;
            }
        `}</style>
    </>
)

export default PlantsList
