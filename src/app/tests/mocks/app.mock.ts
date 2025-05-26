import { FractalDto } from '@utils';
import { collectionsMock } from './collections.mock';
import { modifiersMock } from './modifiers.mock';
import { v4 } from 'uuid';

const appId = v4();

export const appMock: FractalDto = {
  id: appId,
  parentId: 'null',
  controls: {
    Occ: {
      id: v4(),
      parentId: appId,
      data: 'Name',
      field: 'text',
      indicator: 'Occ',
    },
    Oc: {
      id: v4(),
      parentId: appId,
      data: 'Modifiers:Collections',
      field: 'text',
      indicator: 'Oc',
    },
    Cursor: {
      id: v4(),
      parentId: appId,
      data: 'App',
      field: 'text',
      indicator: 'Cursor',
    },
  },
  fractals: {
    Modifiers: modifiersMock({ appId }),
    Collections: collectionsMock({ appId }),
  },
};
