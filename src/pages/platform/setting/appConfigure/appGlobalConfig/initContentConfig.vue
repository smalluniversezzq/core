<!-- app全局配置 -->
<template>
  <a-card title="默认展示" >
    <a-spin  tip="Loading..." :spinning="spinning">
      <a-form-model
        ref="form"
        class="form"
        :model="formData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item class="form-item" label="APP引导页" prop="guide_page" :help="help.guide_page">
          <div style="display:flex; margin-bottom: 5px">
            <byf-upload-multiple @change="changeGuidePage" :multiple="true" :maximum="3" :imgsList="formData.guide_page"></byf-upload-multiple>
          </div>
        </a-form-model-item>
        <a-form-model-item class="form-item mt" label="用户头像" prop="user_pic" :help="help.avatar">
          <a-row  class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              选择头像:
            </a-col>
            <a-col span="20">
              <a-row class="good-seat-wrap">
                <a-col :span="21">
                  <a-row>
                    <a-radio-group v-model="formData.avatar.status" @change="onChangeStyle(formData.avatar.status,'avatar')" >
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="1" > 样式一
                          <div :class="formData.avatar.status==1?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.avatar[1]" />
                          </div>  
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="2"> 样式二
                          <div :class="formData.avatar.status==2?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.avatar[2]" />
                          </div> 
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="3"> 样式三 
                          <div :class="formData.avatar.status==3?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.avatar[3]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item " :span="6" >
                        <div class="ml mr">
                          <byf-upload-btn 
                            class="byf-upload-btn" 
                            :color="formData.avatar.status==0?'primary':'default'"  
                            @change="changeOfOpenImgAll" 
                            :info="'avatar'"
                            :imgsList="[defaultPic.avatar[0]]"
                          >
                          </byf-upload-btn>
                        </div>
                        <a-radio class="radio ml-sm" :disabled="!defaultPic.avatar[0]" value="0"> 自定义样式
                        </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item class="form-item mt" label="商品占位图" prop="goods_station_map">
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              选择图片:
            </a-col>
            <a-col span="20">
              <a-row class="good-seat-wrap">
                <a-col :span="21">
                  <a-row>
                    <a-radio-group v-model="formData.goods_station_map.status" @change="onChangeStyle(formData.goods_station_map.status,'goods_station_map')" >
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="1"> 样式一
                          <div :class="formData.goods_station_map.status==1?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img  :src="staticUrl+defaultPic.goods_station_map[1]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="2"> 样式二 
                          <div :class="formData.goods_station_map.status==2?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.goods_station_map[2]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="3"> 样式三 
                          <div :class="formData.goods_station_map.status==3?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.goods_station_map[3]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <byf-upload-btn 
                          class="byf-upload-btn" 
                          :color="formData.goods_station_map.status==0?'primary':'default'"  
                          @change="changeOfOpenImgAll" 
                          :info="'goods_station_map'"
                          :imgsList="[defaultPic.goods_station_map[0]]"
                        >
                        </byf-upload-btn>
                        <a-radio class="radio" :disabled="!defaultPic.goods_station_map[0]" value="0"> 自定义样式 </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-row>
                </a-col>
                <a-col :span="3" class='right-box'>
                  <help class="help" style="padding-left: 5px;">
                    <div style="width:250px">
                      <img style="width:100%" :src="ExamplesPic.goods_station_map" alt="">
                    </div>
                  </help>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="loading效果" prop="loading">
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              选择图片:
            </a-col>
            <a-col span="20">
              <a-row class="good-seat-wrap">
                <a-col :span="21">
                  <a-row>
                    <a-radio-group v-model="formData.loading.status" @change="onChangeStyle(formData.loading.status,'loading')" >
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="1"> 样式一 
                          <div :class="formData.loading.status==1?'pic-box-primary gif-box absolute-box':'pic-box-default gif-box absolute-box'">
                            <img  :src="staticUrl+defaultPic.loading[1]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="2"> 样式二 
                          <div :class="formData.loading.status==2?'pic-box-primary gif-box absolute-box':'pic-box-default gif-box absolute-box'">
                            <img :src="staticUrl+defaultPic.loading[2]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="3"> 样式三 
                        <div :class="formData.loading.status==3?'pic-box-primary gif-box absolute-box':'pic-box-default gif-box absolute-box'">
                          <img :src="staticUrl+defaultPic.loading[3]" />
                        </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <byf-upload-btn 
                          class="byf-upload-btn" 
                          :color="formData.loading.status==0?'primary':'default'"  
                          @change="changeOfOpenImgAll" 
                          :info="'loading'"
                          :format="['gif']"
                          :imgsList="[defaultPic.loading[0]]"
                        >
                        </byf-upload-btn>
                        <a-radio class="radio" :disabled="!defaultPic.loading[0]" value="0"> 自定义样式 </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-row>
                </a-col>
                <a-col :span="3" class='right-box'>
                  <help class="help" style="padding-left: 5px;">
                    <div style="width:250px">
                      <img style="width:100%" :src="ExamplesPic.loading" alt="">
                    </div>
                  </help>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row  class="bg pb" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              图片大小:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-button class="mr" :type="formData.loading.image_size==1?'primary':'default'" @click="handleLoadingSize(1)">小</a-button>
              <a-button class="mr" :type="formData.loading.image_size==2?'primary':'default'" @click="handleLoadingSize(2)">中</a-button>
              <a-button :type="formData.loading.image_size==3?'primary':'default'" @click="handleLoadingSize(3)">大</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="下拉刷新样式" prop="pull_refresh">
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              显示内容:
            </a-col>  
            <a-col span='20' class="h-auto ml">
              <a-checkbox-group v-model="formData.pull_refresh.show_content" :options="showPlainOptions" @change="onChangePullRefresh" />              
            </a-col>
          </a-row>
          <a-row v-show="pullRefreshShow('1')" class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              选择图片:
            </a-col>
            <a-col span="20">
              <a-row class="good-seat-wrap">
                <a-col :span="21">
                  <a-row>
                    <a-radio-group v-model="formData.pull_refresh.status" @change="onChangeStyle(formData.pull_refresh.status,'pull_refresh')" >
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="1"> 样式一
                          <div :class="formData.pull_refresh.status==1?'pic-box-primary gif-box absolute-box':'pic-box-default gif-box absolute-box'">
                            <img  :src="staticUrl+defaultPic.pull_refresh[1]" />
                          </div> </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="2"> 样式二 
                          <div :class="formData.pull_refresh.status==2?'pic-box-primary gif-box absolute-box':'pic-box-default gif-box absolute-box'">
                            <img :src="staticUrl+defaultPic.pull_refresh[2]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="3"> 样式三 
                          <div :class="formData.pull_refresh.status==3?'pic-box-primary gif-box absolute-box':'pic-box-default gif-box absolute-box'">
                            <img :src="staticUrl+defaultPic.pull_refresh[3]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <byf-upload-btn 
                          class="byf-upload-btn" 
                          :color="formData.pull_refresh.status==0?'primary':'default'"  
                          @change="changeOfOpenImgAll" 
                          :info="'pull_refresh'"
                          :format="['gif']"
                          :imgsList="[defaultPic.pull_refresh[0]]"
                        >
                        </byf-upload-btn>
                        <a-radio class="radio" :disabled="!defaultPic.pull_refresh[0]" value="0"> 自定义样式 </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-row>
                </a-col>
                <a-col span="3" class='right-box'>
                  <help class="help" style="padding-left: 5px;" >
                    <div style="width:250px">
                      <img style="width:100%" :src="ExamplesPic.pull_refresh" alt="">
                    </div>
                  </help>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row v-show="pullRefreshShow('1')" class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              图片大小:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-button class="mr" :type="formData.pull_refresh.image_size==1?'primary':'default'" @click="handlePullRefreshSize(1)">小</a-button>
              <a-button class="mr" :type="formData.pull_refresh.image_size==2?'primary':'default'" @click="handlePullRefreshSize(2)">中</a-button>
              <a-button :type="formData.pull_refresh.image_size==3?'primary':'default'" @click="handlePullRefreshSize(3)">大</a-button>
            </a-col>
          </a-row>
          <a-row v-show="this.formData.pull_refresh.show_content.length==2" class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              展示结构:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-button class="mr" :type="formData.pull_refresh.structure==1?'primary':'default'" @click="handlePullRefreshStructure(1)">上下</a-button>
              <a-button :type="formData.pull_refresh.structure==2?'primary':'default'" @click="handlePullRefreshStructure(2)">左右</a-button>
            </a-col>
          </a-row>
          <a-row v-show="pullRefreshShow('2')" class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              下拉文字:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-input style="width:250px"  placeholder="请输入下拉文字" :maxLength='15' :suffix="setSuffixFn(formData.pull_refresh.pull_text,15)" v-model="formData.pull_refresh.pull_text"></a-input>
            </a-col>
          </a-row>
          <a-row v-show="pullRefreshShow('2')" class="bg pt pb" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              刷新文字:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-input style="width:250px" placeholder="请输入刷新文字" :maxLength='15' :suffix="setSuffixFn(formData.pull_refresh.refresh_text,15)" v-model="formData.pull_refresh.refresh_text" ></a-input>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="上拉加载样式" prop="pull_up_loading">
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              上拉文字:
            </a-col>
            <a-col span="18" class="h-auto ml ">
              <a-input style="width:250px"  placeholder="请输入上拉文字" :maxLength='15' :suffix="setSuffixFn(formData.pull_up_loading.pull_up_text,15)" v-model="formData.pull_up_loading.pull_up_text"></a-input>
            </a-col>
            <a-col span="3" class='right-boxs'>
              <help class="help" style="padding-left: 5px;">
                <div style="width:250px">
                  <img style="width:100%" :src="ExamplesPic.pull_up_loading" alt="">
                </div>
              </help>
            </a-col>
          </a-row>
          <a-row class="bg pt pb" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              加载文字:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-input style="width:250px" placeholder="请输入加载文字" :maxLength='15' :suffix="setSuffixFn(formData.pull_up_loading.loading_text,15)" v-model="formData.pull_up_loading.loading_text" ></a-input>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="列表空数据" prop="empty_list">
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              选择图片:
            </a-col>
            <a-col span="20">
              <a-row class="good-seat-wrap">
                <a-col :span="21">
                  <a-row>
                    <a-radio-group v-model="formData.empty_list.status" @change="onChangeStyle(formData.empty_list.status,'empty_list')" >
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="1"> 样式一 
                          <div :class="formData.empty_list.status==1?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img  :src="staticUrl+defaultPic.empty_list[1]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="2"> 样式二 
                          <div :class="formData.empty_list.status==2?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.empty_list[2]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="3"> 样式三 
                          <div :class="formData.empty_list.status==3?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.empty_list[3]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <byf-upload-btn 
                          class="byf-upload-btn" 
                          :color="formData.empty_list.status==0?'primary':'default'"  
                          @change="changeOfOpenImgAll" 
                          :info="'empty_list'"
                          :imgsList="[defaultPic.empty_list[0]]"
                        >
                        </byf-upload-btn>
                        <a-radio class="radio" :disabled="!defaultPic.empty_list[0]" value="0"> 自定义样式 </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-row>
                </a-col>
                <a-col :span="3" class='right-box'>
                  <help class="help" style="padding-left: 5px;">
                    <div style="width:250px">
                      <img style="width:100%" :src="ExamplesPic.empty_list" alt="">
                    </div>
                  </help>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row class="bg pt pb" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              文字:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-input class='txt' v-model="formData.empty_list.text" :maxLength='15' :suffix="setSuffixFn(formData.empty_list.text,15)" placeholder="请输入列表空数据提示文字"></a-input>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="页面未找到" prop="page_not_found">
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              选择图片:
            </a-col>
            <a-col span="20">
              <a-row class="good-seat-wrap">
                <a-col :span="21">
                  <a-row>
                    <a-radio-group v-model="formData.page_not_found.status" @change="onChangeStyle(formData.page_not_found.status,'page_not_found')" >
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="1"> 样式一 
                          <div :class="formData.page_not_found.status==1?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img  :src="staticUrl+defaultPic.page_not_found[1]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="2"> 样式二 
                          <div :class="formData.page_not_found.status==2?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.page_not_found[2]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="3"> 样式三 
                          <div :class="formData.page_not_found.status==3?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.page_not_found[3]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <byf-upload-btn 
                          class="byf-upload-btn" 
                          :color="formData.page_not_found.status==0?'primary':'default'"  
                          @change="changeOfOpenImgAll" 
                          :info="'page_not_found'"
                          :imgsList="[defaultPic.page_not_found[0]]"
                        >
                        </byf-upload-btn>
                        <a-radio class="radio" :disabled="!defaultPic.page_not_found[0]" value="0"> 自定义样式 </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-row>
                </a-col>
                <a-col :span="3" class='right-box'>
                  <help class="help" style="padding-left: 5px;">
                    <div style="width:250px">
                      <img style="width:100%" :src="ExamplesPic.page_not_found" alt="">
                    </div>
                  </help>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row class="bg pt pb" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              文字:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-input class='txt' v-model="formData.page_not_found.text" :maxLength='15' :suffix="setSuffixFn(formData.page_not_found.text,15)" placeholder="请输入页面未找到提示文字"></a-input>
            </a-col>
          </a-row>
        </a-form-model-item>   
        <a-form-model-item class="form-item" label="网络请求失败" prop="network_failed">
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              选择图片:
            </a-col>
            <a-col span="20">
              <a-row class="good-seat-wrap">
                <a-col :span="21">
                  <a-row>
                    <a-radio-group v-model="formData.network_failed.status" @change="onChangeStyle(formData.network_failed.status,'network_failed')" >
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="1"> 样式一 
                          <div :class="formData.network_failed.status==1?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img  :src="staticUrl+defaultPic.network_failed[1]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="2"> 样式二 
                          <div :class="formData.network_failed.status==2?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.network_failed[2]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="3"> 样式三 
                          <div :class="formData.network_failed.status==3?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.network_failed[3]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <byf-upload-btn 
                          class="byf-upload-btn" 
                          :color="formData.network_failed.status==0?'primary':'default'"  
                          @change="changeOfOpenImgAll" 
                          :info="'network_failed'"
                          :imgsList="[defaultPic.network_failed[0]]"
                        >
                        </byf-upload-btn>
                        <a-radio class="radio" :disabled="!defaultPic.network_failed[0]" value="0"> 自定义样式 </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-row>
                </a-col>
                <a-col :span="3" class='right-box'>
                  <help class="help" style="padding-left: 5px;">
                    <div style="width:250px">
                      <img style="width:100%" :src="ExamplesPic.network_failed" alt="">
                    </div>
                  </help>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              文字:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-input class='txt' v-model="formData.network_failed.text" :maxLength='15' :suffix="setSuffixFn(formData.network_failed.text,15)"  placeholder="请输入网络请求失败提示文字"></a-input>
            </a-col>
          </a-row>
          <a-row class="bg pt pb" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              按钮:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-radio-group :options="networkFailedOptions" v-model="formData.network_failed.button.is_show" />
              <a-row type="flex" justify="start" align="middle">
                <a-col >
                  <span>颜色:</span>
                </a-col>
                <a-col class="ml">
                  <byf-color-btn 
                    :defaultValue="'FF0250'"
                    :widgetData = "widgetData.network_failed"
                    @change="changeColor" 
                    :info="'network_failed'" 
                  >
                  </byf-color-btn>
                </a-col>
              </a-row>
              <a-row>
                <a-col >
                  <span>文字:</span>
                  <a-input class="ml" style="width:250px" :maxLength='15' :suffix="setSuffixFn(formData.network_failed.button.text,15)"  v-model="formData.network_failed.button.text" placeholder="请输入提示文字"></a-input>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form-model-item>  
        <a-form-model-item class="form-item" label="服务器错误" prop="server_error">
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              选择图片:
            </a-col>
            <a-col span="20">
              <a-row class="good-seat-wrap">
                <a-col :span="21">
                  <a-row>
                    <a-radio-group v-model="formData.server_error.status" @change="onChangeStyle(formData.server_error.status,'server_error')" >
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="1"> 样式一 
                          <div :class="formData.server_error.status==1?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img  :src="staticUrl+defaultPic.server_error[1]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="2"> 样式二 
                          <div :class="formData.server_error.status==2?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.server_error[2]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="3"> 样式三 
                        <div :class="formData.server_error.status==3?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                          <img :src="staticUrl+defaultPic.server_error[3]" />
                        </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <byf-upload-btn 
                          class="byf-upload-btn" 
                          :color="formData.server_error.status==0?'primary':'default'"  
                          @change="changeOfOpenImgAll" 
                          :info="'server_error'"
                          :imgsList="[defaultPic.server_error[0]]"
                        >
                        </byf-upload-btn>
                        <a-radio class="radio" :disabled="!defaultPic.server_error[0]" value="0"> 自定义样式 </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-row>
                </a-col>
                <a-col :span="3" class='right-box'>
                  <help class="help" style="padding-left: 5px;">
                    <div style="width:250px">
                      <img style="width:100%" :src="ExamplesPic.server_error" alt="">
                    </div>
                  </help>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row class="bg pt pb" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              文字:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-input class='txt' v-model="formData.server_error.text" :maxLength='15' :suffix="setSuffixFn(formData.server_error.text,15)"  placeholder="请输入服务器错误提示文字"></a-input>
            </a-col>
          </a-row>
          <a-row class="bg pt pb" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              按钮:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-radio-group :options="networkFailedOptions" v-model="formData.server_error.button.is_show" />
              <a-row type="flex" justify="start" align="middle">
                <a-col>
                  <span>颜色:</span>
                </a-col>
                <a-col class="ml">
                  <byf-color-btn 
                    :defaultValue="'FF0250'"
                    :widgetData="widgetData.server_error"
                    @change="changeColor" 
                    :info="'server_error'" 
                  >
                  </byf-color-btn>
                </a-col>
              </a-row>
              <a-row>
                <a-col >
                  <span>文字:</span>
                  <a-input class="ml" style="width:250px" :maxLength='15' :suffix="setSuffixFn(formData.server_error.button.text,15)"  v-model="formData.server_error.button.text" placeholder="请输入提示文字"></a-input>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form-model-item>   
        <a-form-model-item class="form-item" label="无权限访问" prop="forbidden">
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              选择图片:
            </a-col>
            <a-col span="20">
              <a-row class="good-seat-wrap">
                <a-col :span="21">
                  <a-row>
                    <a-radio-group v-model="formData.forbidden.status" @change="onChangeStyle(formData.forbidden.status,'forbidden')" >
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="1"> 样式一 
                          <div :class="formData.forbidden.status==1?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img  :src="staticUrl+defaultPic.forbidden[1]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="2"> 样式二 
                          <div :class="formData.forbidden.status==2?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.forbidden[2]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="3"> 样式三 
                          <div :class="formData.forbidden.status==3?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.forbidden[3]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <byf-upload-btn 
                          class="byf-upload-btn" 
                          :color="formData.forbidden.status==0?'primary':'default'"  
                          @change="changeOfOpenImgAll" 
                          :info="'forbidden'"
                          :imgsList="[defaultPic.forbidden[0]]"
                        >
                        </byf-upload-btn>
                        <a-radio class="radio" :disabled="!defaultPic.forbidden[0]" value="0"> 自定义样式 </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-row>
                </a-col>
                <a-col :span="3" class='right-box'>
                  <help class="help" style="padding-left: 5px;">
                    <div style="width:250px">
                      <img style="width:100%" :src="ExamplesPic.forbidden" alt="">
                    </div>
                  </help>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row class="bg pt pb" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              文字:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-input class='txt' v-model="formData.forbidden.text" :maxLength='15' :suffix="setSuffixFn(formData.forbidden.text,15)"  placeholder="请输入无权限访问提示文字"></a-input>
            </a-col>
          </a-row>
        </a-form-model-item>   
        <a-form-model-item class="form-item" label="未登录提醒页" prop="no_login_prompt">
          <a-row class="bg pt" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              选择图片:
            </a-col>
            <a-col span="20">
              <a-row class="good-seat-wrap">
                <a-col :span="21">
                  <a-row>
                    <a-radio-group v-model="formData.no_login_prompt.status" @change="onChangeStyle(formData.no_login_prompt.status,'no_login_prompt')" >
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="1"> 样式一 
                          <div :class="formData.no_login_prompt.status==1?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img  :src="staticUrl+defaultPic.no_login_prompt[1]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="2"> 样式二 
                          <div :class="formData.no_login_prompt.status==2?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                            <img :src="staticUrl+defaultPic.no_login_prompt[2]" />
                          </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <a-radio class="radio relative-box" value="3"> 样式三 
                        <div :class="formData.no_login_prompt.status==3?'pic-box-primary png-box absolute-box':'pic-box-default png-box absolute-box'">
                          <img :src="staticUrl+defaultPic.no_login_prompt[3]" />
                        </div>
                        </a-radio>
                      </a-col>
                      <a-col class="good-seat-item" :span="6">
                        <byf-upload-btn 
                          class="byf-upload-btn" 
                          :color="formData.no_login_prompt.status==0?'primary':'default'"  
                          @change="changeOfOpenImgAll" 
                          :info="'no_login_prompt'"
                          :imgsList="[defaultPic.no_login_prompt[0]]"
                        >
                        </byf-upload-btn>
                        <a-radio class="radio" :disabled="!defaultPic.no_login_prompt[0]" value="0"> 自定义样式 </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-row>
                </a-col>
                <a-col :span="3" class='right-box'>
                  <help class="help" style="padding-left: 5px;">
                    <div style="width:250px">
                      <img style="width:100%" :src="ExamplesPic.no_login_prompt" alt="">
                    </div>
                  </help>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row class="bg pt " :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              文字:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-input class='txt' v-model="formData.no_login_prompt.text" :maxLength='15' :suffix="setSuffixFn(formData.no_login_prompt.text,15)" placeholder="请输入未登录提醒页提示文字"></a-input>
            </a-col>
          </a-row>
          <a-row class="bg pt pb" :style="{ width: 'calc(80% )'}">
            <a-col span="3" class="tac h-auto">
              按钮:
            </a-col>
            <a-col span="20" class="h-auto ml ">
              <a-radio-group :options="noLoginPromptOptions" v-model="formData.no_login_prompt.button.go_login" />
              <a-row type="flex" justify="start" align="middle">
                <a-col>
                  <span>颜色:</span>
                  </a-col>
                  <a-col class="ml">
                    <byf-color-btn 
                      :defaultValue="'FF0250'"
                      :widgetData = "widgetData.no_login_prompt"
                      @change="changeColor" 
                      :info="'no_login_prompt'" 
                    >
                    </byf-color-btn>
                  </a-col>
              </a-row>
              <a-row>
                <a-col >
                  <span>文字:</span>
                  <a-input class="ml" style="width:250px" :maxLength='15' :suffix="setSuffixFn(formData.no_login_prompt.button.text,15)"  v-model="formData.no_login_prompt.button.text" placeholder="请输入提示文字"></a-input>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form-model-item>   

        <a-form-model-item :wrapper-col="{ span: 14, offset: labelCol.span }">
          <a-space>
            <a-button type="primary" @click="submit()" :loading="submitLoading">提交</a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-card>
</template>

<script>
import { configGetplatformDefault , configSetplatformDefault } from '@/services/platformSetting'
import help from '@/pages/platform/common/help'
import ByfColorBtn from '@/components/byf/button/ByfColorBtn.vue'
export default {
  components: {
     help,
     ByfColorBtn
  },
  data(){
    return {
      staticUrl:"",
      spinning:false,
      widgetData:{
        no_login_prompt:{
          value:"rgba(255,2,80,1)",
          hexValue:""
        },
        network_failed:{
          value:"rgba(255,2,80,1)",
          hexValue:""
        },
        server_error:{
          value:"rgba(255,2,80,1)",
          hexValue:""
        },                
      },
      defaultPic:{
        avatar:[
          "",
          "/static/img/default/avatar1.png",
          "/static/img/default/avatar2.png",
          "/static/img/default/avatar3.png",
        ],
        goods_station_map:[
          "",
          "/static/img/default/goods_station_map1.png",
          "/static/img/default/goods_station_map2.png",
          "/static/img/default/goods_station_map3.png",
        ],
        loading:[
          "",
          "/static/img/default/loading1.gif",
          "/static/img/default/loading2.gif",
          "/static/img/default/loading3.gif",
        ],
        pull_refresh:[
          "",
          "/static/img/default/pull_refresh1.gif",
          "/static/img/default/pull_refresh2.gif",
          "/static/img/default/pull_refresh3.gif",
        ],
        empty_list:[
          "",
          "/static/img/default/empty_list1.png",
          "/static/img/default/empty_list2.png",
          "/static/img/default/empty_list3.png",
        ],
        page_not_found:[
          "",
          "/static/img/default/page_not_found1.png",
          "/static/img/default/page_not_found2.png",
          "/static/img/default/page_not_found3.png",
        ],
        network_failed:[
          "",
          "/static/img/default/network_failed1.png",
          "/static/img/default/network_failed2.png",
          "/static/img/default/network_failed3.png",
        ],
        server_error:[
          "",
          "/static/img/default/server_error1.png",
          "/static/img/default/server_error2.png",
          "/static/img/default/server_error3.png",
        ],
        forbidden:[
          "",
          "/static/img/default/forbidden1.png",
          "/static/img/default/forbidden2.png",
          "/static/img/default/forbidden3.png",
        ],
        no_login_prompt:[
            "",
          "/static/img/default/no_login_prompt1.png",
          "/static/img/default/no_login_prompt2.png",
          "/static/img/default/no_login_prompt3.png",
        ]
      },
      ExamplesPic:{
        goods_station_map:require("@/assets/img/initContentConfig/goods_station_map.png"),
        loading:require("@/assets/img/initContentConfig/loading.png"),
        pull_refresh:require("@/assets/img/initContentConfig/pull_refresh.png"),
        pull_up_loading:require("@/assets/img/initContentConfig/pull_up_loading.png"),
        empty_list:require("@/assets/img/initContentConfig/empty_list.png"),
        page_not_found:require("@/assets/img/initContentConfig/page_not_found.png"),
        network_failed:require("@/assets/img/initContentConfig/network_failed.png"),
        server_error:require("@/assets/img/initContentConfig/server_error.png"),
        forbidden:require("@/assets/img/initContentConfig/forbidden.png"),
        no_login_prompt:require("@/assets/img/initContentConfig/no_login_prompt.png"),
      },
      help:{
        guide_page:"说明：用于APP端下载后首次打开时展示，建议上传三张尺寸为1080*1920像素的PNG格式图片，其他尺寸会变形",
        avatar:"说明：用于移动端会员未上传头像时展示"

      },
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
      formData: {
        guide_page:[],
        avatar:{
          image:"",
          status:1,
        },
        goods_station_map:{
          image:"",
          status:1,
        },
        loading:{
          image:"",
          status:1,
          image_size:2
        },
        pull_refresh:{
          show_content:[1,2],
          image:"",
          status:1,
          image_size:2,
          structure:1,
          pull_text:"",
          refresh_text:""
        },
        pull_up_loading:{
          pull_up_text:"",
          loading_text:""
        },
        empty_list:{
          status:1,
          image:"",
          text:"暂无数据"
        },
        page_not_found:{
          status:"",
          image:"",
          text:"找不到页面了"
        },
        network_failed:{
          status:1,
          image:"",
          text:"网络出问题了",
          button:{
            is_show:0,
            color:"rgba(255,2,80,1)",
            text:""
          }
        },
        server_error:{
          status:1,
          image:"",
          text:"服务器崩溃了~",
          button:{
            is_show:1,
            color:"rgba(255,2,80,1)",
            text:""
          }
        },
        forbidden:{
          status:1,
          image:"",
          text:"您暂无权限访问~"
        },
        no_login_prompt:{
          status:1,
          image:"",
          text:"您还未登录，登录后可查看",
          button:{
            go_login:1,
            color:"rgba(255,2,80,1)",
            text:""
          }
        }
      },
      bgColorList: [
        {id: 0, color: '#FFFFFF'},
        {id: 1, color: '#f0f2f5'}
      ],
      showPlainOptions:[
        {label: '图片', value: "1" , disabled:false},
        {label: '文字', value: "2" , disabled:false} 
      ],
      networkFailedOptions:[
        {label: '刷新显示', value: "1"},
        {label: '不刷新显示', value: "0"},
      ],
      noLoginPromptOptions:[
        {label: '显示去登录', value: "1"},
        {label: '不显示去登录', value: "0"},
      ],
      logoImgList: [],
      openImg169List: [],
   
      openAdvertisementList: [
        {
          toAdvertisingAlliance: false,
          logo169List: [],
          tip169: '建议尺寸1920*1080，jpg、png格式',
          logoAllList: [],
          tipAll: '建议尺寸2436*1125，jpg、png格式',
          link: '',
        }
      ],
      submitLoading:false,
    }
  },
  methods: {
    uploadImage(){
      console.log("uploadImage")
      this.$byfUpload({multiple: true, maximum:4}).then(res=>{
        console.log(res,"res")
        // if (res.action == 'confirm') {
        //   this.$emit('chooseImg', res.selectedImgs[0].url)
        // }
      }) 
    },
    addAdvertisementItem(){
      let newItem = {
        toAdvertisingAlliance: false,
          logo169List: [],
          tip169: '建议尺寸1920*1080，jpg、png格式',
          logoAllList: [],
          tipAll: '建议尺寸2436*1125，jpg、png格式',
          link: '',
      }
      this.openAdvertisementList.push(newItem)
    },
    changeOfLogo(val){
      console.log(this.NoToChinese(1))
      console.log(val)
      this.logoImgList = val;
    },
    changeOfOpenImg169(val){
      this.openImg169List = val;
    },
    changeOfOpenImgAll(e,arrObj,info){
      console.log(e,e.length,info,"changeOfOpenImgAll")
      // 图库回调 有值 添加到 defaultPic  删除无值  defaultPic 改为"" 并判断样式是否为 0?1:"" 必须用 $set方法否则数据不更新
      if(e.length){
        this.$set(this.defaultPic[info],0,e[0])
      }else{
        this.$set(this.defaultPic[info],0,"")
        if(this.formData[info].status==0){
          this.formData[info].status = "1"
        }
      }
    },
    // 样式
    onChangeStyle(e,info){
      console.log('radio checked', e,info);
      this.formData[info].image = this.defaultPic[info][e];
    },

    changeGuidePage(value){
      console.log(value)
      this.formData.guide_page = value
    },
    //loading 图片大小
    handleLoadingSize(type){
      console.log(type,"type")
      this.formData.loading.image_size = type
    },
    // 下拉刷新样式 显示内容
    onChangePullRefresh(checkedValues){
      console.log('checked = ', checkedValues);
      if(checkedValues.length===1){
        checkedValues[0]=="1"?this.showPlainOptions[0].disabled = true:this.showPlainOptions[1].disabled = true
      }else{
        this.showPlainOptions[0].disabled = false
        this.showPlainOptions[1].disabled = false
      }
      this.formData.pull_refresh.show_content = checkedValues

    },
    // 下拉刷新样式  图片大小
    handlePullRefreshSize(type){
      console.log(type,"type")
      this.formData.pull_refresh.image_size = type
    },
    // 下拉刷新样式 展示结构
    handlePullRefreshStructure(type){
      console.log(type,"type")
      this.formData.pull_refresh.structure = type
    },
    pullRefreshShow(type){
      return this.formData.pull_refresh.show_content.includes(type)
    },
    // 拾色器返回值
    changeColor(value,info){
      console.log(value,info)
      this.formData[info].button.color = value
      console.log(this.formData[info],"changeColor")
    },
    // 接口请求完毕 返回数据添加到 widgetData
    towidgetData(){
      const widgetDataArr = ["no_login_prompt","network_failed","server_error"]
      widgetDataArr.forEach(item=>{
        this.widgetData[item].value = this.formData[item].button.color
        this.widgetData[item].hexValue = this.setParseToHex(this.formData[item].button.color,)
      })
      console.log(this.widgetData,"widgetData")
    },
    setSuffixFn(value,num){
      // console.log(value)
      if(value){
        return `${value.length}/${num}`
      }else{
        return `0/15`
      } 
    },
    // 提交
    submit(){
      this.submitLoading = true
      console.log(this.formData,"formData")
      configSetplatformDefault(this.formData).then(res =>{
        if(res.code === 200){
          console.log(res,"submit")  
          this.submitLoading = false
          this.$message.success(res.msg)
        }else{
          this.submitLoading = false
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.submitLoading = false
      })
    },
    configGetplatformDefaultFn(){
      console.log("configGetplatformDefaultFn1")
      configGetplatformDefault().then(res => {
        if(res.code == 200){
          if(res.data){
            console.log(res,"configGetplatformDefaultFn")  
            this.formData = res.data 
            // 请求的图片放到 默认图中 
            this.toDefaultImg()
            // 请求的颜色放到 默认颜色 
            this.towidgetData()
            // 获取
          }
          this.spinning = false
        }else{
          this.spinning = false
        }
      })
    },
    toDefaultImg(){
      let defaultImg = ["avatar","goods_station_map","loading","pull_refresh","empty_list","page_not_found","network_failed","server_error","forbidden","no_login_prompt"]
      defaultImg.forEach(item=>{
        if(this.formData[item].status == "0"){
          this.defaultPic[item][0] = this.formData[item].image
        }
      })

    },
    setParseToHex(value){
      let rgba = this.parseToHexs(value)
      console.log(rgba,"setParseToHex")
      return rgba
    },
    /**
   * rgba 转成 8位16进制色值
   * @param {string} color rgba格式的字符串
   * @param {int} bit 8：8位16进制；6:6位16进制。
   */
    parseToHexs(color, bit = 6){
      var values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',');
      var a = parseFloat(values[3] || 1),
          r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
          g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
          b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
      let hex = ("0" + r.toString(16)).slice(-2).toUpperCase() +
        ("0" + g.toString(16)).slice(-2).toUpperCase() +
        ("0" + b.toString(16)).slice(-2).toUpperCase();
      // 如果要转成8位hex，需要加上透明度
      if (bit == 8) { hex += ("0" + Math.floor(a*255).toString(16)).slice(-2).toUpperCase() }

      return hex
    },
    NoToChinese(num) {
      if (!/^\d*(\.\d*)?$/.test(num)) {
          alert("Number is wrong!");
          return "Number is wrong!";
      }
      let AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
      let BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
      let a = ("" + num).replace(/(^0*)/g, "").split("."),
          k = 0,
          re = "";
      for (let i = a[0].length - 1; i >= 0; i--) {
          switch (k) {
              case 0:
                  re = BB[7] + re;
                  break;
              case 4:
                  if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                      re = BB[4] + re;
                  break;
              case 8:
                  re = BB[5] + re;
                  BB[7] = BB[5];
                  k = 0;
                  break;
          }
          if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
          if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
          k++;
      }
      if (a.length > 1) //加上小数部分(如果有小数部分) 
      {
          re += BB[6];
          for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
      }
      return re;
    },
  },
  created(){
    this.staticUrl = localStorage.getItem("driveHost")
  },
  mounted(){
    this.spinning = true
    this.configGetplatformDefaultFn()
    // formData添加 默认图片
    let defaultImg = ["avatar","goods_station_map","loading","pull_refresh","empty_list","page_not_found","network_failed","server_error","forbidden","no_login_prompt"]
    defaultImg.forEach((item)=>{
      this.formData[item].image = this.defaultPic[item][1]
    })
  }
}
</script>

<style scoped lang="less">
.tac{text-align: center;}
.relative-box{
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-top: 100px;
  margin-left: 20px;
  margin-right: 20px;
}
.absolute-box{
  position: absolute;
  top: -100px;
  left: 0px;
}
.no-stop{
  width: 100px;
  height: 60px;
  background: red;
  position: absolute;
  top:-80px;
  left: 10px;
  z-index: 1000;
}
.hover{
  cursor: pointer;
}
.txt{
  width:250px;
}
.bg{background: @background-color-light;}
.right-box{
  position: absolute;
  right: -20%;
}
.right-boxs{
  position: absolute;
  right: -15%;
}
.form{
  .tip{
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
  .help-pic-box{
    width: 100px;
    img{
      width:100%;
    }
  }
  .colorListItem{
    position: relative;
    width: 50px;
    height: 50px;
    border: 1px solid @border-color-base;
    border-radius: @border-radius-base;
    overflow: hidden;
    .statusMarker {
      width: 50px;
      height: 50px;
      // padding-top: 30px;
      text-align: center;
      transform: skew(-0deg, -0deg) rotate(-45deg);
      position: absolute;
      top: -32px;
      right: -32px;
      background: rgba(229, 53, 53, 1);
      color: #fff;
    }
  }
  .form-item{
    input{
      width: 80%;  
    }
    .h-auto{
      line-height: 45px;
    }

    .open-img{
      display: flex;
      > div{
        display: flex;
        justify-content: space-between;
        width: 80%;
        padding-right: 50px;
      }
    }
    .advertisement-item{
      .open-img-wrap{
        display: flex;
      }
      .link-wrap{
        display: flex;
        >span{
          line-height: 30px;
          padding-right: 5px;
        }
        .link-input{
          width: 82%;
          .link-input-btn{
            cursor: pointer;
          }
        }
      }
    }
    .open-advertisement{
      // display: flex;
      overflow: hidden;
      >div, .help{
        float: left;
      }
      .open-img-wrap{
        display: flex;
        padding-left: 56px;
      }
      .link-wrap{
        padding-left: 56px;
        display: flex;
        >span{
          line-height: 30px;
          padding-right: 5px;
        }
        .link-input{
          width: 82%;
          .link-input-btn{
            cursor: pointer;
          }
        }
      }
    }
    .good-seat-wrap{
      .good-seat-item{
        text-align: center;
        
        .radio{
          width: 100%;
          padding-top: 5px;
        }
        .byf-upload-btn{
          margin: 0;
          display: inline-block;
        }
        .pic-box-default{
          border: 1px solid #d9d9d9;
          border-radius: 5px;
          margin: 0 auto;
          width:100px;
          height:100px;
          overflow:hidden;
          img{
            width:100%;
          }
        }
        .pic-box-primary {
          border: 1px solid #1890ff;
          border-radius: 5px;
          margin: 0 auto;
          width:100px;
          height:100px;
          overflow:hidden;
          img{
            width:100%;
          }
        }
        .png-box{
          img{
            margin-top:15px;
            width: 70px;
          }
        }
        .gif-box{
          img{
            margin-top:25px;
            width: 50px;
          }
        }
      }
    }
  }
}
</style>