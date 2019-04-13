import { Component, OnInit } from '@angular/core';
import { Puesto, Inventario } from 'app/models/models';
import { PuestosService } from 'app/services/equipos.service';
import { MatDialog } from '@angular/material';
import { InventoryDialogComponent } from '../inventory-dialog/inventory-dialog.component';

@Component({
  selector: 'app-equipos-screen',
  templateUrl: './equipos-screen.component.html',
  styleUrls: ['./equipos-screen.component.css']
})
export class EquiposScreenComponent implements OnInit {
  puestos: Puesto[];
  puestoActual: Puesto;
  selectedId: number;

  constructor(
    private puestosService: PuestosService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.puestosService.getAllPosts().subscribe(
      (result) => {
        this.puestos = result;
        this.puestoActual = this.puestosService.getCurrentPost();
      }
    );
  }

  public selectionMade(id: number): void {
    this.puestoActual = this.puestos.find((value): boolean => id === value.id );
  }

  public openInventoryDialog() {
    const data = this.puestosService.getCurrentPost().inventario;
    const dialogRef = this.dialog.open(InventoryDialogComponent, { data });

    dialogRef.afterClosed().subscribe(
      (inventory: Inventario) => {
        if (inventory) {
          this.puestosService.makeInventory(inventory);
        }
      }
    );
  }

}
