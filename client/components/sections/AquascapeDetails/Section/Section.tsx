import React from 'react'

import {spaces, media} from 'styles'

interface Props {}

const Section: React.FunctionComponent<Props> = ({children}) => (
    <>
        <div className="section">{children}</div>
        <style jsx>{`
            .section {
                padding-top: ${spaces.s60};
                padding-bottom: ${spaces.s90};
            }

            @media ${media.up('medium')} {
                .section {
                    padding-top: ${spaces.s90};
                    padding-bottom: ${spaces.s120};
                }
            }
        `}</style>
    </>
)

export default Section
