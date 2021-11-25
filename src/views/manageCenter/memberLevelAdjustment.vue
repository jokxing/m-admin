<template>
    <div id="member_transfer_line">
        <van-nav-bar title="会员调级申请" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <van-row class="top">
                <van-col span="8">
                    <h5 v-if="q != ''">{{ q.MonthCount }}</h5>
                    <h5 v-else><van-loading color="#617DEF" /></h5>
                    <p>本月调级</p>
                </van-col>
                <van-col span="8" @click="$router.push('/memberLevelAdjustmentRecord')">
                    <h5 v-if="q != ''">{{ q.TotalCount }}</h5>
                    <h5 v-else><van-loading color="#617DEF" /></h5>
                    <p>调级记录<van-icon name="arrow" /></p>
                </van-col>
                <van-col span="8">
                    <h5 v-if="q != ''">{{ q.Rate }}</h5>
                    <h5 v-else><van-loading color="#617DEF" /></h5>
                    <p>调级率</p>
                </van-col>
            </van-row>

            <van-form ref="formData" @submit="submitForm">
                <van-row class="from">
                    <div class="member_manage">
                        <p v-if="ruleForm.member_name == ''">
                            <van-icon name="warning-o" />请从 <router-link to="/memberManage">会员管理</router-link> 输入会员账号
                        </p>
                        <van-field 
                            v-else
                            v-model="ruleForm.member_name"
                            label="会员账号" 
                            :rules="[{ trigger: 'onChange' }]"
                            readonly/>
                    </div>

                    <van-field 
                        v-model="ruleForm.plat_level"
                        label="其他平台等级" 
                        placeholder="请输入其他平台等级"
                        :rules="[{ required: true, message: '请输入其他平台等级'}]" />
                    <van-field 
                        v-model="ruleForm.plat_link"
                        label="其他平台链接" 
                        placeholder="请输入其他平台链接"
                        :rules="[{ required: true, message: '请输入其他平台链接'}]" />
                    <van-field 
                        v-model="ruleForm.plat_username"
                        label="其他平台帐号" 
                        placeholder="请输入其他平台帐号"
                        :rules="[{ required: true, message: '请输入其他平台帐号'}]" />
                    <van-field 
                        v-model="ruleForm.plat_password"
                        label="其他平台密码" 
                        placeholder="请输入其他平台密码"
                        :rules="[{ required: true, message: '请输入其他平台密码'}]" />
                </van-row>

                <van-row>
                    <van-field
                        v-model="message"
                        rows="4"
                        autosize
                        type="textarea"
                        maxlength="200"
                        placeholder="请填写备注说明"
                        show-word-limit
                    />
                </van-row>

                <van-row class="uploader">
                    <p>上传图片<span>{{ upImgNum }}/5</span></p>
                    <van-uploader 
                        v-model="fileList"
                        :after-read="afterRead" 
                        :max-count="5" 
                        :max-size="1500 * 1024" 
                        :before-read="beforeRead"
                        @oversize="onOversize"
                        @delete="onDelete" />
                    <h6>支持PNG/JPG格式，不超过15MB</h6>
                </van-row>

                <van-row class="inner">
                    <van-button type="primary" @click="send">提交申请</van-button>

                    <ul>
                        <li>
                            <span>1</span>
                            提供的图片帐号需要与平台一致。 
                        </li>
                        <li>
                            <span>2</span>
                            需要提交他在其他平台的帐号密码，以便官方确认。
                        </li>
                    </ul>
                </van-row>
            </van-form>
        </div>

        <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    import { MonthChangeLeveRecordApi, UpImgApi, ChangeLeveApi } from '../../http/api.js'
    export default {
        data() {
            return {
                message: "",
                q: "",
                showPicker: false,
                columns: [
                    {
                        text: '苹果',
                        value: '1'
                    },
                    {
                        text: '安卓',
                        value: '2'
                    },
                    {
                        text: 'PC电脑',
                        value: '3'
                    },
                    {
                        text: 'H5手机',
                        value: '4'
                    },
                ],
                // 上传
                fileList: [],
                upUrl: "",
                qn:{
                    token: ""
                },
                imgs: "",
                // 上传图片链接
                Images: "",
                // 上传图片张数
                upImgNum: 0,
                // 申请信息
                ruleForm: {
                    member_name: "",
                    plat_level: "",
                    plat_link: "",
                    plat_username: "",
                    plat_password: "",
                    remark: "",
                    Images: ""
                },
            }
        },
        methods: {
            changeData () {
                var _this = this;
                MonthChangeLeveRecordApi().then(res => {
                    _this.q = res.data.message
                }).catch(err => {
                })
            },
            // 上传初始化获取上传接口地址和token
            UpImgData () {
                var _this = this;
                this.$loading.show();
                UpImgApi().then(res => {
                    _this.$loading.hide();
                    _this.upUrl = res.data.message.upUrl;
                    _this.qn.token = res.data.message.Token
                }).catch(err => {
                    _this.$loading.hide();
                    if(err.message != '你的帐号登陆超时，请重新登陆。'){
                        _this.$toast({
                            message: '上传图片初始化失败',
                            position: 'bottom',
                        });
                    }
                })
            },
            // 选择终端类型
            onConfirm(value, index) {
                this.terminal_type_text = value.text;
                this.ruleForm.terminal_type = value.value;
                this.showPicker = false;
            },
            // 上传状态
            afterRead(file) {
                var _this = this;
                let data = new FormData()
                data.append('token', _this.qn.token)
                data.append('file', file.file)
                file.status = 'uploading';
                file.message = '上传中...';
                this.$http.post(_this.upUrl,data).then(res => {
                    file.status = '';
                    file.message = '';

                    _this.imgs += res.data.file_path + ","
                    var lastIndex = _this.imgs.lastIndexOf(',');
                    if (lastIndex > -1) {
                        _this.Images = _this.imgs.substring(0, lastIndex) + _this.imgs.substring(lastIndex + 1, _this.imgs.length);
                    }

                    _this.upImgNum = _this.Images.split(',').length
                }).catch(err => {
                    file.status = 'failed';
                    file.message = '上传失败';
                })
            },
            // 限制上传大小
            onOversize(file) {
                this.$toast({
                    message: '上传图片大小不能超过 15MB!',
                    position: 'bottom',
                });
            },
            // 限制上传格式
            beforeRead(file) {
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    this.$toast({
                        message: '上传图片只能是 JPG 和 PNG 格式!',
                        position: 'bottom',
                    });
                    return false;
                }
                return true;
            },
            // 上传的图片删除
            onDelete(file,val) {
                var imgsArr = this.Images.split(',');
                this.Images = "";
                var imgs = "";
                for(var i = 0; i < imgsArr.length; i++){
                    if(i != val.index){
                        imgs += imgsArr[i] + ","
                        var lastIndex = imgs.lastIndexOf(',');
                        if (lastIndex > -1) {
                            this.Images = imgs.substring(0, lastIndex) + imgs.substring(lastIndex + 1, imgs.length);
                        }
                    }
                }
                if(this.Images == ''){
                    this.upImgNum = 0
                }else{
                    this.upImgNum = this.Images.split(',').length
                }
            },
            send(){
                if(this.ruleForm.member_name == ''){
                    this.$toast({
                        message: '请从会员管理输入账号进行处理',
                        position: 'bottom',
                    });
                }
            },
            // 提交
            submitForm() {
                var _this = this;
                if(this.Images != ''){
                    this.ruleForm['Images'] = this.Images
                }
                this.$loading.show();
                ChangeLeveApi(_this.ruleForm).then(res => {
                    // 清空表单
                    _this.ruleForm = Object.assign(_this.ruleForm, _this.defaultData);
                    _this.ruleForm.remark = '';
                    // 清空已上传文件
                    _this.fileList = [];
                    _this.Images = "";
                    _this.imgs = "";
                    _this.uploadNum = 0;
                    // 隐藏loading
                    _this.$loading.hide();
                    // 提示
                    _this.$toast({
                        message: res.data.message,
                        position: 'bottom',
                    });
                }).catch(err => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: err.message,
                        position: 'bottom',
                    });
                })
            }
        },
        created() {
            this.defaultData = JSON.parse(JSON.stringify(this.ruleForm));
        },
        mounted () {
            this.changeData();
            this.UpImgData();

            if(this.$route.query.name){
                this.ruleForm.member_name = this.$route.query.name
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/css/manageCenter.less';
</style>