/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import {
  SchemaFormModule,
  DefaultWidgetRegistry,
  WidgetRegistry
} from 'angular2-schema-form';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
        SchemaFormModule,
        MaterialModule.forRoot()
        ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
