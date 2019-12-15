import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {List} from 'components/molecules'
import {spaces} from 'styles'

const FloraSection: React.FunctionComponent = ({children}) => (
    <>
        <div className="section">
            <Headline as="h2" variant="h3">
                <FormattedMessage
                    id="aquascape.flora_and_fauna.title"
                    defaultMessage="Flora & Fauna"
                />
            </Headline>
            <div className="list">{children}</div>
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
