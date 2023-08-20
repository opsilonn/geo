import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreatePartyComponent } from 'app/components/dialog-create-party/dialog-create-party.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public dialog: MatDialog) {}

  /** Ouvre le dialog pour configurer une nouvelle partie */
  public async openDialog(): Promise<void> {
    this.dialog.open(DialogCreatePartyComponent);
  }
}
