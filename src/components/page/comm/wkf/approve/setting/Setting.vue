<template>
    <div class="setting">
        <el-row :gutter="10">
            <el-col :span="9">
                <el-card class="tree-card">
                    <span>
                        <i class="el-icon-search"></i> 审批流: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" maxlength="60">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="24">
                                <el-tree class="approve-tree" :data="treeData" :props="defaultProps" :filter-node-method="filterNode" default-expand-all ref="tree" @node-click="selectOne" :highlight-current="true" :expand-on-click-node="false">
                                </el-tree>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="15">
                <el-card class="tree-card">
                    <template v-if="selectedInfo.deep==0">
                        <v-modelInfo :viewInfo="selectedInfo.content"></v-modelInfo>
                    </template>
                    <template v-else-if="selectedInfo.deep==1">
                        <v-modelInfo :viewInfo="selectedInfo.content"></v-modelInfo>
                    </template>
                    <template v-else-if="selectedInfo.deep==2">
                        <v-entityInfo :viewInfo="selectedInfo.content"></v-entityInfo>
                    </template>
                    <template v-else-if="selectedInfo.deep==3">
                        <v-nodeInfo :viewInfo="selectedInfo.content" :workerList="workerList"></v-nodeInfo>
                    </template>
                </el-card>
            </el-col>
        </el-row>
        <v-AddEntity :addFormVisible="addFormVisible" :fatSelectedInfo="selectedInfo" @close="closeForm"></v-AddEntity>
        <v-UpdateEntity :updateFormVisible="updateFormVisible" :fatSelectedInfo="selectedInfo" @close="closeForm"></v-UpdateEntity>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('ADD')" :disabled="isDisabledAdd">增加</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="editForm('UPDATE')" :disabled="isDisabled">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="close" :disabled="isDisabled">关闭</el-button>
            </el-col>
        </el-row>

    </div>
</template>
<script>
import vModelInfo from './ModelInfo.vue'
import vEntityInfo from './EntityInfo.vue'
import vNodeInfo from './NodeInfo.vue'
import vAddEntity from './AddEntity.vue'
import vUpdateEntity from './UpdateEntity.vue'
export default {
    data () {
        return {
            treeData: [],
            defaultProps: {
                children: 'subTree',
                label: 'title'
            },
            filterText: '',
            menuInfo: {
            },
            selectedInfo: {},
            addFormVisible: false,
            updateFormVisible: false,
            isDisabled: true,
            isDisabledAdd: true,
            workerList: []
        }
    },
    components: {
        vModelInfo,
        vEntityInfo,
        vNodeInfo,
        vAddEntity,
        vUpdateEntity
    },
    created () {
        this.init()
        this.query()
    },
    watch: {
        filterText (val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        closeForm () {
            this.init()
            this.query()
        },
        query () {
            let self = this
            self.treeData = []
            let input = {}
            self.$http
                .post('/comm/wkf/queryApproveTree', input)
                .then(function (response) {
                    let pkgOut = response.data
                    let treeNodes = pkgOut.CMQRYTREEZ
                    if (treeNodes != null && treeNodes.length > 0) {
                        for (let index = 0; index < treeNodes.length; index++) {
                            const element = treeNodes[index];
                            if (element.deep == 0) {
                                let node = {}
                                node.nodeId = element.nodeId
                                node.fatNodeId = element.fatNodeId
                                node.rootNodeId = element.rootNodeId
                                node.title = element.title
                                node.deep = Number(element.deep)
                                node.seq = Number(element.seq)
                                node.content = JSON.parse(element.content)
                                node.subTree = self.getSubTrees(node, treeNodes)
                                self.treeData.push(node)
                            }
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err)
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        getSubTrees (node, treeNodes) {
            let subTree = []
            if (treeNodes != null && treeNodes.length > 0) {
                for (let index = 0; index < treeNodes.length; index++) {
                    const element = treeNodes[index]
                    if (node.nodeId == element.fatNodeId) {
                        let item = {}
                        item.nodeId = element.nodeId
                        item.fatNodeId = element.fatNodeId
                        item.rootNodeId = element.rootNodeId
                        item.title = element.title
                        item.deep = Number(element.deep)
                        item.seq = Number(element.seq)
                        item.content = JSON.parse(element.content)
                        item.subTree = this.getSubTrees(element, treeNodes)
                        subTree.push(item)
                    }
                }
            }
            return subTree
        },
        filterNode (value, data) {
            if (!value) return true;
            return data.title.indexOf(value) !== -1
        },
        selectOne (val) {
            let self = this
            this.selectedInfo = val
            if (val == null || val.deep != 2) {
                self.isDisabled = true
            } else {
                self.isDisabled = false
            }
            if (val == null || val.deep != 1) {
                self.isDisabledAdd = true
            } else {
                self.isDisabledAdd = false
            }
            if (self.selectedInfo.deep == 3) {
                let input = {
                    CMNODECIDX: [
                        {
                            nodeCid: self.selectedInfo.nodeId
                        }
                    ]
                }
                self.$http
                    .post('/comm/wkf/queryNodeWorkers', input)
                    .then(function (response) {
                        let pkgOut = response.data
                        self.workerList = pkgOut.CMWORKERINFOZ

                    })
                    .catch(function (err) {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            }
        },
        editForm (formType) {
            let self = this
            if (formType === 'ADD') {
                if (self.selectedInfo === null || self.selectedInfo.deep != 1) {
                    self.$alert('请选择业务类型', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabledAdd = true
                    return
                }
                self.addFormVisible = true
            } else if (formType === 'UPDATE') {
                if (self.selectedInfo === null || self.selectedInfo.deep != 2) {
                    self.$alert('请选择一条流程实例', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabled = true
                    return
                }
                self.updateFormVisible = true
            } else {
                console.log('表单类型错误')
                self.$alert('表单类型错误', '提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                })
                return
            }
        },
        close () {
            let self = this
            if (self.selectedInfo == null || self.selectedInfo.deep != 2) {
                self.$alert('请选择一条流程实例', '提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                })
                self.isDisabled = true
                return
            }
            self.$confirm('是否关闭流程实例[' + self.selectedInfo.title + ']?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let input = {
                    CMCLSAPRX: [{ entityCid: self.selectedInfo.content.entityCid }]
                }
                self.$http
                    .post('/comm/wkf/closeApproveEntity', input)
                    .then((res) => {
                        let pkgOut = res.data
                        self.init()
                        self.query()
                        self.$message({
                            message: '关闭成功',
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
        init () {
            this.selectedInfo = {}
            this.isDisabled = true
            this.isDisabledAdd = true
            this.addFormVisible = false
            this.updateFormVisible = false
        }
    }
}
</script>
<style scoped>
</style>
