export type ProductCategory = '音訊' | '穿戴' | '電力' | '桌面'

export type ProductArtwork =
  | 'earphones'
  | 'watch'
  | 'powerbank'
  | 'mouse'
  | 'keyboard'
  | 'webcam'
  | 'drive'
  | 'speaker'

export interface Product {
  id: number
  name: string
  eyebrow: string
  description: string
  price: number
  category: ProductCategory
  artwork: ProductArtwork
  palette: 'sage' | 'clay' | 'blue' | 'amber'
}

export interface CartItem {
  product: Product
  quantity: number
}
