import * as React from 'react'
import {typography} from 'styles'
import cx from 'classnames'

interface Props {
    as?: 'p' | 'span',
    size?: 'xs' | 's' | 'body',
    children: React.ReactNode | string
    weight?: 'regular' | 'bold'
}

const Paragraph = ({
    as = 'p',
    children,
    size = 'body',
    weight = 'regular',
    ...props
}: Props) => {
    const Component = as

    return (
        <Component className={cx(size, weight)} {...props}> 
            {children}
            <style jsx>{`
                .body {
                    font-size: ${typography.fontSize.M};
                    line-height: ${typography.lineHeight.S};
                }

                .regular {
                    font-weight: ${typography.fontWeight.regular}; 
                }

                .bold {
                    font-weight: ${typography.fontWeight.bold};
                }

                .s {
                    font-size: ${typography.fontSize.S};
                    line-height: ${typography.lineHeight.S};
                }

                .xs {
                    font-size: ${typography.fontSize.XS};
                    line-height: ${typography.lineHeight.XS};
                }
            `}</style>
        </Component>

    )
}

export default Paragraph