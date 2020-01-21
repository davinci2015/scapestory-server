import React from 'react'
import classnames from 'classnames'

import {colors, spaces} from 'styles'
import {Icon} from 'components/atoms'
import TwitterIcon from 'assets/icons/twitter.svg'
import YoutubeIcon from 'assets/icons/youtube.svg'

export enum SocialNetwork {
    FACEBOOK,
    YOUTUBE,
    INSTAGRAM,
    TWITTER,
}

interface Props {
    network: SocialNetwork
    url: string
}

const FacebookIcon = () => <Icon d={Icon.FACEBOOK} viewBox="0 0 24 24" color={colors.PRIMARY} />
const InstagramIcon = () => <Icon d={Icon.INSTAGRAM} viewBox="0 0 48 48" color={colors.PRIMARY} />

const iconComponentMapping = {
    [SocialNetwork.FACEBOOK]: FacebookIcon,
    [SocialNetwork.YOUTUBE]: YoutubeIcon,
    [SocialNetwork.TWITTER]: TwitterIcon,
    [SocialNetwork.INSTAGRAM]: InstagramIcon,
}

const SocialLink: React.FunctionComponent<Props> = ({network, url}) => {
    const NetworkIcon = iconComponentMapping[network]

    return (
        <>
            <div
                className={classnames('social', {
                    twitter: network === SocialNetwork.TWITTER,
                    youtube: network === SocialNetwork.YOUTUBE,
                })}
            >
                <NetworkIcon />
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                </a>
            </div>

            <style jsx>{`
                .social {
                    display: flex;
                    align-items: center;

                    padding-top: ${spaces.s12};
                    padding-bottom: ${spaces.s12};
                }

                .social :global(svg) {
                    margin-right: ${spaces.s18};
                }

                .social.twitter :global(svg),
                .social.youtube :global(svg) {
                    stroke: ${colors.PRIMARY};
                }

                .social :global(a) {
                    color: ${colors.BLACK};
                }
            `}</style>
        </>
    )
}

export default SocialLink
