declare global {
    interface String {
        extract(startIndex: number, endIndex?: number): string | null

        isEmpty(): boolean

        isBlank(): boolean
    }
}

String.prototype.extract = function (startIndex: number, endIndex?: number): string | null {
    try {
        const value = this.substring(startIndex - 1, endIndex).trim()
        return value.isEmpty() ? null : value
    } catch (e) {
        console.warn(e)
        return null
    }
};

String.prototype.isEmpty = function (): boolean {
    return !this || !this.length
};

String.prototype.isBlank = function (): boolean {
    return !this || !this.trim().length
};

export function toIntOrNull(s: string | null): number | null {
    if (s) {
        const value = parseInt(s)
        return isNaN(value) ? null : value
    }
    return null
}

export function toFloatOrNull(s: string | null): number | null {
    if (s) {
        const value = parseFloat(s)
        return isNaN(value) ? null : value
    }
    return null
}

export {}