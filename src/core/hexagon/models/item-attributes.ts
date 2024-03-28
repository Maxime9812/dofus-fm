import { Attribute } from './attribute';

export class ItemAttributes {
  private attributes: Map<string, Attribute> = new Map();

  get snapshot() {
    return Array.from(this.attributes.values()).map(
      (attribute) => attribute.snapshot,
    );
  }

  addAttribute(attribute: Attribute) {
    this.attributes.set(attribute.type, attribute);
  }

  getAttribute(type: string) {
    return this.attributes.get(type);
  }

  getAllAttributes() {
    return Array.from(this.attributes.values());
  }
}
