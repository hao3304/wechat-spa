/**
 * Created by jack on 2015/9/28.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:__inline("bind.html"),
    data:function(){
        return {
            list:[]
        }
    },
    methods:{
        unbind: function (sn) {
            var self = this;

            Layer.open({
                content:"ȷ��������Ļ��ţ�"+sn+"��?",
                btn:["ȷ��","ȡ��"],
                yes: function () {
                    var param = JSON.parse(JSON.stringify(self.auth));
                    param.sn = sn;
                    Service.unBind(param, function (rep) {
                        Layer.closeAll();
                        self.render();
                    })

                },
                no: function () {
                    Layer.closeAll();
                },
                shadeClose:false
            })
        },
        render: function () {
            var self = this;
            Service.getBindList(self.auth, function (rep) {
                self.list = rep;
            })
        },
        reload: function () {
            this.render();
        }
    },
    ready: function () {
        this.render();
        var self = this;
        this.$on("reload", function (type) {
            if(type=="bind"){
                self.reload();
            }
        })
    }
});