import React from 'react'
import {noop} from 'lodash'

import {SelectCreatable} from 'components/atoms'
import {List, ListItem} from 'components/molecules'
import {ValueType, ActionMeta} from 'react-select'

export interface FloraEntityType {
    id: number
    name: string
}

interface Props {
    title: React.ReactNode
    noEntityText: React.ReactNode
    icon: React.ReactNode
    removeEntity: (entityId: number) => void
    allEntities?: FloraEntityType[]
    entities?: FloraEntityType[]
    onEntityCreate: (inputValue: string) => void
    onEntitySelect: (newValue: ValueType<FloraEntityType>, actionMeta: ActionMeta) => void
}

const prepareOptions = (entities: FloraEntityType[], existingEntities: FloraEntityType[]) =>
    entities
        .filter(
            entity =>
                !existingEntities.some(
                    x => x.name.toLocaleLowerCase() === entity.name.toLowerCase()
                )
        )
        .map(entity => ({...entity, label: entity.name, value: entity.id}))

const FloraListEdit: React.FunctionComponent<Props> = ({
    title,
    icon,
    noEntityText,
    removeEntity = noop,
    onEntityCreate = noop,
    onEntitySelect = noop,
    entities = [],
    allEntities = [],
}) => (
    <List icon={icon} title={title}>
        {entities.length ? (
            entities.map(entity => (
                <ListItem key={entity.id} onDelete={() => removeEntity(entity.id)}>
                    {entity.name}
                </ListItem>
            ))
        ) : (
            <ListItem>{noEntityText}</ListItem>
        )}
        <SelectCreatable
            onChange={onEntitySelect}
            onCreateOption={onEntityCreate}
            options={prepareOptions(allEntities, entities)}
        />
    </List>
)

export default FloraListEdit
