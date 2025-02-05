import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '@constants';
import { ControlDto, FractalDto } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  private fractalApi = `${ENV.API}fractal`;
  private controlApi = `${ENV.API}control`;

  get(): Observable<FractalDto> {
    return this.http.get<FractalDto>(`${this.fractalApi}?id=${ENV.ID}`);
  }

  add(dto: FractalDto[]): Observable<FractalDto> {
    return this.http.post<FractalDto>(this.fractalApi, dto);
  }

  addControls(dto: ControlDto[]): Observable<ControlDto[]> {
    return this.http.post<ControlDto[]>(this.controlApi, dto);
  }

  update(dto: FractalDto[]): Observable<FractalDto> {
    return this.http.put<FractalDto>(this.fractalApi, dto);
  }

  delete(body: FractalDto[]): Observable<FractalDto[]> {
    return this.http.delete<FractalDto[]>(this.fractalApi, {
      body,
    });
  }

  deleteControls(body: ControlDto[]): Observable<ControlDto[]> {
    return this.http.delete<ControlDto[]>(this.controlApi, {
      body,
    });
  }
}
