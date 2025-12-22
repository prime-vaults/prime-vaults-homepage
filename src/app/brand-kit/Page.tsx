import JSZip from 'jszip'
import saveAs from 'file-saver'
import { useState } from 'react'
import { ArrowDownToLine } from 'lucide-react'

import Color from './Color'
import Logo, { LOGOS } from './Logo'
import Typography from './Typography'
import Button from '@/components/UI/Button'
import Container from '@/components/UI/Container'

interface BrandAsset {
  name: string
  type: 'image' | 'document' | 'color'
  url?: string
  content?: string
}

export default function BrandKitPage() {
  const [isLoading, setLoading] = useState(false)

  const buildBrandAssets = (): BrandAsset[] => {
    const assets: BrandAsset[] = []

    Object.entries(LOGOS).forEach(([theme, logoData]) => {
      for (const [key, url] of Object.entries(logoData)) {
        if (key === 'bg_color' || key === 'text_color') continue
        assets.push({
          name: `Logos/${theme}/logo-${key}.svg`,
          type: 'image',
          url: url as string,
        })
      }
      assets.push({
        name: `Logos/${theme}/theme-info.txt`,
        type: 'document',
        content: `Theme: ${theme}\nBackground Color: ${logoData.bg_color}\nText Color: ${logoData.text_color}`,
      })
    })

    // Colors - Neutral
    assets.push(
      { name: 'Colors/Color_900.txt', type: 'color', content: '#1A1A1A' },
      { name: 'Colors/Color_800.txt', type: 'color', content: '#333333' },
      { name: 'Colors/Color_500.txt', type: 'color', content: '#666666' },
      { name: 'Colors/Color_300.txt', type: 'color', content: '#CCCCCC' },
      { name: 'Colors/Color_0.txt', type: 'color', content: '#FFFFFF' },
    )

    // Colors - Primary
    assets.push(
      { name: 'Colors/Color_DeepTeal.txt', type: 'color', content: '#006B56' },
      {
        name: 'Colors/Color_MidnightGreen.txt',
        type: 'color',
        content: '#003F3F',
      },
      {
        name: 'Colors/Color_LightGreen.txt',
        type: 'color',
        content: '#00D966',
      },
      {
        name: 'Colors/Color_MediumGreen.txt',
        type: 'color',
        content: '#00B859',
      },
      { name: 'Colors/Color_Charcoal.txt', type: 'color', content: '#F5FFF5' },
    )

    // Typography
    assets.push(
      {
        name: 'Typography/Font_SpaceGrotesk.txt',
        type: 'document',
        content: 'Font: Space Grotesk\nWeights: Light, Regular, Medium',
      },
      {
        name: 'Typography/Font_Tomorrow.txt',
        type: 'document',
        content: 'Font: Tomorrow\nWeights: Light, Regular, Medium',
      },
    )

    // Brand Guidelines
    assets.push({
      name: 'Guidelines/Brand_Guidelines.txt',
      type: 'document',
      content:
        'PrimeVaults Brand Guidelines\n\nMission: Blending security with ai-driven optimization\nValues: Reliability, Innovation, Trust\n\nCore Colors:\n- Green for growth\n- Black for strength',
    })

    return assets
  }

  const handleDownloadAll = async () => {
    try {
      setLoading(true)
      const zip = new JSZip()
      const brandAssets = buildBrandAssets()

      for (const asset of brandAssets) {
        if (asset.type === 'image' && asset.url) {
          const response = await fetch(asset.url)
          const blob = await response.blob()
          zip.file(asset.name, blob)
        } else if (asset.type === 'document' || asset.type === 'color') {
          if (asset.content) {
            zip.file(asset.name, asset.content)
          }
        }
      }

      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(
        content,
        `PrimeVaults_BrandAssets_${new Date().toISOString().split('T')[0]}.zip`,
      )
    } catch (error: any) {
      alert(error.message || 'Failed to download assets')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      className="h-full"
      innerClassName="bg-base-300 border-x border-neutral h-full"
    >
      <div className="section-container flex flex-col md:flex-row gap-2">
        <span className="text-5xl md:text-[120px] font-bold uppercase">
          Brand Guildelines
        </span>
        <Button
          disabled={isLoading}
          loading={isLoading}
          onClick={handleDownloadAll}
          className="btn btn-primary flex flex-row gap-2 !px-6 py-3"
        >
          <p className="font-medium">Download all Brand Assets</p>
          <ArrowDownToLine width={18} />
        </Button>
      </div>
      <Logo />
      <Color />
      <Typography />
    </Container>
  )
}
