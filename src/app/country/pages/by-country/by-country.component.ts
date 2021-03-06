import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styleUrls: ['./by-country.component.css']
})
export class ByCountryComponent implements OnInit {

  termino: string = "";
  isError: boolean = false;
  showSuggestionsList: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  search(termino: string) {
    this.isError = false;
    this.termino = termino;
    this.showSuggestionsList = false;

    this.countryService.searchCountry(this.termino)
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

  showSuggestions(termino: string) {
    this.isError = false;
    this.termino = termino;
    this.showSuggestionsList = true;

    this.countryService.searchCountry(termino)
      .subscribe(
        countries => this.suggestedCountries = countries.splice(0, 5),
        (err) => this.suggestedCountries = [])
  }

  searchSuggested(termino: string) {
    this.search(termino);
  }

}
