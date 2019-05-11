import React from 'react'
import cx from 'classnames'
import css from 'styled-jsx/css'
import typography from '../../styles/typography'
import colors from '../../styles/colors'
import borderRadius from '../../styles/borderRadius'

const styles = css`
    button {
        background-color: ${colors.PRIMARY};
        border-radius: ${borderRadius.SECONDARY};
        padding: 16px 32px; 
        font-size: 16px;
        cursor: pointer;
        outline: 0;
        color: ${colors.SECONDARY_DARK};
        font-family: ${typography.PRIMARY_FONT};
        transition: background-color 120ms ease-in-out;
    }
    
    button:hover {
        background-color: ${colors.PRIMARY_DARK};
    }
    
    .primary {
        background-color: ${colors.PRIMARY};
        color: ${colors.TERTIARY}
    }
    
    .secondary {
        background-color: ${colors.SECONDARY};
        color: ${colors.TERTIARY}
    }
`

export const buttonOptions = {
    color: {
        PRIMARY: 'primary',
        SECONDARY: 'secondary'
    }
}

const Button = ({children, color, ...rest}) => (
    <button
        type="button"
        className={cx({
            primary: color === buttonOptions.color.PRIMARY,
            secondary: color === buttonOptions.color.SECONDARY
        })} {...rest}>
        {children}
        <style jsx>{styles}</style>
    </button>
)

export default Button