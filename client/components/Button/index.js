import React from 'react'
import cx from 'classnames'
import typography from '../../styles/typography'

export const buttonOptions = {
    color: {
        PRIMARY: 'primary',
        SECONDARY: 'secondary'
    }
}

const Button = ({children, color, ...rest}) => (
    <button className={cx({
        primary: color === buttonOptions.color.PRIMARY,
        secondary: color === buttonOptions.color.SECONDARY
    })} {...rest}>
        {children}
        <style jsx>{`
            button {
                background-color: green;
                border: 1px solid grey;
                border-radius: 8px;
                padding: 16px 20px;  
                cursor: pointer;
                outline: 0;
                color: white;
                font-family: ${typography.PRIMARY_FONT}
            }
            .primary {
                background-color: red;
            }
            .secondary {
                background-color: yellow;
            }
          `}</style>
    </button>
)

export default Button