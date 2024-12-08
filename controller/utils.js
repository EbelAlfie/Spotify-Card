export function isInvalid(value) {
    return !value || value instanceof Error
}