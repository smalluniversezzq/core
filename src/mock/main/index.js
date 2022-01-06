import Mock from 'mockjs'
Mock.mock(`/localmock/admin/main/menu`, 'get', () => {
  let result = { code: 200, msg: '返回菜单' }
  result.data = {}
  result.data.menus = [
    {
      "id": 1,
      "title": "主页",
      "icon": "iconhome",
      "subs": [
        {
          "id": 1,
          "title": "控制台",
          "router": "workplace"
        },
        {
          "id": 2,
          "title": "统计",
          "router": "analysis"
        },
      ],
    },
    {
      "id": 2,
      "title": "用户",
      "icon": "iconyonghu",
      "subs": [
        {
          "id": 1,
          "title": "列表",
          "url": "https://native.youquanyun.com/uqWeb/js/md5.js",
          "router": "queryTable"
        },
      ],
    },
    {
      "id": 3,
      "title": "表单",
      "icon": "iconbianji",
      "subs": [
        {
          "id": 5,
          "title": "基础表单",
          "router": "basicFrom"
        },
        {
          "id": 6,
          "title": "步骤表单",
          "router": "stepFrom"
        },
        {
          "id": 7,
          "title": "高级表单",
          "router": "advanceFrom"
        }
      ]
    },
    {
      "id": 4,
      "title": "文章",
      "icon": "iconwenzhang",
      "subs": [
        {
          "id": 1,
          "title": "文章编辑",
          "router": "article",
          "meta": {
            "cache": false
          }
        },
        {
          "id": 2,
          "title": "文章列表",
          "router": "articleList"
        },
        {
          "id": 3,
          "title": "文章列表2",
          "router": "articleList2"
        },
        {
          "id": 4,
          "title": "文章列表3",
          "router": "articleList3"
        },
        {
          "id": 5,
          "title": "文章列表4",
          "router": "articleList4"
        }
      ]
    },
    {
      "id": 5,
      "title": "demo",
      "icon": "iconbi",
      "subs": [
        {
          "id": 1,
          "title": "表格",
          "router": "demoTable",
        }
      ]
    },
    {
      "id": 6,
      "title": "组件",
      "icon": "iconzujian",
      "subs": [
        {
          "id": 1,
          "title": "按钮",
          "router": "demoButton",
        },
        {
          "title": "图标",
          "router": "demoIcon",
        },
        { "title": "级联选择", "router": "demoCascader", },
        {
          "id": 1,
          "title": "输入框",
          "subs": [
            {
              "id": 1,
              "title": "多行输入框",
              "router": "inputDemo",
            },
            {
              "id": 2,
              "title": "3级演示",
              "router": "queryTable",
            },
          ]
        },
        {
          "id": 2,
          "title": "单选框",
          "subs": [
            {
              "id": 1,
              "title": "单选框",
              "router": "radioDemo",
            },
            {
              "id": 2,
              "title": "3级演示",
              "router": "basicFrom",
            },
          ]
        },
        {
          "id": 3,
          "title": "时间选择器",
          "router": "timePickerDemo",
        },
        {
          "id": 4,
          "title": "卡片",
          "router": "demoCard",
        },
        {
          "id": 5,
          "title": "统计数值",
          "subs": [
            {
              "id": 1,
              "title": "普通统计",
              "router": "demoStatistic",
            },
            {
              "id": 2,
              "title": "倒计时",
              "router": "demoStatisticCountdown",
            },
          ]
        },
        {
          "id": 6,
          "title": "标签页",
          "router": "demoTabs",
        },
        {
          "id": 7,
          "title": "树形控件",
          "router": "demoTree",
        },
        {
          "id": 8,
          "title": "树选择",
          "router": "demoTreeSelect",
        },
        {
          "id": 9,
          "title": "多规格",
          "router": "demoMultiSpecs",
        },
        {
          "id": 10,
          "title": "表格",
          "subs": [
            {
              "id": 1,
              "title": "表格合并",
              "router": "demoTableGridMerge",
            },
          ]
        },
      ]
    }
  ]
  return result
})
