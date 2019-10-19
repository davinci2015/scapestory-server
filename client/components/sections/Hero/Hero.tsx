import React from 'react'

import {borderRadius, spaces, colors, zIndex, media, applyStyles} from 'styles'
import {Headline} from 'components/atoms'
import {TopSection, TopLeft, TopRight} from 'components/sections/Hero/TopSection'
import {BottomSection, BottomLeft, BottomRight} from 'components/sections/Hero/BottomSection'

interface Props {
    image: string
    title: string
    topSection?: React.ReactNode
    bottomSection?: React.ReactNode
    variant?: 'default' | 'cover'
}

const Hero = ({
    image,
    title,
    topSection,
    bottomSection,
    variant = 'default'
}: Props) => {
    const applyDefaultStyles = applyStyles(variant === 'default')

    return (
        <div className="container">
            <img className="container-image" src={image} alt={title} />
            <div className="gradient gradient--top"></div>
            {topSection}
            <div className="content">
                <Headline as="h1" variant="h2" color={colors.WHITE}>
                    {title}
                </Headline>
                {bottomSection}
            </div>
            <div className="gradient gradient--bottom"></div>
            <style jsx>{`
                .container {
                    position: relative;
                    height: 80vh;
                    margin-left: -${spaces.s24};
                    margin-right: -${spaces.s24};
                }   

                @media ${media.up('medium')} {
                    .container {
                        height: 646px;
                        margin: 0;
                    }
                }

                .gradient {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                }

                @media ${media.up('medium')} {
                    .gradient {
                        ${applyDefaultStyles(`
                            border-radius: ${borderRadius.SECONDARY};
                        `)}
                    }
                }

                .gradient--top {
                    top: 0;
                    height: 120px;
                    background-image: linear-gradient(to bottom, ${colors.BLACK}, rgba(0, 0, 0, 0));
                }

                .gradient--bottom {
                    bottom: 0;
                    height: 200px;
                    background-image: linear-gradient(to top, ${colors.BLACK}, rgba(0, 0, 0, 0));
                }

                .container-image {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: ${zIndex.BELOW};
                }

                @media ${media.up('medium')} {
                    .container-image {
                        ${applyDefaultStyles(`
                            border-radius: ${borderRadius.SECONDARY};
                        `)}
                    }
                }

                .content {
                    position: absolute;
                    left: ${spaces.s18};
                    width: calc(100% - 36px);
                    bottom: ${spaces.s18};
                    z-index: ${zIndex.DEFAULT};
                }

                @media ${media.up('medium')} {
                    .content {
                        left: ${spaces.s48};
                        width: calc(100% - 96px);
                        bottom: ${spaces.s42};
                    }

                    .content :global(.${Headline.classes.root}) {
                        margin-bottom: ${spaces.s42};
                    }
                }
            `}</style>
        </div>
    )
}

Hero.TopSection = TopSection
Hero.TopLeft = TopLeft
Hero.TopRight = TopRight

Hero.BottomSection = BottomSection
Hero.BottomLeft = BottomLeft
Hero.BottomRight = BottomRight


export default Hero