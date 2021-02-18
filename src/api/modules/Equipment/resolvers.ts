import {UserInputError} from 'apollo-server'

import {Filter, Light, Substrate, Additive} from 'db/models'
import {EquipmentProviderInterface, EquipmentProvider} from './EquipmentProvider'
import {MutationAddEquipmentArgs, MutationRemoveEquipmentArgs} from 'interfaces/graphql/types'
import {FilterRepository} from 'db/repositories/Filter'
import {LightRepository} from 'db/repositories/Light'
import {SubstrateRepository} from 'db/repositories/Substrate'
import {AdditiveRepository} from 'db/repositories/Additive'
import {AquascapeFilterRepository} from 'db/repositories/AquascapeFilter'
import {AquascapeLightRepository} from 'db/repositories/AquascapeLight'
import {AquascapeSubstrateRepository} from 'db/repositories/AquascapeSubstrate'
import {AquascapeAdditiveRepository} from 'db/repositories/AquascapeAdditive'

// eslint-disable-next-line no-shadow
enum EquipmentType {
    FILTER = 'FILTER',
    SUBSTRATE = 'SUBSTRATE',
    LIGHT = 'LIGHT',
    ADDITIVES = 'ADDITIVES',
}

type EquipmentModel = Filter | Light | Substrate | Additive

const equipmentRepoMapping = {
    [EquipmentType.FILTER]: FilterRepository,
    [EquipmentType.LIGHT]: LightRepository,
    [EquipmentType.SUBSTRATE]: SubstrateRepository,
    [EquipmentType.ADDITIVES]: AdditiveRepository,
}

const equipmentAquascapeRepoMapping = {
    [EquipmentType.FILTER]: AquascapeFilterRepository,
    [EquipmentType.LIGHT]: AquascapeLightRepository,
    [EquipmentType.SUBSTRATE]: AquascapeSubstrateRepository,
    [EquipmentType.ADDITIVES]: AquascapeAdditiveRepository,
}

const getEquipmentProvider = (
    root,
    args: MutationAddEquipmentArgs | MutationRemoveEquipmentArgs,
    context
) => {
    const equipmentRepository = context.injector.get(
        equipmentRepoMapping[args.equipment.equipmentType]
    )

    const equipmentAquascapeRepository = context.injector.get(
        equipmentAquascapeRepoMapping[args.equipment.equipmentType]
    )

    if (!equipmentRepository || !equipmentAquascapeRepository) {
        throw new UserInputError('Invalid equipment type provided.')
    }

    const provider: EquipmentProviderInterface<EquipmentModel> = context.injector.get(
        EquipmentProvider
    )

    provider.setEquipmentRepository(equipmentRepository)
    provider.setEquipmentAquascapeRepository(equipmentAquascapeRepository)

    return provider
}

export const resolvers = {
    Equipment: {
        __resolveType(equipment, context, info) {
            if (equipment instanceof Filter) {
                return 'Filter'
            }

            if (equipment instanceof Light) {
                return 'Light'
            }

            if (equipment instanceof Substrate) {
                return 'Substrate'
            }

            if (equipment instanceof Additive) {
                return 'Additive'
            }
        },
    },
    Mutation: {
        async addEquipment(root, args: MutationAddEquipmentArgs, context) {
            let equipment: EquipmentModel | null = null
            const provider = getEquipmentProvider(root, args, context)

            if (args.equipment.equipmentId) {
                equipment = await provider.findEquipmentById(args.equipment.equipmentId)
            } else if (args.equipment.name) {
                equipment = await provider.addEquipment(args.equipment.name)
            }

            if (!equipment) {
                throw new UserInputError('equipment id or equipment name is not provided')
            }

            await provider.addEquipmentForAquascape(equipment.id, args.aquascapeId)

            return equipment
        },
        async removeEquipment(root, args: MutationRemoveEquipmentArgs, context) {
            if (!args.equipment.equipmentId) {
                throw new UserInputError('equipment id or equipment name is not provided')
            }

            const provider = getEquipmentProvider(root, args, context)

            const equipment = await provider.findEquipmentById(args.equipment.equipmentId)

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
