import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html'
})
export class CountryInputComponent implements OnInit {

  @Input() placeholder: string;

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject;

  termino: string;

  constructor() { }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))  // No envía el valor hasta que no pasa este tiempo
      .subscribe( valor => {
        console.log('debouncer', valor);
        this.onDebounce.emit(valor);
      })
  }

  search() {
    this.onEnter.emit( this.termino );
  }

  pressKey() {
    this.debouncer.next(this.termino);
  }

}
