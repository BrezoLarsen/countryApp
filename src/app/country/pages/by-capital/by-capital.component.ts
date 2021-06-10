import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styleUrls: ['./by-capital.component.css']
})
export class ByCapitalComponent implements OnInit {

  termino: string = "";
  isError: boolean = false;
  countries: Country[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  search(termino: string) {
    this.isError = false;
    this.termino = termino;

    this.countryService.searchCapital(this.termino)
      .subscribe( (countries) => {
        console.log(countries);
        this.countries = countries;
      }, (error) => {
        // Manejo del error desde el componente. También se puede hacer desde el servicio
        console.info(error) // Objeto con los datos del error, por ejemplo: error.status = 404
        this.isError = true;
        this.countries = [];
      })
  }

}
