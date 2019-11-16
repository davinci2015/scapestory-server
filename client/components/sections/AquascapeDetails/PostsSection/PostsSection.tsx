import React from 'react'
import {spaces} from 'styles'
import {Headline, FormattedMessage} from 'components/atoms'
import mock from 'mocks/storybook'
import {PhotoGrid} from 'components/molecules'

interface Props {

}

const PostsSection: React.FunctionComponent<Props> = ({}) => (
    <>
        <div className="section">
            <Headline as="h2" variant="h3">
                <FormattedMessage id="aquascape.posts.title" defaultMessage="Photo posts" />
            </Headline>

            <PhotoGrid images={[
                {src: mock.aquascapeImage, alt: 'Image'},
                {src: mock.aquascapeImage, alt: 'Image'},
                {src: mock.aquascapeImage, alt: 'Image'},
                {src: mock.aquascapeImage, alt: 'Image'},
                {src: mock.aquascapeImage, alt: 'Image'},
                {src: mock.aquascapeImage, alt: 'Image'},
                {src: mock.aquascapeImage, alt: 'Image'}
            ]} />
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

export default PostsSection