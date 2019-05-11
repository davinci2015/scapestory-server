import React from 'react'
import css from 'styled-jsx/css'
import typography from '../../../styles/typography'

const styles = css`
    input {
        background-color: white;
        border: 1px solid grey;
        border-radius: 8px;
        padding: 16px 20px;  
        font-family: ${typography.PRIMARY_FONT}
    }
`

const Index = (props) => (
    <React.Fragment>
        <input {...props}/>
        <style jsx>{styles}</style>
    </React.Fragment>
)

export default Index