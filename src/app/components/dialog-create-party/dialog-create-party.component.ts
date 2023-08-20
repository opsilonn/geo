import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CountryEnum } from 'app/models/country-enum';
import { GameModeEnum } from 'app/models/game-mode-enum';
import { PartyParameters } from 'app/models/party-parameters';

@Component({
  selector: 'app-dialog-create-party',
  templateUrl: './dialog-create-party.component.html',
  styleUrls: ['./dialog-create-party.component.scss']
})
export class DialogCreatePartyComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogCreatePartyComponent>,
  ) {}

  /** Retourne les configurations de l'utilisateur */
  public validate(): void {
    const parameters: PartyParameters = {
      country: CountryEnum.USA,
      gameMode: GameModeEnum.FIND_NAME
    };
    this.dialogRef.close(parameters);
  }
}
