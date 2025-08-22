import { FractalDto } from '@types';
import { collectionsData } from './collectionsData';
import { settingsData } from './settingsData';

export const appData: FractalDto = {
  cursor: 'App',
  parentCursor: 'null',
  controls: {
    Children: {
      data: 'Collections:Settings',
      type: 'splittable',
      id: '6f7a9f7f-0c3e-4d51-a3f2-96be1f574001',
      cursor: 'children',
      parentCursor: 'App',
    },
    Controls: {
      data: 'Children:Control keys:Controls:children controls',
      type: 'splittable',
      id: '6f6a9f7f-0c3e-4d51-a3f2-96le1f574001',
      cursor: 'controls',
      parentCursor: 'App',
    },
    'control keys': {
      data: 'data:type:cursor',
      type: 'splittable',
      id: '6f7a9f7f-0c3e-4d51-a3f0-96be1f574901',
      cursor: 'Columns',
      parentCursor: 'App',
    },
    'children controls': {
      data: 'Cursor:Children:Controls',
      type: 'splittable',
      id: '6f6a9f7f-0c3e-4d59-a3f2-96be1f574881',
      cursor: 'children controls',
      parentCursor: 'Collections',
    },
  },
  childrenControls: {
    Cursor: {
      data: '',
      type: 'text',
      id: '6f6aPf7f-0c3e-4d51-a3f2-96be1f574001',
      cursor: 'cursor',
      parentCursor: 'App',
    },
    Children: {
      data: '',
      type: 'splittable',
      id: '6f6a9f7f-0c3e-4d51-a3f2-96be1f574001',
      cursor: 'children',
      parentCursor: 'App',
    },
    Controls: {
      data: '',
      type: 'splittable',
      id: '6f6a9f7f-0c3e-4d51-a3f2-96le1f574001',
      cursor: 'controls',
      parentCursor: 'App',
    },
  },
  children: {
    Collections: collectionsData,
    Settings: settingsData,
  },
};
