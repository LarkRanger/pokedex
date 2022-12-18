import { CSSProperties } from 'react';
import { typeColors } from './const';

export * from './const';

export function toTitleCase(value: string) {
    const first = value.at(0)?.toUpperCase();
    const rest = value.slice(1).toLowerCase();
    return first + rest;
}

const OPACITY = '99';
export function getTypeStyles(primary: string, secondary?: string): CSSProperties {
    let background: string;
    if (secondary)
        background = `linear-gradient(to bottom right, ${typeColors[primary] + OPACITY} 0% 50%, ${
            typeColors[secondary] + OPACITY
        } 50%)`;
    else background = typeColors[primary] + OPACITY;
    return { background };
}
