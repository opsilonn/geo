import { ListHelper } from 'app/helpers/ListHelper';

describe('ListHelper', () => {
  it('#getMultipleElements Retourne une liste d\'éléments sélectionnés aléatoirement dans une liste', () => {
    // Given
    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    const elemFromList = ListHelper.getRandomElements([1, 2, 3, 4, 5], 3);

    // Then
    expect(elemFromList).toEqual([1, 2, 3]);
  });

  it('#shuffle Retourne une liste dont les éléments sont mélangés', () => {
    // Given
    spyOn(Math, 'random').and.returnValue(0); // On mocke l'aléatoire pour forcer le résultat

    // When
    const shuffledList = ListHelper.shuffle([1, 2, 3, 4, 5]);

    // Then
    expect(shuffledList).toEqual([1, 2, 3, 4, 5]);
  });
});
