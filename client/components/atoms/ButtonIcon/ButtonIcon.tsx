import React from 'react'
import cx from 'classnames'

import {spaces} from 'styles'

type Props = {
    children: React.ReactNode,
    side: "left" | "right"
}

const ButtonIcon = ({
    children,
    side
}: Props) => (
        <div className={cx('button-icon', {
            left: side === 'left',
            right: side === 'right'
        })}>

            {children}

            <style jsx>{`
                .button-icon {
                    width: ${spaces.s24};
                    height: ${spaces.s24};
                }

                .left {
                    margin-right: ${spaces.s24};
                }          

                .right {
                    margin-left: ${spaces.s24};
                }
            `}</style>
        </div>
    )

export default ButtonIcon