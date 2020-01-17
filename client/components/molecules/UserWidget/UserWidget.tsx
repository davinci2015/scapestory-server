import React, {SyntheticEvent} from 'react'
import classnames from 'classnames'

import {UserImage} from 'components/atoms'
import {spaces} from 'styles'
import {UserImageSize, UserImageVariant} from 'components/atoms/UserImage/UserImage'

export enum UserWidgetSize {
    s24,
    s36,
}

export enum UserWidgetVariant {
    DEFAULT,
    BORDER,
}

interface Props {
    image?: string | null
    text: React.ReactNode
    size?: UserWidgetSize
    variant?: UserWidgetVariant
    onClick?: (event: SyntheticEvent) => void
}

const userImageSizeMapping = {
    [UserWidgetSize.s24]: UserImageSize.s24,
    [UserWidgetSize.s36]: UserImageSize.s36,
}

const userImageVariantMapping = {
    [UserWidgetVariant.DEFAULT]: UserImageVariant.DEFAULT,
    [UserWidgetVariant.BORDER]: UserImageVariant.BORDER,
}

const classNames = {
    root: 'user-widget',
}

const UserWidget = ({
    image,
    onClick,
    text,
    size = UserWidgetSize.s24,
    variant = UserWidgetVariant.DEFAULT,
}: Props) => (
    <div
        onClick={onClick}
        className={classnames(classNames.root, {
            large: size === UserWidgetSize.s36,
        })}
    >
        <UserImage
            variant={userImageVariantMapping[variant]}
            size={userImageSizeMapping[size]}
            image={image}
        />

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
