<template>
  <div class="page-login">
    <template v-if="showIframe">
      <iframe id="iframe" src="/server/authentication" height="0" width="0" style="display: none;"></iframe>
    </template>
    <div class="bg"></div>
    <div class="page-login--layer page-login-content"
      flex="dir:top cross:center  ">

      <div class="page-login--content"
        flex="dir:top main:right cross:center box:justify">
        <div class="page-login--content-main"
          flex="dir:top main:center">
          <!-- 表单 -->
          <div class="page-login--form">
            <el-form ref="loginForm"
              :inline="true"
              :rules="rules"
              :model="formLogin"
              size="default">
              <el-form-item prop="username">
                <el-input v-model="formLogin.username"
                  autocomplete="off"
                  type="text"
                  placeholder="用户名">
                  <d2-icon-svg name='user'
                    style='width:22px;height:22px;'
                    slot='prepend'></d2-icon-svg>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="formLogin.password"
                  autocomplete="off"
                  type="password"
                  placeholder="密码">
                  <d2-icon-svg name='password'
                    style='width:22px;height:22px;'
                    slot='prepend'></d2-icon-svg>
                </el-input>
              </el-form-item>
              <div class="login-btn"
                @click="submit">
                登 录
              </div>
            </el-form>
            <p class="page-login--options"
              flex="main:center cross:center">
              <span class="keepPwd" style="margin-top: 5px;">
                <el-checkbox v-model="keepPwd" /> 记住密码
              </span>

              <!-- <span>注册用户</span> -->
              <!-- 快速登录按钮 -->
              <!-- <el-button class="page-login--quick"
                size="default"
                type="text"
                @click="dialogVisible = true">
                快速选择用户（测试功能）
              </el-button> -->
            </p>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-options" />
          <p class="page-login--content-footer-copyright" />
        </div>
      </div>
    </div>
    <el-dialog title="快速选择用户"
      :visible.sync="dialogVisible"
      width="400px">
      <el-row :gutter="10"
        style="margin: -20px 0px -10px 0px;">
        <el-col v-for="(user, index) in users"
          :key="index"
          :span="8">
          <div class="page-login--quick-user"
            @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o" />
            <span>{{ user.name }}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const Base64 = require('js-base64').Base64
export default {
  data() {
    return {
      // 快速选择用户
      dialogVisible: false,
      keepPwd: false,
      showIframe: true, //iframe默认不显示
      uniqueId: '',
      users: [
        {
          name: '管理员',
          username: 'admin',
          password: 'admin'
        },
        {
          name: '编辑',
          username: 'editor',
          password: '123456'
        }
      ],
      // 表单
      formLogin: {
        username: 'admin',
        password: 'admin',
      },
      // 校验
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  watch: {
    keepPwd(val) {
      if (val) {
        localStorage.setItem('keepPwd', 1)
      } else {
        localStorage.removeItem('keepPwd')
        localStorage.removeItem('user')
      }
    }
  },
  mounted() {
    window['getUniqueId'] = (data) => {
      console.log(data, 'data')
      this.showIframe = false
      this.uniqueId = data._csrf
    }
    setTimeout(() => {
      const keepPwd = localStorage.getItem('keepPwd')
      this.formLogin = {
        username: '',
        password: ''
      }
      if (keepPwd) {
        this.keepPwd = !!keepPwd
        const user = localStorage.getItem('user')

        if (user) {
          this.formLogin = { ...JSON.parse(user) }
        }
      }
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('d2admin/account', ['login']),

    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.username = user.username
      this.formLogin.password = user.password
      setTimeout(() => {
        this.submit()
      }, 550)
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码

          this.login({
            username: this.formLogin.username,
            password: Base64.encode(this.formLogin.password),
            _csrf: this.uniqueId
          }).then(() => {
            this.keepPwd && localStorage.setItem('user', JSON.stringify(this.formLogin))
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || '/')
          })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.bg {
  max-width: 1584px;
  height: 100%;
  margin: auto;
  background: url('./login@1x.jpg') no-repeat center;
  background-size: cover;
}

.page-login {
  @extend %unable-select;
  $backgroundColor: #222653;
  // ---
  background-color: $backgroundColor;
  width: 100%;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  @media screen and (max-width: 300px) {
    .page-login-content {
      width: 300px;
    }
  }
  @media screen and (min-width: 300px) and (max-width: 600px) {
    .page-login-content {
      width: 300px;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 900px) {
    .page-login-content {
      width: 600px;
    }
  }
  @media screen and (min-width: 900px) {
    .page-login-content {
      //  @extend %full;
      width: 900px;
    }
  }
  .page-login-content {
    // @extend %full;

    @extend %full;
    margin: auto;
    height: 100vh;

    background-size: 100% 100%;
    height: 100%;
  }
  .top-container {
    top: 121px;
    left: 0;
    right: 0;
    height: 550px;
    width: 1329px;

    text-align: center;
    position: relative;
    .icons {
      img {
        position: absolute;
        width: 199px;
        height: 199px;
        &:first-child {
          right: 1257px;
          top: 268px;
          margin: auto;
        }
        &:nth-child(5) {
          left: 121.5px;
          right: 1009px;
          top: 11px;
          bottom: 340px;
          margin: auto;
        }
        &:nth-child(6) {
          left: 597.5px;
          right: 567px;
          top: -105px;
          bottom: 490px;
          margin: auto;
        }
        &:nth-child(4) {
          left: 1081.5px;
          right: 49px;
          bottom: 259px;
          top: 92px;
          margin: auto;
        }
        &:nth-child(2) {
          left: 1258.5px;
          right: -128px;
          bottom: 1px;
          top: 352px;
          margin: auto;
        }
        &:nth-child(3) {
          left: 238.5px;
          right: 926px;
          bottom: 66px;
          top: 451px;
          margin: auto;
        }
      }
    }
    img.logo-icon {
      position: absolute;
      width: 456px;
      height: 458px;
      right: 422px;
      left: 451.5px;

      bottom: 91px;
      margin: auto;
    }
    .light {
      position: absolute;
      right: 271.8px;
      left: 283.5px;
      top: 200px;

      width: 774px;
      height: 381px;
      background: url('image/lights@3x.png');
      background-size: 100% 100%;
      text-align: center;
      img {
        width: 256px;
        height: 115px;
        position: absolute;
        bottom: 91px;
        top: 175px;
        left: 278.7px;
        right: 239.3px;
        margin: auto;
      }
    }
  }
  // 登陆页面控件的容器
  .page-login--content {
    @extend %full;
    // height: 301px;
    //  width: 100%;
    margin: auto;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    .el-input {
      width: 392px;
    }
    .el-input__inner,
    .el-input-group__prepend {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    }
    .login-btn {
      width: 496px;
      margin: 0 auto;
      height: 46px;
      line-height: 46px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;

      background: url('./image/base_btn_login@2x.png') no-repeat;
      background-size: 100% 100%;
    }
    .keepPwd {
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
    }
  }

  // main

  // 登录表单
  .page-login--form {
    /* width: 280px; */

    // 登录按钮
    .button-login {
      width: 100%;
    }

    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      /* margin-bottom: 15px; */
      font-weight: bold;
    }
    .page-login--quick {
      margin-left: 10px;
      /* width: 100%; */
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
  }
}
</style>
