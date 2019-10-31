import React from 'react'
import cx from 'classnames'

import {borderRadius, spaces, colors, zIndex, media} from 'styles'
import {Headline} from 'components/atoms'
import {TopSection, TopLeft, TopRight} from 'components/sections/Hero/TopSection'
import {BottomSection, BottomLeft, BottomRight} from 'components/sections/Hero/BottomSection'
import {GRID_MAX_WIDTH} from 'components/core/Grid';

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
}: Props) => (
        <div className="container">
            <img className={cx('container-image', {
                'radius': variant === 'default'
            })} src={image} alt={title} />

            <div className={cx('gradient gradient--top', {
                'radius': variant === 'default'
            })}></div>

            <div className={cx('content', {
                'content--cover': variant === 'cover'
            })}>
                {topSection}
                <div className="bottom">
                    <Headline as="h1" variant="h2" color={colors.WHITE}>
                        {title}
                    </Headline>
                    {bottomSection}
                </div>
            </div>

            <div className={cx('gradient gradient--bottom', {
                'radius': variant === 'default'
            })}></div>

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
                    .radius {
                        border-radius: ${borderRadius.SECONDARY};
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

                .content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    padding: ${spaces.s36} ${spaces.s48} ${spaces.s48} ${spaces.s48};

                    z-index: ${zIndex.DEFAULT};
                }

                .content--cover {
                    max-width: ${GRID_MAX_WIDTH};
                    margin: 0 auto;
                    padding: ${spaces.s36} ${spaces.s24} ${spaces.s48} ${spaces.s24}; 
                }

                .content :global(.${Headline.classes.root}) {
                    margin-bottom: ${spaces.s60};
                }

                .content .bottom {
                    z-index: ${zIndex.DEFAULT};
                }
            `}</style>
        </div>
    )

Hero.TopSection = TopSection
Hero.TopLeft = TopLeft
Hero.TopRight = TopRight

Hero.BottomSection = BottomSection
Hero.BottomLeft = BottomLeft
Hero.BottomRight = BottomRight


export default Hero