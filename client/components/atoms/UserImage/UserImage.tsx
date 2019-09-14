import React from 'react'
import classnames from 'classnames'

import {backgroundImage} from 'styles/mixins'
import {colors} from 'styles';

const classes = {
    root: 'userImage'
}

interface Props {
    image: string
    size?: 'default' | 'large'
    variant?: 'default' | 'border'
}

const UserImage = ({
    image,
    size = 'default',
    variant = 'default',
}: Props) => (
    <>
        <div className={classnames(classes.root, {
            large: size === 'large',
            border: variant === 'border'
        })}></div>
        <style jsx>{`
            .${classes.root} {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                ${backgroundImage(image)}       
            }

            .large {
                width: 36px;
                height: 36px;
            }

            .border {
                border: 1px solid ${colors.WHITE};
            }
        `}</style>
    </>
)

UserImage.classes = classes

export default UserImage