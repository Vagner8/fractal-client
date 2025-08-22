import { FractalDto } from '@types';

export const appMock = {
  cursor: 'App',
  parentCursor: '',
  controls: {
    Oc: {
      id: '',
      cursor: 'Children,
      parentCursor: 'App',
      data: 'Modifiers:Collections',
      type: 'Select',
    },
    Occ: {
      id: '',
      cursor: 'children controls',
      parentCursor: 'App',
      data: 'Name',
      type: 'Select',
    },
  },
  children: {
    Collections: {
      cursor: 'Collections',
      parentCursor: 'App',
      controls: {
        Oc: {
          id: '',
          cursor: 'Children,
          parentCursor: 'Collections',
          data: 'Products:Users',
          type: 'Select',
        },
      },
      children: {
        Users: {
          cursor: 'Users',
          parentCursor: 'Collections',
          controls: {
            Oc: {
              id: '',
              cursor: 'Children,
              parentCursor: 'Users',
              data: '3:2:1',
              type: 'Select',
            },
            Occ: {
              id: '',
              cursor: 'children controls',
              parentCursor: 'Users',
              data: 'Email:Name',
              type: 'Select',
            },
          },
          children: {
            '1': {
              cursor: '1',
              parentCursor: 'Users',
              controls: {
                Name: {
                  id: '',
                  cursor: 'Name',
                  parentCursor: '1',
                  data: 'John-1',
                  type: 'text',
                },
                Email: {
                  id: '',
                  cursor: 'Email',
                  parentCursor: '1',
                  data: 'dima@mail.com',
                  type: 'text',
                },
              },
            },
            '2': {
              cursor: '2',
              parentCursor: 'Users',
              controls: {
                Name: {
                  id: '',
                  cursor: 'Name',
                  parentCursor: '2',
                  data: 'John-2',
                  type: 'text',
                },
                Email: {
                  id: '',
                  cursor: 'Email',
                  parentCursor: '2',
                  data: 'dima@mail.com',
                  type: 'text',
                },
              },
            },
            '3': {
              cursor: '3',
              parentCursor: 'Users',
              controls: {
                Name: {
                  id: '',
                  cursor: 'Name',
                  parentCursor: '3',
                  data: 'John-3',
                  type: 'text',
                },
                Email: {
                  id: '',
                  cursor: 'Email',
                  parentCursor: '3',
                  data: 'dima@mail.com',
                  type: 'text',
                },
              },
            },
          },
        },
        Products: {
          cursor: 'Products',
          parentCursor: 'Collections',
        },
      },
    },
    Manager: {
      cursor: 'Manager',
      parentCursor: 'App',
    },
    Modifiers: {
      cursor: 'modifiers',
      parentCursor: 'App',
      controls: {
        Oc: {
          id: '',
          cursor: 'Children,
          parentCursor: 'modifiers',
          data: 'Delete:Save:New:Edit',
          type: 'Select',
        },
      },
      children: {
        Delete: {
          cursor: 'Delete',
          parentCursor: 'modifiers',
        },
        Save: {
          cursor: 'Save',
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
      },
    },
  },
} satisfies FractalDto;
