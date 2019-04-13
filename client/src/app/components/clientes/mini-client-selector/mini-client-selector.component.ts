import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ClientesService } from 'app/services/clientes-service.service';
import { MatTableDataSource } from '@angular/material';
import { Client } from 'app/models/models';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-mini-client-selector',
  templateUrl: './mini-client-selector.component.html',
  styleUrls: ['./mini-client-selector.component.css']
})
export class MiniClientSelectorComponent implements OnInit {
  @Output() clientSelected = new EventEmitter<Client>();

  public clientsDataSource: MatTableDataSource<Client>;
  public selection: SelectionModel<Client>;

  constructor(
    private clientesService: ClientesService
  ) {
    this.clientsDataSource = new MatTableDataSource();
    this.selection = new SelectionModel<Client>(false, []);
    this.selection.changed.subscribe(
      () => {
        this.clientSelected.emit(this.selection.selected[0]);
      }
    );
   }

  ngOnInit() {
    this.clientesService.getStream().subscribe(
      (data) => {
        this.clientsDataSource.data = data;
      }
    );
  }

  public applyFilter(filter: string): void {
    this.clientsDataSource.filter = filter.trim().toLocaleLowerCase();
  }

}
