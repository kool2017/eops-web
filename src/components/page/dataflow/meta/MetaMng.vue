<template>
    <div class="metaMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="3">
                                应用id:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.appid" size="small" maxlength="20"></el-input>
                            </el-col>
                            <el-col :span="4">
                                数据唯一标识码:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.dataKey" size="small" maxlength="100"></el-input>
                            </el-col>
                            <el-col :span="3">
                                数据名称:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.dataName" size="small" maxlength="100"></el-input>
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
                            <el-table-column prop="appid" label="应用id" width="100"></el-table-column>
                            <el-table-column prop="dataKey" label="数据唯一标识码" width="120"></el-table-column>
                            <el-table-column prop="dataName" label="数据名称" width="200"></el-table-column>
                            <el-table-column prop="addFlag_str" label="增量标志" width="100"></el-table-column>
                            <el-table-column prop="addColumn" label="增量字段" width="100"></el-table-column>
                            <el-table-column prop="readerType_str" label="数据采集渠道" width="120"></el-table-column>
                            <el-table-column prop="readUrl" label="http地址" width="400"></el-table-column>
                            <el-table-column prop="writerType_str" label="保存形式" width="100"></el-table-column>
                            <el-table-column prop="destName" label="文件名(表名)" width="120"></el-table-column>
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
        <add-meta :visible.sync="addFormVisible" @afterClose="refresh"></add-meta>
        <update-meta :visible.sync="updateFormVisible" :update-info="updateInitInfo"
                     @afterClose="refresh"></update-meta>
    </div>
</template>
<script>
    import addMeta from './Add'
    import updateMeta from './Update'

    export default {
        name: "AppMng",
        components: {addMeta, updateMeta},
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
                    .post('/eops/df/meta/getPage', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.retList = pkgOut.data
                        self.page.total = pkgOut.total
                        self.page.pageCount = pkgOut.pageCount
                        for (let index = 0; index < self.retList.length; index++) {
                            const element = self.retList[index];
                            if (element.readerType != null) {
                                element.readerType_str = self.readerTypeStr(element.readerType)
                            }
                            if (element.writerType != null) {
                                element.writerType_str = self.writerTypeStr(element.writerType)
                            }
                            if (element.addFlag != null) {
                                element.addFlag_str = self.addFlagStr(element.addFlag)
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
                self.$confirm('是否删除元数据[' + self.selectedInfo.dataName + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = {
                        id: self.selectedInfo.id
                    }
                    self.$http
                        .post('/eops/df/meta/delete', input)
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
            readerTypeStr(readerType) {
                let readerTypeStr = ''
                if (readerType == 1) {
                    readerTypeStr = 'HTTP IN'
                } else if (readerType == 2) {
                    readerTypeStr = 'HTTP OUT'
                } else if (readerType == 3) {
                    readerTypeStr = 'FTP'
                } else if (readerType == 4) {
                    readerTypeStr = '中间库'
                }
                return readerTypeStr;
            },
            writerTypeStr(writerType) {
                let writerTypeStr = ''
                if (writerType == 1) {
                    writerTypeStr = 'MySql'
                } else if (writerType == 2) {
                    writerTypeStr = '文件'
                } else if (writerType == 3) {
                    writerTypeStr = 'HBase'
                } else if (writerType == 4) {
                    writerTypeStr = 'Hive'
                } else if (writerType == 5) {
                    writerTypeStr = 'Kafka'
                } else if (writerType == 6) {
                    writerTypeStr = 'ES'
                }
                return writerTypeStr;
            },
            addFlagStr(addFlag) {
                let addFlagStr = ''
                if (addFlag == 1) {
                    addFlagStr = '全量'
                } else if (addFlag == 2) {
                    addFlagStr = '增量'
                }
                return addFlagStr;
            }
        }
    }
</script>
<style scoped>
</style>
