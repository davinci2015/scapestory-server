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
import {CO2} from 'db/models/CO2'
import {Substrate} from 'db/models/Substrate'
import {Additive} from 'db/models/Additive'
import {Tank} from 'db/models/Tank'

import {AquascapePlant} from 'db/models/manyToMany/AquascapePlant'
import {AquascapeHardscape} from 'db/models/manyToMany/AquascapeHardscape'
import {AquascapeLivestock} from 'db/models/manyToMany/AquascapeLivestock'
import {AquascapeFilter} from 'db/models/manyToMany/AquascapeFilter'
import {AquascapeLight} from 'db/models/manyToMany/AquascapeLight'
import {AquascapeSubstrate} from 'db/models/manyToMany/AquascapeSubstrate'
import {AquascapeAdditive} from 'db/models/manyToMany/AquascapeAdditive'
import {Comment} from 'db/models/Comment'

const getAquascapeImage = () => {
    const aquascapeImages = [
        'https://www.dmbotanicalgarden.com/wp-content/uploads/2018/09/aquascaping_creative-commons.jpg',
        'https://img.rnudah.com/images/63/636924094540541.jpg',
        'https://i.ytimg.com/vi/RL2bPr_8ZcM/maxresdefault.jpg',
        'http://cdn.powered-by-nitrosell.com/store_images/11/2575/customcontent/1160/picholder.jpg',
        'https://23pxcp3u31lgiybw92v8rma1-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/Nature_style_aquascape-1-600x293.png',
        'https://image.shutterstock.com/image-photo/aquascape-wood-rock-260nw-738632542.jpg',
        'https://i.pinimg.com/originals/95/fd/11/95fd11bf394b5c252948da10368c9aef.jpg'
    ]

    return aquascapeImages[Math.floor(Math.random() * aquascapeImages.length)]
}

const getProfileImage = () => {
    const profileImages = [
        'https://content-static.upwork.com/blog/uploads/sites/4/2014/10/27173913/BLOG-Upwork-profile-photo-face.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUYxFX2MYrJvYwZ2NWYNyxJWA5nFi6P4V30Y5XWLj0nkBe-YEC',
        'https://img2.thejournal.ie/inline/2470754/original/?width=428&version=2470754',
        'https://cdn.moneymarketing.co.uk/content/uploads/2019/08/29125853/Profile-Carl-Roberts-400x500.jpg',
        'https://cdn.moneymarketing.co.uk/content/uploads/2019/08/15164737/Profile-Brian-Butcher_cropped-560x500.jpg'
    ]

    return profileImages[Math.floor(Math.random() * profileImages.length)]
}

const getRandomIndex = (items: number) => Math.floor(Math.random() * items)
const getEmptyArray = (items: number) => Array(items).fill('')
const filterDuplicateKeys = (arr: any[], keys: string[]) => {
    return arr.filter((itemFilter) => {
        return !arr.find((itemFind) => {
            return itemFilter._id !== itemFind._id && keys.every((key) => itemFilter[key] === itemFind[key])
        })
    })
}

const entriesCount = {
    aquascapes: 40,
    hardscape: 10,
    comments: 100,
    livestock: 10,
    users: 20,
    lights: 10,
    tags: 20,
    substrate: 20,
    additives: 20,
    co2: 5,
    tanks: 20,
    aquascapeTags: 20,
    aquascapePlants: 100,
    aquascapeHardscape: 100,
    aquascapeLivestock: 100,
    aquascapeFilters: 50,
    aquascapeLights: 50,
    aquascapeSubstrate: 50,
    aquascapeAdditives: 50,
    visitors: 100,
    likes: 300,
    images: 50
}

const users = getEmptyArray(entriesCount.users).map((_, index) => ({
    _id: index + 1,
    email: faker.internet.email(),
    password: faker.random.uuid(),
    username: faker.internet.userName(),
    name: faker.name.firstName(),
    profileImage: getProfileImage(),
    country: faker.address.country(),
    youtubeLink: faker.internet.url(),
    instagramLink: faker.internet.url()
}))

const co2 = getEmptyArray(entriesCount.co2).map((_, index) => ({
    _id: index + 1,
    type: faker.random.word(),
    bps: faker.random.number({min: 1, max: 10})
}))

const tanks = getEmptyArray(entriesCount.tanks).map((_, index) => ({
    _id: index + 1,
    brand: faker.company.companyName(),
    model: faker.commerce.productMaterial(),
    volume: faker.random.number(),
    width: faker.random.number(),
    height: faker.random.number(),
    depth: faker.random.number(),
    glassThickness: faker.random.number()
}))

const aquascapes = getEmptyArray(entriesCount.aquascapes).map((_, index) => ({
    _id: index + 1,
    title: faker.commerce.productName(),
    volume: faker.random.number({min: 10, max: 1000}),
    mainImage: getAquascapeImage(),
    startedAt: faker.date.recent(),
    trending: faker.random.boolean(),
    featured: faker.random.boolean(),
    description: faker.lorem.sentence(),
    userId: users[getRandomIndex(entriesCount.users)]._id,
    co2Id: co2[getRandomIndex(entriesCount.co2)]._id,
    tankId: tanks[getRandomIndex(entriesCount.tanks)]._id
}))

const images = getEmptyArray(entriesCount.images).map((_, index) => ({
    _id: index + 1,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    url: getAquascapeImage(),
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id,
}))

const comments = getEmptyArray(entriesCount.comments).map((_, index) => ({
    _id: index + 1,
    content: faker.lorem.sentence(),
    userId: users[getRandomIndex(entriesCount.users)]._id,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id
}))

const visitors = getEmptyArray(entriesCount.visitors).map((_, index) => ({
    _id: index + 1,
    visitorId: users[getRandomIndex(entriesCount.users)]._id,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id,
}))

const likes = getEmptyArray(entriesCount.likes).map((_, index) => ({
    _id: index + 1,
    userId: users[getRandomIndex(entriesCount.users)]._id,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id,
}))

const tags = getEmptyArray(entriesCount.tags).map((_, index) => ({
    _id: index + 1,
    predefined: faker.random.boolean(),
    name: faker.lorem.word()
}))

const aquascapeTags = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeTags).map((_, index) => ({
    _id: index + 1,
    tagId: tags[getRandomIndex(entriesCount.tags)]._id,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id
})), ['tagId', 'aquascapeId'])

const hardscape = getEmptyArray(entriesCount.hardscape).map((_, index) => ({
    _id: index + 1,
    name: faker.commerce.productMaterial(),
    description: faker.lorem.words(),
    image: faker.image.imageUrl()
}))

const substrate = getEmptyArray(entriesCount.substrate).map((_, index) => ({
    _id: index + 1,
    brand: faker.company.companyName(),
    name: faker.commerce.productMaterial(),
    description: faker.lorem.words(),
    image: faker.image.imageUrl()
}))

const additives = getEmptyArray(entriesCount.additives).map((_, index) => ({
    _id: index + 1,
    brand: faker.company.companyName(),
    name: faker.commerce.productMaterial(),
    description: faker.lorem.words(),
    image: faker.image.imageUrl()
}))

const livestock = getEmptyArray(entriesCount.livestock).map((_, index) => ({
    _id: index + 1,
    name: faker.commerce.productName(),
    description: faker.lorem.words(),
    image: faker.image.animals()
}))

const lights = getEmptyArray(entriesCount.lights).map((_, index) => ({
    _id: index + 1,
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
    _id: index + 1,
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
        _id: filterIdIncrement++,
        brand: filter.brand,
        predefined: true,
        description: faker.lorem.words(),
        image: faker.image.imageUrl(),
        model
    }))]
}, [])

const aquascapePlants = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapePlants).map((_, index) => ({
    _id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id,
    plantId: plants[getRandomIndex(realPlants.length)]._id
})), ['aquascapeId', 'plantId'])

const aquascapeHardscape = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeHardscape).map((_, index) => ({
    _id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id,
    hardscapeId: hardscape[getRandomIndex(entriesCount.hardscape)]._id
})), ['aquascapeId', 'hardscapeId'])

const aquascapeLivestock = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeLivestock).map((_, index) => ({
    _id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id,
    livestockId: livestock[getRandomIndex(entriesCount.livestock)]._id
})), ['aquascapeId', 'livestockId'])

const aquascapeFilter = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeFilters).map((_, index) => ({
    _id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id,
    filterId: filters[getRandomIndex(filters.length)]._id
})), ['aquascapeId', 'filterId'])

const aquascapeLights = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeLights).map((_, index) => ({
    _id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id,
    lightId: lights[getRandomIndex(entriesCount.lights)]._id
})), ['aquascapeId', 'lightId'])

const aquascapeSubstrate = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeSubstrate).map((_, index) => ({
    _id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id,
    substrateId: lights[getRandomIndex(entriesCount.lights)]._id
})), ['aquascapeId', 'substrateId'])

const aquascapeAdditives = filterDuplicateKeys(getEmptyArray(entriesCount.aquascapeAdditives).map((_, index) => ({
    _id: index + 1,
    aquascapeId: aquascapes[getRandomIndex(entriesCount.aquascapes)]._id,
    additiveId: additives[getRandomIndex(entriesCount.additives)]._id
})), ['aquascapeId', 'additiveId'])

connectToDatabase((database: Database) => {
    database.sync({force: true})
        .then(async () => {
            await Promise.all(tanks.map((tank) => Tank.create(tank)))
            await Promise.all(co2.map((item) => CO2.create(item)))

            await Promise.all(lights.map((light) => Light.create(light)))
            await Promise.all(plants.map((plant) => Plant.create(plant)))
            await Promise.all(hardscape.map((hard) => Hardscape.create(hard)))
            await Promise.all(livestock.map((animal) => Livestock.create(animal)))
            await Promise.all(substrate.map((sub) => Substrate.create(sub)))
            await Promise.all(filters.map((filter) => Filter.create(filter)))
            await Promise.all(additives.map((additive) => Additive.create(additive)))
            await Promise.all(users.map((user) => User.create(user)))
            await Promise.all(tags.map((tag) => Tag.create(tag)))
            await Promise.all(aquascapes.map((scape) => Aquascape.create(scape)))
            await Promise.all(visitors.map((visitor) => Visitor.create(visitor)))
            await Promise.all(likes.map((like) => Like.create(like)))
            await Promise.all(images.map((image) => AquascapeImage.create(image)))
            await Promise.all(comments.map((comment) => Comment.create(comment)))

            await Promise.all(aquascapeTags.map((aquascapeTag) => AquascapeTag.create(aquascapeTag)))
            await Promise.all(aquascapePlants.map((plant) => AquascapePlant.create(plant)))
            await Promise.all(aquascapeHardscape.map((hard) => AquascapeHardscape.create(hard)))
            await Promise.all(aquascapeLivestock.map((animal) => AquascapeLivestock.create(animal)))
            await Promise.all(aquascapeFilter.map((filter) => AquascapeFilter.create(filter)))
            await Promise.all(aquascapeLights.map((light) => AquascapeLight.create(light)))
            await Promise.all(aquascapeSubstrate.map((sub) => AquascapeSubstrate.create(sub)))
            await Promise.all(aquascapeAdditives.map((additive) => AquascapeAdditive.create(additive)))
        })
        .then(() => console.log('Database synced'))
        .catch((e) => console.log('Failed to sync database', e))
})
