import React from 'react'
import Item, {ItemType} from './Item'

interface Props {}

type UserStatsType = React.FunctionComponent<Props> & {
    Item: ItemType
}

const UserStats: UserStatsType = ({children}) => {
    return (
        <>
            <div className="user-stats">{children}</div>

            <style jsx>{`
                .user-stats {
                    display: flex;
                }
            `}</style>
        </>
    )
}

UserStats.Item = Item

export default UserStats
