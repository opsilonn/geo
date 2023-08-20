import { Component, ViewChild } from '@angular/core';
import { CarteComponent } from 'app/components/carte/carte.component';
import { PromptComponent } from 'app/components/prompt/prompt.component';
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

  @ViewChild(PromptComponent)
  promptComponent!: PromptComponent;

  public gameMode = GameModeEnum.FIND_ON_MAP;
  public isUserInputEnabled = true;
  public propositions: Proposition[] = [];
  public stateName = '';
  private stateNames: string[] = [];
  private stateNamesCopy: string[] = [];
  private readonly NUMBER_OF_INCORRECT_ANSWERS = 3;
  private readonly TIME_TO_WAIT_FOR_NEXT_ROUND = 1.5 * 1000;
  private readonly TIME_TO_WAIT_TO_SHOW_RESULT = 1.5 * 1000;

  /** Lance une partie une partie */
  public launchParty(): void {
    this.stateNames = this.carteComponent.getAllStates();
    this.stateNamesCopy = this.stateNames;
    this.initRound();
  }

  /** Gère la fin d'une partie */
  private endParty(): void {
    this.carteComponent.resetStates();
    window.alert('bien joué, c\'est fini (:');
  }

  /** Initialise la manche d'une partie */
  private initRound(): void {
    if (this.hasNoRemainingRound()) {
      this.endParty();
      return;
    }

    this.setRandomStateName();

    if (this.isGameModeFindName()) {
      this.initFindNameRound();
    } else if (this.isGameModeFindOnMap()) {
      this.initFindOnMapRound();
    }

    this.isUserInputEnabled = true;
  }

  /** Sélectionne aléatoirement une région, et la supprime de la liste */
  private setRandomStateName(): void {
    const randomIndex: number = Math.floor(Math.random() * this.stateNames.length);
    this.stateName = this.stateNames.splice(randomIndex, 1)[0];
  }
  
  /** Initialise la manche d'une partie "Trouver le nom d'un état affiché sur la carte" */
  private initFindNameRound(): void {
    this.carteComponent.setSelectedState(this.stateName);
    this.carteComponent.disableInteraction();

    const correctAnswer: Proposition = { label: this.stateName, isCorrect: false, isIncorrect: false, isSelected: false };
    const incorrectAnswer: Proposition[] = (ListHelper
      .getRandomElements(this.stateNamesCopy, this.NUMBER_OF_INCORRECT_ANSWERS) as string[])
      .map((stateName: string) => ({ label: stateName, isCorrect: false, isIncorrect: false, isSelected: false }));
    const answers = [correctAnswer, ...incorrectAnswer];

    this.propositions = ListHelper.shuffle(answers) as Proposition[];
  }
  
  /** Initialise la manche d'une partie "Trouver d'un état sur la carte selon son nom" */
  private initFindOnMapRound(): void {
    this.carteComponent.resetStates();
    this.carteComponent.enableInteraction();
    this.promptComponent.reset();
  }

  /** Lorsque le joueur a sélectionné une proposition, on attend un peu avant de révéler les réponses, puis on relance un round */
  public playerHasChosenProposition(chosenProposition: Proposition): void {
    this.isUserInputEnabled = false;

    setTimeout(() => {
      const correctAnwser = this.propositions.find((proposition: Proposition) => proposition.label === this.stateName);
      correctAnwser!.isCorrect = true;

      const userAnswer = this.propositions.find((proposition: Proposition) => proposition.label === chosenProposition.label);
      userAnswer!.isSelected = true;
      if (!userAnswer!.isCorrect) {
        userAnswer!.isIncorrect = true;
      }
      setTimeout(() => this.initRound(), this.TIME_TO_WAIT_FOR_NEXT_ROUND);
    }, this.TIME_TO_WAIT_TO_SHOW_RESULT);
  }

  /** Lorsque le joueur a sélectionné un état sur la carte, on attend un peu avant de révéler les réponses, puis on relance un round */
  public playerHasChosenStateOnMap(selectedStateName: string): void {
    this.carteComponent.disableInteraction();

    setTimeout(() => {
      this.carteComponent.setCorrectState(this.stateName);
      if (this.stateName !== selectedStateName) {
        this.carteComponent.setIncorrectState(selectedStateName);
      }
      this.promptComponent.setUserAnswer(selectedStateName);

      setTimeout(() => this.initRound(), this.TIME_TO_WAIT_FOR_NEXT_ROUND);
    }, this.TIME_TO_WAIT_TO_SHOW_RESULT);
  }

  /** Retourne si le mode de jeu sélectionné est "trouver par nom" */
  public isGameModeFindName(): boolean {
    return this.gameMode === GameModeEnum.FIND_NAME;
  }

  /** Retourne si le mode de jeu sélectionné est "trouver sur la carte" */
  public isGameModeFindOnMap(): boolean {
    return this.gameMode === GameModeEnum.FIND_ON_MAP;
  }

  /**
   * Returns whether the game ends, or continues
   * @returns Whether the game has no more remaining round
   */
  private hasNoRemainingRound(): boolean {
    return this.stateNames.length === 0;
  }
}
