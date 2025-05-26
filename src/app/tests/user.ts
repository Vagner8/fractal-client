import { HarnessLoader, TestElement } from '@angular/cdk/testing';
import { ManagerHarness } from '@components/molecules';
import { appMock } from './mocks';
import { ComponentFixture } from '@angular/core/testing';
import { AppComponent } from 'app/app.component';
import { HttpTestingController } from '@angular/common/http/testing';
import { CHoldThreshold, CMockCollections, CModifiers, ENV } from '@constants';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatRowHarness } from '@angular/material/table/testing';

interface ReturnType<T> {
  host: TestElement;
  harness: T;
}

export class User {
  constructor(
    private readonly fixture: ComponentFixture<AppComponent>,
    private readonly loader: HarnessLoader,
    private readonly httpTesting: HttpTestingController
  ) {}

  async hold(host: TestElement): Promise<void> {
    await this.touch(host, CHoldThreshold);
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

  async heldModifier(text: keyof typeof CModifiers): Promise<void> {
    const modifier = await this.loader.getHarness(MatButtonHarness.with({ text }));
    const host = await modifier.host();
    await this.hold(host);
  }

  async touchedModifier(text: keyof typeof CModifiers): Promise<void> {
    const modifier = await this.loader.getHarness(MatButtonHarness.with({ text }));
    await modifier.click();
  }

  async touchedCollection(name: keyof typeof CMockCollections): Promise<void> {
    const collectionTap = await this.loader.getHarness(MatButtonHarness.with({ text: name }));
    await collectionTap.click();
  }

  async goesToStartPage(): Promise<void> {
    this.fixture.detectChanges();
    const req = this.httpTesting.expectOne(`${ENV.API}/fractal?id=${ENV.ID}`);
    req.flush(appMock);
  }

  async goesToCollections(name: keyof typeof CMockCollections): Promise<void> {
    await this.touchedManager();
    await this.touchedCollection(name);
  }
}
