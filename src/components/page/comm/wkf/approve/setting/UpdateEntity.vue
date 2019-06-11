<template>
    <el-dialog title="修改审批流" :visible.sync="thisFormVisible" :close-on-click-modal="false">
        <transition name="add-step">
            <div v-if="stepSeq==0">
                <el-form :model="addEntityInfo" :rules="addRules" ref="addForm" :label-position="labelPosition" label-width="120px">
                    <el-card>
                        <span>
                            <i class="el-icon-edit"></i> 请输入审批流信息:</span>
                        <hr class="split" />
                        <div class="card-context">
                            <el-row :gutter="10">
                                <el-col :span="10">
                                    <el-form-item label="实例名称:" prop="entityName">
                                        <el-input v-model="addEntityInfo.entityName" size="small" maxlength="60"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="实例匹配值:" prop="matchValue">
                                        <el-input v-model="addEntityInfo.matchValue" size="small" maxlength="2"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-form>
            </div>
            <div v-else-if="stepSeq == 1">
                <el-row :gutter="10">
                    <el-col :span="9">
                        <el-card class="tree-card">
                            <span>
                                <i class="el-icon-search"></i> 审批流: </span>
                            <hr class="split" />
                            <div class="card-context">
                                <el-row :gutter="10">
                                    <el-col :span="24">
                                        <el-tree class="approve-tree" :data="treeData" :props="defaultProps" default-expand-all ref="tree" @node-click="selectOne" :highlight-current="true" :expand-on-click-node="false">
                                        </el-tree>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="15">
                        <el-form :model="nodeInfo" :rules="addNodeRules" ref="addForm" :label-position="labelPosition" label-width="120px">
                            <el-card class="tree-card">
                                <span>
                                    <i class="el-icon-edit"></i> 结点信息:</span>
                                <hr class="split" />
                                <div class="card-context">
                                    <el-row :gutter="10">
                                        <el-col :span="15">
                                            <el-form-item label="结点名称:" prop="nodeName">
                                                <el-input v-model="nodeInfo.nodeName" size="small" maxlength="8" @change="setNodeName"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-card>
                        </el-form>
                    </el-col>
                </el-row>
                <v-addWorker :addWorkerFormVisible="addWorkerFormVisible" :fatSelectedInfo="selectedInfo" @close="closeAddWorker"></v-addWorker>
                <el-row class="cmd">
                    <el-col>
                        <el-button type="primary" size="small" icon="el-icon-k-add" @click="addNode">增加结点</el-button>
                        <el-button type="primary" size="small" icon="el-icon-delete" @click="delNode" :disabled="isDisabled">删除结点</el-button>
                        <el-button type="primary" size="small" icon="el-icon-k-add" @click="addWorker" :disabled="isDisabled">增加人员</el-button>
                        <el-button type="primary" size="small" icon="el-icon-delete" @click="delWorker" :disabled="isDisabledWork">删除人员</el-button>
                    </el-col>
                </el-row>
            </div>
        </transition>
        <div slot="footer">
            <el-button size="small" icon="el-icon-close" @click="close">取 消</el-button>
            <template v-if="stepSeq==0">
                <el-button type="primary" size="small" icon="el-icon-arrow-right" @click="next">下一步</el-button>
            </template>
            <template v-else-if="stepSeq == 1">
                <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="back">上一步</el-button>
                <el-button type="primary" size="small" icon="el-icon-check" @click="add">提 交</el-button>
            </template>
        </div>
    </el-dialog>
</template>
<script>
import vAddWorker from './AddWorker.vue'
export default {
    data () {
        return {
            stepSeq: 0,
            addRules: {
                businessType: [
                    { required: true, message: '请输入实例名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                matchValue: [
                    { max: 2, message: '最大长度2', trigger: 'blur' }
                ]
            },
            addNodeRules: {
                nodeName: [
                    { required: true, message: '请输入结点名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ]
            },
            labelPosition: 'left',
            treeData: [],
            defaultProps: {
                children: 'subTree',
                label: 'title'
            },
            selectedInfo: {},
            nodeInfo: {
                nodeName: ''
            },
            addWorkerFormVisible: false,
            isDisabled: true,
            isDisabledWork: true
        }
    },
    components: {
        vAddWorker
    },
    computed: {
        thisFormVisible: {
            get () {
                return this.updateFormVisible
            },
            set (val) {
                this.init()
                this.$emit('close')
            }
        },
        addEntityInfo: {
            get () {
                if (this.fatSelectedInfo != null && this.fatSelectedInfo.deep == 2) {
                    return this.fatSelectedInfo.content
                } else {
                    return {
                        entityName: '',
                        matchValue: ''
                    }
                }
            },
            set (val) {

            }
        }
    },
    props: ['updateFormVisible', 'fatSelectedInfo'],
    created () {
        this.init()
    },
    methods: {
        closeAddWorker () {
            this.addWorkerFormVisible = false
            for (let i = 0; i < this.treeData[0].subTree.length; i++) {
                const element = this.treeData[0].subTree[i]
                if (element.seq == this.selectedInfo.seq) {
                    this.treeData[0].subTree[i].subTree = this.selectedInfo.subTree
                }
            }
        },
        setNodeName () {
            if (this.selectedInfo.deep != 3) {
                return
            }
            this.selectedInfo.content.nodeName = this.nodeInfo.nodeName
            this.selectedInfo.title = this.nodeInfo.nodeName
        },
        close () {
            this.init()
            this.$emit('close')
        },
        next () {
            this.stepSeq = this.stepSeq + 1
            console.log(this.fatSelectedInfo)
            if (this.fatSelectedInfo === null || this.fatSelectedInfo.subTree === null) {
                return
            }
            this.treeData = [JSON.parse(JSON.stringify(this.fatSelectedInfo))]
            this.addEntityInfo.entityCid = this.fatSelectedInfo.content.entityCid
            this.addEntityInfo.wkfCode = this.fatSelectedInfo.content.wkfCode
            this.addEntityInfo.businessType = this.fatSelectedInfo.content.businessType
        },
        back () {
            this.stepSeq = this.stepSeq - 1
        },
        addNode () {
            let node = {
                nodeId: '',
                title: '结点' + (this.treeData[0].subTree.length + 1),
                fatNodeId: this.treeData[0].nodeId,
                rootNodeId: this.treeData[0].rootNodeId,
                deep: this.treeData[0].deep + 1,
                seq: this.treeData[0].subTree.length,
                content: {
                    seq: this.treeData[0].subTree.length,
                    nodeName: '审批流结点'
                },
                subTree: []
            }
            let len = this.treeData[0].subTree.length
            this.treeData[0].subTree.push(node)
        },
        delNode () {
            let subTree = []
            let j = 0
            for (let i = 0; i < this.treeData[0].subTree.length; i++) {
                const element = this.treeData[0].subTree[i];
                if (element.seq != this.selectedInfo.seq) {
                    element.seq = j
                    element.content.seq = j
                    subTree.push(element)
                    j++
                }
            }
            this.treeData[0].subTree = subTree
        },
        addWorker () {
            this.addWorkerFormVisible = true
        },
        delWorker () {
            let k = 0
            for (let i = 0; i < this.treeData[0].subTree.length; i++) {
                const node = this.treeData[0].subTree[i];
                if (this.selectedInfo.fatNodeId == node.nodeId) {
                    k = i
                    break
                }
            }
            let subTree = []
            let j = 0
            for (let i = 0; i < this.treeData[0].subTree[k].subTree.length; i++) {
                const element = this.treeData[0].subTree[k].subTree[i];
                if (element.seq != this.selectedInfo.seq) {
                    element.seq = j
                    element.content.seq = j
                    subTree.push(element)
                    j++
                }
            }
            this.treeData[0].subTree[k].subTree = subTree
        },
        add () {
            let self = this
            let addNodeInfo = []
            console.log(self.treeData[0])
            for (let index = 0; index < self.treeData[0].subTree.length; index++) {
                const element = self.treeData[0].subTree[index]
                element.content.seq = index
                addNodeInfo.push(element.content)
            }
            let addWorkerInfo = []
            for (let index = 0; index < self.treeData[0].subTree.length; index++) {
                const element = self.treeData[0].subTree[index]
                for (let j = 0; j < element.subTree.length; j++) {
                    const worker = element.subTree[j]
                    worker.content.seq = index
                    addWorkerInfo.push(worker.content)
                }
            }
            let input = {
                CMADDAPRENTITYX: [self.addEntityInfo],
                CMADDAPRNODEX: addNodeInfo,
                CMADDAPRWORKERX: addWorkerInfo
            }
            self.$http
                .post('/comm/wkf/updateApproveEntity', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.init()
                    self.$emit('close')
                    self.$message({
                        message: '修改信息成功',
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
        selectOne (val) {
            this.selectedInfo = val
            if (val === null || val.deep !== 3) {
                this.isDisabled = true
            } else {
                this.isDisabled = false
            }
            if (val === null || val.deep !== 4) {
                this.isDisabledWork = true
                this.nodeInfo.nodeName = this.selectedInfo.content.nodeName
            } else {
                this.isDisabledWork = false
            }
        },
        init () {
            this.stepSeq = 0
        }
    }
}
</script>
<style scoped>
</style>
