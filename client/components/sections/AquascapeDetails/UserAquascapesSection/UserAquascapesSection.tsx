import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {spaces} from 'styles'

interface Props {
    username: string
}

const UserAquascapesSection: React.FunctionComponent<Props> = ({
    username
}) => (
        <>
            <div className="section">
                <Headline as="h2" variant="h3">
                    <FormattedMessage 
                        id="aquascape.user_aquascapes.title" 
                        defaultMessage="{username}'s aquascapes" 
                        values={{username}}
                    />
                </Headline>
                <div className="list">
                   
                </div>
            </div>
            <style jsx>{`
                .section {
                    padding-top: ${spaces.s90};
                    padding-bottom: ${spaces.s120}
                }
            `}</style>
        </>
    )

export default UserAquascapesSection