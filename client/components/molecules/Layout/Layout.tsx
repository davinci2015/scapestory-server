import React from 'react'
import typography from 'styles/typography'
import colors from 'styles/colors'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => (
    <React.Fragment>
        {children}
        <style jsx global>{`
            body {
                font-family: ${typography.fontFamily.PRIMARY};
                font-size: ${typography.fontSize.M};
                background-color: ${colors.BG}
            }
        `}</style>
    </React.Fragment>
)

export default Layout