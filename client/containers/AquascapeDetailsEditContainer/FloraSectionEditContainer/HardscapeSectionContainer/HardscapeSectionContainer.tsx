import React, {ChangeEvent, useState} from 'react'
import {useMutation, useQuery} from 'react-apollo'

import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {Hardscape} from 'graphql/generated/types'
import {
    updateAquascapeEditCache,
    AquascapeEditActions,
} from 'containers/AquascapeDetailsEditContainer/cache'
import {Icon, FormattedMessage} from 'components/atoms'
import {colors} from 'styles'
import FloraListEdit from 'components/sections/AquascapeDetails/FloraSection/FloraListEdit'
import {
    REMOVE_HARDSCAPE,
    ADD_HARDSCAPE,
} from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/HardscapeSectionContainer/mutations'
import {HARDSCAPE} from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/HardscapeSectionContainer/queries'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const HardscapeSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    const [hardscapeInput, setHardscapeInput] = useState('')
    const [selectedHarscape, setSelectedHardscape] = useState<Pick<
        Hardscape,
        'id' | 'name'
    > | null>()

    if (!aquascape) return null

    const {data: hardscapeResult} = useQuery(HARDSCAPE)

    const [addHardscapeMutation] = useMutation(ADD_HARDSCAPE, {
        update: updateAquascapeEditCache(AquascapeEditActions.AQUASCAPE_ADD_HARDSCAPE, {
            aquascapeId: aquascape.id,
        }),
    })

    const [removeHardscapeMutation] = useMutation(REMOVE_HARDSCAPE, {
        update: updateAquascapeEditCache(AquascapeEditActions.AQUASCAPE_REMOVE_HARDSCAPE, {
            aquascapeId: aquascape.id,
        }),
    })

    const onHardscapeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHardscapeInput(e.target.value)
        setSelectedHardscape(null)
    }

    const onHardscapeSelect = (value: string, hardscape: Pick<Hardscape, 'id' | 'name'>) => {
        setSelectedHardscape(hardscape)
        setHardscapeInput(value)
    }

    const resetFields = () => {
        setSelectedHardscape(null)
        setHardscapeInput('')
    }

    const addHardscape = () => {
        if (!hardscapeInput || hardscapeInput === '') return
        const hardscapeName = hardscapeInput.trim()

        const hardscapeId =
            selectedHarscape && selectedHarscape.name.toLowerCase() === hardscapeName.toLowerCase()
                ? selectedHarscape.id
                : undefined

        resetFields()
        addHardscapeMutation({
            variables: {
                hardscapeId,
                name: hardscapeName,
                aquascapeId: aquascape.id,
            },
        })
    }

    const removeHardscape = (hardscapeId: number) => {
        removeHardscapeMutation({
            variables: {
                hardscapeId,
                aquascapeId: aquascape.id,
            },
        })
    }

    return (
        <FloraListEdit
            icon={<Icon d={Icon.STONE} color={colors.WHITE} size={48} viewBox="0 0 48 48" />}
            title={
                <FormattedMessage
                    id="aquascape.flora_and_fauna.hardscape"
                    defaultMessage="Hardscape"
                />
            }
            noEntityText={
                <FormattedMessage
                    id="aquascape.flora_and_fauna.no_hardscape"
                    defaultMessage="No hardscape added"
                />
            }
            inputValue={hardscapeInput}
            entities={aquascape.hardscape}
            allEntities={hardscapeResult?.hardscape}
            addEntity={addHardscape}
            removeEntity={removeHardscape}
            onEntityInputChange={onHardscapeInputChange}
            onEntitySelect={onHardscapeSelect}
            addEntityText={
                <FormattedMessage
                    id="aquascape.flora_and_fauna.add_livestock"
                    defaultMessage="Add hardscape"
                />
            }
        />
    )
}

export default HardscapeSectionContainer
