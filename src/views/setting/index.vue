<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <bread-crumb>个人设置</bread-crumb>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form label-width="150px">
            <el-form-item label="编号：">{{formData.id}}</el-form-item>
            <el-form-item label="手机：">{{formData.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="formData.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveChange">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 文件上传 -->
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action
            :http-request="uploadFile"
          >
            <img v-if="formData.photo" :src="formData.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import session from '@/utils/session'
// ① 引入事件总线
import eventBus from '@/eventBus'
// user/profile   get
export default {
  data () {
    return {
      formData: {
        id: null,
        name: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    //   获取用户信息
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$axios.get('user/profile')
      this.formData = data
    },
    // 文件上传成功
    uploaded (res) {
      //   console.log(res)
      this.formData.photo = res.data.url
    },
    // 保存设置
    async saveChange () {
      const { name, intro, email } = this.formData
      const {
        data: { data }
      } = await this.$axios.patch('user/profile', { name, intro, email })
      this.$message.success('保存成功')
      //   this.$router.push('/')

      // ② 设置name给home组件
      eventBus.$emit('setName', data.name)

      // 设置name给本地存储
      const user = session.getToken()
      user.name = data.name
      session.setToken(user)
    },
    // 上传头像
    async uploadFile (res) {
      const fd = new FormData()
      fd.append('photo', res.file)
      const {
        data: { data }
      } = await this.$axios.patch('user/photo', fd)
      this.formData.photo = data.photo

      // 设置photo给home组件
      eventBus.$emit('setPhoto', data.photo)
      // 设置photo给本地存储
      const user = session.getToken()
      user.photo = data.photo
      session.setToken(user)
      this.$message.success('设置头像成功')
    }
  }
}
</script>

<style>
</style>
