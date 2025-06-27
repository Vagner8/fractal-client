import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '@constants';
import { FractalDto } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);

  getChildRecursively(): Observable<FractalDto> {
    return this.http.get<FractalDto>(`${ENV.FRACTAL_API}?id=${ENV.ID}`);
  }

  addFractals(dto: FractalDto[]): Observable<FractalDto[]> {
    return this.http.post<FractalDto[]>(ENV.FRACTAL_API, dto);
  }

  deleteFractals(body: FractalDto[]): Observable<FractalDto[]> {
    return this.http.delete<FractalDto[]>(ENV.FRACTAL_API, {
      body,
    });
  }

  // addControls(dto: IControlDto[]): Observable<IControlDto[]> {
  //   return this.http.post<IControlDto[]>(ENV.CONTROL_API, dto);
  // }

  // updateControls(dto: IControlDto[]): Observable<IControlDto[]> {
  //   return this.http.put<IControlDto[]>(ENV.CONTROL_API, dto);
  // }

  // deleteControls(body: IControlDto[]): Observable<IControlDto[]> {
  //   return this.http.delete<IControlDto[]>(ENV.CONTROL_API, {
  //     body,
  //   });
  // }
}
