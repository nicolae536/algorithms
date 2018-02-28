// 4.8 page 110
// check the case when nodes are the same and also check if the node is the root of the tree
let tree = {
    root: {
        value: 8,
        left: {
            value: 9,
            left: {
                value: 11,
            },
            right: {
                value: 12
            }
        },
        right: {
            value: 10,
            left: {
                value: 13,
                left: {
                    value: 15
                }
            },
            right: {
                value: 14,
                right: {
                    value: 17
                }
            }
        }
    }
}

let n1 = { value: 17 };
let n2 = { value: 17 };

function commonA(root, n1, n2) {
    if (root.left) {
        let cParent = commonA(root.left, n1, n2);
        if (cParent) {
            return cParent;
        }
    }

    if (root.value === n1.value) {
        n1.found = true;
        return;
    }

    if (n1.found) {
        let isCommonP = checkOther(root.right, n1, n2);
        if (isCommonP) {
            return root;
        }
    }

    if (root.right) {
        let cParent = commonA(root.right, n1, n2);
        if (cParent) {
            return cParent;
        }
    }

    if (n1.found) {
        let isCommonP = checkOther(root.left, n1, n2);
        if (isCommonP) {
            return root;
        }
    }
}

function checkOther(root, n1, n2) {
    if (!root) {
        return;
    }

    if (root.value === n2.value) {
        return true;
    }

    if (root.left) {
        let cParent = checkOther(root.left, n1, n2);
        if (cParent) {
            return cParent;
        }
    }

    if (root.right) {
        let cParent = checkOther(root.right, n1, n2);
        if (cParent) {
            return cParent;
        }
    }
}

function mainP48Page110() {
    console.log("Nodes", n1, n2);
    if (tree.root.value === n1.value || tree.root.value === n2.value) {
        console.log("common", tree.root);
    }

    if (n2 === n1.value) {
        // recheck this
        console.log("common", null);
    }

    console.log("common", commonA(tree.root, n1, n2));
}

mainP48Page110();

    // class HashTable {
    //     constructor(hashFunct) {
    //         if (hashFunct) {
    //             this.hashF = hashFunct;
    //         }
    //         this.hastT = {};
    //     }

    //     hashF(data) {
    //         return '' + data;
    //     }

    //     set(data) {
    //         let hashData = this.hashF(data);
    //         this.hastT[hashData] = data;
    //     }

    //     get(data) {
    //         let hashData = this.hashF(data);
    //         return this.hastT[hashData];
    //     }

    //     get length(){
    //         return Object.keys(this.hastT);
    //     }
    // }

    // function buildProgram() {
    //     let proj = ['a', 'b', 'c', 'd', 'e', 'f'];
    //     // , ['c', 'a']
    //     let deps = [['a', 'd'], ['f', 'b'], ['b', 'd'], ['f', 'a'], ['d', 'c'], ['c', 'a']];

    //     let buildProjects = {};
    //     let tail = [];
    //     let progHashT = new HashTable((data)=> data.value);

    //     for (let dep of deps) {
    //         if (!progHashT.get({value: dep[0]})) {
    //             progHashT.set({
    //                 value: dep[0],
    //                 deps: new HashTable()
    //             });
    //         }
    //         if (!progHashT.get({value: dep[1]})) {
    //             progHashT.set({
    //                 value: dep[1],
    //                 deps: new HashTable()
    //             });
    //         }

    //         programHash = progHashT.get({value: dep[1]});
    //         depHash = progHashT.get({value: dep[0]});
    //         if (depHash.deps.get(dep[1]) || programHash.deps.get(dep[0])) {
    //             throw new Error('Cannot build');
    //         }

    //         programHash.deps.set(dep[0]);
    //     }

    //     for(let p of proj) {
    //         if (!progHashT.get({value: p})) {
    //             progHashT.set({
    //                 value: p,
    //                 deps: new HashTable()
    //             });
    //         }
    //     }

    //     console.log(progHashT);
    // }

    // function build(aB, p, deps, tail, proj) {
    //     if (aB[p]) {
    //         return;
    //     }

    //     if (tail.indexOf(p) !== -1) {
    //         throw new Error('Cannot build');
    //     }


    //     let indexDep = 0;
    //     while(Object.keys(aB) !== proj.length) {
    //         let d = deps[indexDep];
    //         if (!aB[d[1]]) {
    //             tail.push(d[1]);
    //             indexDep++;
    //         }
    //     }
    //     // for (let d of deps) {
    //     //     if (!aB[d[1]]) {
    //     //         tail.push(d[1]);
    //     //     }

    //         // if (d[1] === p && !aB[d]) {
    //         //     tail.push(p);
    //         //     // [p] = true;
    //         //     build(aB, d[0], deps, tail);

    //         //     if (tail.length > 1) {
    //         //         let newProgBuild = tail.pop();
    //         //         build(aB, newProgBuild, deps, tail);
    //         //     } else {
    //         //         let newProgBuild = tail.pop();
    //         //         aB[newProgBuild] = true;
    //         //     }
    //         // }
    //     // }



    //     aB[p] = true;
    //     console.log(p);
    // }

    // buildProgram();
    // hasshProjects = {};
    // for (let d of deps) {
    //     if (!hasshProjects[d[1]]) {
    //         hasshProjects[d[1]] = {};
    //     }

    //     if (hasshProjects[d[1]][d[0]]) {
    //         throw new Error('Cannot build');
    //     }

    //     hasshProjects[d[1]][d[0]] = true;
    // }