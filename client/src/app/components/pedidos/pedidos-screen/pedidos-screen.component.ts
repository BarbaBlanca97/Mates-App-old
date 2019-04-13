import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { PrestamosService } from 'app/services/prestamos.service';
import { PuestosService } from 'app/services/equipos.service';
import { Prestamo } from 'app/models/models';
import { MatDialog } from '@angular/material';
import { NuevoPedidoDialogComponent } from '../nuevo-pedido-dialog/nuevo-pedido-dialog.component';

@Component({
  selector: 'app-pedidos-screen',
  templateUrl: './pedidos-screen.component.html',
  styleUrls: ['./pedidos-screen.component.css']
})
export class PedidosScreenComponent implements OnInit {
  prestamosDataSource = new MatTableDataSource();
  public verEntregados: boolean;
  public verNoEntregados: boolean;

  constructor(
    private prestamosService: PrestamosService,
    private puestosService: PuestosService,
    private dialog: MatDialog
  ) { }

  private filterPredicate(prestamo: Prestamo, filter: string): boolean {
    let objRep = '';
    objRep += prestamo.id.toString();
    objRep += prestamo.cliente.name;
    objRep += prestamo.cliente.lastName;
    objRep += prestamo.equipo.mates;
    objRep += prestamo.equipo.bombillas;
    objRep += prestamo.equipo.termos;
    objRep += prestamo.equipo.yerba;
    objRep += prestamo.fechaPedido;
    objRep += prestamo.fechaEntregado;
    objRep += prestamo.puestoPedido.nombre;
    objRep = objRep.toLocaleLowerCase();

    return (objRep.indexOf(filter) != -1);
  }

  public nuevoPedido(): void {
    const dialogRef = this.dialog.open( NuevoPedidoDialogComponent );
    dialogRef.afterClosed().subscribe(
      (prestamo: Prestamo) => {
        if (prestamo) {
          prestamo.puestoPedido = this.puestosService.getCurrentPost();
          this.prestamosService.nuevoPrestamo(prestamo);
        }
      }
    );
  }

  ngOnInit() {
    this.prestamosDataSource.filterPredicate = this.filterPredicate;
    this.prestamosService.getStream().subscribe(
      (result) => {
        this.prestamosDataSource.data = result;
      }
    );
  }

  public applyFilter(filter: string) {
    this.prestamosDataSource.filter = filter.trim().toLocaleLowerCase();
  }
}
