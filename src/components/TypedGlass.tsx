import { CSSProperties, HTMLAttributes } from 'react';
import { Glass } from './Glass';
import { typeColors } from 'utils';

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

const OPACITY = '99';
function getTypeStyles(primary: string, secondary?: string): CSSProperties {
    let background: string;
    if (secondary)
        background = `linear-gradient(to bottom right, ${typeColors[primary] + OPACITY} 0% 50%, ${
            typeColors[secondary] + OPACITY
        } 50%)`;
    else background = typeColors[primary] + OPACITY;
    return { background };
}
