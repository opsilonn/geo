import { TestBed } from '@angular/core/testing';
import { SelectionComponent } from './selection.component';
import { AppModule } from 'src/app/app.module';
import { MockBuilder } from 'ng-mocks';

describe('SelectionComponent', () => {
  let component: SelectionComponent;

  beforeEach(() => MockBuilder(SelectionComponent, AppModule));

  beforeEach(() => {
    const fixture = TestBed.createComponent(SelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
