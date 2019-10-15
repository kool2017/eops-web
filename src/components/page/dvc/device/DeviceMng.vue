<template>
    <div class="deviceMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                设备名称:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.deviceName" size="small" maxlength="8"></el-input>
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
                            <el-table-column prop="id" label="序号" width="80"></el-table-column>
                            <el-table-column prop="deviceName" label="设备名称" width="150"></el-table-column>
                            <el-table-column prop="deviceType" label="设备类型" width="100"></el-table-column>
                            <el-table-column prop="location" label="位置" width="150"></el-table-column>
                            <el-table-column prop="startTime" label="开始使用时间" width="150"></el-table-column>
                            <el-table-column prop="repairTimes" label="维修次数" width="100"></el-table-column>
                            <el-table-column prop="state_str" label="状态" width="80"></el-table-column>
                            <el-table-column prop="createdTime_str" label="创建时间" width="160"></el-table-column>
                            <el-table-column prop="updatedTime_str" label="更新时间" width="160"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper"
                                           @size-change="handleSizeChange"
                                           @current-change="handleCurrentChange" :page-size="page.pageSize"
                                           :total="page.total" :page-count="page.pageCount"
                                           :current-page="page.currentPage"
                                           :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showAdd">增加</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="showUpdate"
                           :disabled="isDisabled">修改
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del" :disabled="isDisabled">删除
                </el-button>
            </el-col>
        </el-row>
        <add-dvc :visible.sync="addFormVisible" @afterClose="refresh"></add-dvc>
        <update-dvc :visible.sync="updateFormVisible" :update-info="updateInitInfo"
                    @afterClose="refresh"></update-dvc>
    </div>
</template>

<script>
    import addDvc from './Add'
    import updateDvc from './Update'

    export default {
        components: {addDvc, updateDvc},
        name: "DeviceMng",
        data() {
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
                    .post('/eops/device/get_page', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.retList = pkgOut.data
                        self.page.total = pkgOut.total
                        self.page.pageCount = pkgOut.pageCount
                        for (let index = 0; index < self.retList.length; index++) {
                            let element = self.retList[index]
                            element.createdTime_str = self.$moment(element.createdTime).format('YYYY-MM-DD HH:mm:ss')
                            element.updatedTime_str = self.$moment(element.updatedTime).format('YYYY-MM-DD HH:mm:ss')
                            element.state_str = self.stateStr(element.state)
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
            selectOne(row) {
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
                self.$confirm('是否删除设备信息[' + self.selectedInfo.deviceName + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = self.selectedInfo
                    self.$http
                        .post('/eops/device/delete', input)
                        .then((res) => {
                            self.init()
                            self.query()
                            self.$message({
                                message: '删除成功',
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
            },
            stateStr(state) {
                let stateStr = ''
                if (state == 1) {
                    stateStr = '正常'
                } else if (state == 2) {
                    stateStr = '维修中'
                } else if (state == 3) {
                    stateStr = '损坏'
                } else if (state == 4) {
                    stateStr = '报废'
                }
                return stateStr;
            }
        }
    }

</script>

<style scoped>

</style>
