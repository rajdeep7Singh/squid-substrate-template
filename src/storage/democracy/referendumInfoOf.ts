import { UnknownVersionError } from '../../common/errors'
import { BlockContext } from '../../types/support'
import { DemocracyReferendumInfoOfStorage } from '../../types/storage'
import * as v900 from '../../types/v900'
import * as v2000 from '../../types/v2000'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'

type Threshold = 'SuperMajorityApprove' | 'SuperMajorityAgainst' | 'SimpleMajority'

type FinishedReferendumData = {
    status: 'Finished'
    approved: boolean
    end: number
}

type OngoingReferendumData = {
    status: 'Ongoing'
    end: number
    hash: Uint8Array
    threshold: Threshold
    delay: number
}

type ReferendumStorageData = FinishedReferendumData | OngoingReferendumData

// eslint-disable-next-line sonarjs/cognitive-complexity
async function getStorageData(ctx: BatchContext<Store, unknown>, index: number, block: SubstrateBlock): Promise<ReferendumStorageData | undefined> {
    const storage = new DemocracyReferendumInfoOfStorage(ctx, block)
    if (storage.isV900) {
        const storageData = await storage.asV900.get(index)
        if (!storageData) return undefined

        const { __kind: status } = storageData
        if (status === 'Ongoing') {
            const { proposalHash: hash, end, delay, threshold } = (storageData as v900.ReferendumInfo_Ongoing).value
            return {
                status,
                hash,
                end,
                delay,
                threshold: threshold.__kind,
            }
        } else {
            const { end, approved } = (storageData as v900.ReferendumInfo_Finished)
            return {
                status,
                end,
                approved,
            }
        }
    }else if(storage.isV2000){
        const storageData = await storage.asV2000.get(index)
        if (!storageData) return undefined

        const { __kind: status } = storageData
        if (status === 'Ongoing') {
            let hash
            const { proposal, end, delay, threshold } = (storageData as v2000.ReferendumInfo_Ongoing).value
            if(proposal.__kind == "Inline") {
                hash = proposal.value
            }
            else{
                hash = proposal.hash
            }
            return {
                status,
                hash,
                end,
                delay,
                threshold: threshold.__kind,
            }
        } else {
            const { end, approved } = storageData as v2000.ReferendumInfo_Finished
            return {
                status,
                end,
                approved,
            }
        }

    }
     else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getReferendumInfoOf(ctx: BatchContext<Store, unknown>, index: number, block: SubstrateBlock) {
    return await getStorageData(ctx, index, block)
}
