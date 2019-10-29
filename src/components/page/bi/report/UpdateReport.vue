<template>
    <div class="updateReport">
        <el-dialog title="修改报表" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" label-position="left"
                     label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i>报表信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <div class="edit-info">
                                    <el-form-item label="报表码:" prop="reportCode" label-width="130px">
                                        <el-input v-model="updateInfo.reportCode" size="small"
                                                  maxlength="100"></el-input>
                                    </el-form-item>
                                    <el-form-item label="名称:" prop="reportName" label-width="130px">
                                        <el-input v-model="updateInfo.reportName" size="small"
                                                  maxlength="100"></el-input>
                                    </el-form-item>
                                    <el-form-item label="报表类型:" prop="reportType" label-width="130px">
                                        <el-select v-model="updateInfo.reportType" size="small" clearable>
                                            <el-option v-for="item in reportTypeEnum" :key="item.code"
                                                       :label="item.desc"
                                                       :value="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="标题:" prop="title" label-width="130px">
                                        <el-input v-model="updateInfo.title" size="small" maxlength="100"></el-input>
                                    </el-form-item>
                                    <el-form-item label="是否展示标题日期:" prop="titleDateFlag" label-width="130px">
                                        <el-select v-model="updateInfo.titleDateFlag" size="small" clearable
                                                   style="width:100px">
                                            <el-option v-for="item in flagEnum" :key="item.code" :label="item.desc"
                                                       :value="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="标题日期类型:" prop="titleDateType" label-width="130px">
                                        <el-select v-model="updateInfo.titleDateType" size="small" clearable>
                                            <el-option v-for="item in titleDateTypeEnum" :key="item.code"
                                                       :label="item.desc"
                                                       :value="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="是否展示报表编号:" prop="reportNoFlag" label-width="130px">
                                        <el-select v-model="updateInfo.reportNoFlag" size="small" clearable
                                                   style="width:100px">
                                            <el-option v-for="item in flagEnum" :key="item.code" :label="item.desc"
                                                       :value="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="是否展示制表时间:" prop="createDateFlag" label-width="130px">
                                        <el-select v-model="updateInfo.createDateFlag" size="small" clearable
                                                   style="width:100px">
                                            <el-option v-for="item in flagEnum" :key="item.code" :label="item.desc"
                                                       :value="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="是否展示制表人:" prop="createUserFlag" label-width="130px">
                                        <el-select v-model="updateInfo.createUserFlag" size="small" clearable
                                                   style="width:100px">
                                            <el-option v-for="item in flagEnum" :key="item.code" :label="item.desc"
                                                       :value="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <div v-if="updateInfo.reportType == 1">
                                        <el-form-item label="是否展示序号:" prop="seqFlag" label-width="130px">
                                            <el-select v-model="updateInfo.seqFlag" size="small" clearable
                                                       style="width:100px">
                                                <el-option v-for="item in flagEnum" :key="item.code" :label="item.desc"
                                                           :value="item.code"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                    <el-form-item label="sql:" prop="sql" label-width="130px">
                                        <el-input type="textarea" v-model="updateInfo.sql"></el-input>
                                    </el-form-item>
                                    <span><i class="el-icon-edit"></i>字段信息:</span>
                                    <hr class="split"/>
                                    <span><el-button type="primary"
                                                     size="mini"
                                                     icon="el-icon-circle-plus-outline"
                                                     @click="showAddColumn">增加字段</el-button></span>

                                    <el-table :data="updateInfo.columns" border style="width: 100%" height="400">
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

                                    <el-table :data="updateInfo.params" border style="width: 100%" height="400">
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
                                <div v-if="updateInfo.reportType == 1">
                                    <report-table :title-date-flag="updateInfo.titleDateFlag"
                                                  :title="updateInfo.title"
                                                  :report-no-flag="updateInfo.reportNoFlag"
                                                  :create-date-flag="updateInfo.createDateFlag"
                                                  :create-user-flag="updateInfo.createUserFlag"
                                                  :seq-flag="updateInfo.seqFlag"
                                                  :columns="updateInfo.columns"></report-table>
                                </div>
                                <div v-else-if="updateInfo.reportType == 2">
                                    <report-form :title-date-flag="updateInfo.titleDateFlag"
                                                 :title="updateInfo.title"
                                                 :report-no-flag="updateInfo.reportNoFlag"
                                                 :create-date-flag="updateInfo.createDateFlag"
                                                 :create-user-flag="updateInfo.createUserFlag"
                                                 :columns="updateInfo.columns"></report-form>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="update">确 定</el-button>
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
    import reportForm from "./ReportForm";
    import reportTable from "./ReportTable";
    import {getReportTypeEnum, getFlagEnum, getDateTypeEnum, getParamTypeDesc} from '../../../../enum/BiEnum'

    export default {
        components: {addColumn, addParam, reportForm, reportTable},
        name: "UpdateReport",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            updateInfo: {
                id: null,
                reportType: null,
                reportCode: null,
                reportName: null,
                titleDateFlag: null,
                titleDateType: null,
                title: null,
                reportNoFlag: null,
                createDateFlag: null,
                createUserFlag: null,
                seqFlag: null,
                columns: null,
                params: []
            },
        },
        data() {
            return {
                reportTypeEnum: getReportTypeEnum(),
                flagEnum: getFlagEnum(),
                titleDateTypeEnum: getDateTypeEnum(),
                updateRules: {},
                addColumnFormVisible: false,
                addParamFormVisible: false,
                tooltipOpenDelay: 1000
            }
        },
        methods: {
            update() {
                let self = this
                let validRet = false
                self.$refs['updateForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let json = {
                    reportType: self.updateInfo.reportType,
                    titleDate: {
                        flag: self.updateInfo.titleDateFlag,
                        type: self.updateInfo.titleDateType
                    },
                    title: self.updateInfo.title,
                    reportNoFlag: self.updateInfo.reportNoFlag,
                    createDateFlag: self.updateInfo.createDateFlag,
                    createUserFlag: self.updateInfo.createUserFlag,
                    seqFlag: self.updateInfo.seqFlag,
                    col: self.updateInfo.columns
                }
                let input = {
                    id: self.updateInfo.id,
                    reportCode: self.updateInfo.reportCode,
                    reportName: self.updateInfo.reportName,
                    reportType: self.updateInfo.reportType,
                    sql: self.updateInfo.sql,
                    json: JSON.stringify(json),
                    reportParams: self.updateInfo.params
                }
                self.$http
                    .post('/eops/bi/report/update', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '修改报表成功',
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
                    this.updateInfo.columns.push(val)
                }
            },
            deleteColumn(index, row) {
                this.updateInfo.columns.splice(index, 1)
            },
            showAddParam() {
                this.addParamFormVisible = true
            },
            addParam(val) {
                if (val != null) {
                    val.paramType_str = getParamTypeDesc(val.paramType)
                    this.updateInfo.params.push(val)
                }
            },
            deleteParam(index, row) {
                this.updateInfo.params.splice(index, 1)
            },
            modalClose() {
                let afterUpdateInfo = JSON.parse(JSON.stringify(this.updateInfo))
                this.$emit('afterClose', afterUpdateInfo)
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
