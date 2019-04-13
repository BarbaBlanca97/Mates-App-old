import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Client, Facultades } from 'app/models/models';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

export interface UpdateClientDialogData {
  createNew: boolean;
  client: Client;
}

@Component({
  selector: 'app-update-client-dialog',
  templateUrl: './update-client-dialog.component.html',
  styleUrls: ['./update-client-dialog.component.css']
})
export class UpdateClientDialogComponent implements OnInit {
  facultades = [
    Facultades.fich,
    Facultades.fcbq,
    Facultades.fcm,
    Facultades.fadu
  ];
  data: UpdateClientDialogData;
  clientForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) _data: UpdateClientDialogData,
    public dialogRef: MatDialogRef<UpdateClientDialogComponent>
  ) { if (_data) { // Si la data existe, la asigna, si no crea un objeto por defecto que no representa ningun cliente
        this.data = _data;
      } else {
        console.log('data nula');
        this.data = { createNew: true, client: { id: null, name: null, lastName: null, facultad: null , fechaRegistro: null}};
      }
    }

  ngOnInit() {
    this.clientForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      lastName: new FormControl(),
      facultad: new FormControl
    });
    this.clientForm.setValue({
      id: this.data.client.id,
      name: this.data.client.name,
      lastName: this.data.client.lastName,
      facultad: this.data.client.facultad
    });
  }

  close(status: boolean) {
    this.dialogRef.close((status) ? { ...this.clientForm.value, ...{ fechaRegistro: this.data.client.fechaRegistro } } : null);
  }

}
