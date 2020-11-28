import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {routing} from './app.routes';
import {HttpClientModule} from '@angular/common/http';

// Import BrowserAnimationsModule
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Import your library
import { AlertModule } from 'ngx-alerts';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import { HomeComponent } from './home.component';
import {CoreModule} from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      routing,
      ShoppingListModule,
      HttpClientModule,
      CoreModule,
      BrowserAnimationsModule,
      AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top'})
    ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
