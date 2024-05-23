const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const v = new Array(101).fill(0); 
const p = 10;  // Not necessary but declared as per original code
let c = 0;

rl.question('Introdu valoarea lui n: ', (n) => {
    n = parseInt(n);

    if (n <= 100 && n > 0) {
        let count = 0;

        const readNextValue = () => {
            if (count < n) {
                rl.question('v[' + (count + 1) + ']=', (input) => {
                    v[count + 1] = parseInt(input);
                    count++;
                    readNextValue();
                });
            } else {
                processValues();
                rl.close();
            }
        };

        const processValues = () => {
            for (let j = 1; j <= n; j++) {
                if (v[j] >= 100000 && v[j] <= 999999) {
                    let x = v[j];
                    let isValid = true;
                    while (x > 0) {
                        if ((x % 10) % 2 !== 0) {
                            isValid = false;
                            break;
                        }
                        x = Math.floor(x / 10);
                    }
                    if (!isValid) {
                        v[j] = 0;
                    }
                } else {
                    v[j] = 0;
                }
            }
            for (let h = 1; h <= n; h++) {
                if (v[h] > c) {
                    c = v[h];
                }
            }
            if (c !== 0) {
                console.log(c + ' Este castigatorul');
            } else {
                console.log('nu exista castigator');
            }
        };

        readNextValue();
    } else {
        console.log('NU');
        rl.close();
    }
});