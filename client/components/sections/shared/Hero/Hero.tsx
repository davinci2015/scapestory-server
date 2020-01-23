import React from 'react'
import cx from 'classnames'

import {borderRadius, spaces, colors, zIndex, media, typography} from 'styles'
import {Headline} from 'components/atoms'
import {TopSection, TopLeft, TopRight} from 'components/sections/shared/Hero/TopSection'
import {BottomSection, BottomLeft, BottomRight} from 'components/sections/shared/Hero/BottomSection'
import {GRID_WIDTH_DEFAULT} from 'components/core/Grid'
import config from 'config'

interface Props {
    editMode?: boolean
    image?: string | null
    title?: string | null
    topSection?: React.ReactNode
    bottomSection?: React.ReactNode
    onTitleChange?: (title: string) => void
    variant?: 'default' | 'cover'
    height?: 'default' | 'compact'
}

const Hero = ({
    bottomSection,
    editMode,
    height = 'default',
    image,
    onTitleChange,
    title,
    topSection,
    variant = 'default',
}: Props) => (
    <div
        className={cx('container', {
            'container--compact': height === 'compact',
        })}
    >
        <img
            className={cx('container-image', {
                radius: variant === 'default',
            })}
            src={image || config.AQUASCAPE_MAIN_IMAGE_PLACEHOLDER}
            alt={title || config.AQUASCAPE_TITLE_PLACEHOLDER}
        />

        <div
            className={cx('gradient gradient--top', {
                radius: variant === 'default',
            })}
        ></div>

        <div
            className={cx('content', {
                'content--cover': variant === 'cover',
            })}
        >
            {topSection}
            <div className="bottom">
                {editMode ? (
                    <input
                        className="headline-input"
                        defaultValue={title || config.AQUASCAPE_TITLE_PLACEHOLDER}
                        maxLength={40}
                        onChange={e => onTitleChange && onTitleChange(e.target.value)}
                    />
                ) : (
                    title && (
                        <Headline as="h1" variant="h2" color={colors.WHITE}>
                            {title}
                        </Headline>
                    )
                )}
                {bottomSection}
            </div>
        </div>

        <div
            className={cx('gradient gradient--bottom', {
                radius: variant === 'default',
            })}
        ></div>

        <style jsx>{`
            .container {
                position: relative;
                height: 80vh;
                margin-left: -${spaces.s24};
                margin-right: -${spaces.s24};
            }

            .container--compact {
                height: 270px;
            }

            @media ${media.up('medium')} {
                .container {
                    height: 70vh;
                    margin: 0;
                }

                .container--compact {
                    height: 270px;
                }
            }

            .headline-input {
                width: 50%;
                margin-bottom: ${spaces.s60};

                font-weight: ${typography.fontWeight.extraBold};
                font-size: ${typography.fontSize.fs51};
                line-height: ${typography.lineHeight.lh66};

                color: ${colors.WHITE};
                background: transparent;

                border: 0;
                border-bottom: 2px solid ${colors.SHADE_EXTRA_LIGHT};
                outline: 0;
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
                max-width: ${GRID_WIDTH_DEFAULT};
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
