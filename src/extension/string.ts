declare global {
    interface String {
        extract(startIndex: number, endIndex?: number): string | null;

        isEmpty(): boolean

        isBlank(): boolean
    }
}

String.prototype.extract = function (startIndex: number, endIndex?: number): string | null {
    try {
        return this.substring(startIndex - 1, endIndex).trim()
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

export {}