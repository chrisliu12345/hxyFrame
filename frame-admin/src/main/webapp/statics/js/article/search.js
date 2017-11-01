
var vm = new Vue({
	el:'#vm-content',
	data:{
	    pageShow:false,
        showList: true,
        article:{

        },
        page:{
            pageNum:1,
            pageSize:'',
            pages:'',
            endRow:'',
            first:'',
            funcName:'',
            funcParam:'',
            length:'',
            next:'',
            total:'',
			result:{
                id:'',
                content:'',
                createId:'',
                createTime:'',
                keyWords:'',
                title:'',
                img:'',
                updateId:'',
                updateTime:'',
			}
		},
        options:{

        },
        type:'',
	},
    created:function(){
        var url ="../demo/article/types/";
        $.post(url,function (r) {
            if(r.code == 0){
                vm.options=r.codes;
            }else {
                alertMsg(r.msg)
            }
        });
    },
	methods: {
		query: function () {
            var index = layer.load(0); //换了种风格
		    vm.pageShow=false;
            var pageNum = 1;
            vm.search(pageNum);
            //关闭
            layer.close(index);
        },
        pageElement:function (total,curr,jumpfun) {
            layui.use(['laypage', 'layer'], function(){
                var laypage = layui.laypage
                    ,layer = layui.layer;
                laypage.render({
                    elem: 'page'
                    ,count: total
                    ,first: '首页'
                    ,last: '尾页'
                    ,prev: '上一页'
                    ,next: '下一页'
                    ,curr: curr || 1//当前页
                    ,jump:function (obj,first) {//点击页码出发的事件
                        console.log(obj.curr);
                        if(!first){
                            jumpfun(obj.curr);
                        }
                    }
                });
            });
        },
        detailInfo:function(id){
            vm.showList=false;
            var url = "../demo/article/detailInfo/"+id;
            $.get(url,"id="+id,function (r) {
                if(r.code=='0'){
                    vm.article=r.article;
                }else {
                    alertMsg(r.msg);
                }
            });
        },
        reload:function () {
          vm.showList=true;
        },
        search:function (pageNum) {
            var keyWords = $("#keyWords").val();
            if(keyWords==''){
                location.replace(location.href);
                return;
            }
            var url = '../demo/article/search/'+pageNum+"?keyWords="+keyWords+"&type="+vm.type;
            $.get(url,function (r) {
                console.log(r);
                if(r.code=='0'){
                    vm.page =r.page;
                    if(vm.page.total<=0){
                        alertMsg("无查询结果！");
                    }
                    if(vm.page.total>vm.page.pageSize){
                        vm.pageElement(vm.page.total,vm.page.pageNum,vm.search);
                        vm.pageShow=true;
                    }
                }else {
                    alertMsg(r.msg);
                }
            });
        },
        querySort:function (event) {
            debugger
            console.log(event.currentTarget)
            var $this =$(event.currentTarget);
            $this.attr("class","cur");
        },
	}
});