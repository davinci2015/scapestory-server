import React from 'react'

import {FormattedMessage, Headline, Paragraph} from 'components/atoms'
import {EquipmentCard} from 'components/molecules'
import {spaces} from 'styles'
import {Grid} from 'components/core'
import {Light, Filter, Substrate, Additive, Co2} from 'graphql/generated/types'
import {LightsCard, FiltersCard, SubstratesCard, AdditivesCard} from '../EquipmentSection/Cards'

interface Props {
    lights: Pick<Light, 'id' | 'brand' | 'model'>[]
    filters: Pick<Filter, 'id' | 'brand' | 'model'>[]
    substrates: Pick<Substrate, 'id' | 'brand' | 'model'>[]
    additives: Pick<Additive, 'id' | 'brand' | 'model'>[]
    co2: Pick<Co2, 'id' | 'type' | 'bps'> | null
}

const EquipmentSectionEdit: React.FunctionComponent<Props> = ({
    lights = [],
    filters = [],
    substrates = [],
    additives = [],
    co2,
}) => {
    return (
        <>
            <div className="section">
                <div className="title">
                    <Headline as="h2" variant="h3">
                        <FormattedMessage
                            id="aquascape.equipment.title"
                            defaultMessage="Equipment"
                        />
                    </Headline>
                </div>

                <div className="list">
                    <Grid.Row>
                        <Grid.Item extraSmall={12} small={6} large={4}>
                            <LightsCard>
                                {lights.map(light => (
                                    <Paragraph key={light.id}>
                                        {light.brand} {light.model}
                                    </Paragraph>
                                ))}
                            </LightsCard>
                        </Grid.Item>
                        <Grid.Item extraSmall={12} small={6} large={4}>
                            <FiltersCard>
                                {filters.map(filter => (
                                    <Paragraph key={filter.id}>
                                        {filter.brand} {filter.model}
                                    </Paragraph>
                                ))}
                            </FiltersCard>
                        </Grid.Item>
                        <Grid.Item extraSmall={12} small={6} large={4}>
                            <EquipmentCard
                                title={
                                    <FormattedMessage
                                        id="aquascape.equipment.co2"
                                        defaultMessage="CO2"
                                    />
                                }
                                image={<img src="/static/equipment/filter.png" alt="Filter" />}
                            >
                                <Paragraph>Type: TODO INPUT</Paragraph>
                                <Paragraph>Bubbles per second: TODO INPUT</Paragraph>
                            </EquipmentCard>
                        </Grid.Item>
                        <Grid.Item extraSmall={12} small={6} large={4}>
                            <SubstratesCard>
                                {substrates.map(substrate => (
                                    <Paragraph key={substrate.id}>
                                        {substrate.brand} {substrate.model}
                                    </Paragraph>
                                ))}
                            </SubstratesCard>
                        </Grid.Item>
                        <Grid.Item extraSmall={12} small={6} large={4}>
                            <AdditivesCard>
                                {additives.map(additive => (
                                    <Paragraph key={additive.id}>
                                        {additive.brand} {additive.model}
                                    </Paragraph>
                                ))}
                            </AdditivesCard>
                        </Grid.Item>
                    </Grid.Row>
                </div>
            </div>
            <style jsx>{`
                .section {
                    padding: ${spaces.s120} 0;
                }

                .section .title :global(.${Headline.classes.root}) {
                    margin-bottom: ${spaces.s60};
                }

                .list {
                    margin-bottom: -${spaces.s30};
                }

                .list :global(.${EquipmentCard.classes.root}) {
                    margin-bottom: ${spaces.s30};
                }
            `}</style>
        </>
    )
}

export default EquipmentSectionEdit
