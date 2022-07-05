import {AtomParser} from "../src/parser/atomParser";

test('Atom 추출', () => {

    const pdb = `
ATOM     32  N  AARG A  -3      11.281  86.699  94.383  0.50 35.88           N  
ATOM     33  N  BARG A  -3      11.296  86.721  94.521  0.50 35.60           N
ATOM     34  CA AARG A  -3      12.353  85.696  94.456  0.50 36.67           C
ATOM     35  CA BARG A  -3      12.333  85.862  95.041  0.50 36.42           C
ATOM     36  C  AARG A  -3      13.559  86.257  95.222  0.50 37.37           C
ATOM     37  C  BARG A  -3      12.759  86.530  96.365  0.50 36.39           C
ATOM     38  O  AARG A  -3      13.753  87.471  95.270  0.50 37.74           O
ATOM     39  O  BARG A  -3      12.924  87.757  96.420  0.50 37.26           O
ATOM     40  CB AARG A  -3      12.774  85.306  93.039  0.50 37.25           C
ATOM     41  CB BARG A  -3      13.428  85.746  93.980  0.50 36.60           C
ATOM     42  CG AARG A  -3      11.754  84.432  92.321  0.50 38.44           C
ATOM     43  CG BARG A  -3      12.866  85.172  92.651  0.50 37.31           C
ATOM     44  CD AARG A  -3      11.698  84.678  90.815  0.50 38.51           C
ATOM     45  CD BARG A  -3      13.374  85.886  91.406  0.50 37.66           C
ATOM     46  NE AARG A  -3      12.984  84.447  90.163  0.50 39.94           N
ATOM     47  NE BARG A  -3      12.644  85.487  90.195  0.50 38.24           N
ATOM     48  CZ AARG A  -3      13.202  84.534  88.850  0.50 40.03           C
ATOM     49  CZ BARG A  -3      13.114  85.582  88.947  0.50 39.55           C
ATOM     50  NH1AARG A  -3      12.218  84.840  88.007  0.50 40.76           N
ATOM     51  NH1BARG A  -3      14.338  86.056  88.706  0.50 40.23           N`

    const parser = new AtomParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});