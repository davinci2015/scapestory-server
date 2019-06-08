import * as React from 'react'
import {typography} from 'styles'

interface Props {
    as?: 'p' | 'span',
    size?: 'xs' | 's' | 'body',
    children: React.ReactNode | string
}

const Paragraph = ({
    as = 'p',
    children,
    size = 'body',
    ...props
}: Props) => {
    const Component = as

    return (
        <Component className={size} {...props}> 
            {children}
            <style jsx>{`
                .body {
                    font-size: ${typography.fontSize.M};
                    line-height: ${typography.lineHeight.S}
                }

                .s {
                    font-size: ${typography.fontSize.S};
                    line-height: ${typography.lineHeight.S}
                }

                .xs {
                    font-size: ${typography.fontSize.XS};
                    line-height: ${typography.lineHeight.XS}
                }
            `}</style>
        </Component>

    )
}

export default Paragraph