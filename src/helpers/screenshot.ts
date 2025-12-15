import HTML2Canvas from 'html2canvas-pro'

export const htmlToImageURL = async (
  htmlRef: HTMLDivElement | null,
  type?: 'png',
) => {
  if (!htmlRef) throw new Error('invalid element')
  const _type = type ? type : 'png'

  const dataCanvas = await HTML2Canvas(htmlRef, {
    backgroundColor: null,
    useCORS: true,
    allowTaint: true,
    scale: 2,
    logging: false,
    imageTimeout: 0,
  })

  const dataUrl = dataCanvas.toDataURL(`image/${_type}`, 0.95)
  return dataUrl
}
