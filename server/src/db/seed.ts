import * as faker from 'faker'
import {Brand} from 'db/models/Brand'
import {Light} from 'db/models/Light'

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
    description: faker.lorem.paragraph(),
    image: faker.image.imageUrl()
}))

export default async () => {
    await Promise.all(brands.map((brand) => Brand.create(brand)))
    await Promise.all(lights.map((light) => Light.create(light)))
}