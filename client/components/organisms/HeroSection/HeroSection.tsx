import React from 'react'
import {backgroundImage} from 'styles/mixins'
import {borderRadius, spaces, colors} from 'styles'

interface Props {
    image: string
}

const HeroSection = ({
    image
}: Props) => (
        <div className="hero-section">
            <div className="image"></div>
            <style jsx>{`
                .hero-section {
                    margin-top: ${spaces.s60};
                }

                .image {
                    position: relative;
                    width: 100%;
                    min-height: 646px;
                    border-radius: ${borderRadius.SECONDARY};
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
            `}</style>
        </div>
    )

export default HeroSection