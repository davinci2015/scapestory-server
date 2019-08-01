import React from 'react'

import {backgroundImage} from 'styles/mixins'
import {borderRadius, spaces, colors, zIndex} from 'styles'
import {Headline, ImageStack, Button, Icon} from 'components/atoms'
import {UserWidget} from 'components/molecules'

interface Props {
    image: string
    title: string
    userImage: string
    username: string
}

const HeroSection = ({
    image,
    title,
    userImage,
    username
}: Props) => (
        <div className="hero-section">
            <div className="image">
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
                <ImageStack text="liked by Ines, Draško and 24 others" images={[
                    userImage,
                    userImage,
                    userImage,
                    userImage
                ]} />
                <div className="bottom-buttons">
                    <Button type="small" leftIcon={<Icon d={Icon.SHARE} color={colors.WHITE}/>}>
                        Share
                    </Button>
                    <Button type="small" leftIcon={<Icon d={Icon.HEART_OUTLINE} color={colors.WHITE}/>}>
                        Like
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
                    background-image: linear-gradient(to bottom, ${colors.BLACK}, rgba(0, 0, 0, 0));
                }

                .image::after {
                    bottom: 0;
                    height: 200px;
                    background-image: linear-gradient(to top, ${colors.BLACK}, rgba(0, 0, 0, 0));
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