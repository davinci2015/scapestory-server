import React from 'react'
import classnames from 'classnames'

import {UserImage} from 'components/atoms'
import {spaces} from 'styles'

const classes = {
    root: 'userWidget'
}

type WidgetSizes = 'default' | 'l'

interface Props {
    image: string
    text: React.ReactNode
    size?: WidgetSizes
    color?: string
    variant?: 'default' | 'border'
}

const UserWidget = ({
    image,
    size = 'default',
    variant = 'default',
    text
}: Props) => (
    <div className={classnames(classes.root, {
        large: size === 'l'
    })}>
        <UserImage variant={variant} size={size} image={image}/>

        {text}
        
        <style jsx>{`
            .${classes.root} {
                display: flex;
                align-items: center;
            }

            .${classes.root} :global(.${UserImage.classes.root}) {
                margin-right: ${spaces.s6};
            }

            .large.${classes.root} :global(.${UserImage.classes.root}) {
                margin-right: ${spaces.s18};
            }
        `}</style>
    </div>
)

UserWidget.classes = classes

export default UserWidget