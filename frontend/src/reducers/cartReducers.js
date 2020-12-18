import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

// Cart reducer action
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(x => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      }

    // const index = state.cartItems.findIndex(
    //   item => item.product === action.payload
    // )

    // let newCart = [...state.cartItems]

    // if (index >= 0) {
    //   newCart.splice(index, 1)
    // } else {
    //   console.warn(`Product {id: ${action.id}} not available in Cart!`)
    // }

    // return {
    //   ...state,
    //   cartItems: newCart,
    // }
    default:
      return state
  }
}
