const initData = (context) => {
    context.a = 329;
    context.b = 15;
    context.d = context.a;
    context.f = context.b;
};

const main = () => {
    initData(this);
    let bitSwitch = 0;
    console.log('a = ', this.a.toString(2));
    console.log('b = ', this.b.toString(2));
    while (this.a > 0 || this.b > 0) {
        if ((this.a & 1) !== (this.b & 1)) {
            console.log('a = ', this.a.toString(2), ' binary operation ', this.a & 1);
            console.log('b = ', this.b.toString(2), ' binary operation ', this.b & 1);
            bitSwitch += 1;
        }
        this.a = this.a >> 1;
        this.b = this.b >> 1;
    }

    console.log('Switch ', bitSwitch, ' to transfor ', this.d, ' in ', this.f);
};

main();