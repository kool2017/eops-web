<template>
    <div class="taskMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                任务类型:
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="condition.taskType" size="small" clearable>
                                    <el-option v-for="item in taskTypeEnum" :key="item.code" :label="item.desc"
                                               :value="item.code"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3">
                                任务名称:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.taskName" size="small" maxlength="100"></el-input>
                            </el-col>
                            <el-col :span="3">
                                任务配置状态:
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="condition.state" size="small" clearable>
                                    <el-option v-for="item in stateEnum" :key="item.code" :label="item.desc"
                                               :value="item.code"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" size="small" icon="el-icon-search" @click="query">查询
                                </el-button>
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
                    <hr class="split"/>
                    <div class="card-context">
                        <el-table :data="retList" border style="width: 100%" ref="retTable" highlight-current-row
                                  @current-change="selectOne" height="400">
                            <el-table-column prop="taskType_str" label="任务类型" width="120"></el-table-column>
                            <el-table-column prop="taskName" label="任务名称" width="150"></el-table-column>
                            <el-table-column prop="cron" label="cron表达式" width="150"></el-table-column>
                            <el-table-column prop="refId" label="关联id" width="120"></el-table-column>
                            <el-table-column prop="httpUrl" label="http请求url" width="200"></el-table-column>
                            <el-table-column prop="appid" label="应用id" width="100"></el-table-column>
                            <el-table-column prop="state_str" label="任务配置状态" width="120"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper"
                                           @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                           :page-size="page.pageSize" :total="page.total" :page-count="page.pageCount"
                                           :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showAdd">增加</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="showUpdate" :disabled="isDisabled">
                    修改
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del" :disabled="isDisabled">关闭
                </el-button>
            </el-col>
        </el-row>
        <add-task :visible.sync="addFormVisible" @afterClose="refresh"></add-task>
        <update-task :visible.sync="updateFormVisible" :update-info="updateInitInfo"
                     @afterClose="refresh"></update-task>
    </div>
</template>
<script>
    import addTask from './Add'
    import updateTask from './Update'
    import {getTaskTypeEnum, getTaskTypeDesc, getTaskCfgStateEnum, getTaskCfgStateDesc} from '../../../../enum/SysEnum'

    export default {
        name: "AppMng",
        components: {addTask, updateTask},
        data() {
            return {
                taskTypeEnum: getTaskTypeEnum(),
                stateEnum: getTaskCfgStateEnum(),
                condition: {},
                retList: [],
                page: {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                },
                selectedInfo: {},
                updateInitInfo: {},
                addFormVisible: false,
                updateFormVisible: false,
                isDisabled: true
            }
        },
        created() {
            this.init()
            this.query()
        },
        methods: {
            init() {
                this.selectedInfo = {}
                this.addFormVisible = false
                this.updateFormVisible = false
                this.isDisabled = true
            },
            refresh() {
                this.query()
            },
            query() {
                this.page = {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                }
                this.queryPage();
            },
            queryPage() {
                let self = this
                var input = Object.assign({}, self.condition)
                input.currentPage = self.page.currentPage
                input.pageSize = self.page.pageSize
                self.$http
                    .post('/eops/sys/task/get_task_page', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.retList = pkgOut.data
                        self.page.total = pkgOut.total
                        self.page.pageCount = pkgOut.pageCount
                        for (let index = 0; index < self.retList.length; index++) {
                            const element = self.retList[index];
                            if (element.state != null) {
                                element.state_str = getTaskCfgStateDesc(element.state)
                            }
                            if (element.taskType != null) {
                                element.taskType_str = getTaskTypeDesc(element.taskType)
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            },
            handleSizeChange(pageSize) {
                let self = this
                self.page.pageSize = pageSize
                self.page.currentPage = 1
                self.queryPage()
            },
            handleCurrentChange(currentPage) {
                let self = this
                self.page.currentPage = currentPage
                self.queryPage()
            },
            selectOne(row, column, event) {
                this.selectedInfo = row
                if (row == null) {
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
            },
            showAdd() {
                this.addFormVisible = true
            },
            showUpdate() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabled = true
                    return
                }
                self.updateInitInfo = Object.assign({}, self.selectedInfo)
                self.updateFormVisible = true
            },
            del() {
                let self = this
                self.$confirm('是否关闭任务[' + self.selectedInfo.taskName + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = {
                        id: self.selectedInfo.id
                    }
                    self.$http
                        .post('/eops/sys/task/close', input)
                        .then((res) => {
                            self.init()
                            self.query()
                            self.$message({
                                message: '关闭成功',
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
                }).catch((erro) => {
                })
            }
        }
    }
</script>
<style scoped>
</style>
