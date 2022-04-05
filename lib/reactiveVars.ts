import { makeVar } from '@apollo/client';

export const cartIdVar = makeVar<string | null>(null);
