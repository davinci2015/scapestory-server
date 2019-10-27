import React from 'react'

import {FormattedMessage, Headline, Paragraph} from 'components/atoms'
import {EquipmentCard} from 'components/molecules'
import {spaces} from 'styles'
import {Grid} from 'components/core'
import {AquascapeDetails} from 'containers/AquascapeDetails'

interface Props {
    lights: AquascapeDetails["lights"]
    filters: AquascapeDetails["filters"]
    substrates: AquascapeDetails["substrates"]
    additives: AquascapeDetails["additives"]
    co2: AquascapeDetails["co2"]
}

const EquipmentSection: React.FunctionComponent<Props> = ({
    lights = [],
    filters = [],
    substrates = [],
    additives = [],
    co2
}) => (
        <>
            <div className="section">
                <Headline as="h2" variant="h3">
                    <FormattedMessage id="aquascape.equipment.title" defaultMessage="Equipment" />
                </Headline>
                <div className="list">
                    <Grid.Row>
                        {
                            !!lights.length &&
                            <Grid.Item extraSmall={12} small={6} large={4}>
                                <EquipmentCard
                                    title={<FormattedMessage id="aquascape.equipment.lighting" defaultMessage="Lighting" />}
                                    image={<img src="/static/equipment/filter.png" alt="Filter" />}>
                                    {lights.map(light => <Paragraph key={light.id}>{light.brand} {light.model}</Paragraph>)}
                                </EquipmentCard>
                            </Grid.Item>
                        }
                        {
                            !!filters.length &&
                            <Grid.Item extraSmall={12} small={6} large={4}>
                                <EquipmentCard
                                    title={<FormattedMessage id="aquascape.equipment.filtration" defaultMessage="Filtration" />}
                                    image={<img src="/static/equipment/filter.png" alt="Filter" />}>
                                    {filters.map(filter => <Paragraph key={filter.id}>{filter.brand} {filter.model}</Paragraph>)}
                                </EquipmentCard>
                            </Grid.Item>
                        }
                        {
                            co2 && co2.type && !!co2.bps &&
                            <Grid.Item extraSmall={12} small={6} large={4}>
                                <EquipmentCard
                                    title={<FormattedMessage id="aquascape.equipment.co2" defaultMessage="CO2" />}
                                    image={<img src="/static/equipment/filter.png" alt="Filter" />}>
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
                                            values={{bps: co2.bps.toString()}}
                                        />
                                    </Paragraph>
                                </EquipmentCard>
                            </Grid.Item>
                        }
                        {
                            !!substrates.length &&
                            <Grid.Item extraSmall={12} small={6} large={4}>
                                <EquipmentCard
                                    title={<FormattedMessage id="aquascape.equipment.substrate" defaultMessage="Substrate" />}
                                    image={<img src="/static/equipment/filter.png" alt="Filter" />}>
                                    {substrates.map(substrate => <Paragraph key={substrate.id}>{substrate.brand} {substrate.name}</Paragraph>)}
                                </EquipmentCard>
                            </Grid.Item>
                        }
                        {
                            !!additives.length &&
                            <Grid.Item extraSmall={12} small={6} large={4}>
                                <EquipmentCard
                                    title={<FormattedMessage id="aquascape.equipment.additives" defaultMessage="Additives" />}
                                    image={<img src="/static/equipment/filter.png" alt="Filter" />}>
                                    {additives.map(additive => <Paragraph key={additive.id}>{additive.brand} {additive.name}</Paragraph>)}
                                </EquipmentCard>
                            </Grid.Item>
                        }
                    </Grid.Row>
                </div>
            </div>
            <style jsx>{`
                .section {
                    padding: ${spaces.s120} 0;
                }

                .list {
                    margin-top: ${spaces.s60};
                    margin-bottom: -${spaces.s30};
                }

                .list :global(.${EquipmentCard.classes.root}) {
                    margin-bottom: ${spaces.s30};
                }
            `}</style>
        </>
    )

export default EquipmentSection