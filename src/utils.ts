export function validateId(id: number|string, methodName: string): void {
    if (!id) {
      throw new Error(`You must provide an 'id' in ${methodName}.`);
    }
  }