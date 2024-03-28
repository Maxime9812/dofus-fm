type AttributeConstructorProps = {
  type: AttributeType;
  value: number;
};

const ATTRIBUTE_TYPES = ['agility', 'strength'] as const;
export type AttributeType = (typeof ATTRIBUTE_TYPES)[number];

export class Attribute {
  private constructor(private props: AttributeConstructorProps) {}

  get type() {
    return this.props.type;
  }

  get value() {
    return this.props.value;
  }

  get snapshot() {
    return {
      type: this.props.type,
      value: this.props.value,
    };
  }

  isMoreThan(attribute: Attribute): boolean {
    return this.props.value > attribute.value;
  }

  static of(type: AttributeType, value: number): Attribute {
    return new Attribute({ type, value });
  }
}
