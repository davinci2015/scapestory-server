import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {zIndex} from 'styles'

interface Props {
    user: UserBySlugQuery['user']
    toggleFollow: () => void
}

const COVER_PLACEHOLDER = 'https://ak9.picdn.net/shutterstock/videos/1014275129/thumb/1.jpg'

const CoverSection: React.FunctionComponent<Props> = ({user}) => {
    if (!user) return null

    return (
        <>
            <div className="section">
                <div className="cover">
                    <img
                        className="cover-image"
                        src={user.coverImage || COVER_PLACEHOLDER}
                        alt="Aquascape user"
                    />
                </div>
            </div>
            <style jsx>{`
                .section {
                }

                .cover {
                    position: relative;
                    width: 100%;
                    height: 270px;
                }

                .cover-image {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: ${zIndex.BELOW};
                }
            `}</style>
        </>
    )
}

export default CoverSection
