import { FractalDto } from '@types';
import { modifiersData } from './modifiersData';

export const settingsData: FractalDto = {
  cursor: 'Settings',
  parentCursor: 'App',
  controls: {
    Children: {
      data: 'Manager:Back button:Modifiers',
      type: 'Splittable',
      id: '6f7a9f7f-0c5e-4d51-p3f2-96be1f574003',
      cursor: 'children',
      parentCursor: 'Settings',
    },
    Controls: {
      data: 'Controls:Children',
      type: 'Splittable',
      id: '9f7a9f7f-0c3e-4d51-p3f2-96be1p574003',
      cursor: 'controls',
      parentCursor: 'Settings',
    },
  },
  childrenControls: {
    'children controls': {
      data: '',
      type: 'Splittable',
      id: '6f6a9f7f-0c3e-4d51-a3ff-96be1f574881',
      cursor: 'children controls',
      parentCursor: 'Settings',
    },
  },
  children: {
    Manager: {
      cursor: 'Manager',
      parentCursor: 'Settings',
    },
    'Back button': {
      cursor: 'Back button',
      parentCursor: 'Settings',
      controls: {
        Controls: {
          data: 'Controls:Icon:Name',
          type: 'Splittable',
          id: '6f7a9f7f-0c3e-4d51-a3W2-96Ve1f574003',
          cursor: 'controls',
          parentCursor: 'Back button',
        },
        Icon: {
          data: 'arrow_back_ios',
          type: 'String',
          cursor: 'Icon',
          id: '6f7yuf7f-0c3e-4d51-a3f2-96be1f571004',
          parentCursor: 'Back button',
        },
        Name: {
          data: 'Back',
          type: 'String',
          cursor: 'Name',
          id: '6f7yuf7f-0c3e-4d51-a3f2-96b09f571004',
          parentCursor: 'Back button',
        },
      },
    },
    Modifiers: modifiersData,
  },
};
