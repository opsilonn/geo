import { CountryEnum } from "app/models/country-enum";
import { GameModeEnum } from "app/models/game-mode-enum";

export interface PartyParameters {
    country: CountryEnum;
    gameMode: GameModeEnum;
}
