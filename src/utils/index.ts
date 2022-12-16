export function toTitleCase(value: string) {
    const first = value.at(0)?.toUpperCase();
    const rest = value.slice(1).toLowerCase();
    return first + rest;
}
