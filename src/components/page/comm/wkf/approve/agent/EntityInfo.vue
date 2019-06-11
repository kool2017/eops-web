<template>
    <div>
        <span>
            <i class="el-icon-view"></i> 流程信息:</span>
        <hr class="split" />
        <div class="card-context">
            <el-row :gutter="10">
                <el-col :span="4">
                    实例编号:
                </el-col>
                <el-col :span="6">
                    <el-input v-model="viewInfo.entityCid" size="small" readonly></el-input>
                </el-col>
                <el-col :span="4">
                    关联业务类型:
                </el-col>
                <el-col :span="6">
                    <el-select v-model="viewInfo.businessType" size="small" disabled>
                        <el-option label="SYUSRMNG00-用户管理" value="SYUSRMNG00"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="4">
                    实例名称:
                </el-col>
                <el-col :span="6">
                    <el-input v-model="viewInfo.entityName" size="small" readonly></el-input>
                </el-col>
                <el-col :span="4">
                    实例匹配值:
                </el-col>
                <el-col :span="6">
                    <el-input v-model="viewInfo.matchValue" size="small" readonly></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="4">
                    首结点编号:
                </el-col>
                <el-col :span="6">
                    <el-input v-model="viewInfo.nodeHead" size="small" readonly></el-input>
                </el-col>
                <el-col :span="4">
                    首结点名称:
                </el-col>
                <el-col :span="6">
                    <el-input v-model="viewInfo.nodeHeadName" size="small" readonly></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="4">
                    流程实例状态:
                </el-col>
                <el-col :span="6">
                    <el-select v-model="viewInfo.state" size="small" disabled>
                        <el-option label="A-正常" value="A"></el-option>
                        <el-option label="C-关闭" value="C"></el-option>
                        <el-option label="P-待关闭" value="P"></el-option>
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
