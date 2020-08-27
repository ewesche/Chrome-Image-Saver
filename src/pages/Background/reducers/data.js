import count from './count';
const initialState = {total: 0, treeData: [{title: 'all products', img_url: 'folder', link_url: '', key: '0',
                                            children: []}]};

export default (state = initialState, action) => {
  switch (action.type) {
     case 'ADD_COUNT':
      return Object.assign({}, state, {total: state.total+1});
    case 'INSERT_DATA':
      // action.payload.key = 1 + + state[state.length-1].key
      // action.payload.key = count.toString();
      action.payload.key = state.total.toString()
        let clone_one = [...state.treeData]
        search_helper('rna', clone_one, '0', 'insert_data', action.payload)
        console.log(clone_one, 'insert data')
        return Object.assign({}, state, {treeData: clone_one})
      // }
      return Object.assign({}, state, {treeData: [...state.treeData].concat(action.payload)})
      // return copy;
    case 'UPDATE_TREE':
      return Object.assign({}, state, {treeData: action.payload})
    case 'DELETE_NODE':
      let copy = [...state.treeData]
      prune_helper(copy, action.payload)
      return Object.assign({}, state, {treeData: copy})
    case 'CLEAR_ALL':
      // return initialState
      console.log(initialState)
      return Object.assign({}, state, {total: 0, treeData: [{title: 'all products', img_url: 'folder', link_url: '', key: '0',
                                            children: []}]} )
    case 'CHANGE_NAME':
      // let index = state.treeData.findIndex(node =>
      //   node.key === action.payload.key
      // )
      let clone = [...state.treeData]
      // clone[index].title = action.payload.name
      search_helper(action.payload.name, clone, action.payload.key, 'change_name')
      console.log('this is clone')
      console.log(clone)

     return Object.assign({}, state, {treeData: clone})
    default:
      return state;

  }
};

function searchTree(name, element, matchingTitle, mode, payload = {}){
     if(element.key === matchingTitle && mode === 'change_name'){
       if(element.key==='0'){
         element.title = name + ' *root'
       }
       else {
         element.title = name;
       }
       return element;
     }
     if(element.key === matchingTitle && mode === 'insert_data') {
       console.log(element, 'hi')
       element.children = element.children.concat(payload)
       console.log(element)
       return element
     }
     else if (element.children != null){
          console.log(element, 'element')
          var i;
          var result = null;
          for(i=0; result == null && i < element.children.length; i++){
               result = searchTree(name , element.children[i], matchingTitle, mode, payload);
          }
          return result;
     }
     return null;
}

function search_helper(name, array, key, mode, payload = {}){
  for (let n = 0; n < array.length; ++n) {
    searchTree(name, array[n], key, mode, payload)
  }
}

function prune(array, key) {
    console.log(array)
    for (let i = 0; i < array.length; ++i) {
        let obj = array[i];
        if (obj.key === key) {
            // splice out 1 element starting at position i
            array.splice(i, 1);
            return true;
        }
        if (obj.children) {
            if (prune(obj.children, key)) {
                if (obj.children.length === 0) {
                    // delete children property when empty
                    delete obj.children;

                    // or, to delete this parent altogether
                    // as a result of it having no more children
                    // do this instead
                    // array.splice(i, 1);
                }
                return true;
            }
        }
    }
    return false;
}

function prune_helper(array, keys){
  for (let i = 0; i < keys.length; ++i) {
    prune(array, keys[i])
  }
}