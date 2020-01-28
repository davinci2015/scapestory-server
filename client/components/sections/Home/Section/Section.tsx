import React from 'react'

import {spaces, media} from 'styles'

interface Props {}

const Section: React.FunctionComponent<Props> = ({children}) => (
    <>
        <div className="section">{children}</div>
        <style jsx>{`
            .section {
                padding-bottom: ${spaces.s60};
            }

            @media ${media.up('medium')} {
                .section {
                    padding-bottom: ${spaces.s90};
                }
            }
        `}</style>
    </>
)

export default Section
