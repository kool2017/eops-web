<template>
    <div class="examBook">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>检查预约中心</el-breadcrumb-item>
                <el-breadcrumb-item>检查单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row class="pageRow">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>诊断</span>
                    </div>
                    <el-row class="basicInfo-row">
                        <el-col :span="6">
                            <el-select v-model="basicInfo.typeSelected" disabled placeholder="请选择" size="mini">
                                <el-option v-for="item in basicInfo.typeList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-checkbox v-model="basicInfo.emgChecked">急诊</el-checkbox>
                        </el-col>
                        <el-col :span="3">
                            <el-checkbox v-model="basicInfo.treatChecked">治疗</el-checkbox>
                        </el-col>
                        <el-col :span="12">
                            特殊病种：
                            <el-select v-model="basicInfo.specialSelected" placeholder="请选择" size="mini">
                                <el-option v-for="item in basicInfo.specialList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="basicInfo-row">
                        <el-col :span="6">
                            病历号码：{{basicInfo.number}}
                        </el-col>
                        <el-col :span="6">
                            姓名：{{basicInfo.name}}
                        </el-col>
                        <el-col :span="6">
                            性别：{{basicInfo.gender}}
                        </el-col>
                        <el-col :span="6">
                            年龄：{{basicInfo.age}}
                        </el-col>
                    </el-row>
                    <el-row class="basicInfo-row">
                        <el-col :span="6">
                            医生：{{basicInfo.doctor}}
                        </el-col>
                        <el-col :span="6">
                            科室：{{basicInfo.depart}}
                        </el-col>
                    </el-row>
                    <el-row class="basicInfo-row">
                        <el-col :span="24">
                            诊断：
                            <el-input v-model="EXAM_ZD" placeholder="请输入内容" size="mini"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="basicInfo-row">
                        <el-col :span="24">
                            主述：
                            <el-input placeholder="请输入内容" v-model="EXAM_ZS" size="mini">
                                <el-button slot="append" icon="el-icon-search">主述维护</el-button>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row class="basicInfo-row" :gutter="10">
                        <el-col :span="12">
                            病史：
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="EXAM_BS">
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            查体：
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="EXAM_CT">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="pageRow">
            <el-col :span="24">
                <el-card class="box-card">
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="检查项目" name="first">
                            <el-table :data="submitData" style="width: 100%" :border=true>
                                <el-table-column prop="itemName" label="项目名称" width="180">
                                </el-table-column>
                                <el-table-column prop="amount" label="金额" width="180">
                                </el-table-column>
                                <el-table-column prop="remark" label="备注">
                                </el-table-column>
                                <el-table-column label="操作">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="已有检查项目" name="second">
                            <el-table :data="queryData" style="width: 100%" :border=true>
                                <el-table-column prop="doctor" label="开单医生" width="180">
                                </el-table-column>
                                <el-table-column prop="date" label="开单日期" width="180">
                                </el-table-column>
                                <el-table-column prop="patient" label="病人">
                                </el-table-column>
                                <el-table-column prop="examItem" label="检查项目">
                                </el-table-column>
                                <el-table-column prop="feeState" label="收费状态">
                                </el-table-column>
                                <el-table-column prop="examState" label="状态">
                                </el-table-column>
                                <el-table-column label="操作">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                    <el-row style="padding-top:3px">
                        <el-col :span="3">
                            <el-button type="primary" size="mini">增加检查项</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" size="mini">提交</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="增加检查项" :visible.sync="addFormVisible" :close-on-click-modal="closeOnclick">
            <el-form :model="examItemInfo">
                <el-form-item label="项目名称">
                    <el-input v-model="examItemInfo.examItem" auto-complete="off" maxlength=60></el-input>
                </el-form-item>
                <el-form-item label="金额">
                    <el-input v-model="examItemInfo.amount" auto-complete="off" maxlength=20></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="examItemInfo.remark" auto-complete="off" maxlength=100></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            basicInfo: {
                typeSelected: 'OP',
                typeList: [
                    {
                        label: '门诊',
                        value: 'OP'
                    },
                    {
                        label: '住院',
                        value: 'IP'
                    }
                ],
                emgChecked: false,
                treatChecked: false,
                specialSelected: '',
                specialList: [
                    {
                        label: '',
                        value: ''
                    }
                ],
                number: '999',
                name: '欧阳一',
                gender: '男',
                age: '30',
                doctor: '罗玲玲',
                depart: '呼吸内科病房'
            },
            EXAM_ZD: '',
            EXAM_ZS: '',
            EXAM_BS: '',
            EXAM_CT: '',
            activeTab: 'first',
            submitData: [
            ],
            queryData: [
            ],
            addFormVisible: false,
            closeOnclick: true,
            examItemInfo: {

            }
        }
    },
    methods: {
    }
}
</script>
<style scoped>
.clearfix {
  height: 10px;
  margin-top: 0px;
  padding-top: 0px;
}
.pageRow {
  padding-bottom: 5px;
}
.basicInfo-row {
  padding: 5px;
}
</style>
