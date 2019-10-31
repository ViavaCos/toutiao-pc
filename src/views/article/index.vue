<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <bread-crumb>内容管理</bread-crumb>
      </div>
      <el-form label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="queryDate.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <!-- <el-radio :label="4">已删除</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="queryDate.channel_id" placeholder="请选择" clearable>
            <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="data"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="getArticles">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card result">
      <div slot="header">根据筛选条件共查询到 {{total_count}} 条结果：</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="height:100px;width:150px;" fit="fill">
              <div slot="error">
                <img src="../../assets/error.gif" height="100" width="150" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <!-- <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              @click="toEdit(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              plain
              circle
            ></el-button>
            <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="changePage"
        background
        layout="prev, pager, next"
        :page-size="queryDate.per_page"
        :total="total_count"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryDate: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channel: [{ label: 'Java', id: 0 }, { label: 'JavaScript', id: 1 }],
      //   data: [begin_pubdate, end_pubdate]
      data: [],
      total_count: 0,
      tableData: []
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  },
  methods: {
    // 获取文章列表
    async getArticles () {
      // 判断当前频道是否为空字符串，是则赋值为null
      if (this.queryDate.channel_id === '') {
        this.queryDate.channel_id = null
      }

      if (this.data) {
        this.queryDate.begin_pubdate = this.data[0]
        this.queryDate.end_pubdate = this.data[1]
      } else {
        this.queryDate.begin_pubdate = null
        this.queryDate.end_pubdate = null
      }

      const {
        data: { data }
      } = await this.$axios({
        url: 'articles',
        params: this.queryDate
      })
      this.tableData = data.results
      this.total_count = data.total_count
    },
    // 获取频道
    async getChannels () {
      const {
        data: { data }
      } = await this.$axios({
        url: 'channels'
      })

      this.channel = data.channels
    },
    // 页面切换
    changePage (id) {
      this.queryDate.page = id
      // console.log(id)
      this.getArticles()
    },
    // 编辑
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.just_del(id)
        })
        .catch(() => {
          this.$message('已取消删除')
        })
    },
    async just_del (id) {
      try {
        await this.$axios({
          method: 'DELETE',
          url: `articles/${id}`
        })
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch (e) {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      }
      this.getArticles()
    }
  }
}
</script>

<style scoped lang="less">
.el-card.result {
  margin-top: 20px;

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
