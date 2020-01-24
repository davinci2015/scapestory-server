import React from 'react'

import {colors, spaces} from 'styles'
import {Headline, FormattedMessage, Paragraph, Input, Textarea} from 'components/atoms'

interface Props {
    shouldDisplayPlaceholder?: boolean
    socialNetworkArea: React.ReactNode
    about?: React.ReactNode
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
        {about && <div className="about-text">{about}</div>}
        {shouldDisplayPlaceholder && (
            <Paragraph color={colors.SHADE_DEEP}>
                <FormattedMessage
                    id="user_profile.about_placeholder"
                    defaultMessage="No description nor social media links added yet."
                />
            </Paragraph>
        )}
        <div className="social">{socialNetworkArea}</div>
        <style jsx>{`
            .about {
                margin-bottom: ${spaces.s12};
            }

            .about-text :global(.${Textarea.classes.textarea}) {
                margin-bottom: ${spaces.s30};
            }

            .about-text {
                margin-bottom: ${spaces.s24};
                word-break: break-word;
            }

            .social {
                word-break: break-word;
            }

            .social :global(svg) {
                color: ${colors.PRIMARY};
            }

            .social :global(.${Input.classes.inputContainer}) {
                margin-bottom: ${spaces.s30};
            }
        `}</style>
    </>
)

export default UserAbout
