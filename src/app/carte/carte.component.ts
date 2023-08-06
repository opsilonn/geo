import { AfterViewInit, Component } from '@angular/core';
import * as $ from "jquery";
import { CountryEnum } from 'src/app/models/country-enum';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements AfterViewInit {

  public selectedCountry = CountryEnum.USA;
  public selectedState = '';

  ngAfterViewInit(): void {
    this.setUpClickEvent();
  }

  private setUpClickEvent(): void {
    const allStates = $("svg.us > *");
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    allStates.on("click", function() {
      allStates.removeClass("selected");
      $(this).addClass("selected");
      self.selectedState = $(this).attr('id')!;
    });
  }

  public isUSA(): boolean {
    return this.selectedCountry === CountryEnum.USA;
  }
}
