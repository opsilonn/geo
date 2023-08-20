import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CountryEnum } from 'app/models/country-enum';
import * as $ from "jquery";

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements AfterViewInit {

  @Input()
  public isUserInputEnabled!: boolean;

  @Output()
  whenUserHasChosen: EventEmitter<string> = new EventEmitter();

  public selectedCountry = CountryEnum.USA;
  private areInteractionEnabled = false;

  ngAfterViewInit(): void {
    this.setUpClickEvent();
  }

  /** Retourne la liste des noms des états */
  public getAllStates(): string[] {
    return $("svg .state[id]")
      .map(function () { return this.id; })
      .get()
      .map((name: string) => this.formatIdToTS(name));
  }

  /** Configure la sélection des états au clic */
  private setUpClickEvent(): void {
    const allStates = $("svg.us > *");
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    allStates.on("click", function () {
      if (self.areInteractionEnabled) {
        const selectedStateId = $(this).attr('id');
        if (selectedStateId) {
          const selectedStateName = self.formatIdToTS(selectedStateId);
          self.whenUserHasChosen.next(selectedStateName);
          $(this).addClass("selected");
        }
      }
    });
  }

  /**
   * Applique la classe "sélectionnée" à un élément
   * @param stateName Nom de balise à sélectionner
   */
  public setSelectedState(stateName: string): void {
    this.setStateClass(stateName, 'selected');
  }

  /**
   * Applique la classe "correcte" à un élément
   * @param stateName Nom de balise à sélectionner
   */
  public setCorrectState(stateName: string): void {
    this.setStateClass(stateName, 'isCorrect');
  }

  /**
   * Applique la classe "incorrecte" à un élément
   * @param stateName Nom de balise à sélectionner
   */
  public setIncorrectState(stateName: string): void {
    this.setStateClass(stateName, 'isIncorrect');
  }

  /**
   * Applique une classe à la balise d'un État
   * @param stateName Nom de l'État
   * @param className Classe à ajouter
   */
  private setStateClass(stateName: string, className: string): void {
    const id = this.formatIdToHTML(stateName);
    $(`svg #${id}`).addClass(className);
  }

  /** Retire les classes aux régions */
  public resetStates(): void {
    $(`svg > *`)
      .removeClass('selected')
      .removeClass('isCorrect')
      .removeClass('isIncorrect');
  }

  /** Active les interactions avec la carte */
  public enableInteraction(): void {
    this.areInteractionEnabled = true;
  }

  /** Désactive les interactions avec la carte */
  public disableInteraction(): void {
    this.areInteractionEnabled = false;
  }

  public isUSA(): boolean {
    return this.selectedCountry === CountryEnum.USA;
  }

  /**
   * Formatte un id pour qu'il puisse être utilisé dans l'HTML
   * @param id Id à convertir
   * @returns Formatte un id à l'utilisation dans l'HTML
   */
  private formatIdToHTML(id: string): string {
    return id.replaceAll(' ', '_');
  }

  /**
   * Formatte un id pour qu'il puisse être affiché
   * @param id Id à convertir
   * @returns Formatte un id à l'affichage
   */
  private formatIdToTS(id: string): string {
    return id.replaceAll('_', ' ');
  }
}
