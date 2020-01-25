import React from 'react'
import {useRouter} from 'next/router'

import {Grid, Content} from 'components/core'
import {Headline, Paragraph, FormattedMessage, Button} from 'components/atoms'
import FooterContainer from 'containers/FooterContainer'
import {spaces} from 'styles'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'containers/NavigationContainer'
import ArrowBackIcon from 'assets/icons/arrow-left.svg'
import routes from 'routes'
import withAuth from 'hocs/withAuth'
import {GridWidth} from 'components/core/Grid'

const PrivacyPolicy = () => {
    const router = useRouter()

    return (
        <>
            <ModalProvider>
                <NavigationContainer />
                <Content>
                    <Grid width={GridWidth.SMALL}>
                        <div className="privacy-policy">
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
                            <Headline variant="h2">Privacy Policy</Headline>
                            <Paragraph>
                                Danijel Vincijanović built the Scapestory app as a Free app. This
                                SERVICE is provided by Danijel Vincijanović at no cost and is
                                intended for use as is.
                                <br /> <br />
                                This page is used to inform visitors regarding my policies with the
                                collection, use, and disclosure of Personal Information if anyone
                                decided to use my Service.
                                <br /> <br />
                                If you choose to use my Service, then you agree to the collection
                                and use of information in relation to this policy. The Personal
                                Information that I collect is used for providing and improving the
                                Service. I will not use or share your information with anyone except
                                as described in this Privacy Policy.
                                <br /> <br />
                                The terms used in this Privacy Policy have the same meanings as in
                                our Terms and Conditions, which is accessible at Scapestory unless
                                otherwise defined in this Privacy Policy.
                            </Paragraph>

                            <Headline variant="h4">Information Collection and Use</Headline>

                            <Paragraph>
                                For a better experience, while using our Service, I may require you
                                to provide with certain personally identifiable information,
                                including but not limited to email, name, profile photo. The
                                information that I request will be retained in a database. All
                                Personal Information collected via or by Scapestory may be stored
                                anywhere in the world, including but not limited to the European
                                Union, the United States, in the cloud, on the servers of service
                                providers. Your Personal Information may be accessible to law
                                enforcement or other authorities pursuant to a lawful request.
                                <br /> <br />
                                The app does use third party services that may collect information
                                used to identify you.
                                <br />
                                <a
                                    href="https://www.facebook.com/legal/FB_Work_Privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.facebook.com/legal/FB_Work_Privacy
                                </a>
                                <br />
                                <a
                                    href="https://policies.google.com/privacy?hl=en-US"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://policies.google.com/privacy?hl=en-US
                                </a>
                            </Paragraph>

                            <Headline variant="h4">Log Data</Headline>

                            <Paragraph>
                                I want to inform you that whenever you use my Service, in a case of
                                an error in the app I collect data and information. This Log Data
                                may include information such as your device Internet Protocol (“IP”)
                                address, browser name and version, operating system version, the
                                time and date of your use of the Service, and other statistics.
                            </Paragraph>

                            <Headline variant="h4">Cookies</Headline>

                            <Paragraph>
                                Cookies are small text files placed in visitors’ computer browsers
                                to store their preferences. Most browsers allow you to block and
                                delete cookies. However, if you do that, the Service will not work
                                properly. The app does use authentication cookie that identify a
                                user for the duration of the session once that user logs in to a
                                website and uses the site. The app may use cookies that allow to
                                offer you enhanced functionality when accessing or using site.
                            </Paragraph>

                            <Headline variant="h4">Service Providers</Headline>

                            <Paragraph>
                                I may employ third-party companies and individuals due to the
                                following reasons:
                                <ul>
                                    <li>To facilitate our Service;</li>
                                    <li>To provide the Service on our behalf;</li>
                                    <li>To perform Service-related services;</li>
                                    <li>To assist us in analyzing how our Service is used.</li>
                                </ul>
                                I want to inform users of this Service that these third parties have
                                access to your Personal Information. The reason is to perform the
                                tasks assigned to them on our behalf. However, they are obligated
                                not to disclose or use the information for any other purpose.
                            </Paragraph>

                            <Headline variant="h4">Security</Headline>

                            <Paragraph>
                                I take steps to ensure that your information is treated securely and
                                in accordance with this Privacy Policy. Unfortunately, the Internet
                                cannot be guaranteed to be 100% secure, and I cannot ensure or
                                warrant the security of any information you provide to me. I do not
                                accept liability for unintentional disclosure.
                            </Paragraph>

                            <Headline variant="h4">Data Storage and Processing</Headline>

                            <Paragraph>
                                I use infrastructure and storage services from Third-Party
                                infrastructure providers to provide you with Scapestory services.
                                Scapestory use Amazon Web Services (
                                <a
                                    href="https://aws.amazon.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://aws.amazon.com
                                </a>
                                ) and Cloudinary (
                                <a
                                    href="https://cloudinary.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://cloudinary.com
                                </a>
                                ) for processing, data storage and other additional services as
                                needed.
                            </Paragraph>

                            <Headline variant="h4">Links to Other Sites</Headline>

                            <Paragraph>
                                This Service may contain links to other sites. If you click on a
                                third-party link, you will be redirected to that site. Note that
                                these external sites are not operated by me. Therefore, I strongly
                                advise you to review the Privacy Policy of these websites. I have no
                                control over and assume no responsibility for the content, privacy
                                policies, or practices of any third-party sites or services.
                            </Paragraph>

                            <Headline variant="h4">Children’s Privacy</Headline>

                            <Paragraph>
                                These Services do not address anyone under the age of 13. I do not
                                knowingly collect personally identifiable information from children
                                under 13. If I learn that I have collected any Personal Information
                                from children under 13, I will promptly take steps to delete such
                                information. If you are a parent or guardian and you are aware that
                                your child has provided me with personal information, please contact
                                me so that I will be able to do necessary actions.
                            </Paragraph>

                            <Headline variant="h4">Changes to This Privacy Policy</Headline>

                            <Paragraph>
                                I may update our Privacy Policy from time to time. Thus, you are
                                advised to review this page periodically for any changes. I will
                                notify you of any changes by posting the new Privacy Policy on this
                                page. These changes are effective immediately after they are posted
                                on this page.
                            </Paragraph>

                            <Headline variant="h4">Contact Us</Headline>

                            <Paragraph>
                                If you have any questions or suggestions about my Privacy Policy, do
                                not hesitate to contact me at info@scapestory.com.
                            </Paragraph>
                        </div>
                    </Grid>
                </Content>
                <FooterContainer />
            </ModalProvider>

            <style jsx>{`
                .privacy-policy {
                    margin: ${spaces.s60} 0;
                }

                .privacy-policy :global(.${Headline.classes.root}) {
                    margin-top: ${spaces.s60};
                    margin-bottom: ${spaces.s24};
                }
            `}</style>
        </>
    )
}

export default withAuth(PrivacyPolicy)
