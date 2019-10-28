<template>
  <div class="container-welcome">
    <img src="../../assets/welcome.jpg" alt />
  </div>
</template>

<script>

// 修改为async写法
// async function getInfo (that) {
//   const data = await that.$axios.get('user/profile')
//   console.log(data)
// }

export default {

//   created () {
//     // 测试携带token的请求是否成功
//     // this.$axios.get('user/profile').then((data) => {
//     //   console.log(data)
//     // })
//     getInfo(this)
//   }
}
</script>

<style lang="less">
.container-welcome {
  vertical-align: middle;
  text-align: center;
  img {
    vertical-align: middle;
    margin: 0 auto;
  }
}
</style>
