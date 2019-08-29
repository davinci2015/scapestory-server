import React from 'react'
import {Card} from 'components/molecules'
import {media} from 'styles';

interface Props {
    children: React.ReactNode
}

const gutter = 15

const CardList = ({
    children
}: Props) => (
        <div className="card-list">
            {children}
            <style jsx>{`
                .card-list {
                    display: flex;
                    flex-wrap: wrap;

                    margin-left: -${gutter}px;
                    margin-right: -${gutter}px;
                }

                .card-list :global(.${Card.classes.root}) {
                    width: 100%;
                    margin: ${gutter}px;
                }

                @media ${media.up('small')} {
                    .card-list :global(.${Card.classes.root}) {
                        width: calc(50% - ${gutter * 2}px);
                    }
                }

                @media ${media.up('medium')} {
                    .card-list :global(.${Card.classes.root}) {
                        width: calc(33.33% - ${gutter * 2}px);
                    }
                }

                @media ${media.up('large')} {
                    .card-list :global(.${Card.classes.root}) {
                        width: calc(25% - ${gutter * 2}px);
                    }
                }
            `}</style>
        </div>
    )

export default CardList