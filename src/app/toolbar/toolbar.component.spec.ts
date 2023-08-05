import { TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { MockBuilder } from 'ng-mocks';
import { AppModule } from 'src/app/app.module';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;

  beforeEach(() => MockBuilder(ToolbarComponent, AppModule));

  beforeEach(() => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
