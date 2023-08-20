import { TestBed } from '@angular/core/testing';
import { AppComponent } from 'app/app.component';
import { AppModule } from 'app/app.module';
import { CarteComponent } from 'app/components/carte/carte.component';
import { PromptComponent } from 'app/components/prompt/prompt.component';
import { CountryEnum } from 'app/models/country-enum';
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
    component.carteComponent = {
      disableInteraction: () => null,
      getAllStates: () => ['État 1', 'État 2', 'État 3', 'État 4', 'État 5', 'État 6'],
      setSelectedState: () => null
    } as unknown as CarteComponent;
    spyOn(component.carteComponent, 'disableInteraction');
    spyOn(component.carteComponent, 'setSelectedState');
    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    component.launchParty({
      gameMode: GameModeEnum.FIND_NAME,
      country: CountryEnum.USA
    });

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

  it('#launchParty Quand on crée une partie avec le paramétrage "Pour un le nom d\'un État, le trouver sur la carte", alors sélectionne un État à faire deviner et configure la carte', () => {
    // Given
    component.carteComponent = {
      enableInteraction: () => null,
      getAllStates: () => ['État 1', 'État 2', 'État 3', 'État 4', 'État 5', 'État 6'],
      resetStates: () => null
    } as unknown as CarteComponent;
    spyOn(component.carteComponent, 'enableInteraction');
    spyOn(component.carteComponent, 'resetStates');

    component.promptComponent = { reset: () => null } as unknown as PromptComponent;
    spyOn(component.promptComponent, 'reset');

    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    component.launchParty({
      gameMode: GameModeEnum.FIND_ON_MAP,
      country: CountryEnum.USA
    });

    // Then
    expect(component.carteComponent.enableInteraction).toHaveBeenCalled();
    expect(component.carteComponent.resetStates).toHaveBeenCalled();
    expect(component.promptComponent.reset).toHaveBeenCalled();
    expect(component.stateName).toEqual('État 1');
  });

  it('#launchParty Quand on aucun État reste à deviner, alors on termine la partie', () => {
    // Given
    component.carteComponent = {
      enableInteraction: () => null,
      getAllStates: () => [],
      resetStates: () => null
    } as unknown as CarteComponent;
    spyOn(component.carteComponent, 'resetStates');

    spyOn(window, 'alert');

    // When
    component.launchParty({
      gameMode: GameModeEnum.FIND_ON_MAP,
      country: CountryEnum.USA
    });

    // Then
    expect(component.carteComponent.resetStates).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
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
    component.playerHasChosenProposition(component.propositions[1]);
    jasmine.clock().tick(4000);

    // Then
    expect(component.isUserInputEnabled).toBeTrue();
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
  
  it('#playerHasChosenStateOnMap Quand un État est sélectionné et passée plusieurs secondes, alors un nouveau round est configuré', () => {
    // Given
    component.carteComponent = {
      disableInteraction: () => null,
      enableInteraction: () => null,
      resetStates: () => null,
      setCorrectState: () => null,
      setIncorrectState: () => null
    } as unknown as CarteComponent;
    spyOn(component.carteComponent, 'enableInteraction');
    spyOn(component.carteComponent, 'resetStates');

    component.gameMode = GameModeEnum.FIND_ON_MAP;
    component['stateNames'] = ['État 1', 'État 2', 'État 3', 'État 4', 'État 5', 'État 6'];
    component.stateName = 'État 1';
    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    component.playerHasChosenStateOnMap('Un État quelconque');
    jasmine.clock().tick(4000);

    // Then
    expect(component.carteComponent.enableInteraction).toHaveBeenCalled();
    expect(component.carteComponent.resetStates).toHaveBeenCalled();
  });
});
