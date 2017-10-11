import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@angular/material';
import { AuthService } from './services/auth.service';

import { DialogConfirmModule } from './components/dialog-confirm/dialog-confirm.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    DialogConfirmModule
  ],
  declarations: [
    // Components
  ],
  providers: [
    // Services
    AuthService
  ]
})

export class AppCommonModule { }
