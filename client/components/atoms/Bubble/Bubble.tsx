import React from 'react'
import {colors, zIndex} from 'styles'

interface Props {
    size?: string
    opacity?: number
}

const Bubble = ({opacity = 0.05, size = '300px'}: Props) => (
    <div className="bubble">
        <style jsx>{`
            .bubble {
                width: ${size};
                height: ${size};
                border-radius: 50%;
                border: 14px solid ${colors.PRIMARY};
                opacity: ${opacity};
                z-index: ${zIndex.BELOW};
            }
        `}</style>
    </div>
)

export default Bubble
