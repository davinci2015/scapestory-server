import React, {useEffect} from 'react'
import ImageGallery, {ReactImageGalleryItem} from 'react-image-gallery'

import {zIndex, colors, spaces} from 'styles'
import {Icon} from 'components/atoms'
import GalleryImage from './GalleryImage'

const classes = {
    root: 'list',
}

interface Props {
    onClose: VoidFunction
    isOpen: boolean
    images: ReactImageGalleryItem[]
    startIndex: number
}

type GalleryType = React.FunctionComponent<Props> & {
    classes: typeof classes
    Image: typeof GalleryImage
}

const Gallery: GalleryType = ({images, isOpen, onClose, startIndex = 0}) => {
    if (!isOpen) return null

    useEffect(() => {
        document.addEventListener('keydown', onEscape)
        return () => document.removeEventListener('keydown', onEscape)
    }, [])

    const onEscape = (e: KeyboardEvent) => {
        const escape = 27
        if (e.keyCode === escape) onClose()
    }

    return (
        <>
            <div className="gallery">
                <div className="gallery__overlay">
                    <div className="slider">
                        <a onClick={onClose} className="gallery__outside"></a>
                        <ImageGallery startIndex={startIndex} items={images} />
                    </div>
                    <div onClick={onClose} className="gallery__close-icon">
                        <Icon d={Icon.CLOSE} color={colors.SHADE_LIGHT} size={36} />
                    </div>
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

                .gallery__outside {
                    position: absolute;
                    top: ${spaces.s4};
                    right: ${spaces.s4};
                    width: 100%;
                    height: 100%;
                }

                .gallery__close-icon {
                    cursor: pointer;
                    position: absolute;
                    top: ${spaces.s18};
                    right: ${spaces.s30};
                }

                .slider {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }

                .slider :global(.image-gallery) {
                    max-width: 100%;
                }
            `}</style>
        </>
    )
}

Gallery.classes = classes
Gallery.Image = GalleryImage

export default Gallery
