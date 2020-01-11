import React, {ChangeEvent} from 'react'
import {noop} from 'lodash'

import {InputAutocomplete, Button, IconButton, Icon} from 'components/atoms'
import {List} from 'components/molecules'
import {matchItemToValue} from 'utils/general'
import {colors, spaces, borderRadius} from 'styles'

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
    inputValue = '',
    entities = [],
    allEntities = [],
}) => (
    <>
        <List icon={icon} title={title}>
            {entities.length ? (
                entities.map(entity => (
                    <List.Item key={entity.id}>
                        <div
                            className="item"
                            role="presentation"
                            onClick={() => removeEntity(entity.id)}
                        >
                            {entity.name}
                            <IconButton onClick={() => null}>
                                <Icon d={Icon.BIN} color={colors.PRIMARY} />
                            </IconButton>
                        </div>
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
        <style jsx>{`
            .item {
                display: flex;
                align-items: center;
                padding: ${spaces.s4} ${spaces.s12};
                margin-left: -${spaces.s12};

                border-radius: ${borderRadius.TERTIARY};
                cursor: pointer;
                transition: background-color 100ms ease-in-out;
            }

            .item:hover {
                background-color: ${colors.PRIMARY_LIGHT};
            }

            .item :global(.${IconButton.classes.root}) {
                margin-left: ${spaces.s8};
            }
        `}</style>
    </>
)

export default FloraListEdit
