/**
 * @author DZ
 */
YUI.add("index",function(Y){
    var portfolio = [
        { stock_id:3, category:'三餐', goods:'辣椒 肉  萝卜', unitprice:4500,  qty:1,price:0.5 ,time:'',remark:''},
        { stock_id:11, category:'话费', goods:'自己的号',unitprice:50, qty:100,  price:28.90 ,time:'',remark:''},
        { stock_id:17, category:'网费', goods:"半年",  unitprice:0, qty:400,price:300 ,time:'',remark:''},
        { stock_id:19, category:'电费', goods:"冲卡", qty:1750, unitprice:6099.13, price:3.97 ,time:'',remark:''},
        { stock_id:5, category:'零食', goods:'冰棒', qty:25, unitprice:7283.41, price:58.74 ,time:'',remark:''}
    ];

    function formatCurrency(o) {
        return Y.DataType.Number.format(o.value, {
            prefix:"$ ",
            thousandsSeparator: ",",
            decimalSeparator: ".",
            decimalPlaces: 2
        });
    }
    
    function formatGainLoss(o) {
        o.className += (o.value < 0) ? 'loss' : 'gain';
        
        return o.value ?
            Y.DataType.Number.format(o.value, {
                suffix: ' %',
                decimalSeparator: ".",
                decimalPlaces: 2
            }) :
            'n/a';
    }
    
    var dt = new Y.DataTable({
        data: portfolio,
        columns: [
            { 
            	key: 'category',  
            	label: '支出类目' 
            },
            { 
            	key: 'goods', 
            	label: '物品名称' 
            },        
            {
              	key      : 'unitprice',
              	label    : '单价',
              	className: 'numeric',
              	formatter: formatCurrency
            },
            { 
            	key: 'qty',     
            	label: '数量', 
            	className: 'numeric' 
            },
            
            {
              key      : 'price',
              label    : '总金额',
              className: 'numeric',
              formatter: formatCurrency
            },
            {
              key      : 'time',
              label    : '时间',
              className: 'time'
            },
            {
              key      : 'remark',
              label    : '备注',
              className: 'percentage'
            }
        ],
        recordType: {
            category: {},
            goods: {},
            qty: {},
            unitprice: {},
           	price:{},
            remark: {}
        },
        sortable: ['unitprice', 'price', 'time'],
        sortBy: { time: 'desc' }
    });
    
    dt.render("#dtable");    
    
},{requires:['datatable', 'datatype-number-format']});