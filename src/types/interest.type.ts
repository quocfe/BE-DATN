import { InterestAttributes } from './../db/models/Interest'

export interface Interest extends InterestAttributes {}

export type InterestInput = Pick<Interest, 'interest_name'>
