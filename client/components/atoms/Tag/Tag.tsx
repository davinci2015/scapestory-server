import React from 'react'

import {Paragraph} from 'components/atoms'
import {colors} from 'styles'

type VariantType = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

interface Props {
    text: string
    variant: VariantType
}

const colorMapping = {
    primary: '#53bd94',
    secondary: '#4ea099',
    tertiary: '#2f4f6c',
    quaternary: '#de79ae'
}

const getColor = (variant: VariantType) => colorMapping[variant]

const Tag = ({
    text,
    variant
}: Props) => {
  
    return (
        <div className="tag">
            <Paragraph as="span" type="t1" weight="semibold" color={colors.WHITE}>{text}</Paragraph>
            <style jsx>{`
            .tag {
                padding: 0 8px;
                border-radius: 20px;
                text-align: center;
                display: inline-flex;

                height: 18px;
                width: auto;

                background-color: ${getColor(variant)};
            }
        `}</style>
        </div>
    )
}
export default Tag