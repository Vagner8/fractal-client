import { FractalDto } from '@types';

export const appTestData: FractalDto = {
  cursor: 'App',
  parentCursor: 'null',
  controls: {
    Oc: {
      data: 'Collections:Settings',
      type: 'Select',
      id: '6f7a9f7f-0c3e-4d51-a3f2-96be1f574001',
      cursor: 'Oc',
      parentCursor: 'App',
    },
    Occ: {
      data: 'No.:Cursor',
      type: 'Select',
      id: '6f7a9f7f-0c3e-4d51-a3f0-96beYU574001',
      cursor: 'Occ',
      parentCursor: 'App',
    },
    Ooc: {
      data: 'Oc:Occ:Ooc',
      type: 'Select',
      id: '6f7a9f7f-0c3e-4d51-a3f0-96be1f574001',
      cursor: 'Occ',
      parentCursor: 'App',
    },
    Omc: {
      data: 'data:type:cursor:No.',
      type: 'Select',
      id: '6f7a9f7f-0c3e-4d51-a3f0-96be1f574901',
      cursor: 'Omc',
      parentCursor: 'App',
    },
  },
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
        Occ: {
          data: 'Cursor:No.',
          type: 'Select',
          id: '6f7a9f7O-0c3e-4d51-p3f8-96be1f574003',
          cursor: 'Occ',
          parentCursor: 'Collections',
        },
        Ooc: {
          data: 'Oc:Occ:Ooc',
          type: 'Select',
          id: '6f7a9f7f-0c3e-4d51-a3f0-96by1f574001',
          cursor: 'Occ',
          parentCursor: 'Collections',
        },
        Omc: {
          data: 'data:type:cursor:No.',
          type: 'Select',
          id: '6f7a9f7f-0c3e-4d51-a3f0-96be1v574901',
          cursor: 'Omc',
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
            Ooc: {
              data: 'Oc:Ooc:Occ',
              type: 'Select',
              id: '6f7a9f9f-0c3e-4d51-a3f0-96be1f574001',
              cursor: 'Occ',
              parentCursor: 'Users',
            },
            Occ: {
              data: 'No.:Cursor',
              type: 'Select',
              id: '6f7a9f7f-0c3e-6d51-a3f0-96by1f574001',
              cursor: 'Occ',
              parentCursor: 'Users',
            },
            Omc: {
              data: 'data:type:cursor:No.',
              type: 'Select',
              id: '6f7a9f7f-0c3e-4u51-a3f0-96be1v574901',
              cursor: 'Omc',
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
            Oc: {
              data: '',
              type: 'Select',
              id: '6i7a9f7f-0c3n-4p51-p3f2-96be1f574003',
              cursor: 'Oc',
              parentCursor: 'Products',
            },
            Ooc: {
              data: 'Oc:Ooc:Occ',
              type: 'Select',
              id: '6f7a9f9f-0c3e-4d01-a3f0-96be1f574001',
              cursor: 'Occ',
              parentCursor: 'Products',
            },
            Occ: {
              data: 'No.',
              type: 'Select',
              id: '6f7a9f7f-0c3e-6d59-a3f0-96by1f574001',
              cursor: 'Occ',
              parentCursor: 'Products',
            },
            Omc: {
              data: 'No.',
              type: 'Select',
              id: '6f7a9f7f-0c3e-6d51-a3f0-96by1f574001',
              cursor: 'Omc',
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
        Oc: {
          data: 'Modifiers:Manager:Back button',
          type: 'Select',
          id: '6f7a9f7f-0c5e-4d51-p3f2-96be1f574003',
          cursor: 'Oc',
          parentCursor: 'Settings',
        },
        Occ: {
          data: 'Cursor:No.',
          type: 'Select',
          id: '6f7a9f7O-0c3e-4d51-p3f8-96be1f577703',
          cursor: 'Occ',
          parentCursor: 'Settings',
        },
        Ooc: {
          data: 'Oc:Occ:Ooc',
          type: 'Select',
          id: '6f7a9f7f-0c3e-4d51-a3f0-90by1f574001',
          cursor: 'Occ',
          parentCursor: 'Settings',
        },
        Omc: {
          data: 'data:type:cursor:No.',
          type: 'Select',
          id: '6f7a9f7f-0c3e-4u51-a3f0-98be1v574901',
          cursor: 'Omc',
          parentCursor: 'Settings',
        },
      },
      children: {
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
        Manager: {
          cursor: 'Manager',
          parentCursor: 'App',
        },
        ['Back button']: {
          cursor: 'Back button',
          parentCursor: 'Settings',
          controls: {
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
