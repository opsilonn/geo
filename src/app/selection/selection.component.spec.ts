import { TestBed } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { AppModule } from 'src/app/app.module';
import { SelectionComponent } from './selection.component';

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
    component.regions = [
      { label: 'Je suis sélectionné au début', isSelected: true },
      { label: 'Je serai sélectionné à la fin', isSelected: false },
    ];

    // When
    component.onRegionSelected(component.regions[1]);

    // Then
    expect(component.hasUserChosen).toBeTrue();
    expect(component.regions).toEqual([
      { label: 'Je suis sélectionné au début', isSelected: false },
      { label: 'Je serai sélectionné à la fin', isSelected: true },
    ]);
  });
});
