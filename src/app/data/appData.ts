import { FractalDto } from '@types';
import { collectionsData } from './collectionsData';
import { settingsData } from './settingsData';

export const appData: FractalDto = {
  cursor: 'App',
  parentCursor: 'null',
  controls: {
    Children: {
      data: 'Collections:Settings',
      type: 'Select',
      id: '6f7a9f7f-0c3e-4d51-a3f2-96be1f574001',
      cursor: 'Children',
      parentCursor: 'App',
    },
    'Control keys': {
      data: 'data:type:cursor',
      type: 'Select',
      id: '6f7a9f7f-0c3e-4d51-a3f0-96be1f574901',
      cursor: 'Columns',
      parentCursor: 'App',
    },
  },
  childrenControls: {
    Children: {
      data: '',
      type: 'Select',
      id: '6f6a9f7f-0c3e-4d51-a3f2-96be1f574001',
      cursor: 'Children',
      parentCursor: 'App',
    },
    Controls: {
      data: '',
      type: 'Select',
      id: '6f6a9f7f-0c3e-4d51-a3f2-96le1f574001',
      cursor: 'Controls',
      parentCursor: 'App',
    },
  },
  children: {
    Collections: collectionsData,
    Settings: settingsData,
  },
};
