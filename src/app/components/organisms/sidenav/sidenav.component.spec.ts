import { HarnessLoader } from '@angular/cdk/testing';
import { SidenavComponent } from './sidenav.component';
import { configureTestingModule, modifiersMock } from '@tests';
import { ComponentFixture } from '@angular/core/testing';
import { FractalFactory } from '@utils';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MODIFIERS } from '@constants';

describe('SidenavComponent', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<SidenavComponent>;
  let component: SidenavComponent;

  beforeEach(async () => {
    ({ loader, fixture, component } = await configureTestingModule(SidenavComponent));
  });

  describe('Modifiers', () => {
    beforeEach(async () => {
      fixture.componentRef.setInput('$fractal', new FractalFactory(modifiersMock));
    });

    it('should render all modifiers', async () => {
      const modifiers = await loader.getAllHarnesses(MatButtonHarness);
      expect(modifiers.length).toBe(4);
    });

    describe('Edit', () => {
      let editModifier: MatButtonHarness;

      beforeEach(async () => {
        editModifier = await loader.getHarness(MatButtonHarness.with({ text: MODIFIERS.EDIT }));
      });

      it('should handel the touch event', async () => {
        const editSpy = spyOn(component.ms, 'edit');

        await editModifier.click();

        expect(editSpy).toHaveBeenCalled();
      });
    });
  });
});
