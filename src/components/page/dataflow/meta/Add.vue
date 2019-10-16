<template>
    <div class="addMeta">
        <el-dialog title="增加元数据" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i>元数据信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="应用id:" prop="appid">
                                    <el-autocomplete v-model="addInfo.appid" size="small"
                                                     :fetch-suggestions="getAllAppid"></el-autocomplete>
                                </el-form-item>
                                <el-form-item label="数据名称:" prop="dataName">
                                    <el-input v-model="addInfo.dataName" size="small" maxlength="100"></el-input>
                                </el-form-item>
                                <el-form-item label="数据采集渠道:" prop="readerType">
                                    <el-select v-model="addInfo.readerType" size="small" clearable>
                                        <el-option label="1-HTTP IN" value="1"></el-option>
                                        <el-option label="2-HTTP OUT" value="2"></el-option>
                                        <el-option label="3-FTP" value="3"></el-option>
                                        <el-option label="4-中间库" value="4"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="文件名(表名):" prop="destName">
                                    <el-input v-model="addInfo.destName" size="small" maxlength="100"></el-input>
                                </el-form-item>
                                <el-form-item label="用户名:" prop="username">
                                    <el-input v-model="addInfo.username" size="small" maxlength="100"></el-input>
                                </el-form-item>
                                <el-form-item label="cron表达式:" prop="cron">
                                    <el-input v-model="addInfo.cron" size="small" maxlength="100"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="保存形式:" prop="writerType">
                                    <el-select v-model="addInfo.writerType" size="small" clearable>
                                        <el-option label="1-MySql" value="1"></el-option>
                                        <el-option label="2-文件" value="2"></el-option>
                                        <el-option label="3-HBase" value="3"></el-option>
                                        <el-option label="4-Hive" value="4"></el-option>
                                        <el-option label="5-Kafka" value="5"></el-option>
                                        <el-option label="6-ES" value="6"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="http地址:" prop="readUrl">
                                    <el-input v-model="addInfo.readUrl" size="small" maxlength="200"></el-input>
                                </el-form-item>
                                <el-form-item label="增量标志:" prop="addFlag">
                                    <el-select v-model="addInfo.addFlag" size="small" clearable>
                                        <el-option label="1-全量" value="1"></el-option>
                                        <el-option label="2-增量" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="增量条件字段:" prop="addColumn">
                                    <el-input v-model="addInfo.addColumn" size="small" maxlength="100"></el-input>
                                </el-form-item>
                                <el-form-item label="数据库地址:" prop="dbUrl">
                                    <el-input v-model="addInfo.dbUrl" size="small" maxlength="200"></el-input>
                                </el-form-item>
                                <el-form-item label="密码:" prop="password">
                                    <el-input v-model="addInfo.password" size="small" maxlength="100"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <span>
                        <i class="el-icon-edit"></i>元数据字段信息:</span>
                        <hr class="split"/>
                        <el-row :gutter="20">
                            <el-col :span="20">
                            <span><el-button type="primary"
                                             size="mini"
                                             icon="el-icon-circle-plus-outline"
                                             @click="showAddColumn">增加字段</el-button></span>
                                <el-table :data="columnMeta" border style="width: 100%" height="400">
                                    <el-table-column prop="colName" label="字段名" width="100"></el-table-column>
                                    <el-table-column prop="colLength" label="字段长度" width="150"></el-table-column>
                                    <el-table-column prop="comment" label="注释" width="300"></el-table-column>
                                    <el-table-column fixed="right" label="操作" width="100">
                                        <template slot-scope="scope">
                                            <el-tooltip effect="dark" content="删除" placement="top" :open-delay="tooltipOpenDelay">
                                                <el-button type="text" icon="el-icon-remove-outline"
                                                           @click="del(scope.$index, scope.row)">
                                                </el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="add">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="增加字段" :visible.sync="addColumnFormVisible">
            <el-form :model="columnInfo" :rules="columnRules" ref="addColumnForm" label-position="left"
                     label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 字段信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item label="字段名:" prop="colName">
                                    <el-input v-model="columnInfo.colName" size="small" maxlength="100"></el-input>
                                </el-form-item>
                                <el-form-item label="字段长度:" prop="colLength">
                                    <el-input v-model.number="columnInfo.colLength" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="注释:" prop="comment">
                                    <el-input v-model="columnInfo.comment" type="textarea" size="small"
                                              maxlength="255"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="addColumn">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="addColumnFormVisible=false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Add",
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                addInfo: {},
                addRules: {},
                columnMeta: [],
                addColumnFormVisible: false,
                columnInfo: {},
                columnRules: {},
                allAppid: [],
                timeout: null,
                tooltipOpenDelay:1000
            }
        },
        methods: {
            add() {
                let self = this
                let validRet = false
                self.$refs['addForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let input = self.addInfo
                input.columnMeta = self.columnMeta
                self.$http
                    .post('/eops/df/meta/add', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '增加信息成功',
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
            },
            showAddColumn() {
                this.addColumnFormVisible = true;
            },
            addColumn() {
                let newCol = Object.assign({}, this.columnInfo)
                this.columnInfo = {}
                this.columnMeta.push(newCol)
                this.addColumnFormVisible = false;
            },
            del(index, row) {
                this.columnMeta.splice(index, 1)
            },
            getAllAppid(queryString, cb) {
                let self = this
                let input = {}
                let results = []
                self.$http
                    .post('/eops/sys/app/getAllAppid', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.allAppid = pkgOut.data

                        for (let index = 0; index < self.allAppid.length; index++) {
                            let item = {
                                value: self.allAppid[index]
                            }
                            results.push(item)
                        }

                        results = queryString ? results.filter(self.createFilter(queryString)) : results;
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
                clearTimeout(self.timeout);
                self.timeout = setTimeout(() => {
                    cb(results);
                }, 500 * Math.random());
            },
            createFilter(queryString) {
                return (results) => {
                    return (results.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
                };
            },
            modalClose() {
                let afterAddInfo = JSON.parse(JSON.stringify(this.addInfo))
                this.addInfo = {}
                this.$emit('afterClose', afterAddInfo)
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
