import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { HTTP_PROVIDERS} from '@angular/http';
import { MainAppComponent } from './main.component';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import {APP_ROUTER_PROVIDERS} from './main.routes';



beforeEachProviders(() => [MainAppComponent, UserService, HTTP_PROVIDERS]);

describe('App: Ng2cli01', () => {
  it('should create the app',
      inject([MainAppComponent], (app: MainAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'app works!\'',
      inject([MainAppComponent], (app: MainAppComponent) => {
		  expect(app.currentUser).toBeTruthy();
  }));
});
