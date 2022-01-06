import Mock from 'mockjs'
import '@/mock/extend'

const projectArr = Mock.mock({
  'list|6': [
    {
      logo: '@LOGO',
      desc: '@SAYING'
    }
  ]
}).list

Mock.mock(/\/localMock\/project/, 'get', () => {
  return projectArr
})
