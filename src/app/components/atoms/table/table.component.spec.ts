import { appMock, configureTestingModule, User } from '@tests';
import { TableComponent } from './table.component';
import { ComponentFixture } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { Fractal } from '@utils';
import { CMockCollections } from '@constants';

import { MatRowHarness } from '@angular/material/table/testing';

describe('TableComponent #', () => {
  let user: User<TableComponent>;
  let loader: HarnessLoader;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    ({ user, fixture, loader } = await configureTestingModule(TableComponent));
  });

  describe('If children view', () => {
    const app = new Fractal({ dto: appMock });
    const populatedCollection = app.fractals.getByCursor(CMockCollections.PopulatedCollection)!;
    beforeEach(() => {
      fixture.componentRef.setInput('$view', 'children');
      fixture.componentRef.setInput('$fractal', populatedCollection);
    });

    it('Should render the table correctly', async () => {
      const row = await loader.getAllHarnesses(MatRowHarness);
      expect(row.length).toBe(3);
    });

    it('Should select and unselect a rows', async () => {
      const rows = await loader.getAllHarnesses(MatRowHarness);
      const hosts = await Promise.all(rows.map(r => r.host()));

      const assertSelection = async (expected: boolean[]): Promise<void> => {
        for (let i = 0; i < hosts.length; i++) {
          expect(await hosts[i].hasClass('selected-row')).toBe(expected[i]);
        }
      };

      const touchAndCheck = async (
        index: number,
        expected: boolean[],
        event: 'touch' | 'hold' = 'touch'
      ): Promise<void> => {
        await user[event](hosts[index]);
        await assertSelection(expected);
      };

      await assertSelection([false, false, false]);
      await touchAndCheck(0, [true, false, false]);
      await touchAndCheck(1, [true, true, false]);
      await touchAndCheck(2, [true, true, true]);
      await touchAndCheck(0, [false, true, true]);
      await touchAndCheck(1, [false, false, true]);
      await touchAndCheck(2, [false, false, false]);

      await assertSelection([false, false, false]);
      await touchAndCheck(0, [true, false, false]);
      await touchAndCheck(1, [false, false, false], 'hold');
      await touchAndCheck(2, [true, true, true], 'hold');
      await touchAndCheck(1, [false, false, false], 'hold');
    });
  });
});
