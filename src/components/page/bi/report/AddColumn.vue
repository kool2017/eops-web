<template>
    <el-dialog title="增加字段" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="columnRules" ref="addColumnForm" label-position="left"
                 label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 字段信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <el-form-item label="字段名:" prop="name">
                                <el-input v-model="addInfo.name" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="字段定义:" prop="key">
                                <el-input v-model="addInfo.key" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="addColumn">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "AddColumn",
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                addInfo: {},
                columnRules: {},
                afterAddInfo: {}
            }
        },
        methods: {
            addColumn() {
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
