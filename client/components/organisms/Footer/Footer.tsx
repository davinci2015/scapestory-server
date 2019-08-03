import React from 'react'
import Link from 'next/link'

import {colors, spaces} from 'styles'
import {Paragraph, FormattedMessage} from 'components/atoms'
import routes from 'routes'

const Footer = () => (
    <div className="footer">
        <div className="top">
            <div>
                <img className="logo" src="/static/logo.svg" />
            </div>
            <div>
                <ul>
                    <li>
                        <Link href={routes.index}>
                            <a>
                                <Paragraph weight="bold">
                                    <FormattedMessage id="footer.discover" defaultMessage="Discover" />
                                </Paragraph>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.news}>
                            <a>
                                <Paragraph weight="bold">
                                    <FormattedMessage id="footer.newsfeed" defaultMessage="Newsfeed" />
                                </Paragraph>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.index}>
                            <a>
                                <Paragraph weight="bold">
                                    <FormattedMessage id="footer.feedback" defaultMessage="Feedback" />
                                </Paragraph>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.index}>
                            <a>
                                <Paragraph weight="bold">
                                    <FormattedMessage id="footer.privacy_policy" defaultMessage="Privacy Policy" />
                                </Paragraph>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.index}>
                            <a>
                                <Paragraph weight="bold">
                                    <FormattedMessage id="footer.terms_and_conditions" defaultMessage="Terms & Conditions" />
                                </Paragraph>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div>instagram | facebook</div>
        </div>

        <div className="bottom">
            <div>
                <Paragraph type="s1" color={colors.SHADE_DEEP}>
                    Made with ❤️ in Osijek
                    </Paragraph>
            </div>
            <div>
                <Paragraph type="s1" color={colors.SHADE_DEEP}>
                    © Scapestory {new Date().getFullYear()}
                </Paragraph>
            </div>
        </div>

        <style jsx>{`
               .footer {
                   background-color: ${colors.WHITE};
                   border-top: 1px solid ${colors.SHADE_EXTRA_LIGHT};
               }

               .top {
                   display: flex;
                   justify-content: space-between;
                   align-items: center;

                   padding: ${spaces.s60};
               }
                
               .top ul {
                    display: flex;
                    align-items: center;
                    
                    margin: 0;
               }

               .top ul li {
                   margin: 0 ${spaces.s30};
                   list-style: none;
               }

               .top ul li a {
                   text-decoration: none;
               }

               .bottom {
                   display: flex;
                   justify-content: space-between;  
                   
                   padding: ${spaces.s18} ${spaces.s60} ${spaces.s24} ${spaces.s60};    
                   border-top: 1px solid ${colors.SHADE_EXTRA_LIGHT};
               }
            `}</style>
    </div>
)

export default Footer