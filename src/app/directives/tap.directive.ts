import { Directive, HostListener, inject, Input, OnDestroy, OnInit, output } from '@angular/core';
import { CHoldThreshold } from '@constants';
import { EventService } from '@services';
import { Timeout } from '@types';

@Directive({
  selector: '[appTap]',
  standalone: true,
})
export class TapDirective implements OnInit, OnDestroy {
  es = inject(EventService);

  @Input() disableHoldEvent = false;

  hold = output();
  touch = output();

  private isHoldSucceed = false;

  private readonly holdDelay = 150;
  private readonly holdThreshold = CHoldThreshold;

  private holdTimeout: Timeout | null = null;
  private holdDelayTimeout: Timeout | null = null;

  ngOnInit(): void {
    document.addEventListener('contextmenu', this.onContextmenu);
  }

  ngOnDestroy(): void {
    document.removeEventListener('contextmenu', this.onContextmenu);
  }

  @HostListener('pointerdown')
  pointerdown(): void {
    if (this.disableHoldEvent) return;
    this.holdDelayTimeout = setTimeout(() => this.es.$isHoldEventRunning.set(true), this.holdDelay);
    this.holdTimeout = setTimeout(() => (this.isHoldSucceed = true), this.holdThreshold);
  }

  @HostListener('pointerup')
  pointerup(): void {
    if (this.isHoldSucceed) {
      this.hold.emit();
      this.es.$isHoldEventRunning.set(false);
      this.cancel();
    } else {
      this.touch.emit();
      this.cancel();
    }
  }

  @HostListener('pointerleave')
  pointerleave(): void {
    this.cancel();
  }

  private readonly onContextmenu = (event: Event): void => {
    event.preventDefault();
  };

  private cancel(): void {
    this.isHoldSucceed = false;
    this.es.$isHoldEventRunning.set(false);
    this.holdTimeout && clearTimeout(this.holdTimeout);
    this.holdDelayTimeout && clearTimeout(this.holdDelayTimeout);
  }
}
