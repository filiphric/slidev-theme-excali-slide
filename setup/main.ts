import { defineAppSetup } from '@slidev/types'

const fontUrl = new URL('../public/fonts/vara/Virgil.json', import.meta.url).href

export default defineAppSetup(({ app }) => {
  app.directive('draw', {
    mounted(el, binding) {
      // Capture text before clearing
      const text = el.textContent?.trim() || ''
      if (!text) return

      el.innerHTML = ''

      if (!el.id) {
        el.id = `vara-${Math.random().toString(36).slice(2, 9)}`
      }

      const opts = binding.value || {}
      const fontSize = parseFloat(window.getComputedStyle(el).fontSize) || 24
      const strokeWidth = opts.strokeWidth ?? 2
      const color = opts.color ?? 'currentColor'
      const duration = opts.duration ?? 2000
      const delay = opts.delay ?? 0
      const textAlign = window.getComputedStyle(el).textAlign || 'center'

      const lines = text.split('\n').map((l: string) => l.trim()).filter(Boolean)
      if (!lines.length) return

      el.style.width = '100%'

      // Store text/config on element for re-init
      el._drawConfig = { lines, fontSize, strokeWidth, color, duration, delay, textAlign }

      function isVClickHidden(): boolean {
        let node: HTMLElement | null = el
        while (node) {
          if (node.classList.contains('slidev-vclick-hidden')) return true
          node = node.parentElement
        }
        return false
      }

      function initVara() {
        // Clean up previous instance
        el.innerHTML = ''
        el._varaInstance = null
        if (el._varaClickObserver) {
          el._varaClickObserver.disconnect()
          el._varaClickObserver = null
        }

        const cfg = el._drawConfig
        const hidden = isVClickHidden()

        import('vara').then((mod) => {
          const Vara = mod.default || mod
          const varaInstance = new Vara(
            `#${el.id}`,
            fontUrl,
            [
              {
                text: cfg.lines,
                fontSize: cfg.fontSize,
                strokeWidth: cfg.strokeWidth,
                color: cfg.color,
                duration: cfg.duration,
                delay: cfg.delay,
                autoAnimation: !hidden,
              },
            ],
            {
              textAlign: cfg.textAlign,
            }
          )

          el._varaInstance = varaInstance

          // Make SVG overflow visible
          const svg = el.querySelector('svg')
          if (svg) svg.style.overflow = 'visible'

          // If hidden by v-click, watch for reveal then play
          if (hidden) {
            const clickObserver = new MutationObserver(() => {
              if (!isVClickHidden()) {
                varaInstance.playAll()
                clickObserver.disconnect()
                el._varaClickObserver = null
              }
            })
            let node: HTMLElement | null = el
            while (node) {
              clickObserver.observe(node, { attributes: true, attributeFilter: ['class'] })
              node = node.parentElement
            }
            el._varaClickObserver = clickObserver
          }
        })
      }

      // Use IntersectionObserver to detect when the slide is actually visible.
      // Slidev preloads adjacent slides, so mounted fires before the slide is shown.
      // Re-init Vara each time the element enters the viewport.
      let wasVisible = false
      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !wasVisible) {
            wasVisible = true
            initVara()
          } else if (!entry.isIntersecting) {
            wasVisible = false
          }
        }
      }, { threshold: 0.1 })

      io.observe(el)
      el._drawIO = io
    },

    unmounted(el) {
      if (el._drawIO) {
        el._drawIO.disconnect()
        el._drawIO = null
      }
      if (el._varaClickObserver) {
        el._varaClickObserver.disconnect()
        el._varaClickObserver = null
      }
      el._varaInstance = null
      el._drawConfig = null
      el.innerHTML = ''
    },
  })
})
