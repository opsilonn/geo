import { TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { CarteComponent } from 'app/carte/carte.component';
import { CountryEnum } from 'app/models/country-enum';
import { MockBuilder } from 'ng-mocks';

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

  
  it('#isUSA Quand le pays sélectionné est les USA, alors retourne true', () => {
    // Given
    component.selectedCountry = CountryEnum.USA;
    // When && Then
    expect(component.isUSA()).toBeTrue();
  });
  
  it('#isUSA Quand le pays sélectionné n\'est pas les USA, alors retourne false', () => {
    // Given
    component.selectedCountry = CountryEnum.FRANCE;
    // When && Then
    expect(component.isUSA()).toBeFalse();
  });
});
