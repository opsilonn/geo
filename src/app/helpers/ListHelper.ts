export class ListHelper {

    /**
     * Retourne un certains nombre d'éléments aléatoire d'une liste
     * @param list Liste contenant les éléments à récupérer
     * @param size nombre d'éléments à récupérer
     */
    public static getRandomElements(list: unknown[], size: number): unknown[] {
        const shuffled = this.shuffle(list);
        return shuffled.slice(0, size);
    }

    /**
     * Retourne une liste mélangée
     * @param list Liste à mélanger
     */
    public static shuffle(list: unknown[]): unknown[] {
        return [...list].sort(() => 0.5 - Math.random());
    }
}
