import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { UpdateClientDialogComponent } from 'app/components/clientes/update-client-dialog/update-client-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from 'app/components/dialogos/confirm-dialog/confirm-dialog.component';
import { Client, Facultades } from 'app/models/models';
import { ClientesService } from 'app/services/clientes-service.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-clientes-screen',
  templateUrl: './clientes-screen.component.html',
  styleUrls: ['./clientes-screen.component.css']
})
export class ClientesScreenComponent implements OnInit {
  clientsDataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private clientesService: ClientesService
    ) { }

  ngOnInit() {
    this.clientesService.getStream().subscribe(
      (clients) => {
        this.clientsDataSource.data = clients;
      }
    );
  }

  applyFilter(filter: string) {
    this.clientsDataSource.filter = filter.trim().toLocaleLowerCase();
  }

  openNewClientDialog() {
    const dialogRef = this.dialog.open(UpdateClientDialogComponent);

    dialogRef.afterClosed().subscribe(
      (client) => {
        // Si el valor del form existe intentar agregarlo, Quizas haya que validarlo en el dialogo para que quede mejor, de todas formas no se lo esta validando en ningun lugar...
        if (client) {
          this.clientesService.addNew(client).subscribe();
        }
      }
    );
  }

  // Creado el dialogo pasando un cliente para mostrar sus datos actuales en el
  openUpdateClientDialog(client: Client) {
    const data = { createNew: false, client: client };
    const dialogRef = this.dialog.open(UpdateClientDialogComponent, { data });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.clientesService.update(result).subscribe();
        } else {
          console.log('Update Cliente Dialog closed, operation canceled');
        }
      }
    );
  }

  // Delete client dialog
  openConfirmDialog(id: number) {
    const data = { title: 'Eliminar Cliente', message: `Se eliminara al cliente ${id}` };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.clientesService.delete(id);
        } else {
          console.log(`Confirm Delete Client: ${id} Canceled`);
        }
      }
    );
  }
}
