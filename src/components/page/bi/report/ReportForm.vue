<template>
    <div class="reportForm">
        <span class="title">
            <div v-if="reportInfo.json.titleDate.flag != null && reportInfo.json.titleDate.flag == 1">日期 </div> {{reportInfo.json.title}}
        </span>
        <el-row :gutter="10">
            <el-col :span="8">
                <span v-if="reportInfo.json.reportNoFlag == 1">报表编号：</span>
            </el-col>
            <el-col :span="8">
                <span v-if="reportInfo.json.createDateFlag == 1">制表时间：</span>
            </el-col>
            <el-col :span="8">
                <span v-if="reportInfo.json.createUserFlag == 1">制表人：</span>
            </el-col>
        </el-row>
        <el-row v-for="" :gutter="10">

        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ReportForm",
        props: {
            reportInfo: {
                reportCode: null,
                reportName: null,
                reportType: null,
                json: {
                    reportType: null,
                    titleDate: {
                        flag: null,
                        type: null
                    },
                    title: null,
                    reportNoFlag: null,
                    createDateFlag: null,
                    createUserFlag: null,
                    seqFlag: null,
                    col: []
                }
            },
            columns: null
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>
