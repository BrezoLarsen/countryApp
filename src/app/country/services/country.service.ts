import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string = "https://restcountries.eu/rest/v2";

  constructor(private httClient: HttpClient) { }

  searchCountry(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.httClient.get<Country[]>(url);

    // Manejo del error desde el servicio. También se puede hacer desde el componente:
    //   return this.httClient.get(url)
    //     .pipe(
    //       catchError( err => of([]))  // of es una función que genera Observables, transforma lo que hay dentro de los () en un nuevo
    //                                   // Atrapa el error y retorna lo que queramos, en este caso, un array vacío
    //     );
  }

  searchCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.httClient.get<Country[]>(url);
  }

  getCountryById(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.httClient.get<Country>(url);
  }

}
