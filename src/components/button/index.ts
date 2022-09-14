import template from './button.hbs';
import * as styles from './button.scss';
import Block, { BlockProps } from '../../utils/Block';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';

export interface ButtonProps extends BlockProps{
    label: string,
    isPrimary?: boolean,
    events?: {
        click: () => void;
    },
    slots?: {
        after?: string,
        before?: string,
    }
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', getPropsWithAugmentedClasses<ButtonProps>(props, [styles.button], [
      props.isPrimary ? styles.primary : '',
    ]));
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
