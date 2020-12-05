import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListComponent as TipoProjetoList } from './pages/tipo-projeto/list/list.component';
import { FormComponent as TipoProjetoForm } from './pages/tipo-projeto/form/form.component';
import { ListComponent as StatusProjetoList } from './pages/status-projeto/list/list.component';
import { FormComponent as StatusProjetoForm } from './pages/status-projeto/form/form.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { ListComponent } from './pages/cargo/list/list.component';
import { FormComponent } from './pages/cargo/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    TipoProjetoList,
    TipoProjetoForm,
    StatusProjetoList,
    StatusProjetoForm,
    ConfirmDeleteComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
