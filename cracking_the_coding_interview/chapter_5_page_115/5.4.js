const initData = (context) => {
    context.n = 0b110011;
};

const main = () => {
    initData(this);
    let bitS = this.n.toString(2);
    let bitsL = this.n.toString(2).length;
    let st = 0, end = 0, i = 0;
    if ((this.n + 1) & this.n === 0) {
        console.log('Max', this.n << 1);
        console.log('Min does not exist');
    }

    while (bitS[st] !== '0' && !!bitS[st]) { st++ };
    end = st;
    while (bitS[end] === '0' && !!bitS[end]) { end++ };
    end -= 1;
    console.log('start ', st);
    console.log('end ', end);
    let mask0 = 1 << (end - st + 1);
    let mask1 = (~mask0) & (mask0 - 1);
    mask1 = mask1 << (bitS.length - (end - st)) >> (bitS.length - (end - st))
    console.log('mask1 ', mask1.toString(2));
    mask0 = -1 << end - st + 1;
    console.log('mask0 ', mask0.toString(2));

    let lastBites = this.n & mask1;
    console.log('lastBites ', lastBites.toString(2));
    let lastBitesMiddle = lastBites << (bitS.length - end - 1);
    console.log('lastBitesMiddle ', lastBitesMiddle.toString(2));

    let max = (this.n | lastBitesMiddle) & mask0;
    let min = (this.n | lastBitesMiddle) & (~(lastBites << (bitS.length - st)));
    console.log(bitS);
    console.log(max.toString(2));
    console.log(min.toString(2));
};

main();