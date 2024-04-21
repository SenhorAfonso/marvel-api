export interface Adapter<T, U> {
  toEntity(external: T): U;
  toDTO(internal: U): T;
}
