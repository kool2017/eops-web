<template>
    <div class="paramMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                参数码:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.paramCode" size="small" maxlength="20"></el-input>
                            </el-col>
                            <el-col :span="2">
                                根参数:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.rootCode" size="small" maxlength="20"></el-input>
                            </el-col>
                            <el-col :span="2">
                                父参数:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.fatherCode" size="small" maxlength="20"></el-input>
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
                            <el-table-column prop="paramCode" label="参数编码" width="150"></el-table-column>
                            <el-table-column prop="paramKey" label="参数键" width="150"></el-table-column>
                            <el-table-column prop="paramValue" label="参数值" width="150"></el-table-column>
                            <el-table-column prop="paramName" label="参数名称" width="300"></el-table-column>
                            <el-table-column prop="rootCode" label="根参数" width="150"></el-table-column>
                            <el-table-column prop="fatherCode" label="父参数" width="150"></el-table-column>
                            <el-table-column prop="deep" label="深度" width="80"></el-table-column>
                            <el-table-column prop="seq" label="序号" width="80"></el-table-column>
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
                <el-button type="primary" size="small" icon="el-icon-edit" @click="showUpdate"
                           :disabled="isDisabled">修改
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del" :disabled="isDisabled">删除
                </el-button>
            </el-col>
        </el-row>
        <add-param :visible.sync="addFormVisible" @afterClose="refresh"></add-param>
        <update-param :visible.sync="updateFormVisible" :update-info="updateInitInfo"
                      @afterClose="refresh"></update-param>
    </div>
</template>
<script>
    import addParam from './Add'
    import updateParam from './Update'

    export default {
        components: {addParam, updateParam},
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
                this.addInfo = {}
                this.updateInfo = {}
                this.selectedInfo = {}
                this.isDisabled = true
                this.addFormVisible = false
                this.updateFormVisible = false
            },
            refresh() {
                this.query()
            },
            queryPage() {
                let self = this
                var input = self.condition
                input.currentPage = self.page.currentPage
                input.pageSize = self.page.pageSize
                self.$http
                    .post('/eops/sys/param/getPage', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.retList = pkgOut.data
                    })
                    .catch((err) => {
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
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
            selectOne(val) {
                this.selectedInfo = val
                if (val == null) {
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
                self.$confirm('是否删除参数[' + self.selectedInfo.paramName + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = self.selectedInfo
                    self.$http
                        .post('/eops/sys/param/delete', input)
                        .then((res) => {
                            self.init()
                            self.query()
                            self.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                        })
                        .catch((err) => {
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
