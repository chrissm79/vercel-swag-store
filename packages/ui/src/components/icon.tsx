import { MoveRight, ShoppingCart, Trash2, type LucideProps } from "lucide-react";

const icons = {
  cart: ShoppingCart,
  arrowRight: MoveRight,
  trash: Trash2,
} as const;

export type IconName = keyof typeof icons;

type IconProps = LucideProps & {
  name: IconName;
};

function Icon({ name, ...props }: IconProps) {
  const Component = icons[name];
  return <Component data-slot="icon" {...props} />;
}

export { Icon };
