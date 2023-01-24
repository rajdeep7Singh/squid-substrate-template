import { ReferendaSubmittedEvent, 
    ReferendaCancelledEvent, 
    ReferendaApprovedEvent,
    ReferendaKilledEvent,
    ReferendaConfirmAbortedEvent,
    ReferendaConfirmedEvent,
    ReferendaDecisionDepositPlacedEvent,
    ReferendaDecisionStartedEvent,
    ReferendaConfirmStartedEvent,
    ReferendaRejectedEvent,
    ReferendaTimedOutEvent } from '../../../types/events'
import { UnknownVersionError } from '../../../common/errors'
import { EventContext } from '../../../types/support'
import { TallyData } from '../../types/data'

interface ReferendumEventData {
    index: number
    track: number
    hash: Uint8Array
}


export function getEventData(ctx: EventContext): ReferendumEventData {
    const event = new ReferendaSubmittedEvent(ctx)
    if (event.isV9320) {
        const {index, track, proposal } = event.asV9320
        let hash = null;
        if(proposal.__kind == "Inline") {
            hash = proposal.value
        }
        else{
            hash = proposal.hash
        }
        return {
            index,
            track,
            hash
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ReferendaData {
    tally: TallyData,
    index: number,
}

export function getCancelledData(ctx: EventContext): ReferendaData {
    const event = new ReferendaCancelledEvent(ctx)
    if (event.isV9320) {
        const { index, tally } = event.asV9320
        return {
            index,
            tally
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ReferendaIndexData {
    index: number
}

export function getApprovedData(ctx: EventContext): ReferendaIndexData {
    const event = new ReferendaApprovedEvent(ctx)
    if (event.isV9320) {
        const { index } = event.asV9320
        return {
            index
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getKilledData(ctx: EventContext): ReferendaData {
    const event = new ReferendaKilledEvent(ctx)
    if (event.isV9320) {
        const { index, tally } = event.asV9320
        return {
            index,
            tally
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getTimedOutData(ctx: EventContext): ReferendaData {
    const event = new ReferendaTimedOutEvent(ctx)
    if (event.isV9320) {
        const { index, tally } = event.asV9320
        return {
            index,
            tally
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getRejectedData(ctx: EventContext): ReferendaData {
    const event = new ReferendaRejectedEvent(ctx)
    if (event.isV9320) {
        const { index, tally } = event.asV9320
        return {
            index,
            tally
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getConfirmAbortedData(ctx: EventContext): ReferendaIndexData {
    const event = new ReferendaConfirmAbortedEvent(ctx)
    if (event.isV9320) {
        const { index } = event.asV9320
        return {
            index
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getConfirmedData(ctx: EventContext): ReferendaData {
    const event = new ReferendaConfirmedEvent(ctx)
    if (event.isV9320) {
        const { index, tally } = event.asV9320
        return {
            index,
            tally
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getConfirmStartedData(ctx: EventContext): ReferendaIndexData {
    const event = new ReferendaConfirmStartedEvent(ctx)
    if (event.isV9320) {
        const { index } = event.asV9320
        return {
            index,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ReferendaDepositData {
    index: number,
    who: Uint8Array,
    amount: bigint,
}

export function getDecisionDepositPlacedData(ctx: EventContext): ReferendaDepositData {
    const event = new ReferendaDecisionDepositPlacedEvent(ctx)
    if (event.isV9320) {
        const { index, who, amount } = event.asV9320
        return {
            index,
            who,
            amount
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ReferendaDecisionStartedData {
    index: number,
    tally: TallyData,
    track: number,
    hash: Uint8Array,
}

export function getDecisionStartedData(ctx: EventContext): ReferendaDecisionStartedData {
    const event = new ReferendaDecisionStartedEvent(ctx)
    if (event.isV9320) {
        let hash = undefined;
        const { index, track, proposal, tally} = event.asV9320
        if(proposal.__kind == "Inline") {
            hash = proposal.value
        }
        else{
            hash = proposal.hash
        }
        return {
            index,
            track,
            tally,
            hash
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}