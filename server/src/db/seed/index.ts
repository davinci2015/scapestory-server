import * as faker from 'faker'
import realPlants from './plants'
import realFilters from './filters'
import {connectToDatabase} from 'server'
import {Light} from 'db/models/Light'
import {Plant} from 'db/models/Plant'
import {User} from 'db/models/User'
import {Database} from 'db/Database'
import {Tag} from 'db/models/Tag'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeTag} from 'db/models/AquascapeTag'
import {Visitor} from 'db/models/Visitor'
import {Like} from 'db/models/Like'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {Hardscape} from 'db/models/Hardscape'
import {Livestock} from 'db/models/Livestock'
import {Filter} from 'db/models/Filter'
import {AquascapePlant} from 'db/models/manyToMany/AquascapePlant'
import {AquascapeHardscape} from 'db/models/manyToMany/AquascapeHardscape'
import {AquascapeLivestock} from 'db/models/manyToMany/AquascapeLivestock'
import {AquascapeFilter} from 'db/models/manyToMany/AquascapeFilter'
import {AquascapeLight} from 'db/models/manyToMany/AquascapeLight'

const getRandomIndex = (items: number) => Math.floor(Math.random() * items)
const getEmptyArray = (items: number) => Array(items).fill('')
const filterDuplicateKeys = (arr: any[], keys: string[]) => {
    return arr.filter((itemFilter) => {
        return !arr.find((itemFind) => {
            return itemFilter.id !== itemFind.id && keys.every((key) => itemFilter[key] === itemFind[key])
        })
    })
}

const entriesCount = {
    aquascapes: 40,
    hardscape: 10,
    livestock: 10,
    users: 10,
    lights: 10,
    tags: 20,
    aquascapeTags: 20,
    aquascapePlants: 100,
    aquascapeHardscape: 100,
    aquascapeLivestock: 100,
    aquascapeFilters: 50,
    aquascapeLights: 50,
    visitors: 100,
    likes: 300,
    images: 50
}

const users = getEmptyArray(entriesCount.users).map((_, index) => ({
    id: index + 1,
    email: faker.internet.email(),
    password: faker.random.uuid(),
    username: faker.internet.userName(),
    name: faker.name.firstName(),
    profileImage: faker.image.people(),
    country: faker.address.country(),
    youtubeLink: faker.internet.url(),
    instagramLink: faker.internet.url()
}))

const aquascapes = getEmptyArray(entriesCount.aquascapes).map((_, index) => ({
    id: index + 1,
    title: faker.commerce.productName(),
    volume: faker.random.number({min: 10, max: 1000}),
    mainImage: faker.image.nature(),
    startedAt: faker.date.recent(),
    trending: faker.random.boolean(),
    featured: faker.random.boolean(),
    description: faker.lorem.sentence(),
    userId: users[getRandomIndex(entriesCount.users)].id,
}))

const images = getEmptyArray(entriesCount.images).map((_, index) => ({
    id: index + 1,
    mainImage: faker.random.boolean(),
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    url: faker.image.nature(),
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)].id,
}))

const visitors = getEmptyArray(entriesCount.visitors).map((_, index) => ({
    id: index + 1,
    visitorId: users[getRandomIndex(entriesCount.users)].id,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)].id,
}))

const likes = getEmptyArray(entriesCount.likes).map((_, index) => ({
    id: index + 1,
    userId: users[getRandomIndex(entriesCount.users)].id,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)].id,
}))

const tags = getEmptyArray(entriesCount.tags).map((_, index) => ({
    id: index + 1,
    predefined: faker.random.boolean(),
    name: faker.lorem.word()
}))

const aquascapeTags = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeTags).map((_, index) => ({
    id: index + 1,
    tagId: tags[getRandomIndex(entriesCount.tags)].id,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)].id
})), ['tagId', 'aquascapeId'])

const hardscape = getEmptyArray(entriesCount.hardscape).map((_, index) => ({
    id: index + 1,
    name: faker.commerce.productMaterial(),
    description: faker.lorem.words(),
    image: faker.image.imageUrl()
}))

const livestock = getEmptyArray(entriesCount.livestock).map((_, index) => ({
    id: index + 1,
    name: faker.commerce.productName(),
    description: faker.lorem.words(),
    image: faker.image.animals()
}))

const lights = getEmptyArray(entriesCount.lights).map((_, index) => ({
    id: index + 1,
    predefined: faker.random.boolean(),
    brand: faker.company.companyName(),
    model: faker.commerce.productAdjective(),
    width: faker.random.number(),
    height: faker.random.number(),
    depth: faker.random.number(),
    power: faker.random.number(),
    lumenMin: faker.random.number(),
    lumenMax: faker.random.number(),
    kelvinMin: faker.random.number(),
    kelvinMax: faker.random.number(),
    dimmable: faker.random.boolean(),
    description: faker.lorem.words(),
    image: faker.image.technics()
}))

const plants = realPlants.map((name, index) => ({
    id: index + 1,
    name,
    predefined: true,
    description: faker.lorem.words(),
    image: faker.image.imageUrl(),
    origin: faker.address.country(),
    minHeight: faker.random.number(),
    maxHeight: faker.random.number(),
    position: 'front',
    luminosity: 'high',
    growthSpeed: 'fast',
    difficulty: 'easy'
}))

let filterIdIncrement = 1
const filters = realFilters.reduce((acc, filter, index) => {
    return [...acc, ...filter.models.map((model, modelIndex) => ({
        id: filterIdIncrement++,
        brand: filter.brand,
        predefined: true,
        dedscription: faker.lorem.words(),
        image: faker.image.imageUrl(),
        model
    }))]
}, [])

const aquascapePlants = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapePlants).map((_, index) => ({
    id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)].id,
    plantId: plants[getRandomIndex(realPlants.length)].id
})), ['aquascapeId', 'plantId'])

const aquascapeHardscape = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeHardscape).map((_, index) => ({
    id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)].id,
    hardscapeId: hardscape[getRandomIndex(entriesCount.hardscape)].id
})), ['aquascapeId', 'hardscapeId'])

const aquascapeLivestock = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeLivestock).map((_, index) => ({
    id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)].id,
    livestockId: livestock[getRandomIndex(entriesCount.livestock)].id
})), ['aquascapeId', 'livestockId'])

const aquascapeFilter = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeFilters).map((_, index) => ({
    id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)].id,
    filterId: filters[getRandomIndex(filters.length)].id
})), ['aquascapeId', 'filterId'])

const aquascapeLights = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeLights).map((_, index) => ({
    id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)].id,
    lightId: lights[getRandomIndex(entriesCount.lights)].id
})), ['aquascapeId', 'lightId'])

connectToDatabase((database: Database) => {
    database.sync({force: true})
        .then(async () => {
            await Promise.all(lights.map((light) => Light.create(light)))
            await Promise.all(plants.map((plant) => Plant.create(plant)))
            await Promise.all(hardscape.map((hard) => Hardscape.create(hard)))
            await Promise.all(livestock.map((animal) => Livestock.create(animal)))
            await Promise.all(filters.map((filter) => Filter.create(filter)))
            await Promise.all(users.map((user) => User.create(user)))
            await Promise.all(tags.map((tag) => Tag.create(tag)))
            await Promise.all(aquascapes.map((scape) => Aquascape.create(scape)))
            await Promise.all(aquascapeTags.map((aquascapeTag) => AquascapeTag.create(aquascapeTag)))
            await Promise.all(visitors.map((visitor) => Visitor.create(visitor)))
            await Promise.all(likes.map((like) => Like.create(like)))
            await Promise.all(images.map((image) => AquascapeImage.create(image)))
            await Promise.all(aquascapePlants.map((plant) => AquascapePlant.create(plant)))
            await Promise.all(aquascapeHardscape.map((hard) => AquascapeHardscape.create(hard)))
            await Promise.all(aquascapeLivestock.map((animal) => AquascapeLivestock.create(animal)))
            await Promise.all(aquascapeFilter.map((filter) => AquascapeFilter.create(filter)))
            await Promise.all(aquascapeLights.map((light) => AquascapeLight.create(light)))
        })
        .then(() => console.log('Database synced'))
        .catch((e) => console.log('Failed to sync database', e))
})
