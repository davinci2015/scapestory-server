import * as React from 'react'
import classnames from 'classnames'

import {typography, colors} from 'styles'

type HeadlineVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

interface Props {
    as?: HeadlineVariant,
    variant?: HeadlineVariant,
    children: React.ReactNode | string
    color?: string
}

const classes = {
    root: 'headline'
}

const Headline = ({
    as = 'h1',
    children,
    variant,
    color = colors.BLACK,
    ...props
}: Props) => {
    const Component = as

    return (
        <Component className={classnames(classes.root, variant ? variant : as)} {...props}> 
            {children}
            <style jsx>{`
                .${classes.root} {
                    color: ${color};
                }

                .h1, .h2, .h3, .h4, .h5 {
                    font-weight: ${typography.fontWeight.extraBold};
                }

                .h1 {
                    font-size: ${typography.fontSize.fs67};
                    line-height: ${typography.lineHeight.lh88};
                }

                .h2 {
                    font-size: ${typography.fontSize.fs51};
                    line-height: ${typography.lineHeight.lh66};
                }

                .h3 {
                    font-size: ${typography.fontSize.fs38};
                    line-height: ${typography.lineHeight.lh48};
                }

                .h4 {
                    font-size: ${typography.fontSize.fs28};
                    line-height: ${typography.lineHeight.lh36};
                }

                .h5 {
                    font-size: ${typography.fontSize.fs18};
                    line-height: ${typography.lineHeight.lh24};
                }
            `}</style>
        </Component>

    )
}

Headline.classes = classes

export default Headline