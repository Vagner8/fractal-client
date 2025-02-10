import { constant } from '@utils';

export const ControlMenuBunchItems = constant(['Edit', 'Draft'] as const);
export const ControlMenuCollectionItems = constant([...ControlMenuBunchItems.values, 'New'] as const);
export const ControlMenuItems = constant([...ControlMenuCollectionItems.values, 'Cancel'] as const);

export const FractalMenuItems = constant(['On', 'Off', 'End'] as const);

export const NewControlMenuItems = constant(['Copy', 'Cancel'] as const);
