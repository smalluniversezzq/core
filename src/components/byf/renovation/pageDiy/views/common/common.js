/**
 * 后端传来的控件的type 和 控件名的映射表
 */
export let widgetNameMap = {
  box: 'DiyBox',
  color_picker: 'DiyColorPicker',
  radio: 'DiyRadio',
  radio_group: 'DiyRadioGroup',
  radio_tabs: 'DiyRadioTabs',
  sortable: 'DiySortable',
  text_input: 'DiyInput',
  number_input: 'DiyNumInput',
  slider: 'DiySlider',
  icon_selector: 'DiyIconSelector',
  link_selector: 'DiyLinkSelector',
  img_link_selector: 'DiyImgLinkSelector',
  img_selector: 'DiyImgSelector',
  multiple_selector: 'DiyMultipleSelector',
  rich_text: 'DiyRichText',
  magic_cube: 'DiyMagicCube',
  goods_selector: 'DiyGoodsSelector',
  classify_selector: 'DiyClassifySelector',
}

/**
     * 拿到正确的控件名
     * @param [object] data 控件的数据
     */
export let getComponentName = (data) => {
  let name = ''
  if(data.info) {
    name = widgetNameMap[data.info.type]
  } else {
    name = 'DiyBox'
  }
  return name
}