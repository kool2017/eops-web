<template>
    <div class="addReport">
        <el-dialog title="增加报表" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i>报表信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <div class="edit-info">
                                    <el-form-item label="报表码:" prop="reportCode" label-width="130px">
                                        <el-input v-model="addInfo.reportCode" size="small" maxlength="100"></el-input>
                                    </el-form-item>
                                    <el-form-item label="名称:" prop="reportName" label-width="130px">
                                        <el-input v-model="addInfo.reportName" size="small" maxlength="100"></el-input>
                                    </el-form-item>
                                    <el-form-item label="报表类型:" prop="reportType" label-width="130px">
                                        <el-select v-model="addInfo.reportType" size="small" clearable>
                                            <el-option label="1-列表" value="1"></el-option>
                                            <el-option label="2-表单" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="sql:" prop="sql" label-width="130px">
                                        <el-input type="textarea" v-model="addInfo.sql"></el-input>
                                    </el-form-item>
                                    <el-form-item label="是否展示标题日期:" prop="titleDateFlag" label-width="130px">
                                        <el-select v-model="addInfo.titleDateFlag" size="small" clearable
                                                   style="width:100px">
                                            <el-option label="1-是" value="1"></el-option>
                                            <el-option label="0-否" value="0"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="标题日期类型:" prop="titleDateType" label-width="130px">
                                        <el-select v-model="addInfo.titleDateType" size="small" clearable>
                                            <el-option label="1-日" value="1"></el-option>
                                            <el-option label="2-月" value="2"></el-option>
                                            <el-option label="3-季度" value="3"></el-option>
                                            <el-option label="4-年" value="4"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="标题:" prop="title" label-width="130px">
                                        <el-input v-model="addInfo.title" size="small" maxlength="100"></el-input>
                                    </el-form-item>
                                    <el-form-item label="是否展示报表编号:" prop="reportNoFlag" label-width="130px">
                                        <el-select v-model="addInfo.reportNoFlag" size="small" clearable
                                                   style="width:100px">
                                            <el-option label="1-是" value="1"></el-option>
                                            <el-option label="0-否" value="0"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="是否展示制表时间:" prop="createDateFlag" label-width="130px">
                                        <el-select v-model="addInfo.createDateFlag" size="small" clearable
                                                   style="width:100px">
                                            <el-option label="1-是" value="1"></el-option>
                                            <el-option label="0-否" value="0"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="是否展示制表人:" prop="createUserFlag" label-width="130px">
                                        <el-select v-model="addInfo.createUserFlag" size="small" clearable
                                                   style="width:100px">
                                            <el-option label="1-是" value="1"></el-option>
                                            <el-option label="0-否" value="0"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <div v-if="addInfo.reportType == 1">
                                        <el-form-item label="是否展示序号:" prop="seqFlag" label-width="130px">
                                            <el-select v-model="addInfo.seqFlag" size="small" clearable
                                                       style="width:100px">
                                                <el-option label="1-是" value="1"></el-option>
                                                <el-option label="0-否" value="0"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                    <span><i class="el-icon-edit"></i>字段信息:</span>
                                    <hr class="split"/>
                                    <span><el-button type="primary"
                                                     size="mini"
                                                     icon="el-icon-circle-plus-outline"
                                                     @click="showAddColumn">增加字段</el-button></span>

                                    <el-table :data="columns" border style="width: 100%" height="400">
                                        <el-table-column prop="name" label="字段名" width="100"></el-table-column>
                                        <el-table-column prop="key" label="字段定义" width="150"></el-table-column>
                                        <el-table-column fixed="right" label="操作" width="100">
                                            <template slot-scope="scope">
                                                <el-tooltip effect="dark" content="删除" placement="top"
                                                            :open-delay="tooltipOpenDelay">
                                                    <el-button type="text" icon="el-icon-remove-outline"
                                                               @click="deleteColumn(scope.$index, scope.row)">
                                                    </el-button>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <span><i class="el-icon-edit"></i>参数信息:</span>
                                    <hr class="split"/>
                                    <span><el-button type="primary"
                                                     size="mini"
                                                     icon="el-icon-circle-plus-outline"
                                                     @click="showAddParam">增加参数</el-button></span>

                                    <el-table :data="params" border style="width: 100%" height="400">
                                        <el-table-column prop="reportParam" label="参数字段" width="100"></el-table-column>
                                        <el-table-column prop="paramType_str" label="参数控件类型"
                                                         width="100"></el-table-column>
                                        <el-table-column prop="paramName" label="参数名称" width="100"></el-table-column>
                                        <el-table-column prop="defaultValue" label="默认值" width="150"></el-table-column>
                                        <el-table-column prop="valueRange" label="值域" width="150"></el-table-column>
                                        <el-table-column fixed="right" label="操作" width="100">
                                            <template slot-scope="scope">
                                                <el-tooltip effect="dark" content="删除" placement="top"
                                                            :open-delay="tooltipOpenDelay">
                                                    <el-button type="text" icon="el-icon-remove-outline"
                                                               @click="deleteParam(scope.$index, scope.row)">
                                                    </el-button>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div v-if="addInfo.reportType == '1'">
                                    <report-table :title-date-flag="addInfo.titleDateFlag"
                                                  :title="addInfo.title"
                                                  :report-no-flag="addInfo.reportNoFlag"
                                                  :create-date-flag="addInfo.createDateFlag"
                                                  :create-user-flag="addInfo.createUserFlag"
                                                  :seq-flag="addInfo.seqFlag"
                                                  :columns="columns"></report-table>
                                </div>
                                <div v-else-if="addInfo.reportType == '2'">
                                    <report-form :title-date-flag="addInfo.titleDateFlag"
                                                 :title="addInfo.title"
                                                 :report-no-flag="addInfo.reportNoFlag"
                                                 :create-date-flag="addInfo.createDateFlag"
                                                 :create-user-flag="addInfo.createUserFlag"
                                                 :columns="columns"></report-form>
                                </div>
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
        <add-column :visible.sync="addColumnFormVisible" @afterClose="addColumn"></add-column>
        <add-param :visible.sync="addParamFormVisible" @afterClose="addParam"></add-param>
    </div>
</template>

<script>
    import addColumn from './AddColumn'
    import addParam from './AddParam'
    import reportForm from "./ReportForm"
    import reportTable from "./ReportTable"

    export default {
        components: {addColumn, addParam, reportForm, reportTable},
        name: "AddReport",
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                addInfo: {
                    reportType: null,
                    reportCode: null,
                    reportName: null,
                    titleDateFlag: '1',
                    titleDateType: '1',
                    title: null,
                    reportNoFlag: '1',
                    createDateFlag: '1',
                    createUserFlag: '1',
                    seqFlag: '1',
                    json: {
                        titleDate: {
                            flag: '1',
                            type: null
                        }
                    }
                },
                addRules: {},
                columns: [],
                addColumnFormVisible: false,
                params: [],
                addParamFormVisible: false,
                tooltipOpenDelay: 1000
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
                let json = {
                    reportType: self.addInfo.reportType,
                    titleDate: {
                        flag: self.addInfo.titleDateFlag,
                        type: self.addInfo.titleDateType
                    },
                    title: self.addInfo.title,
                    reportNoFlag: self.addInfo.reportNoFlag,
                    createDateFlag: self.addInfo.createDateFlag,
                    createUserFlag: self.addInfo.createUserFlag,
                    seqFlag: self.addInfo.seqFlag,
                    col: self.columns
                }
                let input = {
                    reportCode: self.addInfo.reportCode,
                    reportName: self.addInfo.reportName,
                    reportType: self.addInfo.reportType,
                    sql: self.addInfo.sql,
                    json: JSON.stringify(json),
                    reportParams: self.params
                }
                self.$http
                    .post('/eops/bi/report/add', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '增加报表成功',
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
                this.addColumnFormVisible = true
            },
            addColumn(val) {
                if (val != null && val.name != null && val.key != null) {
                    this.columns.push(val)
                }
            },
            deleteColumn(index, row) {
                this.columns.splice(index, 1)
            },
            showAddParam() {
                this.addParamFormVisible = true
            },
            addParam(val) {
                if (val != null) {
                    val.paramType_str = this.paramTypeStr(val.paramType)
                    this.params.push(val)
                }
            },
            deleteParam(index, row) {
                this.params.splice(index, 1)
            },
            paramTypeStr(paramType) {
                let paramTypeStr = ''
                if (paramType == 1) {
                    paramTypeStr = '文本框'
                } else if (paramType == 2) {
                    paramTypeStr = '文本域'
                } else if (paramType == 3) {
                    paramTypeStr = '日期'
                } else if (paramType == 4) {
                    paramTypeStr = '单选框'
                } else if (paramType == 5) {
                    paramTypeStr = '复选框'
                }
                return paramTypeStr
            },
            modalClose() {
                let afterAddInfo = JSON.parse(JSON.stringify(this.addInfo))
                this.addInfo = {
                    reportType: null,
                    reportCode: null,
                    reportName: null,
                    titleDateFlag: '1',
                    titleDateType: '1',
                    title: null,
                    reportNoFlag: '1',
                    createDateFlag: '1',
                    createUserFlag: '1',
                    seqFlag: '1',
                    json: {
                        titleDate: {
                            flag: '1',
                            type: null
                        }
                    }}
                this.columns = []
                this.params = []
                this.$emit('afterClose', afterAddInfo)
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>
    .edit-info {
        height: 500px;
        overflow: auto;
    }
</style>
