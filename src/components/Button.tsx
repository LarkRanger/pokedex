import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

type ButtonVariant = 'primary' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

export function Button({ className, children, disabled, variant = 'primary', ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'backdrop-filter backdrop-blur-xl bg-opacity-60',
                variantClassNames[variant],
                { 'bg-white hover:bg-opacity-100 transition-all': !disabled, 'bg-gray-400': disabled },
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

const variantClassNames: Record<ButtonVariant, string> = {
    primary: 'rounded-lg px-4 py-2',
    icon: 'w-8 h-8 flex items-center justify-center rounded-full',
};
