// console.log(Math. Math.sqrt(7));
// a = 8000000000000000000;
// console.log(Math.ma);


const main = () => {
    function isPrime(nr) {
        if (nr < 2) {
            return false;
        }

        for (let i = 2; i < Math.floor(Math.sqrt(nr)) + 1; i++) {
            if (nr % i === 0) {
                return false;
            }
        }

        return true;
    }

    function splitNr(nr) {
        if (!isPrime(nr)) {
            return 0;
        }

        if (nr < 10) {
            console.log(nr);
            return 1;
        }

        let result = 0;
        for (let i = 0; i < `${nr}`.length; i++) {
            result += splitNr(getNumberWithout(nr, i));
        }

        return result;
    }

    // console.log(getNumberWithout(1234, 0));
    // console.log(getNumberWithout(1234, 1));
    // console.log(getNumberWithout(1234, 2));
    // console.log(getNumberWithout(1234, 3));

    function getNumberWithout(nr, index) {
        nr = nr + '';

        if (index === 0) {
            return +(nr.substring(1, nr.length));
        }

        if (index === nr.length - 1) {
            return +(nr.substring(0, nr.length - 1));
        }

        return +(nr.substring(0, index) + nr.substring(index + 1, nr.length));
    }

    // console.log(
    //  splitNr(4567)        
    // );

    console.log(
        'result: ', splitNr(46216567629137)
    );
};


main();