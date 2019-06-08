import * as React from 'react'
import {typography} from 'styles'

type HeadlineVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

interface Props {
    as?: HeadlineVariant,
    variant?: HeadlineVariant,
    children: React.ReactNode | string
}

const Headline = ({
    as = 'h1',
    children,
    variant,
    ...props
}: Props) => {
    const Component = as

    return (
        <Component className={variant ? variant : as} {...props}> 
            {children}
            <style jsx>{`
                .h1 {
                    font-size: ${typography.fontSize.XXXXL};
                    line-height: ${typography.lineHeight.XXL};
                }

                .h2 {
                    font-size: ${typography.fontSize.XXXL};
                    line-height: ${typography.lineHeight.XL};
                }

                .h3 {
                    font-size: ${typography.fontSize.XXL};
                    line-height: ${typography.lineHeight.XL};
                }

                .h4 {
                    font-size: ${typography.fontSize.XL};
                    line-height: ${typography.lineHeight.L};
                }

                .h5 {
                    font-size: ${typography.fontSize.L};
                    line-height: ${typography.lineHeight.M};
                }
            `}</style>
        </Component>

    )
}

export default Headline