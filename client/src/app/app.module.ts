import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
// Material imports
import {
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatTableModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatStepperModule,
  MatListModule
} from '@angular/material';

import { AppComponent } from 'app/app.component';

import { ClientesScreenComponent } from 'app/components/clientes/clientes-screen/clientes-screen.component';
import { UpdateClientDialogComponent } from 'app/components/clientes/update-client-dialog/update-client-dialog.component';
import { EquiposScreenComponent } from 'app/components/equipos/equipos-screen/equipos-screen.component';
import { InventoryDialogComponent } from 'app/components/equipos/inventory-dialog/inventory-dialog.component';
import { EquipoSelectorComponent } from 'app/components/equipos/equipo-selector/equipo-selector.component';
import { PedidosScreenComponent } from 'app/components/pedidos/pedidos-screen/pedidos-screen.component';
import { ConfiguracionScreenComponent } from 'app/components/configuracion/configuracion-screen/configuracion-screen.component';
import { ConfirmDialogComponent } from './components/dialogos/confirm-dialog/confirm-dialog.component';
import { ClientesService } from './services/clientes-service.service';
import { PuestosService } from './services/equipos.service';
import { PrestamosService } from 'app/services/prestamos.service';
import { NuevoPedidoDialogComponent } from 'app/components/pedidos/nuevo-pedido-dialog/nuevo-pedido-dialog.component';
import { MiniClientSelectorComponent } from 'app/components/clientes/mini-client-selector/mini-client-selector.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'app/in-memory-db/database';
import { BoolToSNPipe } from 'app/pipes/boolToSN.pipe';

const appRoutes = [
  { path: 'pedidos', component: PedidosScreenComponent },
  { path: 'clientes', component: ClientesScreenComponent },
  { path: 'equipos', component: EquiposScreenComponent },
  { path: 'configuracion', component: ConfiguracionScreenComponent },
  { path: 'pedidos', component: PedidosScreenComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: '**', redirectTo: '/clientes' }
];

@NgModule({
  declarations: [
    AppComponent,
    ClientesScreenComponent,
    EquiposScreenComponent,
    EquipoSelectorComponent,
    PedidosScreenComponent,
    ConfiguracionScreenComponent,
    UpdateClientDialogComponent,
    ConfirmDialogComponent,
    InventoryDialogComponent,
    NuevoPedidoDialogComponent,
    MiniClientSelectorComponent,
    BoolToSNPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //#region Default HttpClientInMemoryWebApiModule config
    /*
    caseSensitiveSearch: false,
    dataEncapsulation: false,
      // do NOT wrap content within an object with a `data` property
    delay: 500,
      // simulate latency by delaying response
    delete404: false,
      // don't complain if can't find entity to delete
    passThruUnknownUrl: false,
      // 404 if can't process URL
    post204: true,
      // don't return the item after a POST
    post409: false,
      // don't update existing item with that ID
    put204: true,
      // don't return the item after a PUT
    put404: false,
      // create new item if PUT item with that ID not found
    apiBase: undefined,
      // assumed to be the first path segment
    host: undefined,
      // default value is actually set in InMemoryBackendService ctor
    rootPath: undefined
      // default value is actually set in InMemoryBackendService ctor */
    //#endregion
    /* Descomentar esto para volver a usar in-memory-web-api (No recomendado, requiere re adaptar código)
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 500, post409: true }
    ),*/
    ReactiveFormsModule,
    // Material imports
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatListModule,
    // Router
    RouterModule.forRoot(
      appRoutes
    )
  ],
  entryComponents: [
    UpdateClientDialogComponent,
    ConfirmDialogComponent,
    InventoryDialogComponent,
    NuevoPedidoDialogComponent
  ],
  providers: [
    ClientesService,
    PuestosService,
    PrestamosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
