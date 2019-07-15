import React from 'react'
import {Paragraph, UserImage} from 'components/atoms'
import {colors, spaces} from 'styles'

const classes = {
    root: 'userWidget'
}

interface Props {
    image: string
    name: React.ReactNode
}

const UserWidget = ({
    image,
    name
}: Props) => (
    <div className={classes.root}>
        <UserImage image={image}/>
        <Paragraph as="span" type="s1" color={colors.SHADE_DEEP}>
            {name}
        </Paragraph>
        
        <style jsx>{`
            .user-widget {
                display: flex;
            }

            .user-widget :global(.${UserImage.classes.root}) {
                margin-right: ${spaces.s6};
            }
        `}</style>
    </div>
)

UserWidget.classes = classes

export default UserWidget