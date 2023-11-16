export class CustomError extends Error {
  // eslint-disable-next-line space-before-function-paren
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}
