import { Component, ViewChild } from '@angular/core';
import { CarteComponent } from 'src/app/carte/carte.component';
import { GameModeEnum } from 'src/app/models/game-mode-enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(CarteComponent)
  carteComponent!: CarteComponent;

  public gameMode = GameModeEnum.FIND_NAME;
  public stateName = '';
  private stateNames: string[] = [];

  /** Lance une partie une partie */
  public launchParty(): void {
    this.stateNames = this.carteComponent.getAllStates();
    this.initRound();
  }

  /** Initialise la manche d'une partie */
  private initRound(): void {
    if (this.isGameModeFindName()) {
      const randomIndex: number = Math.floor(Math.random() * this.stateNames.length);
      this.stateName = this.stateNames.splice(randomIndex, 1)[0];
    }
  }

  /** Retourne si le mode de jeu sélectionné est "trouver par nom" */
  public isGameModeFindName(): boolean {
    return this.gameMode === GameModeEnum.FIND_NAME;
  }

  /** Retourne si le mode de jeu sélectionné est "trouver sur la carte" */
  public isGameModeFindOnMap(): boolean {
    return this.gameMode === GameModeEnum.FIND_ON_MAP;
  }
}
