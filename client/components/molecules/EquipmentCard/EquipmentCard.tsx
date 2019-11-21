import React from 'react'

import {colors, borderRadius, spaces, typography} from 'styles'
import {Headline, Paragraph} from 'components/atoms'

const classes = {
    root: 'equipment-card',
}

interface Props {
    title: React.ReactNode
    image: React.ReactNode
}

type CardInterface = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const EquipmentCard: CardInterface = ({children, title, image}) => (
    <>
        <div className={classes.root}>
            <Headline as="h4">{title}</Headline>
            <div className="description">{children}</div>
            {image}
        </div>

        <style jsx>{`
            .equipment-card {
                position: relative;
                background-color: ${colors.WHITE};
                width: 100%;

                border: 1px solid ${colors.SHADE_EXTRA_LIGHT};
                border-radius: ${borderRadius.TERTIARY};
                padding: ${spaces.s36};

                text-decoration: none;
            }

            .equipment-card > .description {
                margin-top: ${spaces.s24};
                max-width: 70%;
            }

            .equipment-card > .description :global(.${Paragraph.classes.root}) {
                font-size: ${typography.fontSize.fs20};
                line-height: ${typography.lineHeight.lh30};
                margin: 0;
            }

            .equipment-card
                > .description
                :global(.${Paragraph.classes.root}):not(:last-of-type) {
                margin-bottom: ${spaces.s12};
            }

            .equipment-card :global(img) {
                position: absolute;
                right: 0;
                bottom: 0;
                max-width: 30%;
                max-height: 80%;
            }
        `}</style>
    </>
)

EquipmentCard.classes = classes

export default EquipmentCard
