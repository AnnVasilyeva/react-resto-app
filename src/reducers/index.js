const initialState = {
  menu: [],
  loading: true,
  items: [],
  total: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MENU_LOADED':
      return {
        ...state,
        menu: action.payload,
        loading: false
    };
    case 'MENU_REQUESTED':
      return {
        ...state,
        menu: state.menu,
        loading: true
    };
    case 'ITEM_ADD_TO_CART':
      const id = action.payload;
      const item = state.menu.find(item => item.id === id);
      const repeatItem = state.items.find(item => item.id === id);
      const totalPrice = state.total + item.price;
      let newItemsList;

      if(repeatItem) {
        newItemsList = state.items.map(element => {
          if(element.id === id) {
            return {
              title: element.title,
              price: element.price + item.price,
              url: element.url,
              id: element.id,
              count: element.count + 1
            }      
          } else {
            return element
          }
        });
     
      } else {
        const newItem = {
          title: item.title,
          price: item.price,
          url: item.url,
          id: item.id,
          count: 1
        };

        newItemsList = [
          ...state.items,
          newItem
        ]

      }
      return {
        ...state,
        total: totalPrice,
        items: newItemsList
      };

      case 'ITEM_REMOVE_FROM_CART':
        const idx = action.payload;
        const itemIndex = state.items.findIndex(item => item.id === idx);
        const findItem = state.items.find(item => item.id === idx);
        const totalPriceRemove = state.total - findItem.price;
        return {
          ...state,
          total: totalPriceRemove < 0 ? 0 : totalPriceRemove,
          items: [
            ...state.items.slice(0, itemIndex),
            ...state.items.slice(itemIndex + 1)
          ]
        }
      
    default: return state;
  }
}

export default reducer;