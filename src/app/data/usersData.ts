import { FractalDto } from '@types';

export const usersData: FractalDto = {
  cursor: 'Users',
  parentCursor: 'Collections',
  controls: {
    Children: {
      data: '2:1:3',
      type: 'splitable',
      id: '6i7a9f7f-0c3e-4p51-p3f2-96be1f574003',
      cursor: 'Children',
      parentCursor: 'Users',
    },
    Controls: {
      data: 'Children controls:Children:Controls',
      type: 'splitable',
      id: '6i7a9f7f-0c3e-4p55-p3f2-96be1f574003',
      cursor: 'Controls',
      parentCursor: 'Users',
    },
    'Children controls': {
      data: 'Name',
      type: 'splitable',
      id: '6f6a9f7f-0c3e-4d59-a3f2-96be1f574881',
      cursor: 'Children controls',
      parentCursor: 'Collections',
    },
  },
  childrenControls: {
    Name: {
      data: '',
      type: 'string',
      id: '6i7a9f7f-0c3e-4p51-p9f2-96be1f574003',
      cursor: 'Name',
      parentCursor: 'Users',
    },
  },
  children: {
    '1': {
      cursor: '1',
      parentCursor: 'Users',
    },
    '2': {
      cursor: '2',
      parentCursor: 'Users',
    },
    '3': {
      cursor: '3',
      parentCursor: 'Users',
    },
  },
};
