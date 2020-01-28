import React from 'react'
import {noop} from 'lodash'

import {spaces, borderRadius, colors, media} from 'styles'
import {FormattedMessage, Button, Icon, Paragraph} from 'components/atoms'

interface Image {
    id: number
    src: string
    alt?: string | null
}

interface Props {
    onImageRemove?: (id: number) => void
    openGallery: (imageIndex: number) => void
    images: Image[]
    edit?: boolean
}

const GUTTER = spaces.s16
const ALT_PLACEHOLDER = 'Scapostory post'

const ButtonRemovePhoto = ({id, onClick}: {onClick: (id: number) => void; id: number}) => (
    <Button
        onClick={() => onClick(id)}
        dimensions="small"
        color="tertiary"
        leftIcon={<Icon d={Icon.BIN} color={colors.WHITE} />}
    >
        <FormattedMessage id="photo_grid.remove_photo" defaultMessage="Remove" />
    </Button>
)

const PhotoSection: React.FunctionComponent<Props> = ({
    edit,
    images,
    onImageRemove = noop,
    openGallery,
}) => (
    <>
        <div className="photo-grid">
            <div className="row">
                {images[0] ? (
                    <div className="image image--main">
                        <img
                            onClick={() => openGallery(0)}
                            src={images[0].src}
                            alt={images[0].alt || ALT_PLACEHOLDER}
                        />
                        {edit && (
                            <div className="btn-wrapper">
                                <ButtonRemovePhoto id={images[0].id} onClick={onImageRemove} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="image image--main">
                        <div className="placeholder-text">
                            <Paragraph color={colors.DARK_GRAY} type="body" weight="bold">
                                <FormattedMessage
                                    id="photo_grid.no_images"
                                    defaultMessage="No photos in the diary :("
                                />
                            </Paragraph>
                        </div>
                    </div>
                )}
                {images[1] ? (
                    <div className="image image--half">
                        <img
                            onClick={() => openGallery(1)}
                            src={images[1].src}
                            alt={images[1].alt || ALT_PLACEHOLDER}
                        />
                        {edit && (
                            <div className="btn-wrapper">
                                <ButtonRemovePhoto id={images[1].id} onClick={onImageRemove} />
                            </div>
                        )}
                    </div>
                ) : (
                    edit && <div className="image image--half"></div>
                )}
                <div className="column">
                    {images[2] ? (
                        <div className="image">
                            <img
                                onClick={() => openGallery(2)}
                                src={images[2].src}
                                alt={images[2].alt || ALT_PLACEHOLDER}
                            />
                            {edit && (
                                <div className="btn-wrapper">
                                    <ButtonRemovePhoto id={images[2].id} onClick={onImageRemove} />
                                </div>
                            )}
                        </div>
                    ) : (
                        edit && <div className="image"></div>
                    )}
                    {images[3] ? (
                        <div className="image">
                            <img
                                onClick={() => openGallery(3)}
                                src={images[3].src}
                                alt={images[3].alt || ALT_PLACEHOLDER}
                            />
                            {edit && (
                                <div className="btn-wrapper">
                                    <ButtonRemovePhoto id={images[3].id} onClick={onImageRemove} />
                                </div>
                            )}
                        </div>
                    ) : (
                        edit && <div className="image"></div>
                    )}
                </div>
            </div>
            <div className="row">
                {images.slice(4).map((image, index) => (
                    <div className="image" key={image.src}>
                        <img
                            onClick={() => openGallery(index + 4)}
                            src={image.src}
                            alt={image.alt || ALT_PLACEHOLDER}
                        />
                        {edit && (
                            <div className="btn-wrapper">
                                <ButtonRemovePhoto id={image.id} onClick={onImageRemove} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        <style jsx>{`
            .photo-grid .btn-wrapper {
                position: absolute;
                margin-top: ${spaces.s16};
                margin-left: ${spaces.s16};
            }

            .photo-grid .placeholder-text {
                position: absolute;
                text-align: center;
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
            }

            .row {
                display: flex;
                flex-wrap: wrap;
            }

            .column {
                width: 100%;
            }

            .image {
                position: relative;
                width: 100%;
                height: 200px;
                margin-bottom: ${spaces.s16};
                cursor: pointer;

                background-color: ${colors.SHADE_EXTRA_LIGHT};
                border-radius: ${borderRadius.TERTIARY};
            }

            .image :global(img) {
                position: absolute;
                height: 100%;
                width: 100%;
                object-fit: cover;
                border-radius: ${borderRadius.TERTIARY};
            }

            @media ${media.up('small')} {
                .row {
                    margin-left: -${spaces.s8};
                }

                .column {
                    display: flex;
                }

                .image {
                    width: calc(50% - ${GUTTER});
                    margin: ${spaces.s8};
                    height: 180px;
                }
            }

            @media ${media.up('medium')} {
                .row {
                    display: flex;
                    flex-wrap: wrap;
                }

                .column {
                    display: block;
                    width: calc(25% - ${GUTTER});
                }

                .column .image {
                    width: 100%;
                }

                .image {
                    width: calc(25% - ${GUTTER});
                    height: 221px;
                    margin: ${spaces.s8};
                }

                .image.image--main {
                    width: calc(50% - ${GUTTER});
                    height: 450px;
                }

                .image.image--half {
                    height: 450px;
                }
            }
        `}</style>
    </>
)

export default PhotoSection
