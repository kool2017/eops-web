<template>
    <div class="reportTable">
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
        <div class="report-body">
            <el-table :data="retList" border style="width: 100%" ref="retTable"
                      highlight-current-row height="200">
                <el-table-column v-if="reportInfo.json.seqFlag == 1" prop="column.seq" label="序号"
                                 width="120"></el-table-column>
                <div v-for="column in columns">
                    <el-table-column prop="column.key" :label="column.name" width="120"></el-table-column>
                </div>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReportTable",
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
            return {
                retList: []
            }
        }
    }
</script>

<style scoped>

</style>
