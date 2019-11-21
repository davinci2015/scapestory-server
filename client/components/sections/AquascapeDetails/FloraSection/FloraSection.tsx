import React from 'react'

import {FormattedMessage, Headline, Icon} from 'components/atoms'
import {List} from 'components/molecules'
import {colors, spaces} from 'styles'
import {AquascapeDetails} from 'containers/AquascapeDetails/query'

interface Props {
    plants: AquascapeDetails['plants']
    livestock: AquascapeDetails['livestock']
    hardscape: AquascapeDetails['hardscape']
}

const FloraSection: React.FunctionComponent<Props> = ({
    plants = [],
    livestock = [],
    hardscape = [],
}) => (
    <>
        <div className="section">
            <Headline as="h2" variant="h3">
                <FormattedMessage
                    id="aquascape.flora_and_fauna.title"
                    defaultMessage="Flora & Fauna"
                />
            </Headline>
            <div className="list">
                <List
                    icon={
                        <Icon
                            d={Icon.PLANT}
                            color={colors.WHITE}
                            size={48}
                            viewBox="0 0 48 48"
                        />
                    }
                    title={
                        <FormattedMessage
                            id="aquascape.flora_and_fauna.plants"
                            defaultMessage="Plants"
                        />
                    }
                >
                    {plants.length ? (
                        plants.map(plant => (
                            <List.Item key={plant.id}>{plant.name}</List.Item>
                        ))
                    ) : (
                        <List.Item>
                            <FormattedMessage
                                id="aquascape.flora_and_fauna.no_plants"
                                defaultMessage="No plants added"
                            />
                        </List.Item>
                    )}
                </List>
                <List
                    icon={
                        <Icon
                            d={Icon.FISH}
                            color={colors.WHITE}
                            size={48}
                            viewBox="0 0 48 48"
                        />
                    }
                    title={
                        <FormattedMessage
                            id="aquascape.flora_and_fauna.livestock"
                            defaultMessage="Livestock"
                        />
                    }
                >
                    {livestock.length ? (
                        livestock.map(stock => (
                            <List.Item key={stock.id}>{stock.name}</List.Item>
                        ))
                    ) : (
                        <List.Item>
                            <FormattedMessage
                                id="aquascape.flora_and_fauna.no_livestock"
                                defaultMessage="No livestock added"
                            />
                        </List.Item>
                    )}
                </List>
                <List
                    icon={
                        <Icon
                            d={Icon.STONE}
                            color={colors.WHITE}
                            size={48}
                            viewBox="0 0 48 48"
                        />
                    }
                    title={
                        <FormattedMessage
                            id="aquascape.flora_and_fauna.hardscape"
                            defaultMessage="Hardscape"
                        />
                    }
                >
                    {hardscape.length ? (
                        hardscape.map(hard => (
                            <List.Item key={hard.id}>{hard.name}</List.Item>
                        ))
                    ) : (
                        <List.Item>
                            <FormattedMessage
                                id="aquascape.flora_and_fauna.no_hardscape"
                                defaultMessage="No hardscape added"
                            />
                        </List.Item>
                    )}
                </List>
            </div>
        </div>
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

export default FloraSection
