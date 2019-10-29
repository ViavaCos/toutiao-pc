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
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="queryDate.channel_id" placeholder="请选择">
            <el-option v-for="item in channel" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="data"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card result">
      <div slot="header">
        根据筛选条件共查询到
        <span>{{total_count}}</span> 条结果：
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="封面">
          <img src="../../assets/error.gif" alt />
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <el-tag type="success">审核通过</el-tag>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop="action" label="操作">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
        end_pubdate: null
      },
      channel: [{ label: 'Java', id: 0 }, { label: 'JavaScript', id: 1 }],
      //   data: [begin_pubdate, end_pubdate]
      data: [],
      total_count: 58619,
      tableData: [
        {
          images: '../../assets/logo_admin.png',
          title: '国庆八天假',
          status: '审核通过',
          pubdate: '2019-09-22',
          action: 'no'
        },
        {
          images: '../../assets/logo_admin.png',
          title: '国庆八天假',
          status: '审核通过',
          pubdate: '2019-09-22',
          action: 'no'
        },
        {
          images: '../../assets/logo_admin.png',
          title: '国庆八天假',
          status: '审核通过',
          pubdate: '2019-09-22',
          action: 'no'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
.el-card.result {
  margin-top: 20px;

  .el-table {
    .el-table-column {
      width: 20%;
    }

    img {
      height: 100px;
    }
  }

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
