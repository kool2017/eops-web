<template>
    <div class="wrapper">
        <v-head :unread-notify="unreadNotify" :notify-size="notifySize" @refreshMsg="getUnRead"></v-head>
        <v-sidebar @transferCrumb="getCrumb"></v-sidebar>
        <v-crumb :crumbs="crumbs"></v-crumb>
        <div class="content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>

        <!--<el-row >-->
        <!--<el-col span="2">-->
        <!--<el-input v-model="text"></el-input>-->

        <!--</el-col>-->
        <!--<el-col span="2">-->
        <!--<el-input type="textarea" v-model="data"></el-input>-->

        <!--</el-col>-->
        <!--<el-col span="2">-->
        <!--<el-button @click="send">发送</el-button>-->

        <!--</el-col>-->
        <!--</el-row>-->
        <div class="bottom">
        <div style="width:300px;margin:0 auto; padding:20px 0;">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602009770" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../../../static/img/beian.png" style="float:left;" />
        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">浙公网安备 33010602009770号</p>
        </a>
        </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue'
    import vSidebar from './Sidebar.vue'
    import vCrumb from './Crumb.vue'
    import uuid from 'uuid/v1'

    export default {
        name: 'Home',
        data() {
            return {
                crumbs: [],
                text: '',
                data: '',
                websocket: null,
                timer: null,
                unreadNotify: [],
                notifySize: 0
            }
        },
        mounted() {
            let userId = localStorage.getItem('userId')
            let sid = uuid()
            if (userId) {
                this.websocket = new WebSocket(process.env.WS_BASE_URL + '/' + userId + '/' + sid)
                this.initWebSocket()
            }
        },
        beforeDestroy() {
            this.onbeforeunload()
            clearInterval(this.timer);
        },
        methods: {
            getCrumb(msg) {
                this.crumbs = msg
            },
            initWebSocket() {
                //连接错误
                this.websocket.onerror = this.setErrorMessage

                // //连接成功
                this.websocket.onopen = this.setOnopenMessage

                //收到消息的回调
                this.websocket.onmessage = this.setOnmessageMessage

                //连接关闭的回调
                this.websocket.onclose = this.setOncloseMessage

                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                window.onbeforeunload = this.onbeforeunload
            },
            setErrorMessage() {
                this.data = "WebSocket连接发生错误" + '   状态码：' + this.websocket.readyState;
                console.log("WebSocket连接发生错误" + '   状态码：' + this.websocket.readyState)
            },
            setOnopenMessage() {
                this.data = "WebSocket连接成功" + '   状态码：' + this.websocket.readyState;
                console.log("WebSocket连接成功" + '   状态码：' + this.websocket.readyState)
                this.timer = setInterval(this.sendAlive, 55000);
                //查询未读消息和未读消息数
                this.getUnRead()
            },
            setOnmessageMessage(event) {
                let self = this
                let msg = JSON.parse(event.data)
                self.$notify({
                    title: '通知',
                    message: msg.content,
                    duration: 3000,
                    position: 'bottom-right'
                })
                if (msg.msgType) {
                    self.unreadNotify.splice(0, 0, msg)
                    if (self.unreadNotify.length > 5) {
                        self.unreadNotify.splice(5, self.unreadNotify.length - 5)
                    }
                    self.notifySize = self.notifySize + 1;
                }
            },
            setOncloseMessage() {
                this.data = "WebSocket连接关闭" + '   状态码：' + this.websocket.readyState;
                console.log("WebSocket连接关闭" + '   状态码：' + this.websocket.readyState)
            },
            onbeforeunload() {
                console.log("close socket")
                this.closeWebSocket()
            },

            //websocket发送消息
            send(text) {
                this.websocket.send(text)
            },
            sendAlive() {
                this.send('0')
            },
            closeWebSocket() {
                this.websocket.close()
            },
            getUnRead() {
                let self = this
                let input = {
                    state: 0,
                    currentPage: 1,
                    pageSize: 5
                }
                self.$http
                    .post('/eops/sys/notify/getMyNotifyPage', input)
                    .then(function (response) {
                        let pkgOut = response.data
                        self.unreadNotify = pkgOut.data
                        self.notifySize = pkgOut.total
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
        components: {
            vHead,
            vSidebar,
            vCrumb
        }
    }
</script>
<style scoped>
    .content {
        display: block;
        position: absolute;
        top: 105px;
        left: 250px;
        bottom: 60px;
        background-color: rgb(228, 237, 252);
    }

    .bottom {
    width: 100%;
    margin: 0 auto;
    padding: 0px;
    position: absolute;
    bottom: 0px;
    /* left: 50%; */
    /* margin-left: -150px; */
    background-color: rgb(46, 46, 48);
    }
</style>
