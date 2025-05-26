import { User } from './user';
import { configureTestingModule } from './testing-module';
import { HarnessLoader } from '@angular/cdk/testing';
import { ComponentFixture } from '@angular/core/testing';
import { AppComponent } from 'app/app.component';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { CModifiers } from '@constants';

describe('AppComponent', () => {
  let user: User;
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    ({ user, loader, fixture } = await configureTestingModule());
    await user.goesToStartPage();
  });

  it('Should save a new fractal even when it was not dirty', async () => {
    await user.goesToCollections('PopulatedCollection');
    await user.touchedManager();
    const newTap = await loader.getHarness(MatButtonHarness.with({ text: CModifiers.New }));
    expect(await newTap.isDisabled()).toBeFalse();
    await user.touchedModifier('New');
    const saveTap = await loader.getHarness(MatButtonHarness.with({ text: CModifiers.Save }));
    expect(await saveTap.isDisabled()).toBeFalse();
    await user.heldModifier('Save');
  });
});
