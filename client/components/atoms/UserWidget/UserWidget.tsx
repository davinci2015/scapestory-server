import React from 'react'
import {backgroundImage} from 'styles/mixins'
import {Paragraph} from 'components/atoms'
import {colors, spaces} from 'styles'

interface Props {
    image: string
    name: React.ReactNode
}

const UserWidget = ({
    image,
    name
}: Props) => (
    <div className="user-widget">
        <div className="image"></div>
        <Paragraph as="span" type="s1" color={colors.SHADE_DEEP}>{name}</Paragraph>
        <style jsx>{`
            .user-widget {
                display: flex;
            }

            .image {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: ${spaces.s6};
                ${backgroundImage(image)}
            }
        `}</style>
    </div>
)

export default UserWidget