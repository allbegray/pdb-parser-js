# pdb-parser-js

Utility to parse PDB(Protein Data Bank) file format 3.3 into JSON format

## Installation

Using npm:

```shell
$ npm i pdb-parser-js
```

## Getting Started

```js
import {PdbParser} from 'pdb-parser-js';

const file = fs.readFileSync('[pdb file path]', 'utf-8')

const parser = new PdbParser()
parser.collect(file.split('\n'))

const pdb = parser.parse()
```

## License

MIT. See LICENSE file.