import * as React from 'react'
import {typography, colors} from 'styles'
import cx from 'classnames'

interface Props {
    as?: 'p' | 'span',
    size?: 'xs' | 's' | 'body',
    color?: 'primary' | 'secondary' | 'light' | 'dark',
    children: React.ReactNode | string
    weight?: 'regular' | 'bold' | 'semibold'
}

const Paragraph = ({
    as = 'p',
    children,
    size = 'body',
    weight = 'regular',
    color = 'primary',
    ...props
}: Props) => {
    const Component = as

    return (
        <Component className={cx(size, weight, `color-${color}`)} {...props}> 

            {children}
            
            <style jsx>{`
                .body {
                    font-size: ${typography.fontSize.M};
                    line-height: ${typography.lineHeight.S};
                }

                .color-primary {
                    color: ${colors.PRIMARY};
                }

                .color-secondary {
                    color: ${colors.DARK_GRAY};
                }

                .color-light {
                    color: ${colors.WHITE};
                }

                .color-dark {
                    color: ${colors.BLACK};
                }

                .regular {
                    font-weight: ${typography.fontWeight.regular}; 
                }

                .semibold {
                    font-weight: ${typography.fontWeight.semibold};
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