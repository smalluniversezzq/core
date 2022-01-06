/**
 * 联动配置类 封装后端的联动配置
 */
export default class LinkageOption {
  constructor(data) {
    this.name = data.name;
    this.role = data.role;
    this.rule = data.rule;
    this.params = data.params;
  }

  /**
   * 联动 名称 全局唯一
   */
  name = ''

  /**
   * 联动角色
   */
  role = []

  /**
   * 联动规则
   */
  rule = ''

  /**
   * 额外数据
   */
  params = {}
}