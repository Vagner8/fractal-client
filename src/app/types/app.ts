import { ConstModifiers, ConstParams } from '@constants';

export type AppParams = typeof ConstParams.record;
export type AppModifiersHandlers = Record<keyof typeof ConstModifiers.record, (modifier: string) => void>;
