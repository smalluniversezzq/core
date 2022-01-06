
import cloneDeep from 'lodash/cloneDeep'

export const IS_SHOW_VALUE = {
  SHOWING: 1, // 显示中
  HIDING: 0 // 隐藏中
}

// 分类模板
export let classifyTemplate = {
  id: '',
  title: '', 
  is_show: IS_SHOW_VALUE.SHOWING,   // 显示隐藏状态。
  alias: '',
  subs:[],
  showChildren: false,
  created_at: '1365615650',
  realIndex: undefined, // 数据的真实索引。因为vue的数据绑定和sortable.js结合，会导致dom节点的索引和数据中的索引有出入
}

/**
 * 生成一个新的分类
 */
export function getOneClassify(){
  let newClassify = cloneDeep(classifyTemplate)
  return newClassify
}