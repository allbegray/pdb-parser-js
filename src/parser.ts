interface Parser<T> {
    collect(line: string): any

    parse(): T
}

abstract class AbstractParser<T> implements Parser<T> {
    protected lines: string[] = []

    collect(line: string | string[]): any {
        if (Array.isArray(line)) {
            for (const l of line) {
                if (this.match(l)) {
                    this.lines.push(l)
                }
            }
        } else {
            if (this.match(line)) {
                this.lines.push(line)
            }
        }
    }

    parse(): T {
        const ret = this._parse()
        if (this.validate(ret))
            return ret
        else
            throw Error('validate error')
    }

    protected abstract match(line: string): boolean

    protected abstract _parse(): T

    protected validate(ret: T): boolean {
        return true
    }

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