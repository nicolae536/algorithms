const initData = (context) => {
    context.number = 0b110111011111;
};

const main = () => {
    initData(this);
    let j = '' + (this.number).toString(2),
        sec1 = 0,
        sec1LastIdx = 0,
        sec1StIdx = 0,
        sec2 = 0,
        sec2LastIdx = 0,
        sec2StIdx = 0,
        secC = 0;
    for (let i = 0; i < j.length; i++) {
        let c = j[i];
        if (c === '1') {
            secC += 1;
        }

        if (c === '0' || (i === j.length - 1)) {
            // We need in case we are on the last number we need to use the array length to compute data because we didn't found a 0 and we compute like we are indexed in a 0 
            let indexToUse = c !== '0' && i === j.length - 1 ? i : i - 1;
            if (sec1 === 0) {
                sec1 = secC;
                sec1StIdx = indexToUse - secC;
                sec1LastIdx = indexToUse;
            } else if (sec2 === 0) {
                if (indexToUse - secC !== sec1LastIdx + 1) {
                    sec1 = secC;
                    sec1StIdx = indexToUse - secC;
                    sec1LastIdx = indexToUse;
                } else {
                    sec2 = secC;
                    sec2StIdx = indexToUse - secC;
                    sec2LastIdx = indexToUse;
                }
            } else if (secC + sec2 > sec1 + sec2 && (indexToUse - secC === sec2LastIdx + 1)) {
                sec1 = sec2;
                sec1StIdx = sec2StIdx;
                sec1LastIdx = sec2LastIdx;
                sec2 = secC;
                sec2StIdx = indexToUse - secC + 1;
                sec2LastIdx = indexToUse;
            }

            secC = 0;
        }
    }

    console.log('I can change a bit to one and a max of 1 array length ', sec1 + sec2 + 1);
};

main();