import { Component, OnInit } from '@angular/core';
import { Prestamo, Client, Equipo } from 'app/models/models';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-nuevo-pedido-dialog',
  templateUrl: './nuevo-pedido-dialog.component.html',
  styleUrls: ['./nuevo-pedido-dialog.component.css']
})
export class NuevoPedidoDialogComponent implements OnInit {
  prestamo: Prestamo;

  constructor(
    private dialogRef: MatDialogRef<NuevoPedidoDialogComponent>
  ) {
    this.prestamo = new Prestamo();
  }

  onClientChange(cliente: Client) {
    this.prestamo.cliente = cliente;
  }

  onEquipoChange(equipo: Equipo) {
    this.prestamo.equipo = equipo;
  }

  close(status: boolean) {
    if (status && (this.prestamo.cliente != null) && (this.prestamo.equipo != null)) {
      this.dialogRef.close(this.prestamo);
    } else {
      this.dialogRef.close(null);
    }
  }

  ngOnInit() {
  }

}
