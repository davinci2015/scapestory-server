import React from 'react'

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

export const socialIconComponentMapping = {
    [SocialNetwork.FACEBOOK]: FacebookIcon,
    [SocialNetwork.YOUTUBE]: YoutubeIcon,
    [SocialNetwork.TWITTER]: TwitterIcon,
    [SocialNetwork.INSTAGRAM]: InstagramIcon,
}

const SocialLink: React.FunctionComponent<Props> = ({network, url}) => {
    const NetworkIcon = socialIconComponentMapping[network]

    return (
        <>
            <div className="social">
                <NetworkIcon />
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                </a>
            </div>

            <style jsx>{`
                .social {
                    position: relative;
                    padding: ${spaces.s12} 0 ${spaces.s12} ${spaces.s36};
                }

                .social :global(svg) {
                    position: absolute;
                    left: 0;
                    top: ${spaces.s8};
                }

                .social :global(svg) {
                    color: ${colors.PRIMARY};
                }

                .social :global(a) {
                    color: ${colors.BLACK};
                }
            `}</style>
        </>
    )
}

export default SocialLink
