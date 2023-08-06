export class GameModeEnum {
    static FIND_NAME = new GameModeEnum('On donne la position de l\'état sur la carte : trouver son nom');
    static FIND_ON_MAP = new GameModeEnum('On donne le nom de l\'état : trouver sa position sur la carte');

    label: string;

    constructor(label: string) {
        this.label = label;
    }
}