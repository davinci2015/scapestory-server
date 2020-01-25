import React, {useState} from 'react'
import {spaces} from 'styles'
import {Headline, FormattedMessage} from 'components/atoms'
import {PhotoGrid, Gallery} from 'components/molecules'
import {AquascapeImage} from 'graphql/generated/types'

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
    const [isGalleryOpen, changeGalleryOpen] = useState(true)
    if (!images) return null

    const openGallery = () => changeGalleryOpen(true)

    const closeGallery = () => changeGalleryOpen(false)

    const sortedImages = images.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))

    return (
        <>
            <div className="section">
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
            <Gallery onClose={closeGallery} isOpen={isGalleryOpen}>
                {sortedImages.map(image => (
                    <Gallery.Image key={image.id} src={image.url} />
                ))}
            </Gallery>
            <style jsx>{`
                .section {
                    padding-top: ${spaces.s90};
                    padding-bottom: ${spaces.s120};
                }

                .section :global(.${Headline.classes.root}) {
                    margin-bottom: ${spaces.s60};
                }
            `}</style>
        </>
    )
}

export default PostsSection
