import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    ui({
      ui: {
        input: {
          slots: {
            root: 'relative inline-flex items-center',
            base: 'w-full rounded-[calc(var(--ui-radius)*1.5)] border-0 placeholder:text-(--ui-text-dimmed) focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors',
          },
        },
        progress: {
          slots: {
            root: 'gap-2',
            base: 'relative overflow-hidden rounded-full bg-accented',
            indicator: 'rounded-full size-full transition-transform duration-200 ease-out',
            status: 'flex justify-end text-dimmed transition-[width] duration-200',
            steps: 'grid items-end',
            step: 'truncate text-end row-start-1 col-start-1 transition-opacity'
          },
          variants: {
            animation: {
              carousel: '',
              'carousel-inverse': '',
              swing: '',
              elastic: ''
            },
            color: {
              primary: {
                indicator: 'bg-primary',
                steps: 'text-primary'
              },
              secondary: {
                indicator: 'bg-secondary',
                steps: 'text-secondary'
              },
              success: {
                indicator: 'bg-success',
                steps: 'text-success'
              },
              info: {
                indicator: 'bg-info',
                steps: 'text-info'
              },
              warning: {
                indicator: 'bg-warning',
                steps: 'text-warning'
              },
              error: {
                indicator: 'bg-error',
                steps: 'text-error'
              },
              neutral: {
                indicator: 'bg-inverted',
                steps: 'text-inverted'
              },
              fuchsia: {
                indicator: 'bg-fuchsia-700',
                steps: 'text-fuchsia-700'
              }              
            },
            size: {
              '2xs': {
                status: 'text-xs',
                steps: 'text-xs'
              },
              xs: {
                status: 'text-xs',
                steps: 'text-xs'
              },
              sm: {
                status: 'text-sm',
                steps: 'text-sm'
              },
              md: {
                status: 'text-sm',
                steps: 'text-sm'
              },
              lg: {
                status: 'text-sm',
                steps: 'text-sm'
              },
              xl: {
                status: 'text-base',
                steps: 'text-base'
              },
              '2xl': {
                status: 'text-base',
                steps: 'text-base'
              }
            },
            step: {
              active: {
                step: 'opacity-100'
              },
              first: {
                step: 'opacity-100 text-muted'
              },
              other: {
                step: 'opacity-0'
              },
              last: {
                step: ''
              }
            },
            orientation: {
              horizontal: {
                root: 'w-full flex flex-col',
                base: 'w-full',
                status: 'flex-row'
              },
              vertical: {
                root: 'h-full flex flex-row-reverse',
                base: 'h-full',
                status: 'flex-col'
              }
            },
            inverted: {
              true: {
                status: 'self-end'
              }
            }
          },
          compoundVariants: [
            {
              inverted: true,
              orientation: 'horizontal',
              class: {
                step: 'text-start',
                status: 'flex-row-reverse'
              }
            },
            {
              inverted: true,
              orientation: 'vertical',
              class: {
                steps: 'items-start',
                status: 'flex-col-reverse'
              }
            },
            {
              orientation: 'horizontal',
              size: '2xs',
              class: 'h-px'
            },
            {
              orientation: 'horizontal',
              size: 'xs',
              class: 'h-0.5'
            },
            {
              orientation: 'horizontal',
              size: 'sm',
              class: 'h-1'
            },
            {
              orientation: 'horizontal',
              size: 'md',
              class: 'h-2'
            },
            {
              orientation: 'horizontal',
              size: 'lg',
              class: 'h-3'
            },
            {
              orientation: 'horizontal',
              size: 'xl',
              class: 'h-4'
            },
            {
              orientation: 'horizontal',
              size: '2xl',
              class: 'h-5'
            },
            {
              orientation: 'vertical',
              size: '2xs',
              class: 'w-px'
            },
            {
              orientation: 'vertical',
              size: 'xs',
              class: 'w-0.5'
            },
            {
              orientation: 'vertical',
              size: 'sm',
              class: 'w-1'
            },
            {
              orientation: 'vertical',
              size: 'md',
              class: 'w-2'
            },
            {
              orientation: 'vertical',
              size: 'lg',
              class: 'w-3'
            },
            {
              orientation: 'vertical',
              size: 'xl',
              class: 'w-4'
            },
            {
              orientation: 'vertical',
              size: '2xl',
              class: 'w-5'
            },
            {
              orientation: 'horizontal',
              animation: 'carousel',
              class: {
                indicator: 'data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-rtl_2s_ease-in-out_infinite]'
              }
            },
            {
              orientation: 'vertical',
              animation: 'carousel',
              class: {
                indicator: 'data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]'
              }
            },
            {
              orientation: 'horizontal',
              animation: 'carousel-inverse',
              class: {
                indicator: 'data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]'
              }
            },
            {
              orientation: 'vertical',
              animation: 'carousel-inverse',
              class: {
                indicator: 'data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]'
              }
            },
            {
              orientation: 'horizontal',
              animation: 'swing',
              class: {
                indicator: 'data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]'
              }
            },
            {
              orientation: 'vertical',
              animation: 'swing',
              class: {
                indicator: 'data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]'
              }
            },
            {
              orientation: 'horizontal',
              animation: 'elastic',
              class: {
                indicator: 'data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]'
              }
            },
            {
              orientation: 'vertical',
              animation: 'elastic',
              class: {
                indicator: 'data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]'
              }
            }
          ],
          defaultVariants: {
            animation: 'carousel',
            color: 'primary',
            size: 'md'
          }
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
