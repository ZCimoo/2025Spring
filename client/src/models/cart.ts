import { ref } from 'vue'
import { addNotification } from './notifications'

export interface CartItem {
  product: Product
  quantity: number
}

const cart = ref<CartItem[]>([])

export function refCart() {
  return cart
}

export function addToCart({ name, price }) {
  const item = cart.value.find((item) => item.product.id === product.id)
  if (item) {
    item.quantity += quantity
    addNotification({ message: 'Item already in cart. Quantity updated.', type: 'info' })
  } else {
    cart.value.push({ name, price, quantity: 1 })
    addNotification({ message: `Added ${quantity} ${product.title} to cart`, type: 'success' })
  }
}
