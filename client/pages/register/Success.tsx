import React from 'react'

import FooterContainer from 'containers/FooterContainer'
import {Paragraph, FormattedMessage, Headline} from 'components/atoms'
import {Content, Grid} from 'components/core'
import {spaces} from 'styles'

const RegisterSuccess = () => (
    <>
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
                    <div className="note">
                        <Paragraph type="s1">
                            <FormattedMessage
                                id="register_success.description"
                                defaultMessage="Note: Confirmation link expires in 3 hours."
                            />
                        </Paragraph>
                    </div>
                </div>
            </Grid>
        </Content>
        <FooterContainer />
        <style jsx>{`
            .content {
                margin-bottom: ${spaces.s90};
            }

            .note {
                margin-top: ${spaces.s30};
            }
        `}</style>
    </>
)

export default RegisterSuccess
