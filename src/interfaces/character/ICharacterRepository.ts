export interface ICharacterRepository<T> {
  create(character: T): Promise<T>;
  findAll(): Promise<T[] | null>;
  updateById(id: string, character: T): Promise<T | null>;
  deleteById(id: string): Promise<void>;
}
