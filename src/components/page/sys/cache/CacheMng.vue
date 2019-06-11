<template>
  <div class="cacheMng">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-card class="list-card">
          <span>
            <i class="el-icon-refresh"></i> 请选择要刷新的缓存: </span>
          <hr class="split" />
          <div class="card-context">
            <el-row>
              <el-col>
                <el-button
                  type="primary"
                  icon="el-icon-refresh"
                  @click="refresh('MENU')"
                >刷新菜单</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh"
                  @click="refresh('REQ')"
                >刷新请求</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh"
                  @click="refresh('USER')"
                >刷新用户</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-button
                  type="primary"
                  icon="el-icon-refresh"
                  @click="refresh('USER_REQ')"
                >刷新用户请求关系</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh"
                  @click="refresh('USER_MENU')"
                >刷新用户菜单关系</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh"
                  @click="refresh('ERRCOD')"
                >刷新错误码</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-button
                  type="primary"
                  icon="el-icon-refresh"
                  @click="refresh('PARAM')"
                >刷新参数</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh"
                  @click="refresh('GLOBAL_DEF')"
                >刷新预定义</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      to:'',
      message: '',
      dialog: ''
    }
  },
  created () {
    
  },
  methods: {
    refresh (type) {
      let self = this
      var input = {
        SYREFRESHCACHEX: [{ type: type }]
      }
      self.$http
        .post('/sys/cache/refresh', input)
        .then((res) => {
          self.$message({
            message: '刷新成功',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          self.$alert(err, '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })

    },
    send () {
      let self = this
      let input = {
        from: localStorage.getItem('userCid'),
        to: this.to,
        message: this.message
      }
      self.$http
        .post('/notify/send', input)
        .then((res) => {
          self.$message({
            message: '发送成功',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          self.$alert(err, '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    }
  }
}
</script>
<style scoped>
</style>
