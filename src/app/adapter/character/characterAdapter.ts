/* eslint-disable class-methods-use-this */
import { ICharacterDTO } from '../../../DTOs/character/ICharacterDTO';
import { ICharacter } from '../../../interfaces/character/ICharacter';
import { Adapter } from '../../../interfaces/generics/IAdapter';

export default class CharacterAdapter implements Adapter<ICharacterDTO, ICharacter> {
  toEntity(external: ICharacterDTO): ICharacter {
    return {
      name: external.name,
      description: external.description,
      thumbnail: external.thumbnail,
    };
  }

  toDTO(internal: ICharacter): ICharacterDTO {
    return {
      name: internal.name,
      description: internal.description,
      thumbnail: internal.thumbnail,
    };
  }
}
