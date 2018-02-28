const initData = (context) => {
    context.subNumber = 0b110101011;
    context.hostNumber = 0b110101100101011;
    context.j = 11;
    context.i = 2;
};

const setAllRightBitsTo1 = (mask) => {
    let length = mask.toString(2).length;

    for (let i = 0; i < length; i++) {
        mask = mask | (1 << i);
    }

    return mask;
};

const main = () => {
    initData(this);
    console.log('insert', this.subNumber.toString(2), 'from position', this.i, 'to position', this.j);
    console.log('into', this.hostNumber.toString(2));
    let mask = 1;
    // shift with the legth of the numbers to be inserted
    mask = 1 << (this.j - this.i - 1);
    mask = setAllRightBitsTo1(mask);
    // create a mask for the second number so we have only the valid numbers
    let subNumberMask = (this.subNumber & mask) << this.i;
    mask = mask << this.i;
    // move the mask to have 0 before insertion starting point
    mask = ~mask;

    let newHost = this.hostNumber & mask;
    // log the insertion
    console.log('result', (newHost | subNumberMask).toString(2));
};

main();