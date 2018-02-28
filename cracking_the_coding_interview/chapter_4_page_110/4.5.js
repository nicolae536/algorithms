let root = { value: 7, left: { value: 3, left: { value: 2, left: { value: 1 } }, right: { value: 5, right: { value: 6, left: { value: 5.1 } } } }, right: { value: 8 } };

let checkBst = (node, lastLog) => {

    if (node.left && !checkBst(node.left, lastLog)) {
        return false;
    }

    if (lastLog.lLog >= node.value) {
        return false;
    }
    lastLog.lLog = node.value;
    console.log(node);

    if (node.right && !checkBst(node.right, lastLog)) {
        return false;
    }

    return true;
}

console.log('tree', root);
console.log('Validate binary search tree', checkBst(root, { err: false, lLog: -Infinity }))