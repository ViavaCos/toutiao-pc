<template>
  <!-- clearable 设置可清空的select下拉项 -->
  <el-select @change="sendValue" :value="value" placeholder="请选择" clearable>
    <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  // 接收v-model帮忙传递过来的value属性值,和自己定义的value冲突了，所以注释掉自己定义的
  props: ['value'],
  data () {
    return {
      // value: null,
      channel: []
    }
  },
  created () {
    // 实例创建完成后获取频道信息
    this.getChannels()
  },
  methods: {
    // 获取频道
    async getChannels () {
      const {
        data: { data }
      } = await this.$axios({
        url: 'channels'
      })
      // 将请求来的数据,放给渲染频道下拉选项的数据源
      this.channel = data.channels
    },
    sendValue (value) {
      // 触发input的自定义事件，因为这不是表单元素所以没有原生的input
      this.$emit('input', value)
    }
  }
}
</script>

<style>
</style>
