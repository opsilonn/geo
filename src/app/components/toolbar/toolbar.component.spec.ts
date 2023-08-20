import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppModule } from 'app/app.module';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';
import { CountryEnum } from 'app/models/country-enum';
import { GameModeEnum } from 'app/models/game-mode-enum';
import { PartyParameters } from 'app/models/party-parameters';
import { MockBuilder } from 'ng-mocks';
import { of } from 'rxjs';

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

  it('#openDialog Quand on configure le paramétrage d\'une partie, alors on transmet ses infos au parent', async () => {
    // Given
    const parameters: PartyParameters = {
      country: CountryEnum.USA,
      gameMode: GameModeEnum.FIND_NAME
    };
    spyOn(dialog, 'open')
      .and
      .returnValue({ afterClosed: () => of(parameters) } as MatDialogRef<typeof component>);
    spyOn(component.whenStartingNewParty, 'next');

    // When
    await component.openDialog();

    // Then
    expect(dialog.open).toHaveBeenCalled();
    expect(component.whenStartingNewParty.next).toHaveBeenCalledWith(parameters);
  });

  it('#openDialog Quand on annule le paramétrage d\'une partie, alors on transmet pas ses infos au parent', async () => {
    // Given
    spyOn(dialog, 'open')
      .and
      .returnValue({ afterClosed: () => of(undefined) } as MatDialogRef<typeof component>);
    spyOn(component.whenStartingNewParty, 'next');

    // When
    await component.openDialog();

    // Then
    expect(dialog.open).toHaveBeenCalled();
    expect(component.whenStartingNewParty.next).not.toHaveBeenCalled();
  });
});
