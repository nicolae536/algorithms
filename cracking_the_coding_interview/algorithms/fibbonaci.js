const main = () => {

    function fibbo(n) {
        if (n === 0) {
            return 0;
        }

        if (n === 1) {
            return 1;
        }

        return fibbo(n - 1) + fibbo(n - 2);

        // let first = 0;
        // let second = 1;
        // let sum = 0;

        // while (sum < n) {
        //     sum += first + second;
        //     first = second;
        //     second = sum;
        // }

        // if (sum === n) {
        //     console.log(n);
        // } else {
        //     console.log('error');
        // }
    }

    console.log(fibbo(6));
    console.log(fibbo(19));
    console.log(fibbo(28));
    console.log(fibbo(36));
    console.log(fibbo(38));
    

};

main();