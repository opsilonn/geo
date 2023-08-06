import { TestBed } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { CarteComponent } from 'src/app/carte/carte.component';
import { GameModeEnum } from 'src/app/models/game-mode-enum';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => MockBuilder(AppComponent, AppModule));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable();
  });

  it('should create the #AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('#launchParty Quand on crée une partie avec le paramétrage "Pour un état affiché, trouver le nom", alors sélectionne un État à faire deviner', () => {
    // Given
    component.gameMode = GameModeEnum.FIND_NAME;
    component.carteComponent = { getAllStates: () => ['État 1', 'État 2', 'État 3'] } as CarteComponent;
    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    component.launchParty();

    // Then
    expect(component.stateName).toEqual('État 1');
  });
});
