import 'reflect-metadata'

import {startup} from './server'
import {AppModule} from './graphql/modules/App'

startup(AppModule)