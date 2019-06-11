<template>
    <div>
        <span>
            <i class="el-icon-view"></i> 结点信息:</span>
        <hr class="split" />
        <div class="card-context">
            <el-row :gutter="10">
                <el-col :span="4">
                    结点名称:
                </el-col>
                <el-col :span="6">
                    <el-input v-model="viewInfo.nodeName" size="small" readonly></el-input>
                </el-col>
                <el-col :span="4">
                    工作组编号:
                </el-col>
                <el-col :span="6">
                    <el-input v-model="viewInfo.wgCid" size="small" readonly></el-input>
                </el-col>
            </el-row>
        </div>
        <span>
            <i class="el-icon-view"></i> 组员信息:</span>
        <hr class="split" />
        <div class="card-context">
            <el-table :data="workerList" border style="width: 100%">
                <el-table-column prop="userCid" label="用户号" width="120"></el-table-column>
                <el-table-column prop="loginName" label="登录名" width="300"></el-table-column>
                <el-table-column prop="agentUserCid" label="代理人用户号" width="120"></el-table-column>
                <el-table-column prop="agentLoginName" label="代理人登录名" width="300"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props: ['viewInfo','workerList']
}
</script>
<style scoped>
</style>
