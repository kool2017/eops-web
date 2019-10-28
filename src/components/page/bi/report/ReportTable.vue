<template>
    <div class="reportTable">
        <div class="report-title">
            <span v-if="titleDateFlag == '1'">日期-</span>{{title}}
        </div>
        <div class="report-header">
            <el-row :gutter="10">
                <el-col :span="8">
                    <span v-if="reportNoFlag == '1'">报表编号：</span>
                </el-col>
                <el-col :span="8">
                    <span v-if="createDateFlag == '1'">制表时间：</span>
                </el-col>
                <el-col :span="8">
                    <span v-if="createUserFlag == '1'">制表人：</span>
                </el-col>
            </el-row>
        </div>
        <div class="report-body">
            <el-table :data="retList" border style="width: 100%" ref="retTable"
                      highlight-current-row height="200">
                <el-table-column v-if="seqFlag == '1'" prop="column.seq" label="序号"
                                 width="60"></el-table-column>
                <el-table-column v-for="column in columns" :key="column.key" prop="column.key" :label="column.name"
                                 width="100"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReportTable",
        props: {
            titleDateFlag: {
                type: String,
                default: '1'
            },
            title: {
                type: String,
                default: ''
            },
            reportNoFlag: {
                type: String,
                default: '1'
            },
            createDateFlag: {
                type: String,
                default: '1'
            },
            createUserFlag: {
                type: String,
                default: '1'
            },
            seqFlag: {
                type: String,
                default: '1'
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
    .report-title {
        text-align: center
    }
</style>
