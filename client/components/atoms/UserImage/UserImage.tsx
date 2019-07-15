import React from 'react'

import {backgroundImage} from 'styles/mixins'

const classes = {
    root: 'userImage'
}

interface Props {
    image: string
    size?: 'default' | 'l'
}

const UserImage = ({
    image,
    size = 'default'
}: Props) => (
    <>
        <div className={classes.root}></div>
        <style jsx>{`
            .${classes.root} {
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

UserImage.classes = classes

export default UserImage