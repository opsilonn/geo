import { TestBed } from '@angular/core/testing';
import { AppComponent } from 'app/app.component';
import { AppModule } from 'app/app.module';
import { CarteComponent } from 'app/carte/carte.component';
import { GameModeEnum } from 'app/models/game-mode-enum';
import { MockBuilder } from 'ng-mocks';

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

  it('#launchParty Quand on crée une partie avec le paramétrage "Pour un état affiché, trouver le nom", alors sélectionne un État à faire deviner et 4 propositions, dont la bonne', () => {
    // Given
    component.gameMode = GameModeEnum.FIND_NAME;
    component.carteComponent = { getAllStates: () => ['État 1', 'État 2', 'État 3', 'État 4', 'État 5', 'État 6'] } as CarteComponent;
    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    component.launchParty();

    // Then
    expect(component.propositions).toEqual([
      { label: 'État 1', isCorrect: true, isIncorrect: false, isSelected: false },
      { label: 'État 2', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'État 3', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'État 4', isCorrect: false, isIncorrect: false, isSelected: false },
    ]);
    expect(component.stateName).toEqual('État 1');
  });
});
