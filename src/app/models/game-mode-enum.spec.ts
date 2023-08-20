import { GameModeEnum } from "app/models/game-mode-enum";

describe('GameModeEnum', () => {
    it('#getAll retourne tous les champs de l\'énumération', () => {
        expect(GameModeEnum.getAll()).toEqual([GameModeEnum.FIND_NAME, GameModeEnum.FIND_ON_MAP]);
    });
});
