import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

export function Button({ className, children, disabled, variant = 'primary', ...props }: ButtonProps) {
    return (
        <button className={cn('transition-all', variantClassNames[variant], className)} disabled={disabled} {...props}>
            {children}
        </button>
    );
}

const variantClassNames: Record<ButtonVariant, string> = {
    primary: 'bg-white shadow-md px-2 border-double border-4 border-black hover:-translate-y-1 hover:shadow-lg',
    secondary: 'px-3 bg-white rounded-lg backdrop-filter backdrop-blur-xl bg-opacity-60 hover:bg-opacity-100',
    icon: 'w-8 h-8 flex items-center justify-center rounded-full bg-white disabled:bg-gray-400 drop-filter backdrop-blur-xl bg-opacity-60 hover:bg-opacity-100 disabled:hover:bg-opacity-60',
};
