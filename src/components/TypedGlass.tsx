import { HTMLAttributes } from 'react';
import { Glass } from './Glass';
import { getTypeStyles } from 'utils';

interface TypedGlassProps extends HTMLAttributes<HTMLDivElement> {
    primary: string;
    secondary?: string;
}

export function TypedGlass({ primary, secondary, children, ...props }: TypedGlassProps) {
    return (
        <Glass style={getTypeStyles(primary, secondary)} {...props}>
            {children}
        </Glass>
    );
}
