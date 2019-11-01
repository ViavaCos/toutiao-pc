<template>
  <el-card>
    <div slot="header">
      <bread-crumb>素材管理</bread-crumb>
    </div>
    <!-- 按钮式单选框组件 -->
    <el-radio-group v-model="condition" size="small" @change="toggleView">
      <el-radio-button :label="true">全部</el-radio-button>
      <el-radio-button :label="false">收藏</el-radio-button>
    </el-radio-group>
    <el-button style="float:right;" type="success" size="small" @click="add">添加素材</el-button>
    <div class="images">
      <div class="image-item" v-for="item in images" :key="item.id">
        <img :src="item.url" />
        <!-- 操作菜单 根据是否全部视图来设置 v-if="condition" 在收藏视图下不显示 -->
        <div class="cover" v-if="condition">
          <span
            @click="toggleCollect(item)"
            class="el-icon-star-off"
            :class="{red:item.is_collected}"
          ></span>
          <span @click="del(item.id)" class="el-icon-delete"></span>
        </div>
      </div>
    </div>
    <div class="wrapper-page">
      <!-- 分页组件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
      ></el-pagination>
    </div>
    <!-- 对话框组件 -->
    <el-dialog title="上传素材" :visible.sync="dialogVisible" width="30%">
      <!-- 文件上传组件  auto-upload:文件选取后是否自定上传  headers:上传的请求头 name:设置上传参数的字段名-->
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :before-upload="uploadFile"
        :headers="tokenHeader"
        name="image"
        :on-success="uploaded"
        :auto-upload="true"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </el-card>
</template>

<script>
import session from '@/utils/session'
export default {
  data () {
    return {
      //  按钮式单选框组条件
      condition: true,
      //   总条数
      total: 0,
      //   请求素材列表的参数对象
      reqParams: {
        //   每页显示条数
        per_page: 10,
        // 当前页
        page: 1,
        // 是否收藏
        collect: null
      },
      //   渲染素材列表依赖的数组
      images: [],
      // 是否显示对话框
      dialogVisible: false,
      //   上传图片预览地址
      imageUrl: '',
      //   上传的请求头
      tokenHeader: {},
      image: null
    }
  },
  created () {
    this.getImages()
  },
  methods: {
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
    changePage (currentPage) {
      // 将分页组件传递过来的当前页赋值给请求参数
      this.reqParams.page = currentPage
      //   并重新发请求渲染页面
      this.getImages()
    },
    // 收藏切换
    async toggleCollect (item) {
    //   console.log(item)
      const {
        data: { data }
      } = await this.$axios.put(`user/images/${item.id}`, {
        //   这里似乎不能使用对象传参，因为对象传参的话需要传递一个对象。。。出来半天bug最终还是用简写了
        // 将collect参数设置为当前图片状态的反值
        collect: !item.is_collected
      })
      // 成功后将修改完之后的图片状态赋值给当前图片
      item.is_collected = data.collect
      this.$message({
        //   利用三元表达式判断当前操作是添加还是取消
        message: data.collect ? '添加收藏成功' : '取消收藏成功',
        type: 'success'
      })
    },
    // 全部视图 | 收藏视图
    toggleView () {
      // 将目前单选框组条件取反设置给请求参数(是否为收藏视图)
      this.reqParams.collect = !this.condition
      //   然后将当前页重置为首页
      this.reqParams.page = 1
      //   并渲染素材列表
      this.getImages()
    },
    // 删除素材
    del (id) {
      this.$confirm('此操作将永久删除该素材, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$axios.delete(`user/images/${id}`)

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getImages()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加素材
    add () {
      this.dialogVisible = !this.dialogVisible
    },
    // 文件上传
    uploadFile (file) {
      const data = session.getToken()
      // 为文件上传组件自动发送的请求设置token
      this.tokenHeader.Authorization = `Bearer ${data.token}`
    },
    // 文件上传成功
    uploaded (res, file) {
      this.imageUrl = file.response.data.url

      this.$message({
        message: '文件上传成功',
        type: 'success'
      })
      setTimeout(() => {
        //   隐藏对话框
        this.dialogVisible = false
        // 清空图片地址
        this.imageUrl = ''
        this.getImages()
      }, 2000)
    }
  }
}
</script>

<style scoped  lang='less'>
.image-item {
  width: 180px;
  height: 180px;
  flex-wrap: wrap;
  display: inline-block;
  margin-top: 20px;
  margin-right: 50px;
  position: relative;
  border: 1px dashed #ccc;

  img {
    width: 100%;
    height: 100%;
  }
  .cover {
    width: 100%;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    line-height: 40px;
    color: #fff;
    span {
      margin: 0 20px;
      cursor: pointer;

      // &代表连接符，指和span同级  渲染后为 span.red
      &.red {
        color: red;
      }
    }
  }
}
.wrapper-page {
  text-align: center;
}

// 问题： 文件上传组件的样式必须定义为全局样式，否则无法显示。
// 原因是：上传组件中的标签不属于当前组件的标签 （scoped 属性限定了当前这些样式只能作用域当前组件中的标签，
// 但是当前组件中包含的组件，其内部的标签不属于当前组件的标签）
</style>
