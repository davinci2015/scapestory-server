import React from 'react'

import {backgroundImage} from 'styles/mixins'

interface Props {
    image: string
    size?: 'default' | 'l'
}

const UserImage = ({
    image,
    size = 'default'
}: Props) => (
    <>
        <div className="user-image"></div>
        <style jsx>{`
            .user-image {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                ${backgroundImage(image)}

                ${size === 'l' && `
                    width: 36px;
                    height: 36px;
                `}
            }
        `}</style>
    </>
)

export default UserImage