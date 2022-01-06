import {generateUUID} from '@/utils/util'

// 一个规格项的数据模板
const specsItemDataTemplate = {title:'', is_main_spec:false, items: []}

/**
 * 生成一个新的规格值对象
 * @param {object}} parentSpec 
 */
export function createNewSpecValueObj(parentSpec){
  let newValue = {}
  newValue.specId = parentSpec.id; // 绑定父规格的id
  newValue.id = 'childSpec'+ (new Date().getTime())
  newValue.title = '';
  return newValue;
}

/**
 * 生成一个新的规格对象
 * @param {object}} parentSpec 
 */
export function createNewSpecObj(){
  let newSpecsItemData = JSON.parse(JSON.stringify(specsItemDataTemplate))
  newSpecsItemData.id = generateUUID()
  newSpecsItemData.items.push(createNewSpecValueObj(newSpecsItemData))
  return newSpecsItemData;
}