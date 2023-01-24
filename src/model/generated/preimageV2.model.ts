import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {ProposedCall} from "./_proposedCall"
import {ProposalStatus} from "./_proposalStatus"

@Entity_()
export class PreimageV2 {
  constructor(props?: Partial<PreimageV2>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: false})
  proposer!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  deposit!: bigint | undefined | null

  @Column_("text", {nullable: false})
  hash!: string

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new ProposedCall(undefined, obj)}, nullable: true})
  proposedCall!: ProposedCall | undefined | null

  @Column_("text", {nullable: true})
  section!: string | undefined | null

  @Column_("varchar", {length: 21, nullable: false})
  status!: ProposalStatus

  @Column_("text", {nullable: true})
  method!: string | undefined | null

  @Column_("int4", {nullable: false})
  length!: number

  @Index_()
  @Column_("int4", {nullable: false})
  createdAtBlock!: number

  @Index_()
  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("int4", {nullable: true})
  updatedAtBlock!: number | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  updatedAt!: Date | undefined | null
}