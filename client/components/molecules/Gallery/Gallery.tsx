import React from 'react'
import ScrollLock from 'react-scrolllock'

import {zIndex, colors, spaces} from 'styles'
import {Icon} from 'components/atoms'

const classes = {
    root: 'list',
}

interface Props {
    onClose: VoidFunction
    isOpen: boolean
}

type GalleryType = React.FunctionComponent<Props> & {
    classes: typeof classes
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
                    <ScrollLock>{children}</ScrollLock>
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
            `}</style>
        </>
    )
}

Gallery.classes = classes

export default Gallery
