import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Equipo } from 'app/models/models';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-equipo-selector',
  templateUrl: './equipo-selector.component.html',
  styleUrls: ['./equipo-selector.component.css']
})
export class EquipoSelectorComponent implements OnInit {
  @Output() equipoSelected = new EventEmitter<Equipo>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      mates: new FormControl(0),
      bombillas: new FormControl(0),
      termos: new FormControl(0),
      yerba: new FormControl(false)
    });

    this.form.valueChanges.subscribe(
      () => {
        this.equipoSelected.emit(this.form.value);
      }
    );
  }

  ngOnInit() {
  }

}
