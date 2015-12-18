/**
 * Created by jack on 2015/9/28.
 */

var Vue = require("component_modules/vue.js");
var Layer = require("component_modules/layer.m.js").layer;
var Service = require("main/service.js");
var Router = require("component_modules/director.js").Router;

module.exports = Vue.extend({
    inherit:true,
    template:__inline("add.html"),
    data:function(){
        return {
            form:{},
            valid:false
        }
    },
    methods:{
        onSubmit: function (p) {

        },
        toJson: function (d) {
            var o = {};
            for(var i in d){
                o[d[i].name] = d[i].value;
            }
            return o;
        },
        validator: function () {
            var form =  $("#formSubmit");
            var self = this;

            form.validator({
                errorCallback: function (unvalidFields) {
                    self.valid = true;
                },
                after: function (e) {
                    var data = self.getFormData(form);
                    var param = $.extend(JSON.parse(JSON.stringify(self.auth)),data,{type:"userAuth"});
                    Layer.open({
                        content: "�ύ��",
                        type: 2,
                        shadeClose: false,
                        shade: false
                    });

                    Service.bind(param, function (rep) {
                        Layer.open({
                            content: "�󶨳ɹ���",
                            shadeClose: false,
                            btn:["ȷ��"],
                            yes: function () {
                                Layer.closeAll();
                                var router = new Router();
                                router.setRoute("business/bind");
                                self.$parent.$broadcast("reload","bind");
                            }
                        });
                    }, function (rep) {
                        Layer.closeAll();
                        alert(rep.Message);
                    });

                    return false;
                },
                isErrorOnParent: true
            })
        },
        getFormData: function (form) {
            var l = form.serializeArray();
            var o = {};
            for(var i in l){
                o[l[i]["name"]] =  l[i]["value"];
            }
            return o;
        }
    },
    ready: function () {
        var self = this;
        Service.getBindForm(self.auth, function (rep) {
            self.form = rep;
            Vue.nextTick(function () {
                self.validator();
            })
        });
    }
});