import { User } from './user';
import { configureTestingModule } from './testing-module';
import { HarnessLoader } from '@angular/cdk/testing';
import { ComponentFixture } from '@angular/core/testing';
import { AppComponent } from 'app/app.component';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { CModifiers, ENV } from '@constants';
import { HttpTestingController } from '@angular/common/http/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';

describe('AppComponent', () => {
  let user: User;
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    ({ user, loader, fixture, httpTesting } = await configureTestingModule());
    await user.goesToStartPage();
  });

  it('Should be able to render a new fractal when there is no parent Occ', async () => {
    await user.touchedManager();
    await user.touchedCollection('EmptyCollection');
    await user.touchedManager();
    await user.touchedModifier('New');
    const inputs = await loader.getAllHarnesses(MatFormFieldHarness);
    expect(inputs.length).toBe(3);
  });
});
