import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators'; // switchMap: recibe un Observable y regresa otro Observable / tap: dispara un efecto secundario
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  country: Country;

  constructor(
    private activatedRouter: ActivatedRoute,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    // this.activatedRouter.params
    //   .subscribe( ({id}) => {  // ({id}): desestructuración para extraer el ID, es lo mismo ({id}) que (params.id)
    //     console.log(id)
    //     this.countryService.getCountryById(id)
    //       .subscribe( country => {
    //         console.log(country)
    //       })
    //   })

    // Podemos hacer lo mismo con SwitchMap:
    this.activatedRouter.params
      .pipe(
        switchMap( ({id}) => this.countryService.getCountryById(id)),
        tap(resp => console.log(resp)) // tap recibe el producto del observable switchMap( ({id}) => this.countryService.getCountryById(id)) e imprime en consola lo que responde
      )
      .subscribe(country => this.country = country)
  }

}
