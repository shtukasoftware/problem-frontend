import { Service } from '@angular/core';

@Service()
export class User {}

export interface MyToken {
  sub: number;
  username: string;
  problemsSolved: Record<number, number>;
}
