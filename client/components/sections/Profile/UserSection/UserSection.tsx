import React from 'react'

import {spaces} from 'styles'

interface Props {
    userImage: React.ReactNode
    username: React.ReactNode
    stats: React.ReactNode
    about: React.ReactNode
}

const UserSection: React.FunctionComponent<Props> = ({about, stats, userImage, username}) => (
    <>
        <div className="section">
            <div className="user-image">{userImage}</div>
            <div className="user">
                <div className="username">{username}</div>
                <div className="user-info">
                    {stats}
                    <div className="user-info__about">{about}</div>
                </div>
            </div>
        </div>
        <style jsx>{`
            .section {
                position: relative;
                margin-top: -74px;
            }

            .user-image {
                position: absolute;
                left: -190px;
            }

            .username {
                padding-top: 14px;
                padding-bottom: 24px;
            }

            .user-info {
                margin-top: ${spaces.s36};
            }

            .user-info__about {
                margin: ${spaces.s60} 0;
            }
        `}</style>
    </>
)

export default UserSection
