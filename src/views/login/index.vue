<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/logo_index.png" alt />
      <el-form ref="form">
        <el-form-item>
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.code" class="code" placeholder="请输入验证码"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>

        <el-checkbox class="readRule" :value="true" label="我已阅读并同意用户协议和隐私条款"></el-checkbox>
      </el-form>
      <el-button type="primary" class="login">立即登录</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      }
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
