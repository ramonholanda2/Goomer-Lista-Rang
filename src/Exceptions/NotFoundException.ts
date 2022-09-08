export default class NotFoundException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

