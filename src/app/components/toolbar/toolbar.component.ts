import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreatePartyComponent } from 'app/components/dialog-create-party/dialog-create-party.component';
import { PartyParameters } from 'app/models/party-parameters';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output()
  whenStartingNewParty: EventEmitter<PartyParameters> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  /** Ouvre le dialog pour configurer une nouvelle partie */
  public async openDialog(): Promise<void> {
    const parameters: PartyParameters = await firstValueFrom(this.dialog.open(DialogCreatePartyComponent).afterClosed());
    if (parameters) {
      this.whenStartingNewParty.next(parameters);
    }
  }
}
