interface Parser<T> {
    collect(line: string): any

    parse(): T
}

abstract class AbstractParser<T> implements Parser<T> {
    lines: string[] = [];

    collect(line: string): any {
        if (this.match(line)) {
            this.lines.push(line)
        }
    }

    abstract match(line: string): boolean

    abstract parse(): T
}

export {Parser, AbstractParser}