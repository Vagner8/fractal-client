// import { IFractalDto } from '@types';
// import { v4 } from 'uuid';

// interface ModifiersMockProps {
//   appId?: string;
// }

// export const modifiersMock = (props: ModifiersMockProps = {}): IFractalDto => {
//   const { appId = v4() } = props;
//   const parentId = v4();
//   const newId = v4();
//   const editId = v4();
//   const saveId = v4();
//   const deleteId = v4();

//   const modifiers: IFractalDto = {
//     id: parentId,
//     parentId: appId,
//     controls: {
//       Occ: {
//         id: v4(),
//         parentId,
//         data: 'Name',
//         field: 'text',
//         indicator: 'Occ',
//       },
//       Cursor: {
//         id: v4(),
//         parentId,
//         data: 'Modifiers',
//         field: 'text',
//         indicator: 'Cursor',
//       },
//       Name: {
//         id: v4(),
//         parentId,
//         data: 'Modifiers',
//         field: 'text',
//         indicator: 'Name',
//       },
//       Oc: {
//         id: v4(),
//         parentId,
//         data: 'Delete:Save:New:Edit',
//         field: 'text',
//         indicator: 'Oc',
//       },
//     },
//     fractals: {
//       New: {
//         id: newId,
//         parentId,
//         fractals: null,
//         controls: {
//           Cursor: {
//             id: v4(),
//             parentId: newId,
//             data: 'New',
//             field: 'text',
//             indicator: 'Cursor',
//           },
//           Name: {
//             id: v4(),
//             parentId: newId,
//             data: 'New',
//             field: 'text',
//             indicator: 'Name',
//           },
//         },
//       },
//       Save: {
//         id: saveId,
//         parentId,
//         fractals: null,
//         controls: {
//           Name: {
//             id: v4(),
//             parentId: saveId,
//             data: 'Save',
//             field: 'text',
//             indicator: 'Name',
//           },
//           Cursor: {
//             id: v4(),
//             parentId: saveId,
//             data: 'Save',
//             field: 'text',
//             indicator: 'Cursor',
//           },
//         },
//       },
//       Delete: {
//         id: deleteId,
//         parentId,
//         fractals: null,
//         controls: {
//           Name: {
//             id: v4(),
//             parentId: deleteId,
//             data: 'Delete',
//             field: 'text',
//             indicator: 'Name',
//           },
//           Cursor: {
//             id: v4(),
//             parentId: deleteId,
//             data: 'Delete',
//             field: 'text',
//             indicator: 'Cursor',
//           },
//         },
//       },
//       Edit: {
//         id: editId,
//         parentId,
//         fractals: null,
//         controls: {
//           Cursor: {
//             id: v4(),
//             parentId: editId,
//             data: 'Edit',
//             field: 'text',
//             indicator: 'Cursor',
//           },
//           Name: {
//             id: v4(),
//             parentId: editId,
//             data: 'Edit',
//             field: 'text',
//             indicator: 'Name',
//           },
//         },
//       },
//     },
//   };

//   return modifiers;
// };
