import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

// Import app custom modules
import { AppRoutingModule } from './app.routes';
import { AuthModule } from './auth';
import { DashboardModule } from './dashboard';
import { AppCommonModule } from './common/common.module';
// Import app components
import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    // Import our custom App modules
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    AppCommonModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
