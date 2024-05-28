export function getPublicIdFromUrl(url: string) {
  const parts = url.split('/')
  const filename = parts[parts.length - 1]
  const publicId = 'public/' + filename.split('.')[0]
  return publicId
}
