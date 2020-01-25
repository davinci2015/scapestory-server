import React from 'react'

export interface Props {
    src: string
    alt?: string
}

const GalleryImage: React.FunctionComponent<Props> = ({src}) => (
    <>
        <div data-src={src} />
        <style jsx>{`
            .image {
            }
        `}</style>
    </>
)

export default GalleryImage
