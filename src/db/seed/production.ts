/* eslint-disable */
import realPlants from './plants'
import realFilters from './filters'
import realBrands from './brand'
import realFish from './fish'
import realHardscape from './hardscape'
import realLights from './lights'
import realSubstrate from './substrate'
import realAdditives from './additives'

import {connectToDatabase} from 'server'
import {Light} from 'db/models/Light'
import {Plant} from 'db/models/Plant'
import {Database} from 'db/Database'
import {Hardscape} from 'db/models/Hardscape'
import {Livestock} from 'db/models/Livestock'
import {Filter} from 'db/models/Filter'
import {Substrate} from 'db/models/Substrate'
import {Brand} from 'db/models/Brand'
import {Additive} from 'db/models'

const substrate: any = []
const lights: any = []
const filters: any = []
const additives: any = []

const brands = realBrands.map((brand, index) => ({
    _id: index + 1,
    predefined: true,
    name: brand.name,
}))

const brandsMap = brands.reduce(
    (acc, brand) => ({
        ...acc,
        [brand.name]: brand,
    }),
    {}
)

const hardscape = realHardscape.sort().map((hardscape, index) => ({
    predefined: true,
    name: hardscape,
}))

realSubstrate.forEach(item => {
    item.models.forEach(model => {
        const brand = brandsMap[item.brand]
        if (!brand) throw `Brand ${item.brand} not found!`

        substrate.push({
            brandId: brand._id,
            predefined: true,
            model,
        })
    })
})

realLights.forEach(item => {
    item.models.forEach(model => {
        const brand = brandsMap[item.brand]
        if (!brand) throw `Brand ${item.brand} not found!`

        lights.push({
            brandId: brand._id,
            predefined: true,
            model,
        })
    })
})

realFilters.forEach(item => {
    item.models.forEach(model => {
        const brand = brandsMap[item.brand]
        if (!brand) throw `Brand ${item.brand} not found!`

        filters.push({
            brandId: brand._id,
            predefined: true,
            model,
        })
    })
})

realAdditives.forEach(item => {
    item.models.forEach(model => {
        const brand = brandsMap[item.brand]
        if (!brand) throw `Brand ${item.brand} not found!`

        additives.push({
            brandId: brand._id,
            predefined: true,
            model,
        })
    })
})

const livestock = realFish.sort().map((fish, index) => ({
    name: fish,
    predefined: true,
}))

const plants = realPlants.map((name, index) => ({
    name,
    predefined: true,
}))

connectToDatabase((database: Database) => {
    database
        .sync({force: true})
        .then(async () => {
            await Promise.all(brands.map(brand => Brand.create(brand)))
            await Promise.all(lights.map(light => Light.create(light)))
            await Promise.all(plants.map(plant => Plant.create(plant)))
            await Promise.all(hardscape.map(hard => Hardscape.create(hard)))
            await Promise.all(livestock.map(animal => Livestock.create(animal)))
            await Promise.all(substrate.map(sub => Substrate.create(sub)))
            await Promise.all(filters.map(filter => Filter.create(filter)))
            await Promise.all(additives.map(additive => Additive.create(additive)))
        })
        .then(() => console.log('Database synced'))
        .catch(e => console.log('Failed to sync database', e))
})
