import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {EquipmentCard} from 'components/molecules'
import {spaces} from 'styles'
import {Grid} from 'components/core'

interface Props {
}

const EquipmentSection: React.FunctionComponent<Props> = ({}) => (
    <>
        <div className="section">
            <Headline as="h2" variant="h3">
                <FormattedMessage id="aquascape.equipment.title" defaultMessage="Equipment" />
            </Headline>
            <div className="list">
                <Grid.Row>
                    <Grid.Item extraSmall={12} medium={6} large={4}>
                        <EquipmentCard
                            title="Filter"
                            image={<img src="/static/equipment/filter.png" alt="Filter" />}>
                            <p>Filter Eheim 960 PRO</p>
                            <p>Filter Eheim 960 PRO</p>
                        </EquipmentCard>
                    </Grid.Item>
                    <Grid.Item extraSmall={12} medium={6} large={4}>
                        <EquipmentCard
                            title="Filter"
                            image={<img src="/static/equipment/filter.png" alt="Filter" />}>
                            <p>Filter Eheim 960 PRO</p>
                            <p>Filter Eheim 960 PRO</p>
                        </EquipmentCard>
                    </Grid.Item>
                    <Grid.Item extraSmall={12} medium={6} large={4}>
                        <EquipmentCard
                            title="Filter"
                            image={<img src="/static/equipment/filter.png" alt="Filter" />}>
                            <p>Filter Eheim 960 PRO</p>
                            <p>Filter Eheim 960 PRO</p>
                        </EquipmentCard>
                    </Grid.Item>
                    <Grid.Item extraSmall={12} medium={6} large={4}>
                        <EquipmentCard
                            title="Filter"
                            image={<img src="/static/equipment/filter.png" alt="Filter" />}>
                            <p>Filter Eheim 960 PRO</p>
                            <p>Filter Eheim 960 PRO</p>
                        </EquipmentCard>
                    </Grid.Item>
                    <Grid.Item extraSmall={12} medium={6} large={4}>
                        <EquipmentCard
                            title="Filter"
                            image={<img src="/static/equipment/filter.png" alt="Filter" />}>
                            <p>Filter Eheim 960 PRO</p>
                            <p>Filter Eheim 960 PRO</p>
                        </EquipmentCard>
                    </Grid.Item>
                    <Grid.Item extraSmall={12} medium={6} large={4}>
                        <EquipmentCard
                            title="Filter"
                            image={<img src="/static/equipment/filter.png" alt="Filter" />}>
                            <p>Filter Eheim 960 PRO</p>
                            <p>Filter Eheim 960 PRO</p>
                        </EquipmentCard>
                    </Grid.Item>
                </Grid.Row>
            </div>
        </div>
        <style jsx>{`
            .list {
                margin-top: ${spaces.s60};
            }

            .list :global(.${EquipmentCard.classes.root}) {
                margin-bottom: ${spaces.s30};
            }

        `}</style>
    </>
)

export default EquipmentSection