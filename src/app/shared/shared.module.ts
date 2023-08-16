import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SpinerComponent } from './components/spiner/spiner.component';
import { SelectComponent } from './components/select/select.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, SpinerComponent, SelectComponent],
  imports: [CommonModule, BrowserModule, RouterModule, FormsModule],
  exports: [
    HeaderComponent,
    SpinerComponent,
    SelectComponent,
    FormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
