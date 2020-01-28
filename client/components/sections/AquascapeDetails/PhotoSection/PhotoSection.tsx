import React, {useState} from 'react'
import {spaces, colors, media} from 'styles'
import {Headline, FormattedMessage, Icon, Button} from 'components/atoms'
import {PhotoGrid, Gallery} from 'components/molecules'
import {AquascapeImage} from 'graphql/generated/types'
import Section from 'components/sections/AquascapeDetails/Section'
import {ImageUpload} from 'components/core'

interface Props {
    edit?: boolean
    onImageChange?: (files: FileList | null) => void
    onImageRemove?: (id: number) => void
    images: Pick<AquascapeImage, 'id' | 'title' | 'url' | 'createdAt'>[]
}

const PostsSection: React.FunctionComponent<Props> = ({
    edit,
    images,
    onImageChange,
    onImageRemove,
}) => {
    const [isGalleryOpen, changeGalleryOpen] = useState(false)
    const [imageIndex, changeImageIndex] = useState(0)
    if (!images) return null

    const openGallery = (imageIndex: number = 0) => {
        changeGalleryOpen(true)
        changeImageIndex(imageIndex)
    }

    const closeGallery = () => changeGalleryOpen(false)

    const sortedImages = images.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))

    return (
        <>
            <Section>
                <div className="photo-section">
                    <Headline as="h2" variant="h3">
                        <FormattedMessage id="aquascape.posts.title" defaultMessage="Photo Diary" />
                    </Headline>
                    {edit && onImageChange && (
                        <div className="add-photo">
                            <ImageUpload
                                multiple
                                onChange={onImageChange}
                                render={({openFinder}) => (
                                    <Button
                                        onClick={openFinder}
                                        dimensions="small"
                                        color="primary"
                                        leftIcon={<Icon d={Icon.CAMERA} color={colors.WHITE} />}
                                    >
                                        <FormattedMessage
                                            id="photo_grid.add_photo"
                                            defaultMessage="Add photo"
                                        />
                                    </Button>
                                )}
                            />
                        </div>
                    )}
                    <PhotoGrid
                        edit={edit}
                        onImageRemove={onImageRemove}
                        openGallery={openGallery}
                        images={sortedImages
                            .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
                            .map(image => ({
                                id: image.id,
                                src: image.url,
                                alt: image.title,
                            }))}
                    />
                </div>
            </Section>
            <Gallery
                startIndex={imageIndex}
                onClose={closeGallery}
                isOpen={isGalleryOpen}
                images={sortedImages.map(image => ({
                    original: image.url,
                    thumbnail: image.url,
                }))}
            />
            <style jsx>{`
                .photo-section :global(.${Headline.classes.root}) {
                    margin-bottom: ${spaces.s60};
                }

                .photo-section .add-photo {
                    margin-bottom: ${spaces.s16};
                }

                @media ${media.up('small')} {
                    .photo-section .add-photo {
                        margin-bottom: ${spaces.s8};
                    }
                }
            `}</style>
        </>
    )
}

export default PostsSection
