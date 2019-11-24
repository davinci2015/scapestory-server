import React from 'react'
import {spaces} from 'styles'
import {Headline, FormattedMessage, Paragraph} from 'components/atoms'
import {PhotoGrid} from 'components/molecules'
import {AquascapeImage} from 'graphql/generated/types'

interface Props {
    images: AquascapeImage[] | null
}

const PostsSection: React.FunctionComponent<Props> = ({images}) => {
    if (!images) return null

    return (
        <>
            <div className="section">
                <Headline as="h2" variant="h3">
                    <FormattedMessage id="aquascape.posts.title" defaultMessage="Photo posts" />
                </Headline>
                {!!images.length ? (
                    <PhotoGrid
                        images={images.map(image => ({
                            src: image.url,
                            alt: image.title,
                        }))}
                    />
                ) : (
                    <Paragraph type="body" as="span">
                        <FormattedMessage
                            id="aquascape.posts.no_photos"
                            defaultMessage="No photos uploaded"
                        />
                    </Paragraph>
                )}
            </div>
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
