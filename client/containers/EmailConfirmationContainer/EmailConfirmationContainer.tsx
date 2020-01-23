import React, {useState, useEffect} from 'react'
import {useMutation} from 'react-apollo'
import {CONFIRM_EMAIL} from './mutations'
import {Paragraph, FormattedMessage} from 'components/atoms'
import {useRouter} from 'next/router'
import logger from 'services/logger'
import {MutationConfirmEmailArgs} from 'graphql/generated/queries'
import cookie from 'services/cookie'
import routes, {createDynamicPath} from 'routes'
import {ConfirmEmailMutation} from 'graphql/generated/mutations'
import FooterContainer from 'containers/FooterContainer'
import {Content, Grid} from 'components/core'

const EmailConfirmationContainer = () => {
    const router = useRouter()
    const token = router.query.token as string
    const [error, setError] = useState(false)
    const [confirmEmailMutation] = useMutation<ConfirmEmailMutation, MutationConfirmEmailArgs>(
        CONFIRM_EMAIL
    )

    useEffect(() => {
        confirmEmailMutation({variables: {token}})
            .then(result => {
                if (result?.data?.confirmEmail) {
                    cookie.persistAuthToken(result.data.confirmEmail.token)
                    router.push(
                        createDynamicPath(routes.profile, {
                            slug: result.data.confirmEmail.user.slug,
                        })
                    )
                } else {
                    throw Error('No result for email confirmation')
                }
            })
            .catch(error => {
                logger.error(error)
                setError(true)
            })
    }, [])

    return (
        <>
            <Content>
                <Grid>
                    {error ? (
                        <Paragraph type="s3">
                            <FormattedMessage
                                id="email_validation.error"
                                defaultMessage="Seems like your confirmation link has expired or something went wrong. Try register
                            again later on."
                            />
                        </Paragraph>
                    ) : (
                        <Paragraph type="s3">
                            <FormattedMessage
                                id="email_validation.loading_message"
                                defaultMessage="Hold on a second to confirm your email..."
                            />
                        </Paragraph>
                    )}
                </Grid>
            </Content>
            <FooterContainer />
        </>
    )
}

export default EmailConfirmationContainer
