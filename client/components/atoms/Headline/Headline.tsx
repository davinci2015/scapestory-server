import React from 'react'
import classnames from 'classnames'

import {typography, colors, media} from 'styles'

type HeadlineVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

interface Props {
    as?: HeadlineVariant,
    variant?: HeadlineVariant,
    children: React.ReactNode | string
    color?: string
    fontWeight?: number
}

const classes = {
    root: 'headline'
}

const Headline = ({
    as = 'h1',
    children,
    variant,
    color = colors.BLACK,
    fontWeight = typography.fontWeight.extraBold,
    ...props
}: Props) => {
    const Component = as

    return (
        <Component className={classnames(classes.root, variant ? variant : as)} {...props}> 
            {children}
            <style jsx>{`
                .${classes.root} {
                    color: ${color};
                    margin: 0;
                }

                .h1, .h2, .h3, .h4, .h5 {
                    font-weight: ${fontWeight};
                }

                .h1 {
                    font-size: ${typography.fontSize.fs51};
                    line-height: ${typography.lineHeight.lh66};
                }

                @media ${media.up('medium')} {
                    .h1 {

                        font-size: ${typography.fontSize.fs67};
                        line-height: ${typography.lineHeight.lh88};
                    }
                }

                .h2 {
                    font-size: ${typography.fontSize.fs38};
                    line-height: ${typography.lineHeight.lh48};
                }

                @media ${media.up('medium')} {
                    .h2 {
                        font-size: ${typography.fontSize.fs51};
                        line-height: ${typography.lineHeight.lh66};
                    }
                }

                .h3 {
                    font-size: ${typography.fontSize.fs28};
                    line-height: ${typography.lineHeight.lh36};
                }

                @media ${media.up('medium')} {
                    .h3 {
                        font-size: ${typography.fontSize.fs38};
                        line-height: ${typography.lineHeight.lh48};
                    }
                }

                .h4 {
                    font-size: ${typography.fontSize.fs21};
                    line-height: ${typography.lineHeight.lh24};
                }

                @media ${media.up('medium')} {
                    .h4 {
                        font-size: ${typography.fontSize.fs28};
                        line-height: ${typography.lineHeight.lh36};
                    }
                }

                .h5 {
                    font-size: ${typography.fontSize.fs16};
                    line-height: ${typography.lineHeight.lh18};
                }
                
                @media ${media.up('medium')} {
                    .h5 {
                        font-size: ${typography.fontSize.fs18};
                        line-height: ${typography.lineHeight.lh24};
                    }
                }
            `}</style>
        </Component>

    )
}

Headline.classes = classes

export default Headline