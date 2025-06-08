import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '@constants';
import { IControlDto, IFractalDto } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);

  getFractal(): Observable<IFractalDto> {
    return this.http.get<IFractalDto>(`${ENV.FRACTAL_API}?id=${ENV.ID}`);
  }

  addFractals(dto: IFractalDto[]): Observable<IFractalDto[]> {
    return this.http.post<IFractalDto[]>(ENV.FRACTAL_API, dto);
  }

  deleteFractals(body: IFractalDto[]): Observable<IFractalDto[]> {
    return this.http.delete<IFractalDto[]>(ENV.FRACTAL_API, {
      body,
    });
  }

  addControls(dto: IControlDto[]): Observable<IControlDto[]> {
    return this.http.post<IControlDto[]>(ENV.CONTROL_API, dto);
  }

  updateControls(dto: IControlDto[]): Observable<IControlDto[]> {
    return this.http.put<IControlDto[]>(ENV.CONTROL_API, dto);
  }

  deleteControls(body: IControlDto[]): Observable<IControlDto[]> {
    return this.http.delete<IControlDto[]>(ENV.CONTROL_API, {
      body,
    });
  }
}
