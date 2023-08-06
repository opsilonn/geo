import { TestBed } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { AppModule } from 'src/app/app.module';
import { SelectionComponent } from './selection.component';

describe('SelectionComponent', () => {
  let component: SelectionComponent;

  beforeEach(() => MockBuilder(SelectionComponent, AppModule));

  beforeEach(() => {
    jasmine.clock().install();
    const fixture = TestBed.createComponent(SelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit Quand le composant est chargé, alors une valeur à trouver est sélectionnée', () => {
    // Given
    component.hasUserChosen = true;
    component.regions = [
      { label: 'Choix A', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'Choix B', isCorrect: false, isIncorrect: false, isSelected: false },
    ];
    component['answer'] = 'lalilulelo';
    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    component.ngOnInit();

    // Then
    expect(component.hasUserChosen).toBeFalse();
    expect(component['answer']).toEqual('Choix A');
    expect(component.regions).toEqual([
      { label: 'Choix A', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'Choix B', isCorrect: false, isIncorrect: false, isSelected: false },
    ]);
  });

  it('#onRegionSelected Quand une région est sélectionnée, alors elle devient la seule à avoir le statut "sélectionné"', () => {
    // Given
    component.hasUserChosen = false;
    component.regions = [
      { label: 'Je suis sélectionné au début', isCorrect: false, isIncorrect: false, isSelected: true },
      { label: 'Je serai sélectionné à la fin', isCorrect: false, isIncorrect: false, isSelected: false },
    ];

    // When
    component.onRegionSelected(component.regions[1]);

    // Then
    expect(component.hasUserChosen).toBeTrue();
    expect(component.regions).toEqual([
      { label: 'Je suis sélectionné au début', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'Je serai sélectionné à la fin', isCorrect: false, isIncorrect: false, isSelected: true },
    ]);
  });

  it('#onRegionSelected Quand la bonne région est sélectionnée, alors on assigne les classes en conséquence', () => {
    // Given
    component.regions = [
      { label: 'Je suis la bonne réponse', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'Je suis la mauvaise réponse', isCorrect: false, isIncorrect: false, isSelected: false },
    ];
    component['answer'] = 'Je suis la bonne réponse';

    // When
    component.onRegionSelected(component.regions[0]);
    jasmine.clock().tick(2000);

    // Then
    expect(component.regions).toEqual([
      { label: 'Je suis la bonne réponse', isCorrect: true, isIncorrect: false, isSelected: true },
      { label: 'Je suis la mauvaise réponse', isCorrect: false, isIncorrect: false, isSelected: false },
    ]);
  });

  it('#onRegionSelected Quand la mauvaise région est sélectionnée, alors on assigne les classes en conséquence', () => {
    // Given
    component.regions = [
      { label: 'Je suis la bonne réponse', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'Je suis la mauvaise réponse', isCorrect: false, isIncorrect: false, isSelected: false },
    ];
    component['answer'] = 'Je suis la bonne réponse';

    // When
    component.onRegionSelected(component.regions[1]);
    jasmine.clock().tick(2000);

    // Then
    expect(component.regions).toEqual([
      { label: 'Je suis la bonne réponse', isCorrect: true, isIncorrect: false, isSelected: false },
      { label: 'Je suis la mauvaise réponse', isCorrect: false, isIncorrect: true, isSelected: true },
    ]);
  });
  
  it('#onRegionSelected Quand une région est sélectionnée et passée plusieurs secondes, alors un nouveau round est configuré', (done: () => void) => {
    // Given
    component.hasUserChosen = true;
    component.regions = [
      { label: 'Choix A', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'Choix B', isCorrect: false, isIncorrect: false, isSelected: false },
    ];
    component['answer'] = 'Choix B';
    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    component.onRegionSelected(component.regions[1]);
    jasmine.clock().tick(4000);

    // Then
    expect(component['answer']).toEqual('Choix A');
    expect(component.regions).toEqual([
      { label: 'Choix A', isCorrect: false, isIncorrect: false, isSelected: false },
      { label: 'Choix B', isCorrect: false, isIncorrect: false, isSelected: false },
    ]);
  });
});
