import { Injectable, signal } from '@angular/core';
import { Control, Controls, Fractal } from '@types';
import { ControlFactory, FractalFactory } from '@utils';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CreationService {
  $children = signal<Fractal[]>([]);
  $controls = signal<Control[]>([]);
  $childrenControls = signal<Control[]>([]);

  pushChild(parent: Fractal | null): void {
    if (parent) {
      const child = new FractalFactory(parent);
      child.controls = this.getControls(child);
      this.$children.update((prev) => [...prev, child]);
    }
  }

  pushControl(parent: Fractal): void {
    this.$controls.update((prev) => [...prev, new ControlFactory(parent)]);
  }

  pushChildrenControl(parent: Fractal): void {
    this.$childrenControls.update((prev) => [...prev, new ControlFactory(parent)]);
  }

  private getControls(parent: Fractal): Controls {
    const cursors: string[] = [];
    const controls: Controls = {};
    let current: Fractal | null | undefined = parent;

    while (current) {
      const childrenControls = current.getSplittableData('children controls');
      childrenControls.forEach((cursor) => {
        cursors.push(cursor);
        const control = current?.findChildrenControl(cursor);
        if (control) {
          control.id = v4();
          control.parent = parent;
          control.parentCursor = parent.cursor;
          controls[cursor] = control;
        }
      });
      current = current.parent;
    }

    controls['controls'].data = cursors.join(':');

    return controls;
  }
}
