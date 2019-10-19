import React from 'react'

import {borderRadius, spaces, colors, zIndex, media, applyStyles} from 'styles'
import {Headline} from 'components/atoms'
import {TopSection, TopLeft, TopRight} from 'components/sections/Hero/TopSection'
import {BottomSection, BottomLeft, BottomRight} from 'components/sections/Hero/BottomSection'
import {GRID_MAX_WIDTH} from 'components/core/Grid'

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
    const applyCoverStyles = applyStyles(variant === 'cover')

    return (
        <div className="container">
            <img className="container-image" src={image} alt={title} />
            <div className="gradient gradient--top"></div>
            <div className="content">
                {topSection}
                <div className="bottom">
                    <Headline as="h1" variant="h2" color={colors.WHITE}>
                        {title}
                    </Headline>
                    {bottomSection}
                </div>
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
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    padding: 0 ${spaces.s48};

                    z-index: ${zIndex.DEFAULT};

                    ${applyCoverStyles(`
                        margin: 0 auto;
                        max-width: ${GRID_MAX_WIDTH};
                        padding: ${spaces.s36} ${spaces.s24} ${spaces.s48} ${spaces.s24}; 
                    `)}
                }

                @media ${media.up('medium')} {
                    .content {
                        ${applyDefaultStyles(`
                            padding: ${spaces.s36} ${spaces.s48} ${spaces.s48} ${spaces.s48};
                        `)}
                    }

                    .content :global(.${Headline.classes.root}) {
                        margin-bottom: ${spaces.s60};
                    }
                }

                .content .bottom {
                    z-index: ${zIndex.DEFAULT};
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