import { ShoppingCart, type LucideProps } from "lucide-react";

const icons = {
  cart: ShoppingCart,
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
