import type {Result, Option} from './support'

export interface AccountData {
    free: bigint
    reserved: bigint
    miscFrozen: bigint
    feeFrozen: bigint
}

export interface AccountInfo {
    nonce: number
    consumers: number
    providers: number
    sufficients: number
    data: AccountData
}

export interface Proposal {
    proposer: Uint8Array
    value: bigint
    beneficiary: Uint8Array
    bond: bigint
}
