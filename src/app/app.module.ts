import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ListItemComponent } from './list-item/list-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { NzI18nModule, NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData(en);
import {NzLayoutModule} from 'ng-zorro-antd/layout';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ListItemComponent,
    TodoListComponent,
    FormDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 使用ngModel需要导入
    FormsModule,
    // 使用响应式表单需要导入
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
