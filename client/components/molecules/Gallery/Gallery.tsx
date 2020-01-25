import React from 'react'
// @ts-ignore
import AwesomeSlider from 'react-awesome-slider'

import {zIndex, colors, spaces} from 'styles'
import {Icon} from 'components/atoms'
import GalleryImage from './GalleryImage'

const classes = {
    root: 'list',
}

interface Props {
    onClose: VoidFunction
    isOpen: boolean
}

type GalleryType = React.FunctionComponent<Props> & {
    classes: typeof classes
    Image: typeof GalleryImage
}

const Gallery: GalleryType = ({children, isOpen, onClose}) => {
    if (!isOpen) return null

    return (
        <>
            <div className="gallery">
                <div className="gallery__overlay">
                    <a onClick={onClose} className="gallery__close">
                        <Icon d={Icon.CLOSE} color={colors.SHADE_LIGHT} size={36} />
                    </a>
                </div>
                <div className="slider">
                    <AwesomeSlider>{children}</AwesomeSlider>
                </div>
            </div>
            <style jsx>{`
                .gallery {
                }

                .gallery__overlay {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    right: 0px;
                    bottom: 0px;
                    background-color: rgba(0, 0, 0, 0.9);
                    z-index: ${zIndex.HIGHEST};
                }

                .gallery__close {
                    cursor: pointer;
                    position: absolute;
                    top: ${spaces.s16};
                    right: ${spaces.s30};
                    padding: ${spaces.s6};
                }

                .slider {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </>
    )
}

Gallery.classes = classes
Gallery.Image = GalleryImage

export default Gallery
