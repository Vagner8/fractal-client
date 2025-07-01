import { FractalDto } from '@types';

export const appMock: FractalDto = {
  children: {
    Collections: {
      children: {
        Users: {
          children: {
            '1': {
              children: null,
              controls: {
                Name: {
                  data: 'Dima',
                  type: 'String',
                  indicator: 'Name',
                  id: '710d45bd-3e0e-43ae-b92a-a8050630b3ab',
                  parentId: 'b5d81bb8-1cfe-485f-bb51-9c0aa3933ca9',
                },
                Email: {
                  data: 'dima@mail.com',
                  type: 'String',
                  indicator: 'Email',
                  id: '7df9b019-a7ba-4755-973f-f041131ba4c8',
                  parentId: 'b5d81bb8-1cfe-485f-bb51-9c0aa3933ca9',
                },
                Cursor: {
                  data: '1',
                  type: 'String',
                  indicator: 'Cursor',
                  id: '0104d959-5508-4047-9582-f70517f377ad',
                  parentId: 'b5d81bb8-1cfe-485f-bb51-9c0aa3933ca9',
                },
              },
              id: 'b5d81bb8-1cfe-485f-bb51-9c0aa3933ca9',
              parentId: '3660b6a6-1024-43de-bfce-39c105fdd615',
            },
            '2': {
              children: null,
              controls: {
                Name: {
                  data: 'Anna',
                  type: 'String',
                  indicator: 'Name',
                  id: '7e152e80-a14e-4815-88a0-8de837ee8229',
                  parentId: '6105f394-4a1c-4d5d-bcf7-a4f13ee4bec1',
                },
                Email: {
                  data: 'anna@mail.com',
                  type: 'String',
                  indicator: 'Email',
                  id: 'ff8da21c-3b10-4b12-8ba0-acc5daa8d609',
                  parentId: '6105f394-4a1c-4d5d-bcf7-a4f13ee4bec1',
                },
                Cursor: {
                  data: '2',
                  type: 'String',
                  indicator: 'Cursor',
                  id: '69276b46-c5f8-452b-97ee-ff827a9408b0',
                  parentId: '6105f394-4a1c-4d5d-bcf7-a4f13ee4bec1',
                },
              },
              id: '6105f394-4a1c-4d5d-bcf7-a4f13ee4bec1',
              parentId: '3660b6a6-1024-43de-bfce-39c105fdd615',
            },
            '3': {
              children: null,
              controls: {
                Email: {
                  data: 'vova@mail.com',
                  type: 'String',
                  indicator: 'Email',
                  id: 'f9358795-a206-4b81-a040-2e46bdaee0c1',
                  parentId: 'a9d931f2-29d5-4266-a904-e02d3000e83c',
                },
                Cursor: {
                  data: '3',
                  type: 'String',
                  indicator: 'Cursor',
                  id: '82ffcf9a-c62f-4c9a-8701-702b92d1be0e',
                  parentId: 'a9d931f2-29d5-4266-a904-e02d3000e83c',
                },
                Name: {
                  data: 'Vova',
                  type: 'String',
                  indicator: 'Name',
                  id: 'f5130980-cd1b-4e0d-87b1-dd44b9e505e2',
                  parentId: 'a9d931f2-29d5-4266-a904-e02d3000e83c',
                },
              },
              id: 'a9d931f2-29d5-4266-a904-e02d3000e83c',
              parentId: '3660b6a6-1024-43de-bfce-39c105fdd615',
            },
          },
          controls: {
            Oc: {
              data: '3:2:1',
              type: 'Select',
              indicator: 'Oc',
              id: 'bba0d106-e654-4dd0-be21-641ccfc7bb2f',
              parentId: '3660b6a6-1024-43de-bfce-39c105fdd615',
            },
            Occ: {
              data: 'Email:Name',
              type: 'Select',
              indicator: 'Occ',
              id: 'b8455672-c614-40f7-b877-e780ef22d4b8',
              parentId: '3660b6a6-1024-43de-bfce-39c105fdd615',
            },
            Name: {
              data: 'Users',
              type: 'String',
              indicator: 'Name',
              id: '18b472df-ac53-43c8-a171-8b87acbacae1',
              parentId: '3660b6a6-1024-43de-bfce-39c105fdd615',
            },
            Cursor: {
              data: 'Users',
              type: 'String',
              indicator: 'Cursor',
              id: 'f9ab3f3f-3cdc-4776-9bbe-8e3c43117094',
              parentId: '3660b6a6-1024-43de-bfce-39c105fdd615',
            },
          },
          id: '3660b6a6-1024-43de-bfce-39c105fdd615',
          parentId: 'ef0077b4-af7c-4928-9b6c-06e9845908b5',
        },
        Products: {
          children: null,
          controls: {
            Icon: {
              data: 'widgets',
              type: 'String',
              indicator: 'Icon',
              id: 'a39aae94-ab08-4cd1-af36-3c59584ed6e8',
              parentId: '7f035cb9-e1cb-45c1-b54b-c65a868ae045',
            },
            Name: {
              data: 'Products',
              type: 'String',
              indicator: 'Name',
              id: 'c0f3ec8f-8ff6-497a-8418-4f46cc8697b6',
              parentId: '7f035cb9-e1cb-45c1-b54b-c65a868ae045',
            },
            Cursor: {
              data: 'Products',
              type: 'String',
              indicator: 'Cursor',
              id: '7d599f3c-5104-4537-8efe-fbb1b459d58d',
              parentId: '7f035cb9-e1cb-45c1-b54b-c65a868ae045',
            },
          },
          id: '7f035cb9-e1cb-45c1-b54b-c65a868ae045',
          parentId: 'ef0077b4-af7c-4928-9b6c-06e9845908b5',
        },
      },
      controls: {
        Occ: {
          data: 'Name:Icon',
          type: 'Select',
          indicator: 'Occ',
          id: '9f12bd03-4c38-4650-8cc8-0f59830bbdee',
          parentId: 'ef0077b4-af7c-4928-9b6c-06e9845908b5',
        },
        Name: {
          data: 'Collections',
          type: 'String',
          indicator: 'Name',
          id: '31dbba10-d97e-4f5a-acf4-3fd52ddf7d32',
          parentId: 'ef0077b4-af7c-4928-9b6c-06e9845908b5',
        },
        Cursor: {
          data: 'Collections',
          type: 'String',
          indicator: 'Cursor',
          id: '09f33ac9-8188-4776-a2a9-8990d29f35b4',
          parentId: 'ef0077b4-af7c-4928-9b6c-06e9845908b5',
        },
        Oc: {
          data: 'Products:Users',
          type: 'Select',
          indicator: 'Oc',
          id: '26656b41-d321-425e-a0df-97c36a5fd311',
          parentId: 'ef0077b4-af7c-4928-9b6c-06e9845908b5',
        },
      },
      id: 'ef0077b4-af7c-4928-9b6c-06e9845908b5',
      parentId: '93ee08d6-9eb5-4087-a8fa-a603b3fd932d',
    },
    Manager: {
      children: null,
      controls: {
        Cursor: {
          data: 'Manager',
          type: 'String',
          indicator: 'Cursor',
          id: '0ec81618-6b5e-468a-8c46-9eb1db9b14c5',
          parentId: '055aa20b-2a5f-42ec-ad50-72801656d31c',
        },
      },
      id: '055aa20b-2a5f-42ec-ad50-72801656d31c',
      parentId: '93ee08d6-9eb5-4087-a8fa-a603b3fd932d',
    },
    Modifiers: {
      children: {
        Delete: {
          children: null,
          controls: {
            Cursor: {
              data: 'Delete',
              type: 'String',
              indicator: 'Cursor',
              id: '92060ec7-b934-4a83-b792-b15c306e6ef2',
              parentId: '75099a70-9604-4775-a943-3ba5dbe7898a',
            },
            Name: {
              data: 'Delete',
              type: 'String',
              indicator: 'Name',
              id: '5cb3291b-7a96-4dc5-b162-f63b5e7bcc0b',
              parentId: '75099a70-9604-4775-a943-3ba5dbe7898a',
            },
          },
          id: '75099a70-9604-4775-a943-3ba5dbe7898a',
          parentId: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
        },
        Save: {
          children: null,
          controls: {
            Cursor: {
              data: 'Save',
              type: 'String',
              indicator: 'Cursor',
              id: 'a0c6137f-5977-41eb-aa7b-70df35c9b9bf',
              parentId: '9e853a84-7b7b-4fe3-be98-3f7046de8c96',
            },
            Name: {
              data: 'Save',
              type: 'String',
              indicator: 'Name',
              id: 'dd46a11f-dda8-44b2-91ec-7459680187b6',
              parentId: '9e853a84-7b7b-4fe3-be98-3f7046de8c96',
            },
          },
          id: '9e853a84-7b7b-4fe3-be98-3f7046de8c96',
          parentId: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
        },
        Edit: {
          children: null,
          controls: {
            Name: {
              data: 'Edit',
              type: 'String',
              indicator: 'Name',
              id: 'de1fea04-685a-476d-8b14-367254afd84d',
              parentId: '4b33ae9d-a3fa-4015-a188-8bcb7944136f',
            },
            Cursor: {
              data: 'Edit',
              type: 'String',
              indicator: 'Cursor',
              id: 'b253976b-822c-4299-9a23-3ac6a98606dc',
              parentId: '4b33ae9d-a3fa-4015-a188-8bcb7944136f',
            },
          },
          id: '4b33ae9d-a3fa-4015-a188-8bcb7944136f',
          parentId: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
        },
        New: {
          children: null,
          controls: {
            Name: {
              data: 'New',
              type: 'String',
              indicator: 'Name',
              id: 'e5f70dfd-b180-4870-bc18-20fba9b487aa',
              parentId: '0be3a93c-ace0-4f66-869b-f1cffe2e279b',
            },
            Cursor: {
              data: 'New',
              type: 'String',
              indicator: 'Cursor',
              id: '3f42d4b8-4347-492c-9941-d29025554833',
              parentId: '0be3a93c-ace0-4f66-869b-f1cffe2e279b',
            },
          },
          id: '0be3a93c-ace0-4f66-869b-f1cffe2e279b',
          parentId: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
        },
      },
      controls: {
        Occ: {
          data: 'Name',
          type: 'Select',
          indicator: 'Occ',
          id: '5972107d-eb07-4318-a77b-0a67e815bc1b',
          parentId: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
        },
        Cursor: {
          data: 'Modifiers',
          type: 'String',
          indicator: 'Cursor',
          id: 'f787ea7a-77b2-4ef2-b71d-7d208916f8d2',
          parentId: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
        },
        Name: {
          data: 'Modifiers',
          type: 'String',
          indicator: 'Name',
          id: '33d016bf-cef6-4cf8-be9b-c4ae2716f71e',
          parentId: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
        },
        Oc: {
          data: 'Delete:Save:New:Edit',
          type: 'Select',
          indicator: 'Oc',
          id: '5ef13ca4-bc06-4299-bee2-e0dea53782dc',
          parentId: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
        },
      },
      id: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
      parentId: '93ee08d6-9eb5-4087-a8fa-a603b3fd932d',
    },
  },
  controls: {
    Oc: {
      data: 'Modifiers:Collections',
      type: 'Select',
      indicator: 'Oc',
      id: '6241b8ee-8595-4d9c-a7e0-2eca84a545a8',
      parentId: '93ee08d6-9eb5-4087-a8fa-a603b3fd932d',
    },
    Occ: {
      data: 'Name',
      type: 'Select',
      indicator: 'Occ',
      id: '7df8d4dc-206f-426d-bfa4-36b0f60b386d',
      parentId: '93ee08d6-9eb5-4087-a8fa-a603b3fd932d',
    },
    Cursor: {
      data: 'App',
      type: 'String',
      indicator: 'Cursor',
      id: 'd8714161-c96a-4e4c-b095-a9bb94669107',
      parentId: '93ee08d6-9eb5-4087-a8fa-a603b3fd932d',
    },
  },
  id: '93ee08d6-9eb5-4087-a8fa-a603b3fd932d',
  parentId: 'parentId',
};
