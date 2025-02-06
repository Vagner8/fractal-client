import { constant } from '@utils';

export const FormCardMenuBunchItems = constant(['Edit', 'Draft'] as const);
export const FormCardMenuCollectionItems = constant([...FormCardMenuBunchItems.values, 'New'] as const);
export const FormCardMenuItems = constant([...FormCardMenuCollectionItems.values, 'Cancel'] as const);

export const NewControlMenuItems = constant(['Copy', 'Delete'] as const);
