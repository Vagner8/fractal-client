import { FractalDto } from '@types';

export const appTestData: FractalDto = {
  cursor: 'App',
  parentCursor: 'null',
  controls: {
    Children: {
      data: 'Collections:Settings:Modifiers',
      type: 'Select',
      id: '6f7a9f7f-0c3e-4d51-a3f2-96be1f574001',
      cursor: 'Children',
      parentCursor: 'App',
    },
    'Control keys': {
      data: 'data:type:cursor:No.',
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
    'Children controls': {
      data: '',
      type: 'Select',
      id: '6f6a9f7f-0c3e-4d51-a3f2-96be1f574881',
      cursor: 'Children controls',
      parentCursor: 'App',
    },
  },
  children: {
    Modifiers: {
      cursor: 'Modifiers',
      parentCursor: 'App',
      controls: {
        Children: {
          data: 'Delete:Save:New:Edit',
          type: 'Select',
          id: '6f7a9f7f-0c3e-4d51-a3f2-96be1f574003',
          cursor: 'Children',
          parentCursor: 'Modifiers',
        },
        'Children controls': {
          data: 'No.:Cursor',
          type: 'Select',
          id: '6f7a9f7f-0c3e-4d50-a3f2-96be1f574003',
          cursor: 'Children',
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
    },
    Collections: {
      cursor: 'Collections',
      parentCursor: 'App',
      controls: {
        Children: {
          data: 'Users:Products',
          type: 'Select',
          id: '6f7a9f7f-0c3e-4d51-p3f2-96be1f574003',
          cursor: 'Children',
          parentCursor: 'Collections',
        },
      },
      children: {
        Users: {
          cursor: 'Users',
          parentCursor: 'Collections',
          controls: {
            Children: {
              data: '2:1:3',
              type: 'Select',
              id: '6i7a9f7f-0c3e-4p51-p3f2-96be1f574003',
              cursor: 'Children',
              parentCursor: 'Users',
            },
            Controls: {
              data: 'No.:Cursor',
              type: 'Select',
              id: '6f7a9f7f-0c3e-6d51-a3f0-96by1f574001',
              cursor: 'Children controls',
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
        },
        Products: {
          cursor: 'Products',
          parentCursor: 'Collections',
          controls: {
            Children: {
              data: '',
              type: 'Select',
              id: '6i7a9f7f-0c3n-4p51-p3f2-96be1f574003',
              cursor: 'Children',
              parentCursor: 'Products',
            },
            Controls: {
              data: 'No.',
              type: 'Select',
              id: '6f7a9f9f-0c3e-4d01-a3f0-96be1f574001',
              cursor: 'Controls',
              parentCursor: 'Products',
            },
          },
        },
      },
    },
    Settings: {
      cursor: 'Settings',
      parentCursor: 'App',
      controls: {
        Children: {
          data: 'Manager:Back button',
          type: 'Select',
          id: '6f7a9f7f-0c5e-4d51-p3f2-96be1f574003',
          cursor: 'Children',
          parentCursor: 'Settings',
        },
      },
      children: {
        Manager: {
          cursor: 'Manager',
          parentCursor: 'Settings',
        },
        ['Back button']: {
          cursor: 'Back button',
          parentCursor: 'Settings',
          controls: {
            Controls: {
              data: 'Icon:Name',
              type: 'Select',
              id: '6f7a9f7f-0c3e-4d51-a3W2-96Ve1f574003',
              cursor: 'Controls',
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
      },
    },
  },
};
