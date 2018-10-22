var freezeTableManager = {
	isInit:false,
	// methods
	initThead: function(){
		var _this = this;
		var originHeadTr = this.titleBox.find('tr')
		var headTr = originHeadTr.clone();
		var originTh = originHeadTr.find('th')
		var thWidth = originTh.eq(0).width()
		var thHeight = originTh.eq(0).height()
		this.tHead = $('<thead></thead>');
		$.map(headTr,function(item){
			var tr = $('<tr></tr>');
			var th = $(item).find('th').eq(0)
			th.css({width:thWidth,height:thHeight-1,boxSizing:'border-box'}).find('span').remove()
			tr.append(th);
			_this.tHead.append(tr);
		})
		return this.tHead
	},
	initTbody: function(){
		var _this = this;
		var bodyTr = this.bodyBox.find('tr').clone();
		this.tBody = $('<tbody></tbody>');
		$.map(bodyTr,function(item){
			var tr = $('<tr class="ui-widget-content jqgrow ui-row-ltr"></tr>');
			tr.append($(item).find('td')[0]);
			_this.tBody.append(tr);
		})
		return this.tBody
	},
	// metnods end
	init: function(id){
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
			<div class="ui-state-default ui-jqgrid-hdiv" style="background: transparent">\
				<div class="ui-jqgrid-hbox">\
					<table class="headTable" role="grid" aria-labelledby="gbox_list2" cellspacing="0" cellpadding="0" border="0"\
					></table>\
				</div>\
			</div>\
			<div class="ui-jqgrid-bdiv">\
				<div \
					style=" height:'+ (this.bodyBox.outerHeight() - 16.5) +'px;\
					overflow: hidden;\
					position: relative"\
				>\
					<table class="bodyTable" tabindex="0" cellspacing="0" cellpadding="0" border="0" role="grid" aria-multiselectable="false" aria-labelledby="gbox_list2" class="ui-jqgrid-btable"\
					style="position:absolute"\
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
			backgroundColor: 'transparent'
		}).find('.headTable').append(this.tHead)
		
		this.table.find('.bodyTable').append(this.tBody)

		contentView.append(this.table)
	},
	scrollTopChange: function (top){
		if(this.table){
			this.table.find('.bodyTable').css({
				top: -top
			})
		}
	},
	freezeColumnsWithCount: function(count){
		this.reSetThWithCount(count)
		this.reSetTdWithCount(count)
	},
	reSetThWithCount: function(count){
		var _this = this;
		var originHeadTr = this.titleBox.find('tr')
		var headTr = originHeadTr.clone();
		var originTh = originHeadTr.find('th')
		this.tHead = this.table.find('thead')
		this.tHead.find('tr').remove()
		$.map(headTr,function(item){
			var tr = $('<tr></tr>');
			for(var i = 0; i < count; i++){
				var th = $(item).find('th').eq(i)
				var thWidth = originTh.eq(i).width()
				var thHeight = originTh.eq(i).height()
				th.css({width:thWidth,height:thHeight-1,boxSizing:'border-box'}).find('span').remove()
				tr.append(th.clone());				
			}
			_this.tHead.append(tr);
		})
		return this.tHead
	},
	reSetTdWithCount: function(count){
		var _this = this;
		var bodyTr = this.bodyBox.find('tr').clone();
		this.tBody = this.table.find('tbody')
		this.tBody.find('tr').remove()
		$.map(bodyTr,function(item){
			var tr = $('<tr class="ui-widget-content jqgrow ui-row-ltr"></tr>');
			for(var i = 0; i < count; i++){
				var td = $(item).find('td')[i]
				tr.append($(td).clone());
			}
			_this.tBody.append(tr);
		})
	},
	hiddenTable(){
		if(this.table){
			this.table.css({
				display:'none'
			})
		}
	},
	showTable(){
		if(this.table){
			this.table.css({
				display:'block'
			})
		}
	},
	setFreezeTable: function(param){
		var bodyBox = $(param['id']).parents('.ui-jqgrid-bdiv')
		var offsetLeft = bodyBox.scrollLeft()
		var offsetTop = bodyBox.scrollTop()
		if(offsetLeft> (param['left']||10) && offsetLeft<param['cloumnsWidth'][0]){
			// 冻结第一列
			if(!this.isInit){
				this.init(param['id'])
			}else{
				this.freezeColumnsWithCount(1)
			}
			this.showTable()
		}else if(offsetLeft< param['cloumnsWidth'][1]&&offsetLeft>=param['cloumnsWidth'][0]) {
			console.log('111134345')
			// 冻结第二列
			this.freezeColumnsWithCount(2)
			this.showTable()
		}else if(offsetLeft>=param['cloumnsWidth'][1]){
			// 冻结三列
			this.freezeColumnsWithCount(3)
			this.showTable()
		} else {
			this.hiddenTable()
		}
		if(offsetTop){
			this.scrollTopChange(offsetTop)
		}
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
						freezeTableManager.setFreezeTable({
							id:'#list2',
							cloumnsWidth:[55,90+55],
							left:12
						})
					})
				}
			});
	/*创建jqGrid的操作按钮容器*/
	/*可以控制界面上增删改查的按钮是否显示*/
	jQuery("#list2").jqGrid('navGrid', '#pager2', {edit : false,add : false,del : false});
}
