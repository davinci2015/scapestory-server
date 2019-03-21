import 'reflect-metadata'
import 'graphql-import-node'
import {startup} from 'server'
import {AppModule} from 'graphql/modules/App'

startup(AppModule)