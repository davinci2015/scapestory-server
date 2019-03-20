import 'graphql-import-node'
import 'reflect-metadata'

import {startup} from './server'
import {AppModule} from './modules/App'

startup(AppModule)