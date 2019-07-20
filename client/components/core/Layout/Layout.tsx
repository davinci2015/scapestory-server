import React from 'react'
import typography from 'styles/typography'
import colors from 'styles/colors'
import {navigationHeight} from 'components/molecules/Navigation'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => (
    <>
        {children}
        <style jsx global>{`
            * {
                box-sizing: border-box;
            }

            body {
                padding-top: ${navigationHeight.default};
                font-family: ${typography.fontFamily.PRIMARY};
                font-size: ${typography.fontSize.fs16};
                background-color: ${colors.BG};
            }
        `}</style>
    </>
)

export default Layout