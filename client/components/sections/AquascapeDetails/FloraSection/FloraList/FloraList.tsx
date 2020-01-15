import React from 'react'
import {List, ListItem} from 'components/molecules'

interface EntityType {
    id: number
    name: string
}

interface Props {
    title: React.ReactNode
    icon: React.ReactNode
    noEntityText: React.ReactNode
    entities: EntityType[]
}

const FloraList: React.FunctionComponent<Props> = ({title, icon, noEntityText, entities = []}) => (
    <List icon={icon} title={title}>
        {entities.length ? (
            entities.map(entity => <ListItem key={entity.id}>{entity.name}</ListItem>)
        ) : (
            <ListItem>{noEntityText}</ListItem>
        )}
    </List>
)

export default FloraList
