import { Attribute, AttributeType } from './attribute';
import { ItemAttributes } from './item-attributes';

export type ItemSnapshot = Item['snapshot'];
type ItemConstructorProps = {
  name: string;
  attributes: ItemAttributes;
};

export class Item {
  private constructor(private props: ItemConstructorProps) {}

  get name() {
    return this.props.name;
  }

  get snapshot() {
    return {
      name: this.props.name,
      attributes: this.props.attributes.snapshot,
    };
  }

  getAttribute(type: AttributeType) {
    return this.props.attributes.getAttribute(type);
  }

  getAttributeToImprove(perfectItem: Item): Attribute | undefined {
    return this.props.attributes.getAllAttributes().find((attribute) => {
      const perfectAttribute = perfectItem.getAttribute(attribute.type);
      return perfectAttribute && perfectAttribute.isMoreThan(attribute);
    });
  }

  isPerfect(perfectItem: Item): boolean {
    return !this.getAttributeToImprove(perfectItem);
  }

  static fromSnapshot(snapshot: ItemSnapshot): Item {
    const attributes = new ItemAttributes();
    snapshot.attributes.forEach((s) => {
      attributes.addAttribute(Attribute.of(s.type, s.value));
    });

    return new Item({
      name: snapshot.name,
      attributes,
    });
  }
}
