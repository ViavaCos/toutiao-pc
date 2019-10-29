<template>
  <el-container class="container-home">
    <el-aside :width="!isCollapse?'200px':'64px'">
      <div class="logo" :class="{smallIcon:isCollapse}"></div>
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        active-text-color="#ffd04b"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <i class="el-icon-s-fold" @click="showSidebar"></i>
        <span>北京信息技术有限公司</span>
        <el-dropdown @command="dropLink">
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            <span class="userName">{{name}}</span>
            <span class="el-icon-arrow-down el-icon--right"></span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="a">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import session from '@/utils/session'

export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  methods: {
    showSidebar () {
      this.isCollapse = !this.isCollapse
    },
    dropLink (command) {
      switch (command) {
        case 'a':
          this.$router.push('/setting')
          break
        case 'b':
          // if (confirm('确定要退出吗？')) {
          //   this.$message({
          //     message: '退出成功',
          //     type: 'success'
          //   })
          // } else {
          //   this.$message('取消退出')
          // }
          this.$confirm('确定要退出吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            session.delToken()
            this.$router.push('/login')
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            })
          })
          break
      }
    }
  },
  created () {
    // 防止token不存在会报错，所以放置一个空对象
    let { name, photo } = session.getToken() || {}
    this.name = name
    this.photo = photo
  }
}
</script>

<style lang='less'>
.container-home {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  .el-header {
    width: 60px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    line-height: 60px;

    i {
      font-size: 30px;
      vertical-align: middle;
    }
    span {
      margin-left: 5px;
      vertical-align: middle;
    }

    .el-dropdown {
      float: right;

      .userName {
        font-weight: bold;
        // vertical-align: middle;
      }

      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }

  .el-aside {
    background-color: #002033;

    .logo {
      height: 60px;
      background: #002244 url("../../assets/logo_admin.png") no-repeat center /
        140px auto;
    }

    .smallIcon {
      background-image: url("../../assets/logo_admin_01.png");
      background-size: 36px auto;
    }

    .el-menu {
      //   width: 200px;
      border-right: none;
    }
  }
}
</style>
