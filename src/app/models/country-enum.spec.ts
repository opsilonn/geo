import { CountryEnum } from 'app/models/country-enum';

describe('CountryEnum', () => {
  it('#getAll retourne tous les champs de l\'énumération', () => {
    expect(CountryEnum.getAll()).toEqual([CountryEnum.USA]);
  });
});
