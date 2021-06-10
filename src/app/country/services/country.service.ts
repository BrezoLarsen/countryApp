import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  get getHttpParams() {
    return new HttpParams()
    .set('fields', 'name;capital;alpha2Code;flag;population');
  }

  private apiUrl: string = "https://restcountries.eu/rest/v2";

  constructor(private httClient: HttpClient) { }

  searchCountry(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.httClient.get<Country[]>(url, {params: this.getHttpParams});

    // Manejo del error desde el servicio. También se puede hacer desde el componente:
    //   return this.httClient.get(url)
    //     .pipe(
    //       catchError( err => of([]))  // of es una función que genera Observables, transforma lo que hay dentro de los () en un nuevo
    //                                   // Atrapa el error y retorna lo que queramos, en este caso, un array vacío
    //     );
  }

  searchCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.httClient.get<Country[]>(url, {params: this.getHttpParams});
  }

  getCountryById(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.httClient.get<Country>(url);
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.httClient.get<Country[]>(url, {params: this.getHttpParams})
      .pipe(
        tap(console.log)
      );
  }

}
