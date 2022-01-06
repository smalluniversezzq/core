import ByfButton from '@/components/byf/button/ByfButton'
import ByfCascader from '@/components/byf/cascader/ByfCascader'
import ByfCheckbox from '@/components/byf/checkbox/ByfCheckbox'
import ByfForm from '@/components/byf/form/ByfForm'
import ByfFormItem from '@/components/byf/form/ByfFormItem'
import ByfIcon from '@/components/byf/icon/ByfIcon'
import ByfInput from '@/components/byf/input/ByfInput'
import ByfSelect from '@/components/byf/select/ByfSelect'
import ByfSelectOption from '@/components/byf/select/ByfSelectOption'
import ByfDatePicker from '@/components/byf/datePicker/ByfDatePicker'
import ByfRangePicker from '@/components/byf/datePicker/ByfRangePicker'
import ByfAvatar from "@/components/byf/avatar/ByfAvatar"
import ByfBadge from "@/components/byf/badge/ByfBadge"
import ByfDescriptions from "@/components/byf/descriptions/ByfDescriptions"
import ByfList from "@/components/byf/list/ByfList"
import ByfListItem from "@/components/byf/list/ByfListItem"
import ByfListItemMeta from "@/components/byf/list/ByfListItemMeta"
import ByfTextarea from '@/components/byf/input/ByfTextarea'
import ByfRadio from '@/components/byf/radio/ByfRadio'
import ByfRadioGroup from '@/components/byf/radio/ByfRadioGroup'
import ByfSwitch from '@/components/byf/switch/ByfSwitch'
import ByfTable from "@/components/byf/table/ByfTable.vue"
import ByfTimePicker from '@/components/byf/timePicker/ByfTimePicker'
import ByfCard from '@/components/byf/card/ByfCard'
import ByfStatistic from '@/components/byf/statistic/ByfStatistic'
import ByfStatisticCountdown from '@/components/byf/statistic/ByfStatisticCountdown'
import ByfTabs from '@/components/byf/tabs/ByfTabs'
import ByfTabPane from '@/components/byf/tabs/ByfTabPane'
import ByfTag from '@/components/byf/tag/ByfTag'
import ByfAlert from '@/components/byf/alert/ByfAlert'
import ByfModal from '@/components/byf/modal/ByfModal'
import ByfSpin from '@/components/byf/spin/ByfSpin'
import ByfTree from '@/components/byf/tree/ByfTree'
import ByfTreeSelect from '@/components/byf/treeSelect/ByfTreeSelect'
import ByfMultiSpecs from '@/components/byf/multiSpecs/ByfMultiSpecs'
import ByfMulSelect from '@/components/byf/select/ByfMulSelect'
import ByfUpload from '@/components/byf/upload/upload.js'
import ByfUploadBtn from '@/components/byf/upload/uploadBtn'
import ByfUploadMultiple from '@/components/byf/upload/uploadMultiple'
import ByfSpace from '@/components/byf/space/ByfSpace'
import ByfUploadVideo from '@/components/byf/uploadVideo/upload.js'
import ByfUploadVideoBtn from '@/components/byf/uploadVideo/uploadVideoBtn'
import ByfIconfontSelector from '@/components/byf/iconfontSelector/index.js'
import ByfIconfontSelectorBtn from '@/components/byf/iconfontSelector/iconfontSelectorBtn'
import ByfLinkSelectorBtn from '@/components/byf/linkSelector'

const byfComponents = {
  install: function (Vue) {
    Vue.component('ByfSpace', ByfSpace)
    Vue.component('ByfButton', ByfButton)
    Vue.component('ByfCascader', ByfCascader)
    Vue.component('ByfCheckbox', ByfCheckbox)
    Vue.component('byfFormModel', ByfForm)
    Vue.component('ByfFormItem', ByfFormItem)
    Vue.component('ByfIcon', ByfIcon)
    Vue.component('ByfInput', ByfInput)
    Vue.component('ByfSelect', ByfSelect)
    Vue.component('ByfSelectOption', ByfSelectOption)
    Vue.component('ByfDatePicker', ByfDatePicker)
    Vue.component('ByfRangePicker', ByfRangePicker)
    Vue.component('ByfAvatar', ByfAvatar)
    Vue.component('ByfBadge', ByfBadge)
    Vue.component('ByfDescriptions', ByfDescriptions)
    Vue.component('ByfList', ByfList)
    Vue.component('ByfListItem', ByfListItem)
    Vue.component('ByfListItemMeta', ByfListItemMeta)
    Vue.component('ByfTextarea', ByfTextarea)
    Vue.component('ByfRadio', ByfRadio)
    Vue.component('ByfRadioGroup', ByfRadioGroup)
    Vue.component('ByfSwitch', ByfSwitch)
    Vue.component('ByfTable', ByfTable)
    Vue.component('ByfTimePicker', ByfTimePicker)
    Vue.component('ByfCard', ByfCard)
    Vue.component('ByfStatistic', ByfStatistic)
    Vue.component('ByfStatisticCountdown', ByfStatisticCountdown)
    Vue.component('ByfTabs', ByfTabs)
    Vue.component('ByfTabPane', ByfTabPane)
    Vue.component('ByfTag', ByfTag)
    Vue.component('ByfAlert', ByfAlert)
    Vue.component('ByfModal', ByfModal)
    // 同时将confirm对象绑定到byfconfirm上
    Vue.prototype.$byfconfirm = Vue.prototype.$confirm
    Vue.component('ByfSpin', ByfSpin)
    Vue.component('ByfTree', ByfTree)
    Vue.component('ByfTreeSelect', ByfTreeSelect)
    Vue.component('ByfMultiSpecs', ByfMultiSpecs)
    Vue.component('ByfMulSelect', ByfMulSelect)
    // 全局挂载上传组件（图片上传，文件上传，视频上传）
    Vue.use(ByfUpload)
    Vue.use(ByfUploadVideo)
    
    Vue.component('ByfUploadBtn', ByfUploadBtn)
    Vue.component('ByfUploadMultiple', ByfUploadMultiple)
    Vue.component('ByfUploadVideoBtn', ByfUploadVideoBtn)
    
    // 图标选择器按钮
    Vue.use(ByfIconfontSelector)
    Vue.component('ByfIconfontSelectorBtn', ByfIconfontSelectorBtn)

    // 链接选择器
    Vue.use(ByfLinkSelectorBtn);
    
  }
}
export default byfComponents