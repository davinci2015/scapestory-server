import React from 'react'

import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
import {Paragraph, FormattedMessage, Headline} from 'components/atoms'
import {Content, Grid} from 'components/core'
import {spaces} from 'styles'

const RegisterSuccess = () => (
    <>
        <NavigationContainer />
        <Content>
            <Grid>
                <div className="content">
                    <Headline variant="h3">
                        <FormattedMessage
                            id="register_success.headline"
                            defaultMessage="Almost done..."
                        />
                    </Headline>
                    <Paragraph type="s3">
                        <FormattedMessage
                            id="register_success.description"
                            defaultMessage="We've sent you an email. Open it up to activate your account."
                        />
                    </Paragraph>
                </div>
            </Grid>
        </Content>
        <FooterContainer />
        <style jsx>{`
            .content {
                margin: ${spaces.s90} 0;
            }
        `}</style>
    </>
)

export default RegisterSuccess
