import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styleUrls: ['./by-region.component.css']
})
export class ByRegionComponent implements OnInit {

  regions: string[] = ['europe', 'asia', 'americas', 'oceania', 'africa'];
  activeRegion: string = '';
  countries: Country[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  getClass(region: string): string {
    return (region === this.activeRegion) ? 'btn-primary' : 'btn-outline-primary';
  }

  activateRegion(region: string) {

    if (region === this.activeRegion) { return; }

    this.activeRegion = region;
    this.countries = [];

    this.countryService.getCountriesByRegion(region)
      .subscribe(countries => this.countries = countries);

  }

}
