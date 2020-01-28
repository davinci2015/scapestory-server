import React from 'react'
import Item, {ItemType} from './Item'
import {media} from 'styles'

interface Props {}

type UserStatsType = React.FunctionComponent<Props> & {
    Item: ItemType
}

const UserStats: UserStatsType = ({children}) => (
    <>
        <div className="user-stats">{children}</div>

        <style jsx>{`
            .user-stats {
                display: flex;
                justify-content: center;
                text-align: center;
            }

            @media ${media.up('large')} {
                .user-stats {
                    justify-content: flex-start;
                    text-align: left;
                }
            }
        `}</style>
    </>
)

UserStats.Item = Item

export default UserStats
