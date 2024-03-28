import { AttributeType } from './attribute';

type Props = {
  name: string;
  type: AttributeType;
  value: number;
};

export type RuneSnapshot = Rune['snapshot'];

export class Rune {
  constructor(private props: Props) {}

  get name() {
    return this.props.name;
  }

  get value() {
    return this.props.value;
  }

  isTypeOf(type: AttributeType) {
    return this.props.type === type;
  }

  isMoreThan(rune: Rune): boolean {
    return this.props.value > rune.value;
  }

  get snapshot() {
    return {
      name: this.props.name,
      type: this.props.type,
      value: this.props.value,
    };
  }

  static fromSnapshot(snapshot: RuneSnapshot): Rune {
    return new Rune({
      name: snapshot.name,
      type: snapshot.type,
      value: snapshot.value,
    });
  }
}
