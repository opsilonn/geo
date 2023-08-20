import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AppModule } from 'app/app.module';
import { DialogCreatePartyComponent } from 'app/components/dialog-create-party/dialog-create-party.component';
import { CountryEnum } from 'app/models/country-enum';
import { GameModeEnum } from 'app/models/game-mode-enum';
import { MockBuilder } from 'ng-mocks';

describe('DialogCreatePartyComponent', () => {
  let component: DialogCreatePartyComponent;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DialogCreatePartyComponent>>;

  beforeEach(() => MockBuilder(DialogCreatePartyComponent, AppModule));

  beforeEach(() => {
    dialogRef = TestBed.inject(MatDialogRef<DialogCreatePartyComponent>) as jasmine.SpyObj<MatDialogRef<DialogCreatePartyComponent>>;

    const fixture: ComponentFixture<DialogCreatePartyComponent> = TestBed.createComponent(DialogCreatePartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#validate Quand l\'utilisateur valide le formulaire, alors envoie ses données', () => {
    // Given
    component.selectedCountry = CountryEnum.FRANCE;
    component.selectedGameMode = GameModeEnum.FIND_ON_MAP;
    spyOn(dialogRef, 'close');

    // When
    component.validate();

    // Then
    expect(dialogRef.close).toHaveBeenCalledWith({
      country: CountryEnum.FRANCE,
      gameMode: GameModeEnum.FIND_ON_MAP
    });
  });
});
