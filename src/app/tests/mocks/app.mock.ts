import { FractalDto } from '@types';

export const appMock = {
  cursor: 'App',
  parentCursor: '',
  controls: {
    Oc: {
      cursor: 'Oc',
      parentCursor: 'App',
      data: 'Modifiers:Collections',
      type: 'Select',
    },
    Occ: {
      cursor: 'Occ',
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
          cursor: 'Oc',
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
              cursor: 'Oc',
              parentCursor: 'Users',
              data: '3:2:1',
              type: 'Select',
            },
            Occ: {
              cursor: 'Occ',
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
                  cursor: 'Name',
                  parentCursor: '1',
                  data: 'John-1',
                  type: 'String',
                },
                Email: {
                  cursor: 'Email',
                  parentCursor: '1',
                  data: 'dima@mail.com',
                  type: 'String',
                },
              },
            },
            '2': {
              cursor: '2',
              parentCursor: 'Users',
              controls: {
                Name: {
                  cursor: 'Name',
                  parentCursor: '2',
                  data: 'John-2',
                  type: 'String',
                },
                Email: {
                  cursor: 'Email',
                  parentCursor: '2',
                  data: 'dima@mail.com',
                  type: 'String',
                },
              },
            },
            '3': {
              cursor: '3',
              parentCursor: 'Users',
              controls: {
                Name: {
                  cursor: 'Name',
                  parentCursor: '3',
                  data: 'John-3',
                  type: 'String',
                },
                Email: {
                  cursor: 'Email',
                  parentCursor: '3',
                  data: 'dima@mail.com',
                  type: 'String',
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
      cursor: 'Modifiers',
      parentCursor: 'App',
      controls: {
        Oc: {
          cursor: 'Oc',
          parentCursor: 'Modifiers',
          data: 'Delete:Save:New:Edit',
          type: 'Select',
        },
      },
      children: {
        Delete: {
          cursor: 'Delete',
          parentCursor: 'Modifiers',
        },
        Save: {
          cursor: 'Save',
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
      },
    },
  },
} satisfies FractalDto;
