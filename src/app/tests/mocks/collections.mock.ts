import { CMockCollections } from '@constants';
import { IFractalDto } from '@types';
import { v4 } from 'uuid';

interface CollectionsMockProps {
  appId?: string;
}

export const collectionsMock = (props: CollectionsMockProps = {}): IFractalDto => {
  const { appId = v4() } = props;

  const parentId = v4();
  const emptyCollectionId = v4();
  const populatedCollectionId = v4();

  const itemId1 = v4();
  const itemId2 = v4();
  const itemId3 = v4();

  const fractalDto: IFractalDto = {
    id: parentId,
    parentId: appId,
    controls: {
      Name: {
        id: v4(),
        parentId,
        data: 'Collections',
        field: 'text',
        indicator: 'Name',
      },
      Occ: {
        id: v4(),
        parentId,
        data: 'Name:Icon',
        field: 'text',
        indicator: 'Occ',
      },
      Oc: {
        id: v4(),
        parentId,
        data: `${CMockCollections.EmptyCollection}:${CMockCollections.PopulatedCollection}`,
        field: 'text',
        indicator: 'Oc',
      },
      Cursor: {
        id: v4(),
        parentId,
        data: 'Collections',
        field: 'text',
        indicator: 'Cursor',
      },
    },
    fractals: {
      [CMockCollections.EmptyCollection]: {
        id: emptyCollectionId,
        parentId,
        fractals: null,
        controls: {
          Name: {
            id: v4(),
            parentId: emptyCollectionId,
            data: CMockCollections.EmptyCollection,
            field: 'Text',
            indicator: 'Name',
          },
          Cursor: {
            id: v4(),
            parentId: emptyCollectionId,
            data: CMockCollections.EmptyCollection,
            field: 'Text',
            indicator: 'Cursor',
          },
          Icon: {
            id: v4(),
            parentId: emptyCollectionId,
            data: 'data-icon',
            field: 'Text',
            indicator: 'Icon',
          },
        },
      },
      [CMockCollections.PopulatedCollection]: {
        id: populatedCollectionId,
        parentId,
        controls: {
          Name: {
            id: v4(),
            parentId: populatedCollectionId,
            data: CMockCollections.PopulatedCollection,
            field: 'Text',
            indicator: 'Name',
          },
          Oc: {
            id: v4(),
            parentId: populatedCollectionId,
            data: '1:2:3',
            field: 'Text',
            indicator: 'Oc',
          },
          Occ: {
            id: v4(),
            parentId: populatedCollectionId,
            data: 'indicator_1:indicator_2',
            field: 'Text',
            indicator: 'Occ',
          },
          Cursor: {
            id: v4(),
            parentId: populatedCollectionId,
            data: CMockCollections.PopulatedCollection,
            field: 'Text',
            indicator: 'Cursor',
          },
        },
        fractals: {
          '1': {
            id: itemId1,
            parentId: populatedCollectionId,
            fractals: null,
            controls: {
              indicator_1: {
                id: v4(),
                parentId: itemId1,
                data: 'data_1',
                field: 'Text',
                indicator: 'indicator_1',
              },
              indicator_2: {
                id: v4(),
                parentId: itemId1,
                data: 'data_2',
                field: 'Text',
                indicator: 'indicator_2',
              },
              Cursor: {
                id: v4(),
                parentId: itemId1,
                data: '1',
                field: 'Text',
                indicator: 'Cursor',
              },
            },
          },
          '2': {
            id: itemId2,
            parentId: populatedCollectionId,
            fractals: null,
            controls: {
              indicator_1: {
                id: v4(),
                parentId: itemId2,
                data: 'data_1',
                field: 'Text',
                indicator: 'indicator_1',
              },
              indicator_2: {
                id: v4(),
                parentId: itemId2,
                data: 'data_2',
                field: 'Text',
                indicator: 'indicator_2',
              },
              Cursor: {
                id: v4(),
                parentId: itemId2,
                data: '2',
                field: 'Text',
                indicator: 'Cursor',
              },
            },
          },
          '3': {
            id: itemId3,
            parentId: populatedCollectionId,
            fractals: null,
            controls: {
              indicator_1: {
                id: v4(),
                parentId: itemId3,
                data: 'data_1',
                field: 'Text',
                indicator: 'indicator_1',
              },
              indicator_2: {
                id: v4(),
                parentId: itemId3,
                data: 'data_2',
                field: 'Text',
                indicator: 'indicator_2',
              },
              Cursor: {
                id: v4(),
                parentId: itemId3,
                data: '1',
                field: 'Text',
                indicator: 'Cursor',
              },
            },
          },
        },
      },
    },
  };

  return fractalDto;
};
