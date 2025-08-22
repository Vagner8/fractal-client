import { FractalDto } from '@types';

export const modifiersData: FractalDto = {
  cursor: 'modifiers',
  parentCursor: 'App',
  controls: {
    Children: {
      data: 'Delete:Save:New:Edit',
      type: 'splittable',
      id: '6f7a9f7f-0c3e-4d51-a3f2-96be1f574003',
      cursor: 'children',
      parentCursor: 'modifiers',
    },
    Controls: {
      data: 'Children:Controls:children controls',
      type: 'splittable',
      id: '9f7a9f7f-0c3e-4d51-p3f2-96be1f574003',
      cursor: 'controls',
      parentCursor: 'Collections',
    },
    'children controls': {
      data: 'No.:Cursor',
      type: 'splittable',
      id: '6f7a9f7f-0c3e-4d50-a3f2-96be1f574003',
      cursor: 'children',
      parentCursor: 'modifiers',
    },
  },
  children: {
    Delete: {
      cursor: 'Delete',
      parentCursor: 'modifiers',
    },
    Edit: {
      cursor: 'Edit',
      parentCursor: 'modifiers',
    },
    New: {
      cursor: 'New',
      parentCursor: 'modifiers',
    },
    Save: {
      cursor: 'Save',
      parentCursor: 'modifiers',
    },
  },
};
