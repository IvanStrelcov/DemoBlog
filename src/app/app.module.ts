import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpModule,
         JsonpModule }          from '@angular/http';
import { RouterModule }         from '@angular/router';

import { HeaderModule }         from './header';
import { BreadcrambsComponent } from './breadcrambs';
import { SidebarModule }        from './sidebar';
import { BlogModule }           from './blog';

import { AppComponent }         from './app.component';
import { NoContentComponent }   from './no-content/no-content.component';
import { RedirectComponent }    from './redirect';

import { AppRouting }           from './app.routes';
import { AuthService }          from './services/service';

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
    BreadcrambsComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HeaderModule,
    SidebarModule,
    BlogModule,
    AppRouting,
    JsonpModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
