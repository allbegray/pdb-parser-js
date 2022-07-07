interface Parser<T> {
    collect(line: string): any

    parse(): T
}

abstract class AbstractParser<T> implements Parser<T> {
    lines: string[] = []

    collect(line: string): any {
        if (this.match(line)) {
            this.lines.push(line)
        }
    }

    abstract match(line: string): boolean

    abstract parse(): T

    protected toIntOrNull(s: string | null): number | null {
        if (s) {
            const value = parseInt(s)
            return isNaN(value) ? null : value
        }
        return null
    }

    protected toFloatOrNull(s: string | null): number | null {
        if (s) {
            const value = parseFloat(s)
            return isNaN(value) ? null : value
        }
        return null
    }
}

export {Parser, AbstractParser}