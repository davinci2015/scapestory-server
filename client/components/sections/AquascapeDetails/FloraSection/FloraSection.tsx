import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {List} from 'components/molecules'
import {spaces, media} from 'styles'
import Section from 'components/sections/AquascapeDetails/Section'

const FloraSection: React.FunctionComponent = ({children}) => (
    <>
        <Section>
            <Headline as="h2" variant="h3">
                <FormattedMessage
                    id="aquascape.flora_and_fauna.title"
                    defaultMessage="Flora & Fauna"
                />
            </Headline>
            <div className="list">{children}</div>
        </Section>
        <style jsx>{`
            .list {
                display: flex;
                flex-direction: column;
                margin-top: ${spaces.s30};
            }

            .list :global(.${List.classes.root}) {
                margin-top: ${spaces.s30};
                flex: 1 1 0px;
            }

            @media ${media.up('medium')} {
                .list {
                    flex-direction: row;
                    margin-top: ${spaces.s90};
                }

                .list :global(.${List.classes.root}) {
                    margin-top: 0;
                }
            }
        `}</style>
    </>
)

export default FloraSection
