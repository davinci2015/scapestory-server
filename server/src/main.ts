import 'reflect-metadata'
import 'graphql-import-node'
import {startup} from 'server'
import {AppModule} from 'api/modules/App'

startup(AppModule)
