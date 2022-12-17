import cn from 'classnames';
import { HTMLAttributes } from 'react';
import { Glass } from './Glass';

interface TypedGlassProps extends HTMLAttributes<HTMLDivElement> {
    primary: string;
    secondary?: string;
}

export function TypedGlass({ primary, secondary, children, className, ...props }: TypedGlassProps) {
    return (
        <Glass className={cn(getTypedClassName(primary, secondary), className)} {...props}>
            {children}
        </Glass>
    );
}

function getTypedClassName(primary: string, secondary?: string) {
    if (!secondary) return `!bg-${primary}`;
    return `!bg-[linear-gradient(to_bottom_right,theme(colors.${primary})_0%_50%,theme(colors.${secondary})_50%)]`;
}
