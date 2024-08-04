import { FanpageAttributes } from '../db/models/Fanpage';

export interface Fanpage extends FanpageAttributes {}

export type FanpageInput = Omit<Fanpage, 'fanpage_id' | 'createdAt' | 'updatedAt'>;

export type FanpageUpdate = Partial<Omit<Fanpage, 'fanpage_id' | 'createdAt' | 'updatedAt'>>;
