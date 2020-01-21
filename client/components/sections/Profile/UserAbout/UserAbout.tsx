import React from 'react'

import {colors, spaces} from 'styles'
import {Headline, FormattedMessage, Paragraph} from 'components/atoms'

interface Props {
    shouldDisplayPlaceholder?: boolean
    socialNetworkArea: React.ReactNode
    about?: string
}

const UserAbout: React.FunctionComponent<Props> = ({
    about,
    shouldDisplayPlaceholder,
    socialNetworkArea,
}) => (
    <>
        <div className="about">
            <Headline as="h5">
                <FormattedMessage id="user_profile.about" defaultMessage="About" />
            </Headline>
        </div>
        {about && !shouldDisplayPlaceholder && (
            <div className="about-text">
                <Paragraph>{about}</Paragraph>
            </div>
        )}
        {shouldDisplayPlaceholder && (
            <Paragraph color={colors.SHADE_DEEP}>
                <FormattedMessage
                    id="user_profile.about_placeholder"
                    defaultMessage="No description nor social media links added yet."
                />
            </Paragraph>
        )}
        <div>{socialNetworkArea}</div>
        <style jsx>{`
            .about {
                margin-bottom: ${spaces.s12};
            }

            .about-text {
                margin-bottom: ${spaces.s24};
            }
        `}</style>
    </>
)

export default UserAbout
