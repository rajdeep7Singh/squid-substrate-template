import {lookupArchive} from "@subsquid/archive-registry"
import { ProcessorConfig } from './common/processorConfig'
import { Store } from '@subsquid/typeorm-store'

const config: ProcessorConfig<Store> = {
    chain: {
        name: 'polkadot',
        prefix: 'polkadot',
    },
    dataSource: {
        archive: lookupArchive("polkadot", {release: "FireSquid"}),
        chain: 'wss://polkadot.api.onfinality.io/public-ws',
    },
    typesBundle: 'polkadot',
    batchSize: 500,
    blockRange: {
        from: 0,
    },
}

export default config
