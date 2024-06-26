function flattenObjectTree(tree, childKeyNames) {
    const keyNameSet = new Set();
    for (const keyName of childKeyNames) {
      keyNameSet.add(keyName)
    }
    const flatten = [];
    const stack = [tree];
  
    while (stack.length > 0) {
      const node = stack.shift();
      const children = [];
      for (const key of Reflect.ownKeys(node)) {
        if (keyNameSet.has(key)) {
          children.push(...node[key]);
          delete node[key];
        }
      }
      stack.unshift(...children);
      flatten.push(node);
    }
    return flatten;
  }
  
  function flattenArrayOfTrees(trees, childKeyNames) {
    return trees.flatMap((tree) => flattenObjectTree(tree, childKeyNames));
  }
  
  export default function flattenTree(tree, childKeyNames = ["children"]) {
    if (Array.isArray(tree)) {
      return flattenArrayOfTrees(tree, childKeyNames);
    }
    return flattenObjectTree(tree, childKeyNames);
  }