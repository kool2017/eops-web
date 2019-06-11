<template>
    <div>
        <span>
            <i class="el-icon-view"></i> 模式信息:</span>
        <hr class="split" />
        <div class="card-context">
            <el-row :gutter="10">
                <el-col :span="4">
                    模式代号:
                </el-col>
                <el-col :span="6">
                    <el-input v-model="viewInfo.wkfCode" size="small" readonly></el-input>
                </el-col>
                <el-col :span="4">
                    模式名称:
                </el-col>
                <el-col :span="6">
                    <el-input v-model="viewInfo.wkfName" size="small" readonly></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="4">
                    签收标志:
                </el-col>
                <el-col :span="6">
                    <el-select v-model="viewInfo.checkFlag" size="small" disabled>
                        <el-option label="Y-签收" value="Y"></el-option>
                        <el-option label="N-不签收" value="N"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    路由类型:
                </el-col>
                <el-col :span="6">
                    <el-select v-model="viewInfo.routeType" size="small" disabled>
                        <el-option label="SI-单路串行" value="SI"></el-option>
                        <el-option label="MU-多路并行" value="MU"></el-option>
                        <el-option label="AL-不限" value="AL"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    props: ['viewInfo']
}
</script>
<style scoped>
</style>
