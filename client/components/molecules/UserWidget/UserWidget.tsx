import React from 'react'
import classnames from 'classnames'

import {Paragraph, UserImage} from 'components/atoms'
import {colors, spaces} from 'styles'
import {ParagraphTypes} from 'components/atoms/Paragraph'

const classes = {
    root: 'userWidget'
}

type WidgetSizes = 'default' | 'l'

interface Props {
    image: string
    name: React.ReactNode
    size?: WidgetSizes
    color?: string
    variant?: 'default' | 'border'
}

const paragraphMapping = {
    default: 's2',
    l: 'body'
} as {[key in WidgetSizes]: ParagraphTypes}

const UserWidget = ({
    image,
    name,
    size = 'default',
    variant = 'default',
    color = colors.SHADE_DEEP
}: Props) => (
    <div className={classnames(classes.root, {
        large: size === 'l'
    })}>
        <UserImage variant={variant} size={size} image={image}/>
        <Paragraph as="span" type={paragraphMapping[size]} color={color}>
            {name}
        </Paragraph>
        
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