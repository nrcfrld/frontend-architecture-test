import { PackageOpen } from 'lucide-react'
import { ProductCard } from '@/features/catalog/ProductCard'
import type { Product } from '@/types/product'

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  onAdd: (product: Product) => void
}

export function ProductGrid({ products, isLoading, onAdd }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="product-grid" aria-label="商品載入中" aria-busy="true">
        {Array.from({ length: 4 }, (_, index) => (
          <div className="product-skeleton" key={index}>
            <span />
            <span />
            <span />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="empty-results">
        <PackageOpen size={34} strokeWidth={1.4} />
        <h3>暫時找不到相符選物</h3>
        <p>試試其他關鍵字，或切換商品分類。</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} onAdd={onAdd} />
      ))}
    </div>
  )
}
