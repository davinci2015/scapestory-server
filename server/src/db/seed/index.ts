import * as faker from 'faker'
import realPlants from './plants'
import {Brand} from 'db/models/Brand'
import {Light} from 'db/models/Light'
import {Plant} from 'db/models/Plant'
import {connectToDatabase} from 'server'

const getRandomIndex = (items: number) => Math.floor(Math.random() * items)
const getEmptyArray = (items: number) => Array(items).fill('')

const entriesCount = {
    brands: 10,
    lights: 10
}

const brands = getEmptyArray(entriesCount.brands).map((_, index) => ({
    id: index + 1,
    name: faker.company.companyName()
}))

const lights = getEmptyArray(entriesCount.lights).map((_, index) => ({
    id: index + 1,
    predefined: faker.random.boolean(),
    name: faker.commerce.productName(),
    brandId: brands[getRandomIndex(entriesCount.brands)].id,
    model: faker.commerce.productAdjective(),
    description: faker.lorem.words(),
    image: faker.image.imageUrl()
}))

const plants = realPlants.map((name, index) => ({
    id: index + 1,
    name,
    predefined: faker.random.boolean(),
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

connectToDatabase(async () => {
    await Promise.all(brands.map((brand) => Brand.create(brand)))
    await Promise.all(lights.map((light) => Light.create(light)))
    await Promise.all(plants.map((plant) => Plant.create(plant)))
})