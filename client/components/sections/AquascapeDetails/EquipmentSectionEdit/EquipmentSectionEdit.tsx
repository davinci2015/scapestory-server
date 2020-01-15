import React from 'react'

import {FormattedMessage, Headline, Paragraph} from 'components/atoms'
import {EquipmentCard, ListItem} from 'components/molecules'
import {spaces} from 'styles'
import {Grid} from 'components/core'
import {Substrate, Additive, Co2} from 'graphql/generated/types'
import {SubstratesCard, AdditivesCard} from '../EquipmentSection/Cards'

interface Props {
    substrates: Pick<Substrate, 'id' | 'brand' | 'model'>[]
    additives: Pick<Additive, 'id' | 'brand' | 'model'>[]
    co2: Pick<Co2, 'id' | 'type' | 'bps'> | null
}

const EquipmentSectionEdit: React.FunctionComponent<Props> = ({
    children,
    substrates = [],
    additives = [],
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
                    {children}
                    <Grid.Row>
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
                                    <ListItem key={substrate.id} onDelete={() => null}>
                                        {substrate.brand} {substrate.model}
                                    </ListItem>
                                ))}
                            </SubstratesCard>
                        </Grid.Item>
                        <Grid.Item extraSmall={12} small={6} large={4}>
                            <AdditivesCard>
                                {additives.map(additive => (
                                    <ListItem key={additive.id} onDelete={() => null}>
                                        {additive.brand} {additive.model}
                                    </ListItem>
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
