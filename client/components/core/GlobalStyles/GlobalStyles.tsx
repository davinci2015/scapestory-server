import React from 'react'
import typography from 'styles/typography'
import colors from 'styles/colors'

const GlobalStyles = () => (
    <style jsx global>{`
        * {
            box-sizing: border-box;
        }

        body {
            font-family: ${typography.fontFamily.PRIMARY};
            font-size: ${typography.fontSize.fs16};
            background-color: ${colors.BG};
        }
    `}</style>
)

export default GlobalStyles