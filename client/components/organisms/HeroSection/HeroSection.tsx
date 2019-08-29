import React from 'react'

import {backgroundImage} from 'styles/mixins'
import {borderRadius, spaces, colors, zIndex, media} from 'styles'
import {Headline, ImageStack, Button, Icon, FormattedMessage, Paragraph} from 'components/atoms'
import {UserWidget} from 'components/molecules'
import {navigationHeight} from 'components/molecules/Navigation'

interface Props {
    image: string
    title: string
    userImage: string
    username: string
    imageStackText: React.ReactNode
    imageStackImages: string[]
    onLike: VoidFunction
    onShare: VoidFunction
}

const HeroSection = ({
    image,
    title,
    userImage,
    username,
    imageStackText,
    imageStackImages,
    onLike,
    onShare
}: Props) => (
        <div className="hero-section">
            <div className="image">
                <div className="badge">
                    <div className="badge-icon">
                        <Icon d={Icon.FIRE} color={colors.WHITE} />
                    </div>
                    <Paragraph type="body" color={colors.WHITE}>
                        <FormattedMessage id="hero_section.editor_choice" defaultMessage="Editor's Choice" />
                    </Paragraph>
                </div>
                <div className="content">
                    <Headline as="h1" variant="h3" color={colors.WHITE}>
                        {title}
                    </Headline>
                    <UserWidget
                        variant="border"
                        color={colors.WHITE}
                        image={userImage}
                        text={
                            <Paragraph type="body" color={colors.WHITE}>
                                <FormattedMessage
                                    id="hero_section.aquascape_author"
                                    defaultMessage="by {username}"
                                    values={{username}}
                                />
                            </Paragraph>
                        }
                    />/
                </div>
            </div>
            <div className="bottom">
                <ImageStack text={imageStackText} images={imageStackImages} />
                <div className="bottom-buttons">
                    <Button onClick={onShare} type="small" leftIcon={<Icon d={Icon.SHARE} color={colors.WHITE} />}>
                        <FormattedMessage id="hero_section.share" defaultMessage="Share" />
                    </Button>
                    <Button onClick={onLike} type="small" leftIcon={<Icon d={Icon.HEART_OUTLINE} color={colors.WHITE} />}>
                        <FormattedMessage id="hero_section.like" defaultMessage="Like" />
                    </Button>
                </div>
            </div>
            <style jsx>{`
                .hero-section {
                    padding-top: ${navigationHeight.default};
                }

                @media ${media.up('medium')} {
                    .hero-section {
                        margin-top: ${spaces.s60};
                        padding-top: ${navigationHeight.default};
                    }
                }

                .image {
                    position: relative;
                    height: 80vh;
                    margin-left: -${spaces.s24};
                    margin-right: -${spaces.s24};
                    z-index: -1;
                    ${backgroundImage(image)}
                }

                @media ${media.up('medium')} {
                    .image {
                        height: 646px;
                        margin: 0;
                        border-radius: ${borderRadius.SECONDARY};
                    }
                }

                .image::before,
                .image::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    border-radius: ${borderRadius.SECONDARY};
                }

                .image::before {
                    top: 0;
                    height: 120px;
                    z-index: -1;
                    background-image: linear-gradient(to bottom, ${colors.BLACK}, rgba(0, 0, 0, 0));
                }

                .image::after {
                    bottom: 0;
                    height: 200px;
                    background-image: linear-gradient(to top, ${colors.BLACK}, rgba(0, 0, 0, 0));
                }

                .badge {
                    display: flex;
                    align-items: center;
                    padding-top: ${spaces.s18};
                    padding-left: ${spaces.s18};
                }

                @media ${media.up('medium')} {
                    .badge {
                        padding-top: ${spaces.s30};
                        padding-left: ${spaces.s48};
                    }
                }

                .badge-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    margin-right: ${spaces.s18};
                    height: ${spaces.s36};  
                    width: ${spaces.s36};
                    
                    border-radius: 50%;
                    background-image: linear-gradient(to bottom, ${colors.SECONDARY}, ${colors.SECONDARY_DARK});
                }

                .content {
                    position: absolute;
                    left: ${spaces.s18};
                    bottom: ${spaces.s18};
                    z-index: ${zIndex.DEFAULT};
                }

                @media ${media.up('medium')} {
                    .content {
                        left: ${spaces.s48};
                        bottom: ${spaces.s42};
                    }
                }

                .bottom {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-top: ${spaces.s30};
                }


                @media ${media.up('medium')} {
                    .bottom {
                        flex-direction: row;
                    }
                }

                .bottom-buttons {
                    display: flex;
                    align-items: flex-start;
                    margin-right: -${spaces.s12};
                    margin-top: ${spaces.s12};
                }

                @media ${media.up('medium')} {
                    .bottom-buttons {
                        margin-top: 0;
                        align-items: center;
                    }
                }

                .bottom-buttons :global(.${Button.classes.root}) {
                    margin-right: ${spaces.s12};
                }

                @media ${media.up('medium')} {
                    .bottom-buttons :global(.${Button.classes.root}) {
                        margin: 0 ${spaces.s12};
                    }
                }
            `}</style>
        </div>
    )

export default HeroSection