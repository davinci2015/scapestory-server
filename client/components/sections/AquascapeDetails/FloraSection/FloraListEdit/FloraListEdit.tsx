import React, {ChangeEvent} from 'react'
import {noop} from 'lodash'

import {InputAutocomplete, Button} from 'components/atoms'
import {List} from 'components/molecules'
import {matchItemToValue} from 'utils/general'

interface EntityType {
    id: number
    name: string
}

interface Props {
    title: React.ReactNode
    noEntityText: React.ReactNode
    icon: React.ReactNode
    addEntity?: () => void
    addEntityText: React.ReactNode
    removeEntity: (entityId: number) => void
    removeEntityText: React.ReactNode
    onEntityInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onEntitySelect: (value: string, entity: EntityType) => void
    inputValue: string
    allEntities?: EntityType[]
    entities?: EntityType[]
}

const FloraListEdit: React.FunctionComponent<Props> = ({
    title,
    icon,
    noEntityText,
    onEntityInputChange = noop,
    onEntitySelect = noop,
    removeEntity = noop,
    addEntity = noop,
    addEntityText,
    removeEntityText,
    inputValue = '',
    entities = [],
    allEntities = [],
}) => (
    <List icon={icon} title={title}>
        {entities.length ? (
            entities.map(entity => (
                <List.Item key={entity.id}>
                    {entity.name}
                    <Button dimensions="extraSmall" onClick={() => removeEntity(entity.id)}>
                        {removeEntityText}
                    </Button>
                </List.Item>
            ))
        ) : (
            <List.Item>{noEntityText}</List.Item>
        )}

        <InputAutocomplete
            value={inputValue}
            getItemValue={item => item.name}
            shouldItemRender={(item, value) => matchItemToValue(item.name, value)}
            renderItem={(item, isHighlighted) => (
                <div key={item.id} style={{background: isHighlighted ? 'lightblue' : 'white'}}>
                    {item.name}
                </div>
            )}
            onChange={onEntityInputChange}
            onSelect={onEntitySelect}
            items={allEntities.filter(entity => !entities.some(x => x.name === entity.name))}
        />
        <Button dimensions="extraSmall" onClick={addEntity}>
            {addEntityText}
        </Button>
    </List>
)

export default FloraListEdit
