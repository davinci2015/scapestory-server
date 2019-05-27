import React from 'react'
import typography from 'styles/typography'
import colors from 'styles/colors'

const Layout = ({children}) => (
    <React.Fragment>
        {children}
        <style jsx global>{`
            body {
                font-family: ${typography.PRIMARY_FONT};
                font-size: 16px;
                background-color: ${colors.BG}
            }
        `}</style>
    </React.Fragment>
)

export default Layout