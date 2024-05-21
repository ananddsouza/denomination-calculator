import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// App specific components
import { AppComponent } from './app.component';
import { CalculateComponent } from './components/calculate/calculate.component';
import { DenominationTableComponent } from './components/denomination-table/denomination-table.component';
import { DifferenceTableComponent } from './components/difference-table/difference-table.component';
import { HistoryComponent } from './components/history/history.component';

// Angular Material modules
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

// Http modules and interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';

// Pipes
import { PrefixPositivePipe } from './pipes/prefix-positive.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalculateComponent,
    DenominationTableComponent,
    DifferenceTableComponent,
    HistoryComponent,
    PrefixPositivePipe,
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
