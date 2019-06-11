<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar @transferCrumb="getCrumb"></v-sidebar>
        <v-crumb :crumbs="crumbs"></v-crumb>
        <div class="content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>

        <!--<div class="bottom">-->
        <!--<div style="width:300px;margin:0 auto; padding:20px 0;">-->
        <!--<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602009770" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../../../static/img/beian.png" style="float:left;" />-->
        <!--<p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">浙公网安备 33010602009770号</p>-->
        <!--</a>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import vHead from './Header.vue'
    import vSidebar from './Sidebar.vue'
    import vCrumb from './Crumb.vue'

    export default {
        data() {
            return {
                crumbs: []
            }
        },
        methods: {
            getCrumb(msg) {
                this.crumbs = msg
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
        bottom: 0;
        background-color: rgb(228, 237, 252);
    }

    /*.bottom {*/
    /*width: 100%;*/
    /*margin: 0 auto;*/
    /*padding: 0px;*/
    /*position: absolute;*/
    /*bottom: 0px;*/
    /*!* left: 50%; *!*/
    /*!* margin-left: -150px; *!*/
    /*background-color: rgb(46, 46, 48);*/
    /*}*/
</style>
