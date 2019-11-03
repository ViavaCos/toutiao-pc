<template>
  <el-card>
    <div slot="header">
      <bread-crumb>发布文章</bread-crumb>
    </div>
    <el-form label-width="120px">
      <!-- 标题： -->
      <el-form-item label="标题：">
        <el-input v-model="reqParams.title" style="width:400px"></el-input>
      </el-form-item>
      <!-- 内容： -->
      <el-form-item label="内容：">
        <quill-editor v-model="reqParams.content" :options="editorOption"></quill-editor>
      </el-form-item>
      <!-- 封面 -->
      <el-form-item label="封面：">
        <el-radio-group v-model="reqParams.cover.type" @change="resetPreview">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <div>
          <!-- 封面组件 -->
          <load-images v-model="reqParams.cover.images[0]" v-if="reqParams.cover.type !== 0"></load-images>
          <load-images v-model="reqParams.cover.images[1]" v-if="reqParams.cover.type === 3"></load-images>
          <load-images v-model="reqParams.cover.images[2]" v-if="reqParams.cover.type === 3"></load-images>
        </div>
      </el-form-item>
      <!-- 频道组件 -->
      <el-form-item label="频道：">
        <article-channel v-model="reqParams.channel_id"></article-channel>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button>存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入富文本编辑器 vue-quill-editor
import { quillEditor } from 'vue-quill-editor'

export default {
  // 挂载
  components: {
    quillEditor
  },
  data () {
    return {
      // 富文本编辑器配置项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['link', 'image']
          ]
        }
      },
      //   请求参数
      reqParams: {
        // 标题
        title: null,
        // 内容
        content: null,
        // 频道id
        channel_id: null,
        // 封面
        cover: {
          type: 1,
          images: []
        }
      }
    }
  },
  methods: {
    // 重置预览图及数
    resetPreview (typeValue) {
      // console.log(this.reqParams.cover.images)

      if (typeValue === 1 && this.reqParams.cover.images.length) {
      // 如果当前类型时单图且数组中存在图片地址，则将数组中只能保留一张图
        this.reqParams.cover.images.length = 1
        return
      }

      if (typeValue === 3) {
        return
      }

      this.reqParams.cover.images = []
    }
  }
}
</script>

<style lang="less" scoped>
</style>>
