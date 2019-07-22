import React from 'react'
import numeral from 'numeral'

import {backgroundImage} from 'styles/mixins'
import {Headline, Tag, IconText, Icon} from 'components/atoms'
import {UserWidget} from 'components/molecules'
import {colors, spaces} from 'styles'

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
                    <UserWidget image={userImage} name={name} />
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
                border-radius: 8px;
            }

            .header {
                position: relative;
                height: 264px;
                width: calc(100% + 2px);
                margin-left: -1px;
                overflow: hidden;

                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                
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

            .header > .icons > :global(.icon-text) {
                margin-left: ${spaces.s12};
                opacity: .8;
            }

            .body {
                padding: ${spaces.s12} ${spaces.s18} ${spaces.s18} ${spaces.s18};
            }

            .body > .headline :global(h2) {
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

            .footer > .tags :global(.tag) {
                margin-left: ${spaces.s6};
            }
        `}</style>
        </div>
    )

Card.classes = classes

export default Card