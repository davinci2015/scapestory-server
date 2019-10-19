import React from 'react'
import {spaces, colors} from 'styles'

const Divider = () => (
    <>
        <div className="divider"></div>
        <style jsx>{`
            .divider {
                height: 1px;
                width: 100%;
                background-color: ${colors.SHADE_LIGHT};
                margin: ${spaces.s120} 0;
            }
        `}</style>
    </>
)

export default Divider