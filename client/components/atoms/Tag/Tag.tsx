import React from 'react'
import cx from 'classnames'

import {Paragraph} from 'components/atoms'
import {colors, spaces} from 'styles'
import {ParagraphTypes} from 'components/atoms/Paragraph'

type VariantType = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
export type TagSize = 'default' | 'large'

interface Props {
    text: string
    variant?: VariantType
    size?: TagSize
}

const colorMapping = {
    primary: '#53bd94',
    secondary: '#4ea099',
    tertiary: '#2f4f6c',
    quaternary: '#de79ae',
}

const paragraphTypeMapping: {[T in TagSize]: ParagraphTypes} = {
    default: 't1',
    large: 's2',
}

const classes = {
    root: 'tag',
}

const Tag = ({text, variant = 'primary', size = 'default'}: Props) => {
    return (
        <div
            className={cx(classes.root, {
                large: size === 'large',
            })}
        >
            <Paragraph
                as="span"
                type={paragraphTypeMapping[size]}
                weight="semibold"
                color={colors.WHITE}
            >
                {text}
            </Paragraph>

            <style jsx>{`
                .${classes.root} {
                    padding: 0 ${spaces.s6};
                    border-radius: 20px;
                    align-items: center;
                    display: inline-flex;

                    width: auto;

                    background-color: ${colorMapping[variant]};
                }

                .large {
                    padding: ${spaces.s4} ${spaces.s16};
                }
            `}</style>
        </div>
    )
}

Tag.classes = classes

export default Tag
