import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptComponent } from './prompt.component';

describe('PromptComponent', () => {
  let component: PromptComponent;
  let fixture: ComponentFixture<PromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromptComponent]
    });
    fixture = TestBed.createComponent(PromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#setUserAnswer Quand l\'utilisateur rentre la valeur attendue, alors affiche le nom de l\'État comme correct', () => {
    // Given
    component.isUserCorrect = false;
    component.stateName = 'toto';
    component.wrongStateName = '';

    // When
    component.setUserAnswer('toto');

    // Then
    expect(component.isUserCorrect).toBeTrue();
    expect(component.wrongStateName).toEqual('');
  });

  it('#setUserAnswer Quand l\'utilisateur rentre autre chose que la valeur attendue, alors affiche le nom de l\'État incorrect', () => {
    // Given
    component.isUserCorrect = false;
    component.stateName = 'toto';
    component.wrongStateName = '';

    // When
    component.setUserAnswer('pas toto');

    // Then
    expect(component.isUserCorrect).toBeFalse();
    expect(component.wrongStateName).toEqual('pas toto');
  });

  it('#reset Quand appelée, alors réinitialise les champs du composant', () => {
    // Given
    component.isUserCorrect = true;
    component.wrongStateName = 'toto';

    // When
    component.reset();

    // Then
    expect(component.isUserCorrect).toBeFalse();
    expect(component.wrongStateName).toEqual('');
  });
});
