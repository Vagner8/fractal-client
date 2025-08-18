import { FractalDto } from '@types';

export const modifiersData: FractalDto = {
  cursor: 'Modifiers',
  parentCursor: 'App',
  controls: {
    Children: {
      data: 'Delete:Save:New:Edit',
      type: 'Splittable',
      id: '6f7a9f7f-0c3e-4d51-a3f2-96be1f574003',
      cursor: 'children',
      parentCursor: 'Modifiers',
    },
    Controls: {
      data: 'Children:Controls:children controls',
      type: 'Splittable',
      id: '9f7a9f7f-0c3e-4d51-p3f2-96be1f574003',
      cursor: 'controls',
      parentCursor: 'Collections',
    },
    'children controls': {
      data: 'No.:Cursor',
      type: 'Splittable',
      id: '6f7a9f7f-0c3e-4d50-a3f2-96be1f574003',
      cursor: 'children',
      parentCursor: 'Modifiers',
    },
  },
  children: {
    Delete: {
      cursor: 'Delete',
      parentCursor: 'Modifiers',
    },
    Edit: {
      cursor: 'Edit',
      parentCursor: 'Modifiers',
    },
    New: {
      cursor: 'New',
      parentCursor: 'Modifiers',
    },
    Save: {
      cursor: 'Save',
      parentCursor: 'Modifiers',
    },
  },
};
