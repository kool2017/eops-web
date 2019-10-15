<template>
    <div class="catalogMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="2">
                                费用项码:
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="condition.catalogCode" size="small" maxlength="20"></el-input>
                            </el-col>
                            <el-col :span="2">
                                产品码:
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="condition.productCode" size="small" maxlength="100"></el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" size="small" icon="el-icon-search" @click="query">查询
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="2">
                                生效日期起:
                            </el-col>
                            <el-col :span="4">
                                <el-date-picker v-model="condition.enableDateFrom" type="date" placeholder="选择日期" size="small"></el-date-picker>
                            </el-col>
                            <el-col :span="2">
                                生效日期止:
                            </el-col>
                            <el-col :span="4">
                                <el-date-picker v-model="condition.enableDateTo" type="date" placeholder="选择日期" size="small"></el-date-picker>
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
                            <el-table-column prop="catalogCode" label="费用项码" width="120"></el-table-column>
                            <el-table-column prop="catalogName" label="名称" width="150"></el-table-column>
                            <el-table-column prop="units_str" label="计量单位" width="100"></el-table-column>
                            <el-table-column prop="price" label="单价(分)" width="100"></el-table-column>
                            <el-table-column prop="productCode" label="产品码" width="150"></el-table-column>
                            <el-table-column prop="costMode_str" label="计费模式" width="100"></el-table-column>
                            <el-table-column prop="enableTime_str" label="生效时间" width="200"></el-table-column>
                            <el-table-column prop="disableTime_str" label="失效时间" width="200"></el-table-column>
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
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del" :disabled="isDisabled">删除
                </el-button>
            </el-col>
        </el-row>
        <add-app :visible.sync="addFormVisible" @afterClose="refresh"></add-app>
        <update-app :visible.sync="updateFormVisible" :update-info="updateInitInfo"
                    @afterClose="refresh"></update-app>
    </div>
</template>
<script>
    import addApp from './Add'
    import updateApp from './Update'

    export default {
        name:"CatalogMng",
        components: {addApp, updateApp},
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
                    .post('/eops/cs/catalog/getPage', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.retList = pkgOut.data
                        self.page.total = pkgOut.total
                        self.page.pageCount = pkgOut.pageCount
                        for (let index = 0; index < self.retList.length; index++) {
                            const element = self.retList[index];
                            element.enableTime_str = self.$moment(element.enableTime).format('YYYY-MM-DD HH:mm:ss')
                            if (element.disableTime != null) {
                                element.disableTime_str = self.$moment(element.disableTime).format('YYYY-MM-DD HH:mm:ss');
                            }
                            if (element.units != null) {
                                element.units_str = self.unitsStr(element.units)
                            }
                            if (element.costMode != null) {
                                element.costMode_str = self.costModeStr(element.costMode)
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
                self.$confirm('是否删除费用项[' + self.selectedInfo.catalogName + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = self.selectedInfo
                    self.$http
                        .post('/eops/cs/catalog/delete', input)
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
            unitsStr(units) {
                let unitsStr = ''
                if (units == 1) {
                    unitsStr = '次'
                } else if (units == 2) {
                    unitsStr = '秒'
                } else if (units == 3) {
                    unitsStr = '十次'
                } else if (units == 4) {
                    unitsStr = '百次'
                }
                return unitsStr;
            },
            costModeStr(costMode) {
                let costModeStr = ''
                if (costMode == 1) {
                    costModeStr = '按次计费'
                } else if (costMode == 2) {
                    costModeStr = '按时长计费'
                }
                return costModeStr;
            }
        }
    }
</script>
<style scoped>
</style>
