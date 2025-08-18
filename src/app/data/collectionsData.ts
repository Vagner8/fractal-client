import { FractalDto } from '@types';
import { usersData } from './usersData';

export const collectionsData: FractalDto = {
  cursor: 'Collections',
  parentCursor: 'App',
  controls: {
    Children: {
      data: 'Users:Products',
      type: 'Splittable',
      id: '6f7a9f7f-0c3e-4d51-p3f2-96be1f574003',
      cursor: 'Children',
      parentCursor: 'Collections',
    },
    Controls: {
      data: 'Children:Controls',
      type: 'Splittable',
      id: '9f7a9f7f-0c3e-4d51-p3f2-96be1f574003',
      cursor: 'Controls',
      parentCursor: 'Collections',
    },
  },
  childrenControls: {
    'Children controls': {
      data: '',
      type: 'Splittable',
      id: '6f6a9f7f-0c3e-4d51-a3f2-96be1f574881',
      cursor: 'Children controls',
      parentCursor: 'Collections',
    },
  },
  children: {
    Users: usersData,
  },
};
