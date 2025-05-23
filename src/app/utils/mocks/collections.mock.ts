import { IFractal, IFractalDto } from '@types';
import { v4 } from 'uuid';
import { Fractal } from '../fractal';

interface CollectionsMockProps {
  appId?: string;
}

interface CollectionsMockReturnValue {
  fractalDto: IFractalDto;
  emptyCollectionDto: IFractalDto;
  populatedCollectionDto: IFractalDto;

  fractal: IFractal;
  emptyCollection: IFractal;
  populatedCollection: IFractal;
}

export const collectionsMock = (props: CollectionsMockProps = {}): CollectionsMockReturnValue => {
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
        data: 'EmptyCollection:PopulatedCollection',
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
      EmptyCollection: {
        id: emptyCollectionId,
        parentId,
        fractals: null,
        controls: {
          Cursor: {
            id: v4(),
            parentId: emptyCollectionId,
            data: 'EmptyCollection',
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
          Name: {
            id: v4(),
            parentId: emptyCollectionId,
            data: 'EmptyCollection',
            field: 'Text',
            indicator: 'Name',
          },
        },
      },
      PopulatedCollection: {
        id: populatedCollectionId,
        parentId,
        controls: {
          Name: {
            id: v4(),
            parentId: populatedCollectionId,
            data: 'PopulatedCollection',
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
            data: 'indicator-1:indicator-2',
            field: 'Text',
            indicator: 'Occ',
          },
          Cursor: {
            id: v4(),
            parentId: populatedCollectionId,
            data: 'PopulatedCollection',
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

  const emptyCollectionDto = fractalDto.fractals!['EmptyCollection'];
  const populatedCollectionDto = fractalDto.fractals!['PopulatedCollection'];

  return {
    fractalDto,
    emptyCollectionDto,
    populatedCollectionDto,
    fractal: new Fractal({ dto: fractalDto }),
    emptyCollection: new Fractal({ dto: emptyCollectionDto }),
    populatedCollection: new Fractal({ dto: populatedCollectionDto }),
  };
};
