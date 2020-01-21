import React from 'react'
import {typography, colors} from 'styles'
import cx from 'classnames'

export type ParagraphTypes = 't1' | 's1' | 's2' | 's3' | 'body'

interface Props {
    as?: 'p' | 'span'
    type?: ParagraphTypes
    color?: string
    children: React.ReactNode | string
    weight?: 'regular' | 'bold' | 'semibold'
}

const classes = {
    root: 'paragraph',
}

const Paragraph = ({
    as = 'p',
    children,
    color = colors.BLACK,
    type = 'body',
    weight = 'regular',
    ...props
}: Props) => {
    const Component = as

    return (
        <Component className={cx(classes.root, type, weight)} {...props}>
            {children}

            <style jsx>{`
                .paragraph {
                    margin: 0;
                    color: ${color};
                    white-space: pre-wrap;
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

                .t1 {
                    font-size: ${typography.fontSize.fs11};
                    line-height: ${typography.lineHeight.lh18};
                }

                .s1 {
                    font-size: ${typography.fontSize.fs14};
                    line-height: ${typography.lineHeight.lh24};
                }

                .s2 {
                    font-size: ${typography.fontSize.fs13};
                    line-height: ${typography.lineHeight.lh18};
                }

                .s3 {
                    font-size: ${typography.fontSize.fs20};
                    line-height: ${typography.lineHeight.lh24};
                }

                .body {
                    font-size: ${typography.fontSize.fs16};
                    line-height: ${typography.lineHeight.lh24};
                }
            `}</style>
        </Component>
    )
}

Paragraph.classes = classes

export default Paragraph
