import { FractalDto } from '@types';

export const modifiersMock: FractalDto = {
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
      type: 'String[]',
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
      type: 'String[]',
      indicator: 'Oc',
      id: '5ef13ca4-bc06-4299-bee2-e0dea53782dc',
      parentId: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
    },
  },
  id: '688d3311-1f66-4bc2-a511-73ad7ba5e465',
  parentId: '93ee08d6-9eb5-4087-a8fa-a603b3fd932d',
};
