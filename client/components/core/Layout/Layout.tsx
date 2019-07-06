import React from 'react'
import typography from 'styles/typography'
import colors from 'styles/colors'

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
                font-family: ${typography.fontFamily.PRIMARY};
                font-size: ${typography.fontSize.M};
                background-color: ${colors.BG};
            }
        `}</style>
    </>
)

export default Layout