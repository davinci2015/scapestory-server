import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'
import gql from 'graphql-tag'
import {EquipmentType, Equipment} from 'graphql/generated/queries'

export enum AquascapeEquipmentActions {
    ADD_EQUIPMENT,
    REMOVE_EQUIPMENT,
}

interface Payload {
    aquascapeId: number
    equipmentType: EquipmentType
    [key: string]: any
}

const equipmentMapping = {
    [EquipmentType.Filter]: 'filters',
    [EquipmentType.Additives]: 'additives',
    [EquipmentType.Light]: 'lights',
    [EquipmentType.Substrate]: 'substrates',
}

export const updateAquascapeEquipmentCache = (
    action: AquascapeEquipmentActions,
    payload: Payload
) => (cache: DataProxy, mutationResult: FetchResult<any>) => {
    const mutationData = mutationResult.data
    let query
    let data
    let field: string

    if (!mutationData) return

    switch (action) {
        case AquascapeEquipmentActions.ADD_EQUIPMENT:
            field = equipmentMapping[payload.equipmentType]
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id ${field} { id model brand { id name } } }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.addEquipment || !mutationData.addEquipment.id) return

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        [field]: [...data.aquascape[field], mutationData.addEquipment],
                    },
                },
            })

        case AquascapeEquipmentActions.REMOVE_EQUIPMENT:
            field = equipmentMapping[payload.equipmentType]
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id ${field} { id model brand { id name } } }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.removeEquipment || !mutationData.removeEquipment.id) return

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        [field]: data.aquascape[field].filter(
                            (equipment: Equipment) =>
                                equipment.id !== mutationData.removeEquipment.id
                        ),
                    },
                },
            })

        default:
            return null
    }
}
