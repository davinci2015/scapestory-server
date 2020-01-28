import React, {useState} from 'react'
import {spaces} from 'styles'
import {Headline, FormattedMessage} from 'components/atoms'
import {PhotoGrid, Gallery} from 'components/molecules'
import {AquascapeImage} from 'graphql/generated/types'
import Section from 'components/sections/AquascapeDetails/Section'

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
                    <PhotoGrid
                        edit={edit}
                        onImageChange={onImageChange}
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
            `}</style>
        </>
    )
}

export default PostsSection
