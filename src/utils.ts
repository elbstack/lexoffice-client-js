import { ContactCreateCompany, ContactCreatePerson } from '.';

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  for (const baseCtor of baseCtors) {
    const group = baseCtor.name;
    const propertyNames = Object.getOwnPropertyNames(baseCtor.prototype);
    for (const name of propertyNames) {
      const baseCtorName = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
      if (!baseCtorName) {
        return;
      }
      Object.defineProperty(derivedCtor.prototype, name, baseCtorName);
    }
  }
}
