import React from 'react'
import {List} from 'components/molecules'

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
            entities.map(entity => <List.Item key={entity.id}>{entity.name}</List.Item>)
        ) : (
            <List.Item>{noEntityText}</List.Item>
        )}
    </List>
)

export default FloraList
