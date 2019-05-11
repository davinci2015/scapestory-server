import React from 'react'
import css from 'styled-jsx/css'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import borderRadius from '../../../styles/borderRadius'

const styles = css`
    input {
        background-color: ${colors.WHITE};
        border: 1px solid ${colors.SECONDARY};
        border-radius: ${borderRadius.SECONDARY};
        outline: 0;
        padding: 16px 20px;  
        font-family: ${typography.PRIMARY_FONT};
        font-size: 16px;
    }
    
    input::placeholder {
        font-size: 16px;
    }
`

const Index = (props) => (
    <React.Fragment>
        <input {...props}/>
        <style jsx>{styles}</style>
    </React.Fragment>
)

export default Index