import {SeqadvParser} from "../src/parser/seqadvParser";

test('SEQADV 추출', () => {

    const pdb = `
SEQADV 5UDC ALA F  102  UNP  P03420    PRO   102 CONFLICT                       
SEQADV 5UDC CYS F  155  UNP  P03420    SER   155 ENGINEERED MUTATION            
SEQADV 5UDC PHE F  190  UNP  P03420    SER   190 ENGINEERED MUTATION            
SEQADV 5UDC LEU F  207  UNP  P03420    VAL   207 ENGINEERED MUTATION            
SEQADV 5UDC CYS F  290  UNP  P03420    SER   290 ENGINEERED MUTATION            
SEQADV 5UDC VAL F  379  UNP  P03420    ILE   379 CONFLICT                       
SEQADV 5UDC VAL F  447  UNP  P03420    MET   447 CONFLICT                       
SEQADV 5UDC SER F  514  UNP  P03420              EXPRESSION TAG                 
SEQADV 5UDC LYS F  568  UNP  P03420              EXPRESSION TAG                 
SEQADV 5UDC ALA A  102  UNP  P03420    PRO   102 CONFLICT                       
SEQADV 5UDC CYS A  155  UNP  P03420    SER   155 ENGINEERED MUTATION            
SEQADV 5UDC PHE A  190  UNP  P03420    SER   190 ENGINEERED MUTATION            
SEQADV 5UDC LEU A  207  UNP  P03420    VAL   207 ENGINEERED MUTATION            
SEQADV 5UDC CYS A  290  UNP  P03420    SER   290 ENGINEERED MUTATION            
SEQADV 5UDC VAL A  379  UNP  P03420    ILE   379 CONFLICT                       
SEQADV 5UDC VAL A  447  UNP  P03420    MET   447 CONFLICT                       
SEQADV 5UDC SER A  514  UNP  P03420              EXPRESSION TAG                 
SEQADV 5UDC LYS A  568  UNP  P03420              EXPRESSION TAG                 
SEQADV 5UDC ALA D  102  UNP  P03420    PRO   102 CONFLICT                       
SEQADV 5UDC CYS D  155  UNP  P03420    SER   155 ENGINEERED MUTATION            
SEQADV 5UDC PHE D  190  UNP  P03420    SER   190 ENGINEERED MUTATION            
SEQADV 5UDC LEU D  207  UNP  P03420    VAL   207 ENGINEERED MUTATION            
SEQADV 5UDC CYS D  290  UNP  P03420    SER   290 ENGINEERED MUTATION            
SEQADV 5UDC VAL D  379  UNP  P03420    ILE   379 CONFLICT                       
SEQADV 5UDC VAL D  447  UNP  P03420    MET   447 CONFLICT                       
SEQADV 5UDC LYS D  568  UNP  P03420              EXPRESSION TAG                 `

    const parser = new SeqadvParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});