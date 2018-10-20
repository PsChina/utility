var freezeTableManager = {
	isInit:false,
	// methods
	initThead:function(){
		var _this = this;
		var headTr = this.titleBox.find('tr').clone();
		this.tHead = $('<thead></thead>');
		$.map(headTr,function(item){
			var th = $('<tr></tr>');
			th.append($(item).find('th')[0]);
			_this.tHead.append(th);
		})
		return this.tHead
	},
	initTbody:function(){
		var _this = this;
		var bodyTr = this.bodyBox.find('tr').clone();
		this.tBody = $('<tbody></tbody>');
		$.map(bodyTr,function(item){
			var th = $('<tr class="ui-widget-content jqgrow ui-row-ltr"></tr>');
			th.append($(item).find('td')[0]);
			_this.tBody.append(th);
		})
		return this.tBody
	},
	// metnods end
	init:function(id){
		this.isInit = true
		var contentView = $(id).parents('.ui-jqgrid-view')
		this.contentView = contentView // 保存父盒子
		var titleBox = contentView.find('.ui-jqgrid-hdiv')
		this.titleBox = titleBox // 保存表头
		var bodyBox = $('#list2').parents('.ui-jqgrid-bdiv')
		this.bodyBox = bodyBox // 保存表格内容
		var titleHeight = contentView.find('.ui-jqgrid-titlebar').outerHeight()
		contentView.css({
			position: 'relative' //相对定位
		})

		this.table = $(
		'<div>\
			<div class="ui-state-default ui-jqgrid-hdiv">\
				<div class="ui-jqgrid-hbox">\
					<table class="headTable" role="grid" aria-labelledby="gbox_list2" cellspacing="0" cellpadding="0" border="0"\
					></table>\
				</div>\
			</div>\
			<div class="ui-jqgrid-bdiv">\
				<div style="box-sizing:border-box">\
					<table class="bodyTable" tabindex="0" cellspacing="0" cellpadding="0" border="0" role="grid" aria-multiselectable="false" aria-labelledby="gbox_list2" class="ui-jqgrid-btable"\
					></table>\
				</div>\
			</div>\
		</div>'
		)

		// 找到所有第一列的dom 元素
		// 找到 head 里面 所有tr的
		this.initThead()
		// 找到 body 里面 所有tr的第一个td 
		this.initTbody()
		// var bodyTr =
		this.table.css({
			position:'absolute',
			left:0,
			top:titleHeight||0,
			zIndex:'2',
			background:'white'
		}).find('.headTable').append(this.tHead)
		
		this.table.find('.bodyTable').append(this.tBody)

		contentView.append(this.table)
	}
}


$(function(){
	//页面加载完成之后执行
	pageInit();
});
function pageInit(){
	//创建jqGrid组件
	jQuery("#list2").jqGrid(
			{
				url : 'http://localhost:8080/data/JSONData.json',//组件创建完成之后请求数据的url
				datatype : "json",//请求数据返回的类型。可选json,xml,txt
				colNames : [ 'Inv No', 'Date', 'Client', 'Amount', 'Tax','Total', 'Notes', 'A' ],//jqGrid的列显示名字
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'id',index : 'id',width : 55}, 
				             {name : 'invdate',index : 'invdate',width : 90}, 
				             {name : 'name',index : 'name asc, invdate',width : 100}, 
				             {name : 'amount',index : 'amount',width : 80,align : "right"}, 
				             {name : 'tax',index : 'tax',width : 80,align : "right"}, 
				             {name : 'total',index : 'total',width : 80,align : "right"}, 
							 {name : 'note',index : 'note',width : 150,sortable : false},
							 {name : 'a',index : '',width :150}
				           ],
				rowNum : 10,//一页显示多少条
				rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
				pager : '#pager2',//表格页脚的占位符(一般是div)的id
				sortname : 'id',//初始化的时候排序的字段
				sortorder : "desc",//排序方式,可选desc,asc
				mtype : "get",//向后台请求数据的ajax的类型。可选post,get
				viewrecords : true,
				caption : "JSON Example",//表格的标题名字
				autoScroll: true,
				width: 600,
				shrinkToFit:false,
				gridComplete: function(){
					var bodyBox = $('#list2').parents('.ui-jqgrid-bdiv')
					bodyBox.on('scroll', function(){
						console.log('滚动')
						// var val = $('#list2'+'_'+'id').scrollLeft()
						var offsetLeft = bodyBox.scrollLeft()
						console.log(offsetLeft)
						if(offsetLeft> 0 && offsetLeft<55){
							// 冻结第一列
							console.log('冻结第一列')
							if(!freezeTableManager.isInit){
								freezeTableManager.init('#list2',)
							}
						}else if(offsetLeft< 55 + 90&&offsetLeft>=55) {
							// 冻结第二列
							console.log('冻结第二列')
						}else if(offsetLeft>=55 + 90){
							// 冻结三列
							console.log('冻结第三列')
						}
					})
				}
			});
	/*创建jqGrid的操作按钮容器*/
	/*可以控制界面上增删改查的按钮是否显示*/
	jQuery("#list2").jqGrid('navGrid', '#pager2', {edit : false,add : false,del : false});
}
