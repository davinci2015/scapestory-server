import React from 'react'
import {spaces} from 'styles'
import {Headline, FormattedMessage} from 'components/atoms'

interface Props {

}

const PostsSection: React.FunctionComponent<Props> = ({}) => (
    <>
        <div className="section">
            <Headline as="h2" variant="h3">
                <FormattedMessage id="aquascape.posts.title" defaultMessage="Photo posts" />
            </Headline>
        </div>
        <style jsx>{`
            .section {
                padding-top: ${spaces.s90};
                padding-bottom: ${spaces.s120};
            }
        `}</style>
    </>
)

export default PostsSection