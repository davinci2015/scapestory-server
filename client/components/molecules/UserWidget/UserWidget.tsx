import React, {SyntheticEvent} from 'react'
import classnames from 'classnames'

import {UserImage} from 'components/atoms'
import {spaces} from 'styles'

export type UserWidgetSize = 'default' | 'large'

export type UserWidgetVariant = 'default' | 'border'

interface Props {
    image?: string | null
    text: React.ReactNode
    size?: UserWidgetSize
    variant?: UserWidgetVariant
    onClick?: (event: SyntheticEvent) => void
}

const classNames = {
    root: 'user-widget',
}

const UserWidget = ({image, onClick, size = 'default', variant = 'default', text}: Props) => (
    <div
        onClick={onClick}
        className={classnames(classNames.root, {
            large: size === 'large',
        })}
    >
        <UserImage variant={variant} size={size} image={image} />

        {text}

        <style jsx>{`
            .user-widget {
                display: flex;
                align-items: center;
            }

            .user-widget :global(.${UserImage.classes.root}) {
                margin-right: ${spaces.s6};
            }

            .large.user-widget :global(.${UserImage.classes.root}) {
                margin-right: ${spaces.s18};
            }
        `}</style>
    </div>
)

UserWidget.classes = classNames

export default UserWidget
