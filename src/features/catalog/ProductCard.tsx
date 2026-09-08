import { ArrowUpRight, Plus } from 'lucide-react'
import { ProductVisual } from '@/features/catalog/ProductVisual'
import type { Product } from '@/types/product'

interface ProductCardProps {
  index: number
  product: Product
  onAdd: (product: Product) => void
}

export function ProductCard({ index, product, onAdd }: ProductCardProps) {
  return (
    <article className={`product-card palette-${product.palette}`} style={{ '--index': index } as React.CSSProperties}>
      <div className="product-media">
        <span className="product-category">{product.category}</span>
        <button className="quick-view" type="button" aria-label={`查看 ${product.name} 詳情`}>
          <ArrowUpRight size={18} />
        </button>
        <ProductVisual artwork={product.artwork} productName={product.name} />
      </div>

      <div className="product-copy">
        <p className="product-eyebrow">{product.eyebrow}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">NT$ {product.price.toLocaleString('zh-TW')}</span>
          <button className="add-button" type="button" onClick={() => onAdd(product)}>
            <Plus size={18} strokeWidth={2} />
            <span>加入</span>
          </button>
        </div>
      </div>
    </article>
  )
}
