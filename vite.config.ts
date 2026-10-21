import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Middleware de administración local física exclusivo para `npm run dev`.
 * Permite escribir directamente en src/data/siteContent.json y src/data/catalog.json,
 * y subir/procesar imágenes a public/obras/*.webp.
 */
function localAdminCmsPlugin(): Plugin {
  return {
    name: 'vite-local-admin-cms-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/local-admin/')) {
          return next()
        }

        const sendJson = (status: number, data: unknown) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        }

        const readBody = (): Promise<any> => {
          return new Promise((resolve, reject) => {
            let body = ''
            req.on('data', chunk => {
              body += chunk
              if (body.length > 50 * 1024 * 1024) {
                reject(new Error('Archivo demasiado pesado (máximo 50MB)'))
              }
            })
            req.on('end', () => {
              try {
                resolve(body ? JSON.parse(body) : {})
              } catch (e) {
                reject(e)
              }
            })
            req.on('error', reject)
          })
        }

        try {
          // 1. Guardar textos en src/data/siteContent.json
          if (req.method === 'POST' && req.url === '/api/local-admin/save-content') {
            const body = await readBody()
            const content = body.content || body
            const targetPath = path.resolve(__dirname, 'src/data/siteContent.json')
            fs.writeFileSync(targetPath, JSON.stringify(content, null, 2), 'utf-8')
            return sendJson(200, {
              success: true,
              message: 'Textos de la web guardados físicamente en src/data/siteContent.json',
              timestamp: new Date().toISOString()
            })
          }

          // 2. Guardar catálogo en src/data/catalog.json
          if (req.method === 'POST' && req.url === '/api/local-admin/save-catalog') {
            const body = await readBody()
            const catalog = Array.isArray(body) ? body : (body.catalog || [])
            const targetPath = path.resolve(__dirname, 'src/data/catalog.json')
            fs.writeFileSync(targetPath, JSON.stringify(catalog, null, 2), 'utf-8')
            return sendJson(200, {
              success: true,
              message: `Catálogo de ${catalog.length} obras guardado físicamente en src/data/catalog.json`,
              count: catalog.length,
              timestamp: new Date().toISOString()
            })
          }

          // 3. Subir y procesar imagen a WebP en public/obras/
          if (req.method === 'POST' && req.url === '/api/local-admin/upload-image') {
            const body = await readBody()
            const { filename, base64 } = body
            if (!filename || !base64) {
              return sendJson(400, { success: false, error: 'Faltan parámetros filename o base64' })
            }

            const ext = path.extname(filename)
            const rawBase = path.basename(filename, ext)
            const normalized = rawBase
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9_-]+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '')

            const finalName = `${normalized}.webp`
            const publicObrasDir = path.resolve(__dirname, 'public/obras')
            if (!fs.existsSync(publicObrasDir)) {
              fs.mkdirSync(publicObrasDir, { recursive: true })
            }

            const targetFilePath = path.join(publicObrasDir, finalName)
            const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '')
            const imageBuffer = Buffer.from(cleanBase64, 'base64')

            await sharp(imageBuffer)
              .rotate()
              .resize({
                width: 1600,
                height: 1600,
                fit: 'inside',
                withoutEnlargement: true
              })
              .webp({ quality: 82, effort: 4 })
              .toFile(targetFilePath)

            return sendJson(200, {
              success: true,
              filename: finalName,
              path: `/obras/${finalName}`,
              message: `Imagen procesada a WebP y guardada en public/obras/${finalName}`
            })
          }

          // Estado del CMS local
          if (req.method === 'GET' && req.url === '/api/local-admin/status') {
            return sendJson(200, {
              isLocalDev: true,
              hasCatalog: fs.existsSync(path.resolve(__dirname, 'src/data/catalog.json')),
              hasSiteContent: fs.existsSync(path.resolve(__dirname, 'src/data/siteContent.json'))
            })
          }

          return sendJson(404, { error: 'Endpoint local-admin no encontrado' })
        } catch (error: any) {
          console.error('[local-admin-api] Error:', error)
          return sendJson(500, { success: false, error: error.message })
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localAdminCmsPlugin()],
  base: './',
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 5173,
    host: true,
  }
})
