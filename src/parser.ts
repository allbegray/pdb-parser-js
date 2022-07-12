import {Section} from "./model";

export interface Parser<T> {
    collect(line: string | string[]): void

    parse(): T
}

export abstract class AbstractParser<T> implements Parser<T> {
    protected lines: string[] = []

    collect(line: string | string[]): void {
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
}

export abstract class SectionParser<T extends Section> implements Parser<T> {

    protected abstract parsers(): Parser<any>[]

    collect(line: string | string[]) {
        if (Array.isArray(line)) {
            for (const l of line) {
                for (const p of this.parsers()) {
                    p.collect(l)
                }
            }
        } else {
            for (const p of this.parsers()) {
                p.collect(line)
            }
        }
    }

    abstract parse(): T
}