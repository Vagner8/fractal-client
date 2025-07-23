import { FractalDto } from '@types';

export const appTestData: FractalDto = {
  children: {
    Collections: {
      cursor: 'Collections',
      parentCursor: 'App',
      controls: {
        Oc: {
          data: 'Users:Products',
          type: 'Select',
          id: '6f7a9f7f-0c3e-4d51-p3f2-96be1f574003',
          cursor: 'Oc',
          parentCursor: 'Collections',
        },
      },
      children: {
        Users: {
          cursor: 'Users',
          parentCursor: 'Collections',
          controls: {
            Oc: {
              data: '2:1:3',
              type: 'Select',
              id: '6i7a9f7f-0c3e-4p51-p3f2-96be1f574003',
              cursor: 'Oc',
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
        },
      },
    },
    Manager: {
      cursor: 'Manager',
      parentCursor: 'App',
    },
    Modifiers: {
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
      controls: {
        Oc: {
          data: 'Delete:Save:New:Edit',
          type: 'Select',
          id: '6f7a9f7f-0c3e-4d51-a3f2-96be1f574003',
          cursor: 'Oc',
          parentCursor: 'Modifiers',
        },
      },
      cursor: 'Modifiers',
      parentCursor: 'App',
    },
    Pages: {
      children: {
        Admin: {
          cursor: 'Admin',
          parentCursor: 'Pages',
        },
        Home: {
          cursor: 'Home',
          parentCursor: 'Pages',
        },
      },
      controls: {
        Oc: {
          data: 'Home:Admin',
          type: 'Select',
          id: '6f7a9f7f-0c3e-4d51-a3f2-96be1f571004',
          cursor: 'Oc',
          parentCursor: 'Pages',
        },
      },
      cursor: 'Pages',
      parentCursor: 'App',
    },
  },
  controls: {
    Oc: {
      data: 'Collections:Modifiers:Manager:Pages',
      type: 'Select',
      id: '6f7a9f7f-0c3e-4d51-a3f2-96be1f574001',
      cursor: 'Oc',
      parentCursor: 'App',
    },
  },
  cursor: 'App',
  parentCursor: 'null',
};
