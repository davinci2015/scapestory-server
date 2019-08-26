import React from 'react'
import numeral from 'numeral'

import {backgroundImage} from 'styles/mixins'
import {Headline, Tag, IconText, Icon, Paragraph} from 'components/atoms'
import {UserWidget} from 'components/molecules'
import {colors, spaces, borderRadius} from 'styles'

interface Props {
    image: string
    userImage: string
    title: React.ReactNode
    name: React.ReactNode
}

const classes = {
    root: 'card'
}

const Card = ({
    image,
    userImage,
    name,
    title
}: Props) => (
        <div className={classes.root}>
            <div className="header">
                <div className="header-gradient"></div>
                <div className="icons">
                    <IconText icon={Icon.EYE_SHOW_FULL} text={numeral(3233).format('0a+')} />
                    <IconText icon={Icon.HEART} text={32} />
                </div>
            </div>
            <div className="body">
                <div className="headline">
                    <Headline as="h2" variant="h5">{title}</Headline>
                </div>
                <div className="footer">
                    <UserWidget 
                        image={userImage} 
                        text={
                            <Paragraph type="t1" color={colors.SHADE_DEEP}>
                                {name}
                            </Paragraph>
                        }    
                    />
                    <div className="tags">
                        <Tag text="Tag" variant="primary" />
                        <Tag text="Long tag" variant="secondary" />
                    </div>
                </div>
            </div>
            <style jsx>{`
            .card {
                position: relative;
                border: 1px solid ${colors.SHADE_EXTRA_LIGHT};
                border-radius: ${borderRadius.TERTIARY};
                background-color: ${colors.WHITE};
                box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);
            }

            .header {
                position: relative;
                height: 264px;
                width: calc(100% + 2px);
                margin-left: -1px;
                overflow: hidden;

                border-top-left-radius: ${borderRadius.TERTIARY};
                border-top-right-radius: ${borderRadius.TERTIARY};
                
                ${backgroundImage(image)}
            }

            .header-gradient {
                position: absolute;
                top: 0; left: 0; bottom: 0; right: 0;
                height: 72px;
                background: linear-gradient(to bottom, ${colors.BLACK}, rgba(0, 0, 0, 0));
            }

            .header > .icons {
                text-align: right;
                padding-right: ${spaces.s16};
                padding-top: ${spaces.s18};
            }

            .header > .icons > :global(.${IconText.classes.root}) {
                margin-left: ${spaces.s12};
                opacity: .8;
            }

            .header > .icons > :global(.${IconText.classes.root}) :global(svg) {
                height: 16px;
                width: 16px;
            }

            .body {
                padding: ${spaces.s12} ${spaces.s18} ${spaces.s18} ${spaces.s18};
            }

            .body > .headline :global(.${Headline.classes.root}) {
                margin-top: 0;
                height: 48px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .footer {
                display: flex;
                justify-content: space-between;
            }

            .footer > .tags :global(.${Tag.classes.root}) {
                margin-left: ${spaces.s6};
            }
        `}</style>
        </div>
    )

Card.classes = classes

export default Card