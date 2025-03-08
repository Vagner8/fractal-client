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
  private fractalApi = `${ENV.API}fractal`;
  private controlApi = `${ENV.API}control`;

  get(): Observable<IFractalDto> {
    return this.http.get<IFractalDto>(`${this.fractalApi}?id=${ENV.ID}`);
  }

  add(dto: IFractalDto[]): Observable<IFractalDto> {
    return this.http.post<IFractalDto>(this.fractalApi, dto);
  }

  addControls(dto: IControlDto[]): Observable<IControlDto[]> {
    return this.http.post<IControlDto[]>(this.controlApi, dto);
  }

  updateControls(dto: IControlDto[]): Observable<IControlDto[]> {
    return this.http.put<IControlDto[]>(this.controlApi, dto);
  }

  deleteControls(body: IControlDto[]): Observable<IControlDto[]> {
    return this.http.delete<IControlDto[]>(this.controlApi, {
      body,
    });
  }

  update(dto: IFractalDto[]): Observable<IFractalDto> {
    return this.http.put<IFractalDto>(this.fractalApi, dto);
  }

  delete(body: IFractalDto[]): Observable<IFractalDto[]> {
    return this.http.delete<IFractalDto[]>(this.fractalApi, {
      body,
    });
  }
}
