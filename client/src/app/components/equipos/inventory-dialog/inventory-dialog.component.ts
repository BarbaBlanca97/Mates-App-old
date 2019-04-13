import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Inventario } from 'app/models/models';

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
  styleUrls: ['./inventory-dialog.component.css']
})
export class InventoryDialogComponent implements OnInit {
  form: FormGroup;
  data: Inventario;

  constructor(
    @Inject(MAT_DIALOG_DATA) _data: Inventario,
    public dialogRef: MatDialogRef<InventoryDialogComponent>
  ) {
    this.data = _data;
  }

  ngOnInit() {
    this.form = new FormGroup({
      mates: new FormControl(this.data.equipo.mates),
      bombillas: new FormControl(this.data.equipo.bombillas),
      termos: new FormControl(this.data.equipo.termos),
      yerba: new FormControl(this.data.equipo.yerba)
    });
  }

  public close(accepted: boolean) {
    if (accepted) {
      this.data.equipo = this.form.value;
      this.dialogRef.close(this.data);
    } else {
      this.dialogRef.close(null);
    }
  }

}
