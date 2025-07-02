import { ComponentFixture } from '@angular/core/testing';
import { CollectionComponent } from './children.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { configureTestingModule, fulfillCollection, User } from '@tests';
import { Fractal } from '@types';
import { FractalFactory } from '@utils';
import { MatRowHarness, MatHeaderCellHarness } from '@angular/material/table/testing';

describe('CollectionComponent', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<CollectionComponent>;

  let user: User<CollectionComponent>;
  let collection: Fractal;

  beforeEach(async () => {
    ({ user, loader, fixture } = await configureTestingModule(CollectionComponent));

    collection = new FractalFactory(fulfillCollection);
  });

  beforeEach(() => {
    fixture.componentRef.setInput('$fractal', collection);
  });

  it('should select rows', async () => {
    const rows = await loader.getAllHarnesses(MatRowHarness);
    const row1 = await rows[0].host();
    const row2 = await rows[1].host();

    await row1.click();

    expect(await row1.hasClass('selected-row')).toBeTrue();

    await row2.click();

    expect(await row1.hasClass('selected-row')).toBeTrue();
    expect(await row2.hasClass('selected-row')).toBeTrue();
  });

  it('should unselect rows', async () => {
    const rows = await loader.getAllHarnesses(MatRowHarness);
    const row1 = await rows[0].host();

    await row1.click();

    expect(await row1.hasClass('selected-row')).toBeTrue();

    await row1.click();

    expect(await row1.hasClass('selected-row')).toBeFalse();
  });

  it('should select bunch of rows', async () => {
    const rows = await loader.getAllHarnesses(MatRowHarness);
    const row1 = await rows[0].host();
    const row2 = await rows[1].host();

    await user.hold(row1);

    for (const row of rows) {
      const host = await row.host();
      expect(await host.hasClass('selected-row')).toBeTrue();
    }

    await user.hold(row2);

    for (const row of rows) {
      const host = await row.host();
      expect(await host.hasClass('selected-row')).toBeFalse();
    }

    await row1.click();

    expect(await row1.hasClass('selected-row')).toBeTrue();

    await user.hold(row1);

    expect(await row1.hasClass('selected-row')).toBeFalse();
  });

  it('should render a position column', async () => {
    const headers = await loader.getAllHarnesses(MatHeaderCellHarness);
    const positionColumnText = await headers[0].getText();

    expect(headers.length).toBe(3);
    expect(positionColumnText).toBe('No.');
  });
});
