import {
  BatteryCharging,
  Mouse,
  Headphones,
  Keyboard,
  Radio,
  Usb,
  Video,
  Watch,
} from 'lucide-react'
import type { ProductArtwork } from '@/types/product'

const ICONS = {
  earphones: Headphones,
  watch: Watch,
  powerbank: BatteryCharging,
  mouse: Mouse,
  keyboard: Keyboard,
  webcam: Video,
  drive: Usb,
  speaker: Radio,
} satisfies Record<ProductArtwork, typeof Headphones>

interface ProductVisualProps {
  artwork: ProductArtwork
  productName: string
  compact?: boolean
}

export function ProductVisual({ artwork, productName, compact = false }: ProductVisualProps) {
  const Icon = ICONS[artwork]

  return (
    <div className={compact ? 'product-visual is-compact' : 'product-visual'} aria-hidden="true">
      <span className="visual-orbit" />
      <span className="visual-disc">
        <Icon strokeWidth={1.15} />
      </span>
      {!compact && <span className="visual-caption">{productName}</span>}
    </div>
  )
}
