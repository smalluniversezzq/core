<template>
  <a-card :body-style="{padding: '24px 12px'}" :bordered="false">
    <a-form>
      <a-form-item
        label="用户头像"
        :labelCol="{span: labelSpan}"
        :wrapperCol="{span: wrapperSpan}"
      >
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item
        label="用户名"
        :labelCol="{span: labelSpan}"
        :wrapperCol="{span: wrapperSpan}"
      >
        <a-input placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item
        label="颜色"
        :labelCol="{span: labelSpan}"
        :wrapperCol="{span: wrapperSpan}"
      >
        <a-input type="color"/>
      </a-form-item>
      <a-form-item
        :label="$t('date')"
        :labelCol="{span: labelSpan}"
        :wrapperCol="{span: wrapperSpan}"
      >
        <a-range-picker style="width: 100%" />
      </a-form-item>
      <a-form-item
        label="用户描述"
        :labelCol="{span: labelSpan}"
        :wrapperCol="{span: wrapperSpan}"
      >
        <a-textarea rows="4" placeholder="请输入用户描述"/>
      </a-form-item>
      <a-form-item
        :label="$t('weight')"
        :labelCol="{span: labelSpan}"
        :wrapperCol="{span: wrapperSpan}"
        :required="false"
      >
        <a-input-number :min="0" :max="100"/>
      </a-form-item>
      <a-form-item
        :label="$t('disclosure')"
        :labelCol="{span: labelSpan}"
        :wrapperCol="{span: wrapperSpan}"
        :required="false"
        :help="$t('disclosureDesc')"
      >
        <a-radio-group v-model="value">
          <a-radio :value="1">{{$t('public')}}</a-radio>
          <a-radio :value="2">{{$t('partially')}}</a-radio>
          <a-radio :value="3">{{$t('private')}}</a-radio>
        </a-radio-group>
        <a-select mode="multiple" v-if="value === 2">
          <a-select-option value="4">{{$t('colleague1')}}</a-select-option>
          <a-select-option value="5">{{$t('colleague2')}}</a-select-option>
          <a-select-option value="6">{{$t('colleague3')}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="下拉选择" :labelCol="{span: labelSpan}" :wrapperCol="{span: wrapperSpan}">
        <a-select :default-value="provinceData[0]" style="width: 120px;margin-right: 20px;" @change="handleProvinceChange">
          <a-select-option v-for="province in provinceData" :key="province">
            {{ province }}
          </a-select-option>
        </a-select>
        <a-select v-model="secondCity" style="width: 120px">
          <a-select-option v-for="city in cities" :key="city">
            {{ city }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="数字滑块输入" :labelCol="{span: labelSpan}" :wrapperCol="{span: wrapperSpan}">
        <a-row>
          <a-col :span="12">
            <a-slider v-model="inputValue1" :min="1" :max="100" />
          </a-col>
          <a-col :span="4">
            <a-input-number v-model="inputValue1" :min="1" :max="100" style="marginLeft: 16px" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary">{{$t('submit')}}</a-button>
        <a-button style="margin-left: 8px">{{$t('save')}}</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: 'UserForm',
  i18n: require('./i18n'),
  data () {
    return {
      value: 1,
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      inputValue1: 0,
      labelSpan:5,
      wrapperSpan: 15,
      loading: false,
      imageUrl: '',
    }
  },
  computed: {
    desc() {
      return this.$t('pageDesc')
    }
  },
  methods: {
    handleProvinceChange(value) {
      this.cities = cityData[value];
      this.secondCity = cityData[value][0];
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        setTimeout(() => {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl;
            this.loading = false;
          });
        }, 2000);
        return;
      }
    },
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader {
  img { max-width: 100px;}
}
</style>
