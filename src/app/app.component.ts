import { Component, ViewChild } from '@angular/core';
import { CarteComponent } from 'app/carte/carte.component';
import { ListHelper } from 'app/helpers/ListHelper';
import { GameModeEnum } from 'app/models/game-mode-enum';
import { Proposition } from 'app/models/proposition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(CarteComponent)
  carteComponent!: CarteComponent;

  public gameMode = GameModeEnum.FIND_NAME;
  public propositions: Proposition[] = [];
  public stateName = '';
  private stateNames: string[] = [];
  private stateNamesCopy: string[] = [];
  private readonly NUMBER_OF_INCORRECT_ANSWERS = 3;

  /** Lance une partie une partie */
  public launchParty(): void {
    this.stateNames = this.carteComponent.getAllStates();
    this.stateNamesCopy = this.stateNames;
    this.initRound();
  }

  /** Initialise la manche d'une partie */
  private initRound(): void {
    if (this.isGameModeFindName()) {
      const randomIndex: number = Math.floor(Math.random() * this.stateNames.length);
      this.stateName = this.stateNames.splice(randomIndex, 1)[0];

      const correctAnswer: Proposition = { label: this.stateName, isCorrect: true, isIncorrect: false, isSelected: false };
      const incorrectAnswer: Proposition[] = (ListHelper
        .getRandomElements(this.stateNamesCopy, this.NUMBER_OF_INCORRECT_ANSWERS) as string[])
        .map((stateName: string) => ({ label: stateName, isCorrect: false, isIncorrect: false, isSelected: false }));
      const answers = [correctAnswer, ...incorrectAnswer];

      this.propositions = ListHelper.shuffle(answers) as Proposition[];
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
