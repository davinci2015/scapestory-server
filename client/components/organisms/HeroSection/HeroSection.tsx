import React from 'react'

import {backgroundImage} from 'styles/mixins'
import {borderRadius, spaces, colors, zIndex} from 'styles'
import {Headline, ImageStack, Button, Icon, FormattedMessage, Paragraph} from 'components/atoms'
import {UserWidget} from 'components/molecules'

interface Props {
    image: string
    title: string
    userImage: string
    username: string
    imageStackText: React.ReactNode
}

const HeroSection = ({
    image,
    title,
    userImage,
    username,
    imageStackText,
}: Props) => (
        <div className="hero-section">
            <div className="image">
                <div className="badge">
                    <div className="badge-icon">
                        <Icon d={Icon.FIRE} color={colors.WHITE}/>
                    </div>
                    <Paragraph type="body" color={colors.WHITE}>
                        <FormattedMessage id="hero_section.our_choice" defaultMessage="Our Choice"/>
                    </Paragraph>
                </div>
                <div className="content">
                    <Headline as="h1" variant="h3" color={colors.WHITE}>
                        {title}
                    </Headline>
                    <UserWidget
                        variant="border"
                        color={colors.WHITE}
                        size="l"
                        image={userImage}
                        name={username}
                    />
                </div>
            </div>
            <div className="bottom">
                <ImageStack text={imageStackText} images={[
                    userImage,
                    userImage,
                    userImage,
                    userImage
                ]} />
                <div className="bottom-buttons">
                    <Button type="small" leftIcon={<Icon d={Icon.SHARE} color={colors.WHITE}/>}>
                        <FormattedMessage id="hero_section.share" defaultMessage="Share"/>
                    </Button>
                    <Button type="small" leftIcon={<Icon d={Icon.HEART_OUTLINE} color={colors.WHITE}/>}>
                        <FormattedMessage id="hero_section.like" defaultMessage="Like"/>
                    </Button>
                </div>
            </div>
            <style jsx>{`
                .hero-section {
                    margin-top: ${spaces.s60};
                }

                .image {
                    position: relative;
                    min-height: 646px;

                    border-radius: ${borderRadius.SECONDARY};
                    z-index: -1;
                    ${backgroundImage(image)}
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
                    padding-top: ${spaces.s30};
                    padding-left: ${spaces.s48};
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
                    left: ${spaces.s48};
                    bottom: ${spaces.s42};
                    z-index: ${zIndex.DEFAULT};
                }

                .bottom {
                    display: flex;
                    justify-content: space-between;
                    margin-top: ${spaces.s30};
                }

                .bottom-buttons {
                    display: flex;
                    align-items: center;
                    margin-right: -${spaces.s12};
                }

                .bottom-buttons :global(.${Button.classes.root}) {
                    margin: 0 ${spaces.s12};
                }
            `}</style>
        </div>
    )

export default HeroSection