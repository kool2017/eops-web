<template>
    <el-dialog title="增加参数" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left"
                 label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 字段信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <el-form-item label="参数字段:" prop="reportParam">
                                <el-input v-model="addInfo.reportParam" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="参数控件类型:" prop="paramType">
                                <el-select v-model="addInfo.paramType" size="small" clearable
                                           style="width:100px">
                                    <el-option label="1-文本框" value="1"></el-option>
                                    <el-option label="2-文本域" value="2"></el-option>
                                    <el-option label="3-日期" value="3"></el-option>
                                    <el-option label="4-单选框" value="4"></el-option>
                                    <el-option label="5-复选框" value="5"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="参数名称:" prop="paramName">
                                <el-input v-model="addInfo.paramName" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="默认值:" prop="defaultValue">
                                <el-input type="textarea" v-model="addInfo.defaultValue" size="small" maxlength="255"></el-input>
                            </el-form-item>
                            <el-form-item label="值域:" prop="valueRange">
                                <el-input type="textarea" v-model="addInfo.valueRange" size="small" maxlength="255"></el-input>
                            </el-form-item>
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
</template>

<script>
    export default {
        name: "AddParam",
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
                afterAddInfo: {}
            }
        },
        methods: {
            add() {
                this.afterAddInfo = JSON.parse(JSON.stringify(this.addInfo))
                this.modalClose()
            },
            modalClose() {
                this.addInfo = {}
                this.$emit('afterClose', this.afterAddInfo)
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
