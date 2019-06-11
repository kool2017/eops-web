<template>
    <div class="agent">
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
        <v-agentWorker :agentFormVisible="agentFormVisible" :fatSelectedInfo="selectedInfo" @close="closeForm"></v-agentWorker>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="agent" :disabled="isDisabled">代理</el-button>
                <el-button type="primary" size="small" icon="el-icon-minus" @click="cancelAgent" :disabled="isDisabled">取消代理</el-button>
            </el-col>
        </el-row>

    </div>
</template>
<script>
import vModelInfo from './ModelInfo.vue'
import vEntityInfo from './EntityInfo.vue'
import vNodeInfo from './NodeInfo.vue'
import vAgentWorker from './AgentWorker.vue'
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
            isDisabled: true,
            workerList: [],
            agentFormVisible: false
        }
    },
    components: {
        vModelInfo,
        vEntityInfo,
        vNodeInfo,
        vAgentWorker
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
            let input = {
                CMQRYAPRTREEX: [
                    {
                        userCid: localStorage.getItem('userCid')
                    }
                ]
            }
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
            if (val == null || val.deep != 3) {
                self.isDisabled = true
            } else {
                self.isDisabled = false
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
        agent () {
            this.agentFormVisible = true
        },
        cancelAgent () {
            let self = this
            self.$confirm('是否取消代理?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let input = {
                    CMAGENTX: [
                        {
                            nodeCid: self.selectedInfo.nodeId
                        }
                    ]
                }
                self.$http
                    .post('/comm/wkf/cancelAgent', input)
                    .then((res) => {
                        let pkgOut = res.data
                        self.init()
                        self.query()
                        self.$message({
                            message: '取消代理成功',
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
            this.agentFormVisible = false
        }
    }
}
</script>
<style scoped>
</style>
