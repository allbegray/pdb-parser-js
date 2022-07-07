import {Dbref1Parser} from "../src/section/primaryStructure";

test('DBREF1 추출', () => {

    const pdb = `
DBREF1 1ABC A   61    322 UNIMES               UPI000148A153                   
DBREF2 1ABC A     MES00005880000                     61         322

DBREF1 1ABC A   61   322  GB                   AE017221                   
DBREF2 1ABC A     46197919                      1534489     1537377

DBREF1 7L1E A    4   272  UNP                  A0A6U6DEE4_GUITH                       
DBREF2 7L1E A     A0A6U6DEE4                          4         272                   
DBREF1 7L1E B    4   272  UNP                  A0A6U6DEE4_GUITH                       
DBREF2 7L1E B     A0A6U6DEE4                          4         272                   `

    const parser = new Dbref1Parser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});