<template>
  <div class="container-commont">
    <el-card>
      <div slot="header">
        <bread-crumb>评论管理</bread-crumb>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" width="300"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <!-- 使用额外内容必须要使用插槽 -->
          <template slot-scope="scope">{{scope.row.comment_status ? '正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              v-if="scope.row.comment_status"
              @click="toggleStatus(true,scope.row.id)"
            >关闭评论</el-button>
            <el-button type="success" v-else @click="toggleStatus(false,scope.row.id)">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      reqParams: {
        status: null,
        response_type: 'comment',
        per_page: 20,
        page: 1
      },
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    //   获取文章信息列表
    async getArticles () {
      const {
        data: { data }
      } = await this.$axios({ url: 'articles', params: this.reqParams })
      this.tableData = data.results
      this.total = data.total_count
    },
    // 切换评论状态
    toggleStatus (status, id) {
      // comments/status?article_id=xxx

      let tips = status ? '确定要关闭评论吗?' : '确定要打开评论功能吗?'

      this.$confirm(tips, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$axios.put(`comments/status?article_id=${id}`, {
            allow_comment: !status
          })
          this.$message.success('更改成功')
          this.getArticles()
        })
        .catch(() => {})
    },
    // 切换分页
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    }
  }
}
</script>

<style>
</style>
