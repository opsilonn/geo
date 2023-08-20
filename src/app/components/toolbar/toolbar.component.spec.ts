import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { AppModule } from 'app/app.module';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';
import { MockBuilder } from 'ng-mocks';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => MockBuilder(ToolbarComponent, AppModule));

  beforeEach(() => {
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    const fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#openDialog Quand, alors', async () => {
        // Given
        spyOn(dialog, 'open');

        // When
        await component.openDialog();
    
        // Then
        expect(dialog.open).toHaveBeenCalled();
  });
});
