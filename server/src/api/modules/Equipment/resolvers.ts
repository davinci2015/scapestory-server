import {UserInputError} from 'apollo-server'

import {tokens} from 'di/tokens'
import {authenticate, authorizeAquascapeUpdate} from 'api/guards'
import {Filter, Light, Substrate, Additive} from 'db/models'
import {EquipmentProviderInterface} from './EquipmentProvider'

enum EquipmentType {
    FILTER = 'FILTER',
    SUBSTRATE = 'SUBSTRATE',
    LIGHT = 'LIGHT',
    ADDITIVES = 'ADDITIVES',
}

type EquipmentModel = Filter | Light | Substrate | Additive

const equipmentRepoMapping = {
    [EquipmentType.FILTER]: tokens.FILTER_REPOSITORY,
    [EquipmentType.LIGHT]: tokens.LIGHT_REPOSITORY,
    [EquipmentType.SUBSTRATE]: tokens.SUBSTRATE_REPOSITORY,
    [EquipmentType.ADDITIVES]: tokens.ADDITIVE_REPOSITORY,
}

const equipmentAquascapeRepoMapping = {
    [EquipmentType.FILTER]: tokens.AQUASCAPE_FILTER_REPOSITORY,
    [EquipmentType.LIGHT]: tokens.AQUASCAPE_LIGHT_REPOSITORY,
    [EquipmentType.SUBSTRATE]: tokens.AQUASCAPE_SUBSTRATE_REPOSITORY,
    [EquipmentType.ADDITIVES]: tokens.AQUASCAPE_ADDITIVES_REPOSITORY,
}

const getEquipmentProvider = (root, args, context) => {
    const equipmentRepository = context.injector.get(equipmentRepoMapping[args.equipmentType])

    const equipmentAquascapeRepository = context.injector.get(
        equipmentAquascapeRepoMapping[args.equipmentType]
    )

    if (!equipmentRepository || !equipmentAquascapeRepository) {
        throw new UserInputError('Invalid equipment type provided.')
    }

    const provider: EquipmentProviderInterface<EquipmentModel> = context.injector.get(
        tokens.EQUIPMENT_PROVIDER
    )

    provider.setEquipmentRepository(equipmentRepository)
    provider.setEquipmentAquascapeRepository(equipmentAquascapeRepository)

    return provider
}

export const resolvers = {
    Equipment: {
        __resolveType(equipment, context, info) {
            if (equipment.power) {
                return 'Light'
            }

            return 'Filter'
        },
    },
    Mutation: {
        async addEquipment(root, args, context) {
            let equipment: EquipmentModel | null = null
            const provider = getEquipmentProvider(root, args, context)

            if (args.equipment.id) {
                equipment = await provider.findEquipmentById(args.filterId)
            } else if (args.equipment.name) {
                equipment = await provider.addEquipment(args.name)
            }

            if (!equipment) {
                throw new UserInputError('equipment id or equipment name is not provided')
            }

            await provider.addEquipmentForAquascape(equipment.id, args.aquascapeId)

            return equipment
        },
        async removeEquipment(root, args, context) {
            const provider = getEquipmentProvider(root, args, context)
            const equipment = await provider.findEquipmentById(args.filterId)

            if (!equipment) {
                throw new UserInputError('Equipment not found')
            }

            await provider.removeEquipmentFromAquascape(equipment.id, args.aquascapeId)

            if (!equipment.predefined) {
                await provider.removeEquipment(equipment.id)
            }

            return equipment
        },
    },
}

export const resolversComposition = {
    'Mutation.addEquipment': [authenticate, authorizeAquascapeUpdate],
    'Mutation.removeEquipment': [authenticate, authorizeAquascapeUpdate],
}
