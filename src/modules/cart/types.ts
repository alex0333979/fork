import { Cart, CartItem, Currency, User } from '@/apollo'

export interface PhotoItemsProps {
  items: CartItem[]
  currency: Currency
  onRemoveItem: (id: string) => void
  onUpdated: (d: Partial<User>) => void
  onPreview: (url: string) => void
}

export interface ApplicationItemsProps extends PhotoItemsProps {
  items: CartItem[]
  photoItems: CartItem[]
  onAddAnother: () => void
}

export interface AddAnotherButtonProps {
  onAddAnother: () => void
}

export interface SummaryProps {
  cart: Cart | null
  currency: Currency
  onCheckout: () => void
}
