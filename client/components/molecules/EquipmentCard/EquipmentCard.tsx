import React from 'react'

import {colors, borderRadius, spaces, typography} from 'styles'
import {Headline} from 'components/atoms';

const classes = {
    root: 'equipment-card'
}

interface Props {
    title: string
    image: React.ReactNode
}

type CardInterface = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const EquipmentCard: CardInterface = ({children, title, image}) => (
        <>
            <div className={classes.root}>
                <Headline as="h4">
                    {title}
                </Headline>
                <div className="description">
                    {children}
                </div>
                {image}
            </div>

            <style jsx>{`
                .equipment-card {
                    position: relative;
                    background-color: ${colors.WHITE};
                    
                    border: 1px solid ${colors.SHADE_EXTRA_LIGHT};
                    border-radius: ${borderRadius.TERTIARY};
                    padding: ${spaces.s36};
                    
                    text-decoration: none;
                }

                .equipment-card > .description {
                    margin-top: ${spaces.s24};
                    font-size: ${typography.fontSize.fs18};
                }

                .equipment-card :global(img) {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    max-width: 180px;
                    max-height: 80%;
                }
            `}</style>
        </>
    )

EquipmentCard.classes = classes

export default EquipmentCard