export function canvasPreview(src: string, crop: any, scale: number) {
  const image = document.createElement('img')
  image.src = src

  // creating the cropped image from the source image
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  )

  // 5) Move the crop origin to the canvas origin (0,0)
  // ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  // ctx.translate(centerX, centerY);
  // 2) Scale the image
  // ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  // ctx.translate(-centerX, -centerY);

  let img = canvas.toDataURL()

  function dataURItoBlob(dataURI: any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString
    if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1])
    else byteString = unescape(dataURI.split(',')[1])
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length)
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ia], { type: mimeString })
  }

  var myBlob = dataURItoBlob(img)
  const file = new File([myBlob], 'name.jpg')

  return file
}
