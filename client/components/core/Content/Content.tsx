import React from 'react'
import {navigationHeight} from 'components/molecules/Navigation'

type Props = {
    children: React.ReactNode
}

const Content = ({children}: Props) => (
    <div className="content">
        {children}
        <style jsx>{`
            .content {
                padding-top: ${navigationHeight.DEFAULT};
            }
        `}</style>
    </div>
)

export default Content
