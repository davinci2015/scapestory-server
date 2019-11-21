import React from 'react'
import {spaces, borderRadius} from 'styles'

interface Image {
    src: string
    alt?: string | null
}

interface Props {
    images: Image[]
}

const GUTTER = spaces.s16
const ALT_PLACEHOLDER = 'Scapostory post'

// No time for masonry
const PhotoSection: React.FunctionComponent<Props> = ({images}) => (
    <>
        <div className="photo-grid">
            <div className="row">
                {images[0] && (
                    <div className="image image--main">
                        <img
                            src={images[0].src}
                            alt={images[0].alt || ALT_PLACEHOLDER}
                        />
                    </div>
                )}
                {images[1] && (
                    <div className="image image--half">
                        <img
                            src={images[1].src}
                            alt={images[1].alt || ALT_PLACEHOLDER}
                        />
                    </div>
                )}
                <div className="column">
                    {images[2] && (
                        <div className="image">
                            <img
                                src={images[2].src}
                                alt={images[2].alt || ALT_PLACEHOLDER}
                            />
                        </div>
                    )}
                    {images[3] && (
                        <div className="image">
                            <img
                                src={images[3].src}
                                alt={images[3].alt || ALT_PLACEHOLDER}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="row">
                {images.slice(4, -1).map(image => (
                    <div className="image">
                        <img
                            src={image.src}
                            alt={image.alt || ALT_PLACEHOLDER}
                        />
                    </div>
                ))}
            </div>
        </div>

        <style jsx>{`
            .row {
                display: flex;
                margin-left: -8px;
            }

            .column {
                width: calc(25% - ${GUTTER});
            }

            .column .image {
                width: 100%;
            }

            .image {
                position: relative;
                width: calc(25% - ${GUTTER});
                height: 221px;
                margin: 8px;
            }

            .image.image--main {
                width: calc(50% - ${GUTTER});
                height: 450px;
            }

            .image.image--half {
                height: 450px;
            }

            .image :global(img) {
                position: absolute;
                height: 100%;
                width: 100%;
                object-fit: cover;
                border-radius: ${borderRadius.TERTIARY};
            }
        `}</style>
    </>
)

export default PhotoSection
