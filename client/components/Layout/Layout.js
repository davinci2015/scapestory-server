import React from 'react'
import typography from '../../styles/typography'

const Layout = ({children}) => (
    <React.Fragment>
        {children}
        <style jsx global>{`
            body {
                font-family: ${typography.PRIMARY_FONT}
            }
        `}</style>
    </React.Fragment>
)

export default Layout