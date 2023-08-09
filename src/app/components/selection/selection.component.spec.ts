import { TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { SelectionComponent } from 'app/components/selection/selection.component';
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

  it('#onRegionSelected Quand une région est sélectionnée, alors elle devient la seule à avoir le statut "sélectionné"', () => {
    // Given
    component.hasUserChosen = false;
    component.propositions = [
      { label: 'Je suis sélectionné au début', isCorrect: false, isIncorrect: false, isSelected: true },
      { label: 'Je serai sélectionné à la fin', isCorrect: false, isIncorrect: false, isSelected: false },
    ];

    // When
    component.onRegionSelected(component.propositions[1]);

    // Then
    expect(component.hasUserChosen).toBeTrue();
  });
});
