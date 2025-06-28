import { HarnessLoader, TestElement } from '@angular/cdk/testing';
import { ManagerHarness } from '@components/molecules';
import { ComponentFixture } from '@angular/core/testing';
import { HOLD_THRESHOLD, MOCK_COLLECTIONS, MODIFIERS } from '@constants';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatRowHarness } from '@angular/material/table/testing';

interface ReturnType<T> {
  host: TestElement;
  harness: T;
}

export class User<T> {
  constructor(
    private readonly fixture: ComponentFixture<T>,
    private readonly loader: HarnessLoader
    // private readonly httpTesting: HttpTestingController
  ) {}

  async hold(host: TestElement): Promise<void> {
    await this.touch(host, HOLD_THRESHOLD);
  }

  async touch(host: TestElement, threshold: number = 0): Promise<void> {
    await host.dispatchEvent('pointerdown');
    await new Promise(resolve => setTimeout(resolve, threshold));
    await host.dispatchEvent('pointerup');
  }

  async touchedRow(index: number = 0): Promise<ReturnType<MatRowHarness>> {
    const row = (await this.loader.getAllHarnesses(MatRowHarness))[index];
    const host = await row.host();
    await this.touch(host);
    return { host, harness: row };
  }

  async touchedManager(): Promise<void> {
    const manager = await this.loader.getHarness(ManagerHarness);
    const managerButton = await manager.getButton();
    await managerButton.click();
  }

  async heldModifier(text: keyof typeof MODIFIERS): Promise<void> {
    const modifier = await this.loader.getHarness(MatButtonHarness.with({ text }));
    if (await modifier.isDisabled()) {
      throw new Error(`The button with the text: ${text} is disabled`);
    }
    const host = await modifier.host();
    await this.hold(host);
  }

  async touchedModifier(text: keyof typeof MODIFIERS): Promise<void> {
    const modifier = await this.loader.getHarness(MatButtonHarness.with({ text }));
    await modifier.click();
  }

  async touchedCollection(text: keyof typeof MOCK_COLLECTIONS): Promise<void> {
    const collectionTap = await this.loader.getHarness(MatButtonHarness.with({ text: new RegExp(text, 'i') }));
    await collectionTap.click();
  }

  // async goesToStartPage(): Promise<void> {
  //   this.fixture.detectChanges();
  //   const req = this.httpTesting.expectOne(`${ENV.API}/fractal?id=${ENV.ID}`);
  //   req.flush(appMock);
  // }
}
