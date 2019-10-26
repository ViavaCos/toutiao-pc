<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/logo_index.png" alt />
      <el-form ref="loginForm" :rules="rules" :model="form" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="form.code" class="code" placeholder="请输入验证码"></el-input>
          <el-button >发送验证码</el-button>
        </el-form-item>

        <el-checkbox class="readRule" v-model="isChecked" label="我已阅读并同意用户协议和隐私条款"></el-checkbox>
      </el-form>
      <el-button :disabled="!isChecked" type="primary" class="login" @click="login('loginForm')">立即登录</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkLogin = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }

    // const sendCode = (rule, value, callback) => {
    //   this.$refs.ruleForm.validateField('mobile')
    // }

    return {
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkLogin, trigger: 'blur' }
        ],

        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码为6位', trigger: 'blur' }

        ]
      },
      isChecked: false
    }
  },
  methods: {

    // 登录
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            url: 'authorizations',
            method: 'post',
            data: this.form
          }).then(() => {
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('登录失败, 请重试！')
          })
        } else {
          // alert('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="less">
.container {
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.box-card {
  background-color: #fff;
  width: 400px;
  height: 340px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  img {
    width: 200px;
    display: block;
    margin: 0 auto 30px;
  }

  .code {
    width: 235px;
    margin-right: 10px;
  }

  .readRule {
    line-height: 40px;
    margin: 0 auto 20px;
  }

  .login {
    width: 100%;
  }
}
</style>
