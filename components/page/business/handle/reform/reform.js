/**
 * Created by jack on 2015/9/28.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;
var Router = require("component_modules/director.js").Router;

module.exports = Vue.extend({
    inherit:true,
    template:__inline("reform.html"),
    data:function(){
        return {
            form:{
                sn:"",
                addr:"",
                name:"",
                install:"",
                mobile:"",
                tel:"",
                type:"gaizhao"
            }
        }
    },
    methods:{
        validator: function () {
            var form =  $("#form-reform");
            var self = this;
            form.validator({
                errorCallback: function () {
                    self.valid = true;
                },
                after: function (e) {
                    var param = $.extend(JSON.parse(JSON.stringify(self.auth)),{form:JSON.parse(JSON.stringify(self.form))});
                    Layer.open({
                        content: "�ύ��",
                        type: 2,
                        shadeClose: false,
                        shade: false
                    });

                    Service.business(param, function (rep) {
                        Layer.closeAll();
                        Layer.open({
                            content: "�ύ�ɹ�",
                            btn:["ȷ��"],
                            yes: function () {
                                self.form = {
                                    name:"",
                                    contact:"",
                                    addr:"",
                                    tel:"",
                                    mobile:"",
                                    type:"xinzhuang"
                                };
                                var router = new Router();
                                router.setRoute("#business/handle");
                                Layer.closeAll();
                            },
                            shadeClose: false
                        })
                    });
                    return false;
                },
                isErrorOnParent: true
            })
        }
    },
    ready: function () {
        this.validator();
    }
});