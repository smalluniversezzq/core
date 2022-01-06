/**
 * 图片类。类名注意不要起关键字：比如Image
 */
export default class ImageData {
  /**
   * @param {object} imageData 图片数据。默认{}
   * @param {string} imageData.url 图片地址
   * @param {array} imageData.size 图片的宽高尺寸
   */
  constructor(imageData = {}){
    this.url = imageData.url || ''
    this.size = imageData.size || []
  }

  /**
   * 图片地址
   */
  url = ''

  /**
   * 图片的宽高尺寸。[宽度，高度]
   */
  size = []

} 