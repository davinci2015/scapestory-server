import React from 'react'

import {FormattedMessage, Headline, Paragraph} from 'components/atoms'
import {EquipmentCard} from 'components/molecules'
import {spaces} from 'styles'
import {Grid} from 'components/core'
import {Light, Filter, Substrate, Additive, Co2} from 'graphql/generated/types'
import {LightsCard, FiltersCard, SubstratesCard, AdditivesCard} from './Cards'

interface Props {
    lights: Pick<Light, 'id' | 'brand' | 'model'>[]
    filters: Pick<Filter, 'id' | 'brand' | 'model'>[]
    substrates: Pick<Substrate, 'id' | 'brand' | 'model'>[]
    additives: Pick<Additive, 'id' | 'brand' | 'model'>[]
    co2: Pick<Co2, 'id' | 'type' | 'bps'> | null
}

const EquipmentSection: React.FunctionComponent<Props> = ({
    lights = [],
    filters = [],
    substrates = [],
    additives = [],
    co2,
}) => {
    const hasEquipment =
        [lights, filters, substrates, additives].some(equipment => !!equipment.length) || co2

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

                {hasEquipment ? (
                    <div className="list">
                        <Grid.Row>
                            {!!lights.length && (
                                <Grid.Item extraSmall={12} small={6} large={4}>
                                    <LightsCard>
                                        {lights.map(light => (
                                            <Paragraph key={light.id}>
                                                {light.brand} {light.model}
                                            </Paragraph>
                                        ))}
                                    </LightsCard>
                                </Grid.Item>
                            )}
                            {!!filters.length && (
                                <Grid.Item extraSmall={12} small={6} large={4}>
                                    <FiltersCard>
                                        {filters.map(filter => (
                                            <Paragraph key={filter.id}>
                                                {filter.brand} {filter.model}
                                            </Paragraph>
                                        ))}
                                    </FiltersCard>
                                </Grid.Item>
                            )}
                            {co2 && co2.type && !!co2.bps && (
                                <Grid.Item extraSmall={12} small={6} large={4}>
                                    <EquipmentCard
                                        title={
                                            <FormattedMessage
                                                id="aquascape.equipment.co2"
                                                defaultMessage="CO2"
                                            />
                                        }
                                        image={
                                            <img src="/static/equipment/filter.png" alt="Filter" />
                                        }
                                    >
                                        <Paragraph>
                                            <FormattedMessage
                                                id="aquascape.equipment.co2.type"
                                                defaultMessage="Type: {type}"
                                                values={{type: co2.type}}
                                            />
                                        </Paragraph>
                                        <Paragraph>
                                            <FormattedMessage
                                                id="aquascape.equipment.co2.type"
                                                defaultMessage="Bubbles per second: {bps}"
                                                values={{
                                                    bps: co2.bps.toString(),
                                                }}
                                            />
                                        </Paragraph>
                                    </EquipmentCard>
                                </Grid.Item>
                            )}
                            {!!substrates.length && (
                                <Grid.Item extraSmall={12} small={6} large={4}>
                                    <SubstratesCard>
                                        {substrates.map(substrate => (
                                            <Paragraph key={substrate.id}>
                                                {substrate.brand} {substrate.model}
                                            </Paragraph>
                                        ))}
                                    </SubstratesCard>
                                </Grid.Item>
                            )}
                            {!!additives.length && (
                                <Grid.Item extraSmall={12} small={6} large={4}>
                                    <AdditivesCard>
                                        {additives.map(additive => (
                                            <Paragraph key={additive.id}>
                                                {additive.brand} {additive.model}
                                            </Paragraph>
                                        ))}
                                    </AdditivesCard>
                                </Grid.Item>
                            )}
                        </Grid.Row>
                    </div>
                ) : (
                    <Paragraph type="body" as="span">
                        <FormattedMessage
                            id="aquascape.equipment.no_equipment"
                            defaultMessage="No equipment added"
                        />
                    </Paragraph>
                )}
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

export default EquipmentSection
