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
  private readonly fractalApi = `${ENV.API}/fractal`;
  private readonly controlApi = `${ENV.API}/control`;

  getFractal(): Observable<IFractalDto> {
    return this.http.get<IFractalDto>(`${this.fractalApi}?id=${ENV.ID}`);
  }

  addFractals(dto: IFractalDto[]): Observable<IFractalDto[]> {
    return this.http.post<IFractalDto[]>(this.fractalApi, dto);
  }

  deleteFractals(body: IFractalDto[]): Observable<IFractalDto[]> {
    return this.http.delete<IFractalDto[]>(this.fractalApi, {
      body,
    });
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
}
