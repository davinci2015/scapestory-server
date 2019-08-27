import React from 'react'
import classnames from 'classnames'

import {UserImage} from 'components/atoms'
import {spaces} from 'styles'

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
    <div className={classnames('user-widget', {
        large: size === 'l'
    })}>
        <UserImage variant={variant} size={size} image={image}/>

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

export default UserWidget