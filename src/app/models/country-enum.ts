export class CountryEnum {

    static FRANCE = new CountryEnum('France');
    static USA = new CountryEnum('U.S.A.');

    label: string;

    constructor(label: string) {
        this.label = label;
    }

    /**
     * Retourne tous les champs de l'énumération
     * @returns tous les champs de l'énumération
     */
    public static getAll(): CountryEnum[] {
        return [CountryEnum.USA];
    }
}
