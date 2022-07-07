import {Dbref1Parser} from "../src/parser/dbref1Parser";

test('DBREF1 추출', () => {

    const pdb = `
         1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
DBREF1 1ABC A   61    322 UNIMES               UPI000148A153                   
DBREF2 1ABC A     MES00005880000                     61         322

         1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
DBREF1 1ABC A   61   322  GB                   AE017221                   
DBREF2 1ABC A     46197919                      1534489     1537377`

    const parser = new Dbref1Parser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});