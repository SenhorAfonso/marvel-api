import { ICharacterDTO } from '../../../DTOs/character/ICharacterDTO';
import { ICharacter } from '../../../interfaces/character/ICharacter';
import { Adapter } from '../../../interfaces/generics/IAdapter';

export default class CharacterAdapter implements Adapter<ICharacterDTO, ICharacter> {
  toEntity(external: ICharacterDTO): ICharacter {
    return {
      name: external.name,
      description: external.description,
      thumbnail: external.thumbnail,
      comic: external.comic
    };
  }

  toDTO(internal: ICharacter): ICharacterDTO {
    return {
      name: internal.name,
      description: internal.description,
      thumbnail: internal.thumbnail,
      comic: internal.comic
    };
  }
}
