<template>
    <div class="reportForm">
        <div class="report-title">
            <span v-if="titleDateFlag == 1">日期-</span>{{title}}
        </div>
        <div class="report-header">
            <el-row :gutter="10">
                <el-col :span="12">
                    <span v-if="reportNoFlag == 1">报表编号：</span>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <span v-if="createDateFlag == 1">制表时间：</span>
                </el-col>
                <el-col :span="12">
                    <span v-if="createUserFlag == 1">制表人：</span>
                </el-col>
            </el-row>
        </div>

        <div class="report-body">
            <div v-for="(column,index) in columns" :key="column.key">
                <el-row v-if="index % 2 == 0">
                    <el-col :span="6">
                        <span>{{column.name}}：</span>
                    </el-col>
                    <el-col :span="6">
                        <span>{{column.key}}</span>
                    </el-col>
                    <el-col v-if="index + 1 < columns.length" :span="6">
                        <span>{{columns[index + 1].name}}：</span>
                    </el-col>
                    <el-col v-if="index + 1 < columns.length" :span="6">
                        <span>{{columns[index + 1].key}}</span>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReportForm",
        props: {
            titleDateFlag: {
                type: Number,
                default: 1
            },
            title: '',
            reportNoFlag: {
                type: Number,
                default: 1
            },
            createDateFlag: {
                type: Number,
                default: 1
            },
            createUserFlag: {
                type: Number,
                default: 1
            },
            columns: null
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .report-title {
        text-align: center
    }

</style>
