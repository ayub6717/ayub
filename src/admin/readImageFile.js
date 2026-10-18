const isHeic = file =>
  /^image\/hei[cf]$/i.test(file.type) || /\.hei[cf]$/i.test(file.name)

const toDataUrl = blob =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })

/**
 * Reads an image file as a data URL. HEIC/HEIF (iPhone photos) can't be decoded by
 * browsers or by the save-data middleware, so they are converted to JPEG first.
 */
export async function readImageFile(file) {
  if (isHeic(file)) {
    const { default: heic2any } = await import("heic2any")
    const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 })
    return toDataUrl(Array.isArray(converted) ? converted[0] : converted)
  }
  return toDataUrl(file)
}
