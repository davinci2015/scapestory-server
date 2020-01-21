import React from 'react'
import classnames from 'classnames'

import {backgroundImage} from 'styles/mixins'
import {colors} from 'styles'

const classes = {
    root: 'userImage',
}

export enum UserImageSize {
    s24,
    s36,
    s148,
}

export enum UserImageVariant {
    DEFAULT,
    BORDER,
}

interface Props {
    image?: string | null
    size?: UserImageSize
    variant?: UserImageVariant
}

const sizeMapping = {
    [UserImageSize.s24]: '24px',
    [UserImageSize.s36]: '36px',
    [UserImageSize.s148]: '148px',
}

const borderSizeMapping = {
    [UserImageSize.s24]: '1px',
    [UserImageSize.s36]: '1px',
    [UserImageSize.s148]: '3px',
}

type UserImageType = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const UserImage: UserImageType = ({
    image = '/static/placeholders/user.png',
    size = UserImageSize.s24,
    variant = UserImageVariant.DEFAULT,
    children,
}) => (
    <>
        <div
            className={classnames(classes.root, {
                border: variant === UserImageVariant.BORDER,
            })}
        >
            {children}
        </div>
        <style jsx>{`
            .${classes.root} {
                position: relative;
                width: ${sizeMapping[size]};
                height: ${sizeMapping[size]};
                border-radius: 50%;
                ${backgroundImage(image || '')}
            }

            .border {
                border: ${borderSizeMapping[size]} solid ${colors.WHITE};
            }
        `}</style>
    </>
)

UserImage.classes = classes

export default UserImage
