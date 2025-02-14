import { FormControl, FormGroup } from '@angular/forms';
import { ConstControlFormKeys } from '@constants';
import { NewControlForm } from '@types';

export const newControlForm = (): NewControlForm =>
  new FormGroup(
    ConstControlFormKeys.strings.reduce((acc: Record<string, FormControl>, key) => {
      acc[key] = new FormControl('');
      return acc;
    }, {})
  );
