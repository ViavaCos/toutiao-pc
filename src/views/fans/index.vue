<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <bread-crumb>粉丝管理</bread-crumb>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 粉丝列表 -->
          <div class="fansList" v-if="fansList.length !== 0">
            <div class="fans-item" v-for="item in fansList" :key="item.id.toString()">
              <img :src="item.photo" />
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <div v-else class="tips">
              <p>不好意思，你还没有粉丝需要管理~~</p>
          </div>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="picture">
            <!-- 2. 设置echarts容器 -->
             <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 1. 引入echarts
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'picture',
      fansList: [],
      reqParams: {
        page: 1,
        per_page: 21
      },
      total: 0
    }
  },
  created () {
    this.getFansInfo()
  },
  methods: {
    async getFansInfo () {
      const {
        data: { data }
      } = await this.$axios.get('followers', this.reqParams)

      this.total = data.total_count
      this.fansList = data.results
    }
  },
  // 操作DOM
  mounted () {
    // 3. 获取dom容器
    const dom = this.$refs.main
    // 4. 初始化echarts
    const myChart = echarts.init(dom)
    // 5. 设置图表配置项和数据
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // 6. 使用echarts
    myChart.setOption(option)
  }
}
</script>

<style scoped lang='less'>
.tips{
    text-align: center;
    font-size: 14px;
    color: #ccc;
}
.fans-item {
    display: inline-block;
  margin-top: 20px;
  margin-right: 20px;
  height: 190px;
  width: 140px;
  border: 1px dashed #ccc;
  text-align: center;

  img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin-top: 10px;
  }
}
</style>
