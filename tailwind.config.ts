
import { BG_IMG } from './src/app/constants/tailwind/backGroundImages.constants'
import { BOX_SHADOWS } from './src/app/constants/tailwind/boxShadows.constants'
import { COLORS } from './src/app/constants/tailwind/colors.constants'
import { DROP_SHADOWS } from './src/app/constants/tailwind/dropShadows.constants'
import { FONT_SIZE } from './src/app/constants/tailwind/fonts.constants'
import { SCREENS } from './src/app/constants/tailwind/screens.constants'
import { WIDTHS } from './src/app/constants/tailwind/widths.constants'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        ...BG_IMG
      },
      screens: {
        ...SCREENS
      },
      fontSize: {
        ...FONT_SIZE
      },
      colors: {
        ...COLORS
      },
      boxShadow: {
        ...BOX_SHADOWS
      },
      dropShadow: {
        ...DROP_SHADOWS
      },
      width: {
        ...WIDTHS
      },
      maxWidth: {
        ...WIDTHS
      }
    }
  },
  plugins: []
}
export default config
