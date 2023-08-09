import { AfterViewInit, Component, Input } from '@angular/core';
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

  public selectedCountry = CountryEnum.USA;
  private areInteractionEnabled = false;

  ngAfterViewInit(): void {
    this.setUpClickEvent();
  }

  /** Retourne la liste des noms des états */
  public getAllStates(): string[] {
    return $("svg .state[id]")
      .map(function () { return this.id; })
      .get();
  }

  /** Configure la sélection des états au clic */
  private setUpClickEvent(): void {
    const allStates = $("svg.us > *");
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    allStates.on("click", function () {
      if (self.areInteractionEnabled) {
        allStates.removeClass("selected");
        $(this).addClass("selected");
      }
    });
  }

  /**
   * Applique la classe "sélectionnée" à un élément, et la retire aux autres
   * @param stateName Nom de balise à sélectionner
   */
  public setSelectedState(stateName: string): void {
    $(`svg > *`).removeClass('selected');
    $(`svg #${stateName}`).addClass('selected');
  }

  /** Désactive les interactions avec la carte */
  public disableInteraction(): void {
    this.areInteractionEnabled = false;
  }

  public isUSA(): boolean {
    return this.selectedCountry === CountryEnum.USA;
  }
}
