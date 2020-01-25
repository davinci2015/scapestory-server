import React from 'react'
import {useRouter} from 'next/router'

import {Grid, Content} from 'components/core'
import {Headline, Paragraph, Button, FormattedMessage} from 'components/atoms'
import FooterContainer from 'containers/FooterContainer'
import {spaces} from 'styles'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'containers/NavigationContainer'
import ArrowBackIcon from 'assets/icons/arrow-left.svg'
import routes from 'routes'
import withAuth from 'hocs/withAuth'
import {GridWidth} from 'components/core/Grid'

const Terms = () => {
    const router = useRouter()

    return (
        <>
            <ModalProvider>
                <NavigationContainer />
                <Content>
                    <Grid width={GridWidth.SMALL}>
                        <div className="terms">
                            <Button
                                dimensions="extraSmall"
                                variant="outlined"
                                onClick={() => router.push(routes.index)}
                                leftIcon={<ArrowBackIcon />}
                            >
                                <FormattedMessage
                                    id="general.home_page"
                                    defaultMessage="Home page"
                                />
                            </Button>
                            <Headline variant="h2">Terms and Conditions</Headline>

                            <Paragraph>
                                I provide a web application (“Site”) to a community of registered
                                users to engage in a variety of activities, including to upload and
                                display images (“Visual Content”), add and display aquascape
                                informations, add comments or other content. All these informations
                                and images will be referred as “Content”.
                                <br /> <br />
                                Additional Services may be offered by me from time to time. These
                                Terms governs your use of Site and provide information about Site,
                                outlined below. When you create a Scapestory account or use
                                Scapestory, you agree to these terms.
                            </Paragraph>

                            <Headline variant="h4">The Scapestory Site</Headline>

                            <Paragraph>
                                In return for my commitment to provide the Site, I require you to
                                make the below commitments. By using the Site, you are agreeing, on
                                behalf of yourself and those you represent, to comply with and be
                                legally bound by these terms as well as the privacy policy.
                                <br />
                                If you disagree to any provision of these terms, you must
                                discontinue the registration process or discontinue your use of the
                                Site.
                                <br /> <br />
                                Your access to and use of the Site may be interrupted from time to
                                time as a result of regular maintenance, equipment failure or any
                                other reason within or without my control.
                                <br />I reserve the right to suspend or discontinue the availability
                                of the Site and to remove any Visual Content at any time at its sole
                                discretion and without prior notice.
                            </Paragraph>

                            <Headline variant="h4">Registration</Headline>

                            <Paragraph>
                                As a condition to using the Site, you are required to register an
                                account and provide information including a valid email address. Any
                                personal information that you provide to me is governed by the
                                Privacy Policy.
                                <br />
                                Your responsibility is to maintain the confidentiality of your
                                password and you are responsible for all activities resulting from
                                the use of your password and conducted through your account.
                            </Paragraph>

                            <Headline variant="h4">User Conduct</Headline>

                            <Paragraph>
                                All content posted or otherwise submitted to the Site is sole
                                responsibility of the account owner from which such content
                                originate. You are allowed to upload content only if you are the
                                creator and the owner of it. You completely agree that you are
                                entirely responsible for all content that you post, or otherwise
                                submit to the Site. Visual Content that you post or submit to the
                                Site should be related to the aquascape with main goal to promote
                                aquascaping hobby and inspire other people. I do not control user
                                submitted Content and I do not guarantee the accuracy, integrity, or
                                quality of such Content. You understand that by using the Site, you
                                may be exposed to Content that is offensive, indecent, or not
                                appropriate.
                                <br />
                                <br />
                                As a condition of use, you will not post or submit any content which
                                might involve abusement, harassment, threatening, impersonation or
                                similar towards any person. You may not use a name or add any
                                content that is vulgar, offensive, obscene or not appropriate. You
                                commit that your posted content will be appropriate and will serve
                                in a good manner of promoting an aquascaping hobby to the world.
                            </Paragraph>

                            <Headline variant="h4">
                                Content Removal and Terminating Your Account
                            </Headline>

                            <Paragraph>
                                I can remove any content or information you share on the Site if I
                                believe that it violates these Terms immediately, without prior
                                notice or liability, for any reason whatsoever. If, for some reason,
                                you want to terminate your account, you must contact me and I will
                                remove your Visual Content and account itself. It is your
                                responsibility to retain copies of your Visual Content because I
                                will remove all Visual Content from your account prior to
                                termination.
                            </Paragraph>

                            <Headline variant="h4">Links To Other Web Sites</Headline>

                            <Paragraph>
                                This Service may contain links to other sites. If you click on a
                                third-party link, you will be redirected to that site. Note that
                                these external sites are not operated by me. Therefore, I strongly
                                advise you to review the Privacy Policy of these websites. I have no
                                control over and assume no responsibility for the content, privacy
                                policies, or practices of any third-party sites or services.
                            </Paragraph>

                            <Headline variant="h4">Modification of Terms</Headline>

                            <Paragraph>
                                I may change Terms at any time, and I might need to make changes to
                                these Terms so that they accurately reflect Site and policies. Using
                                Site and viewing any Content constitutes your acceptance of the
                                Terms as modified.
                            </Paragraph>
                        </div>
                    </Grid>
                </Content>
                <FooterContainer />
            </ModalProvider>

            <style jsx>{`
                .terms {
                    margin: ${spaces.s60} 0;
                }

                .terms :global(.${Headline.classes.root}) {
                    margin-top: ${spaces.s60};
                    margin-bottom: ${spaces.s24};
                }
            `}</style>
        </>
    )
}

export default withAuth(Terms)
