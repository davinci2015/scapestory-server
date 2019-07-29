import React from 'react'

import {backgroundImage} from 'styles/mixins'
import {borderRadius, spaces, colors} from 'styles'
import {Headline} from 'components/atoms'
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
            <div className="image"></div>
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
            <style jsx>{`
                .hero-section {
                    position: relative;
                    margin-top: ${spaces.s60};
                    min-height: 646px;
                }

                .image {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;

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
                }
            `}</style>
        </div>
    )

export default HeroSection