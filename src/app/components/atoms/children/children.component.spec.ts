import { ComponentFixture } from '@angular/core/testing';
import { ChildrenComponent } from './children.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { configureCommonTestingModule, fulfillCollection, User } from '@tests';
import { Fractal } from '@types';
import { FractalBase } from '@utils';
import { MatRowHarness } from '@angular/material/table/testing';

describe('ChildrenComponent', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<ChildrenComponent>;

  let user: User<ChildrenComponent>;
  let collection: Fractal;

  beforeEach(async () => {
    ({ user, loader, fixture } = await configureCommonTestingModule(ChildrenComponent));

    collection = new FractalBase(fulfillCollection);
  });

  it('should select rows', async () => {
    fixture.componentRef.setInput('$fractal', collection);

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
    fixture.componentRef.setInput('$fractal', collection);

    const rows = await loader.getAllHarnesses(MatRowHarness);
    const row1 = await rows[0].host();

    await row1.click();

    expect(await row1.hasClass('selected-row')).toBeTrue();

    await row1.click();

    expect(await row1.hasClass('selected-row')).toBeFalse();
  });

  it('should select bunch of rows', async () => {
    fixture.componentRef.setInput('$fractal', collection);

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
});
