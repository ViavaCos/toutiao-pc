<template>
  <div class="btn">
    <div @click="show" class="preview">
      <img v-if="value || finalImage" :src="value || finalImage" />
      <img v-else src="../assets/default.png" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="素材库" name="images">
          <el-radio-group v-model="condition" size="small" @change="toggleView">
            <el-radio-button :label="true">全部</el-radio-button>
            <el-radio-button :label="false">收藏</el-radio-button>
          </el-radio-group>
          <!-- 渲染图片列表 -->
          <div
            class="image-item"
            @click="selectImageUrl(item.url)"
            v-for="item in images"
            :key="item.id"
            :class="{selected:imageSelected === item.url}"
          >
            <img :src="item.url" />
          </div>
          <!-- 分页组件 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>

        <!-- 图片上传 -->
        <el-tab-pane label="上传图片" name="upload" class="upload">
          <!-- 文件上传组件  auto-upload:文件选取后是否自定上传  headers:上传的请求头 name:设置上传参数的字段名-->
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="tokenHeader"
            name="image"
            :on-success="uploaded"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        <!-- 确定&取消按钮 -->
        <div class="confirm">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="makeSure">确 定</el-button>
        </div>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import session from '@/utils/session'
export default {
  props: ['value'],
  data () {
    return {
      // 是否显示对话框
      dialogVisible: false,
      //   上传图片预览地址
      imageUrl: '',
      // tags标签页
      activeName: 'images',
      // 切换全部或收藏
      condition: true,
      // 渲染列表依赖数据源
      images: {},
      //   请求素材列表的参数对象
      reqParams: {
        //   每页显示条数
        per_page: 8,
        // 当前页
        page: 1,
        // 是否收藏
        collect: null
      },
      // 总条数
      total: 0,
      // 请求头
      tokenHeader: {
        Authorization: `Bearer ${session.getToken().token}`
      },
      // 选中图片地址
      imageSelected: null,
      // 最终展示图片
      finalImage: null
    }
  },
  methods: {
    // 显示对话框
    show () {
      this.dialogVisible = true
      this.getImages()

      // 取消上传组件中图片的地址
      this.imageUrl = ''
      // 取消选中的图片地址
      this.imageSelected = ''
    },
    handleClick () {},
    // 切换全部或收藏
    toggleView () {
      // 将目前单选框组条件取反设置给请求参数(是否为收藏视图)
      this.reqParams.collect = !this.condition
      //   然后将当前页重置为首页
      this.reqParams.page = 1
      //   并渲染素材列表
      this.getImages()
    },
    //   获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$axios({
        url: 'user/images',
        // 非拼接字符串形式传参
        params: this.reqParams
      })

      this.images = data.results
      this.total = data.total_count
    },
    // 分页切换
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 文件上传成功
    uploaded (res, file) {
      this.imageUrl = file.response.data.url

      this.$message({
        message: '文件上传成功',
        type: 'success'
      })
    },
    // 选择图片地址
    selectImageUrl (url) {
      this.imageSelected = url
    },
    // 确认
    makeSure () {
      switch (this.activeName) {
        case 'images':
          // 判断是否为空
          if (!this.imageSelected) {
            this.$message.warning('请选择一张图片')
            return
          }
          this.finalImage = this.imageSelected
          break
        case 'upload':
          // 判断是否为空
          if (!this.imageUrl) {
            this.$message.warning('请选择一张图片')
            return
          }
          this.finalImage = this.imageUrl
          break
      }
      // 传递当前图片给父组件
      this.$emit('input', this.finalImage)

      // 清空数据
      this.imageSelected = ''
      this.imageUrl = ''
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  display: inline-block;
  margin-right: 20px;
  .preview {
    border: 1px dashed #ccc;
    width: 150px;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .confirm {
    text-align: center;
  }
  .upload {
    img {
      width: 180px;
      height: 180px;
    }
  }
}
img {
  width: 150px;
  height: 120px;
}

.el-radio-group {
  display: block;
}

.image-item {
  width: 150px;
  height: 120px;
  flex-wrap: wrap;
  display: inline-block;
  margin-top: 20px;
  margin-right: 20px;
  position: relative;
  border: 1px dashed #ccc;

  img {
    width: 100%;
    height: 100%;
  }
}
// 选中样式
.selected::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3) no-repeat url("../assets/selected.png") center /
    50px;
}
</style>
