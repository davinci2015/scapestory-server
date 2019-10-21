import React from 'react'
import {colors} from 'styles'

const Divider = () => (
    <>
        <div className="divider"></div>
        <style jsx>{`
            .divider {
                height: 1px;
                width: 100%;
                background-color: ${colors.SHADE_LIGHT};
            }
        `}</style>
    </>
)

export default Divider