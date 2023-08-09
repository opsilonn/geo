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
    jasmine.clock().install();
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable();
  });
  
  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create the #AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('#launchParty Quand on crée une partie avec le paramétrage "Pour un état affiché, trouver le nom", alors sélectionne un État à faire deviner et 4 propositions, dont la bonne', () => {
    // Given
    component.gameMode = GameModeEnum.FIND_NAME;
    component.carteComponent = {
      disableInteraction: () => null,
      getAllStates: () => ['État 1', 'État 2', 'État 3', 'État 4', 'État 5', 'État 6'],
      setSelectedState: () => null
    } as unknown as CarteComponent;
    spyOn(component.carteComponent, 'disableInteraction');
    spyOn(component.carteComponent, 'setSelectedState');
    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    component.launchParty();

    // Then
    expect(component.carteComponent.disableInteraction).toHaveBeenCalled();
    expect(component.carteComponent.setSelectedState).toHaveBeenCalledWith('État 1');
    expect(component.isUserInputEnabled).toBeTrue();
    expect(component.propositions).toEqual([
      { label: 'État 1', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'État 2', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'État 3', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'État 4', isCorrect: false, isIncorrect: false, isSelected: false },
    ]);
    expect(component.stateName).toEqual('État 1');
  });

  it('#playerHasChosenProposition Quand la bonne proposition est sélectionnée, alors on assigne les classes en conséquence', () => {
    // Given
    component.gameMode = GameModeEnum.FIND_NAME;
    component.propositions = [
      { label: 'Je suis la bonne réponse', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'Je suis la mauvaise réponse', isCorrect: false, isIncorrect: false, isSelected: false },
    ];
    component.stateName = 'Je suis la bonne réponse';

    // When
    component.playerHasChosenProposition(component.propositions[0]);
    jasmine.clock().tick(2000);

    // Then
    expect(component.isUserInputEnabled).toBeFalse();
    expect(component.propositions).toEqual([
      { label: 'Je suis la bonne réponse', isCorrect: true, isIncorrect: false, isSelected: true },
      { label: 'Je suis la mauvaise réponse', isCorrect: false, isIncorrect: false, isSelected: false },
    ]);
  });

  it('#playerHasChosenProposition Quand la mauvaise proposition est sélectionnée, alors on assigne les classes en conséquence', () => {
    // Given
    component.gameMode = GameModeEnum.FIND_NAME;
    component.propositions = [
      { label: 'Je suis la bonne réponse', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'Je suis la mauvaise réponse', isCorrect: false, isIncorrect: false, isSelected: false },
    ];
    component.stateName = 'Je suis la bonne réponse';

    // When
    component.playerHasChosenProposition(component.propositions[1]);
    jasmine.clock().tick(2000);

    // Then
    expect(component.isUserInputEnabled).toBeFalse();
    expect(component.propositions).toEqual([
      { label: 'Je suis la bonne réponse', isCorrect: true, isIncorrect: false, isSelected: false },
      { label: 'Je suis la mauvaise réponse', isCorrect: false, isIncorrect: true, isSelected: true },
    ]);
  });
  
  it('#playerHasChosenProposition Quand une région est sélectionnée et passée plusieurs secondes, alors un nouveau round est configuré', () => {
    // Given
    component.gameMode = GameModeEnum.FIND_NAME;
    component['stateNames'] = ['État 1', 'État 2', 'État 3', 'État 4', 'État 5', 'État 6'];
    component['stateNamesCopy'] = component['stateNames'];
    component.propositions = [
      { label: 'Choix A', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'Choix B', isCorrect: false, isIncorrect: false, isSelected: false },
    ];
    component.stateName = 'Choix A';
    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    expect(component.isUserInputEnabled).toBeTrue();
    component.playerHasChosenProposition(component.propositions[1]);
    jasmine.clock().tick(4000);

    // Then
    expect(component.propositions).toEqual([
      { label: 'État 1', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'État 2', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'État 3', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'État 4', isCorrect: false, isIncorrect: false, isSelected: false },
    ]);
  });

  it('#playerHasChosenStateOnMap Quand le bon État est sélectionné, alors on assigne les classes en conséquence', () => {
    // Given
    component.carteComponent = { disableInteraction: () => null, setCorrectState: () => null, setIncorrectState: () => null } as unknown as CarteComponent;
    spyOn(component.carteComponent, 'disableInteraction');
    spyOn(component.carteComponent, 'setCorrectState');
    spyOn(component.carteComponent, 'setIncorrectState');
    component.gameMode = GameModeEnum.FIND_ON_MAP;
    component.stateName = 'Le Bon État';

    // When
    component.playerHasChosenStateOnMap('Le Bon État');
    jasmine.clock().tick(2000);

    // Then
    expect(component.carteComponent.disableInteraction).toHaveBeenCalled();
    expect(component.carteComponent.setCorrectState).toHaveBeenCalledWith('Le Bon État');
    expect(component.carteComponent.setIncorrectState).not.toHaveBeenCalled();
  });

  it('#playerHasChosenStateOnMap Quand le mauvais État est sélectionné, alors on assigne les classes en conséquence', () => {
    // Given
    component.carteComponent = { disableInteraction: () => null, setCorrectState: () => null, setIncorrectState: () => null } as unknown as CarteComponent;
    spyOn(component.carteComponent, 'disableInteraction');
    spyOn(component.carteComponent, 'setCorrectState');
    spyOn(component.carteComponent, 'setIncorrectState');
    component.gameMode = GameModeEnum.FIND_ON_MAP;
    component.stateName = 'Le Bon État';

    // When
    component.playerHasChosenStateOnMap('Le mauvais État');
    jasmine.clock().tick(2000);

    // Then
    expect(component.carteComponent.disableInteraction).toHaveBeenCalled();
    expect(component.carteComponent.setCorrectState).toHaveBeenCalledWith('Le Bon État');
    expect(component.carteComponent.setIncorrectState).toHaveBeenCalledWith('Le mauvais État');
  });
});
