import { TestBed } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { AppModule } from 'src/app/app.module';
import { CarteComponent } from 'src/app/carte/carte.component';

describe('CarteComponent', () => {
  let component: CarteComponent;

  beforeEach(() => MockBuilder(CarteComponent, AppModule));

  beforeEach(() => {
    const fixture = TestBed.createComponent(CarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
