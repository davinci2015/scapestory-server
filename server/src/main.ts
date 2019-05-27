import 'reflect-metadata'
import 'graphql-import-node'
import * as dotenv from 'dotenv'
import {startup} from 'server'
import {AppModule} from 'graphql/modules/App'

dotenv.config()
startup(AppModule)