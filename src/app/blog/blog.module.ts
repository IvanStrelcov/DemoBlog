import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { BlogComponent } from './blog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ BlogComponent ],
  exports: [ BlogComponent ]
})
export class BlogModule { }
