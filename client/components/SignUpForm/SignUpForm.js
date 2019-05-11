import * as React from 'react'
import Input from '../Form/Input'
import Button, {buttonOptions} from '../Button'

const SignUpForm = () => {
    return (
        <React.Fragment>
            <form>
                <Input placeholder="Email"/>
                <Input placeholder="Username"/>
                <Input placeholder="Password"/>
                <Button color={buttonOptions.color.PRIMARY}>
                    Sign Up
                </Button>
            </form>
        </React.Fragment>
    )
}

export default SignUpForm