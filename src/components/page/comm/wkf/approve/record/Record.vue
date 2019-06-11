<template>
    <div class="record">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                工作流流水号:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.wkfNbr" size="small" maxlength="16"> </el-input>
                            </el-col>
                            <el-col :span="3">
                                关联业务流水号:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.businessId" size="small" maxlength="60"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                关联业务类型:
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="condition.businessType" size="small" clearable>
                                    <el-option label="SYUSRMNG00-用户管理" value="SYUSRMNG00"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" size="small" icon="el-icon-search" @click="query">查询</el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="2">
                                执行状态:
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="condition.state" size="small" clearable>
                                    <el-option label="ERR:出错中断" value="ERR"></el-option>
                                    <el-option label="FAT:主干流程中" value="FAT"></el-option>
                                    <el-option label="FIN:完成" value="FIN"></el-option>
                                    <el-option label="SUB:分支流程中" value="SUB"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3">
                                开始时间起:
                            </el-col>
                            <el-col :span="3">
                                <el-date-picker v-model="condition.timeBeginMin" size="small" type="datetime" value-format="timestamp" style="width:100%">
                                </el-date-picker>
                            </el-col>
                            <el-col :span="2">
                                开始时间止:
                            </el-col>
                            <el-col :span="3">
                                <el-date-picker v-model="condition.timeBeginMax" size="small" type="datetime" value-format="timestamp" style="width:100%">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="list-card">
                    <span>
                        <i class="el-icon-tickets"></i> 列表: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-table :data="retList" border style="width: 100%" ref="retTable" highlight-current-row @current-change="selectOne" height="386" show-overflow-tooltip="true">
                            <el-table-column prop="wkfNbr" label="工作流流水号" width="120"></el-table-column>
                            <el-table-column prop="timeBegin_T" label="流程开始时间" width="160"></el-table-column>
                            <el-table-column prop="timeEnd_T" label="流程结束时间" width="160"></el-table-column>
                            <el-table-column prop="entityCid" label="实例编号" width="100"></el-table-column>
                            <el-table-column prop="businessId" label="关联业务流水号" width="150"></el-table-column>
                            <el-table-column prop="businessType_G" label="关联业务类型" width="200"></el-table-column>
                            <el-table-column prop="nodeHeadName" label="首结点名称" width="150"></el-table-column>
                            <el-table-column prop="startLoginName" label="发起人登录名" width="150"></el-table-column>
                            <el-table-column prop="endLoginName" label="完成人登录名" width="150"></el-table-column>
                            <el-table-column prop="state_G" label="执行状态" width="150"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="page.pageSize" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="cmd">
            <el-col>
                <!-- <el-button type="primary" size="small" icon="el-icon-view" @click="showDtl" :disabled="isDisabled">详情</el-button> -->
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            condition: {},
            retList: [],
            page: {
                pageSize: 10,
                total: 0,
                pageCount: 0,
                currentPage: 1
            },
            selectedInfo: {},
            isDisabled: true,
            labelPosition: 'left'
        }
    },
    created () {
        this.init()
        this.query()
    },
    methods: {
        queryPage () {
            let self = this
            var input = {
                CMQRYWKFRCDX: [self.condition],
                SYPAGEINFOY: [self.page]
            }
            self.$http
                .post('/comm/wkf/queryWkfRecordListPage', input)
                .then((res) => {
                    var pkgOut = res.data
                    self.retList = pkgOut.CMQRYWKFRCDZ
                    for (let index = 0; index < pkgOut.CMQRYWKFRCDZ.length; index++) {
                        const element = pkgOut.CMQRYWKFRCDZ[index];
                        if (element.timeBegin != null) {
                            element.timeBegin_T = self.$moment(Number(element.timeBegin)).format('YYYY-MM-DD HH:mm:ss')
                        }
                        if (element.timeEnd != null) {
                            element.timeEnd_T = self.$moment(Number(element.timeEnd)).format('YYYY-MM-DD HH:mm:ss')
                        }
                    }
                    self.page = pkgOut.SYPAGEINFOY[0]
                })
                .catch((err) => {
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定'
                    })
                })
        },
        query () {
            this.page = {
                pageSize: 10,
                total: 0,
                pageCount: 0,
                currentPage: 1
            }
            this.queryPage();
        },
        handleSizeChange (pageSize) {
            let self = this
            self.page.pageSize = pageSize
            self.page.currentPage = 1
            self.queryPage()
        },
        handleCurrentChange (currentPage) {
            let self = this
            self.page.currentPage = currentPage
            self.queryPage()
        },
        selectOne (val) {
            this.selectedInfo = val
            if (val == null) {
                this.isDisabled = true
            } else {
                this.isDisabled = false
            }
        },
        showDtl () {

        },
        init () {
            this.addInfo = {}
            this.updateInfo = {}
            this.selectedInfo = {}
            this.isDisabled = true
            this.addFormVisible = false
            this.updateFormVisible = false
        }
    }
}
</script>
<style scoped>
</style>
