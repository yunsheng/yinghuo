/**
 * @fileoverview yui模块配置
 * @author 刘超武
 * @version 0.1
 * @update 2012/8/26
 */
var _YUI3_CONFIG_ = {
		combine: true,
		comboBase: 'http://yinghuo.com/??',
		root: 's/yui/3.5.0/build/',
		filter:{
			'searchExp':  '&',
			'replaceStr': ','
		},
		charset : 'utf-8',
		groups:{
			util : {
				root : 'finace/js/',
				combine: true,
				modules : {
				}
			},
			pages: {
				root : 'finace/js/pages/',
				combine: true,
				modules : {
					'index':{
						path:'index.js',
						requires:['datatable', 'datatype-number-format']
					}
				}
			},
			widgets : {
				root : 'apps/et/common/widgets/',
				combine: true,
				modules : {
					'trip-autocomplete-skin':{
						path :'suggest/css/trip-autocomplete-min.css',
						type :'css'
					},
					'trip-autocomplete':{
						path :'suggest/js/trip-autocomplete-v1.1.js',
						requires : ['autocomplete','trip-mustache','trip-slide','jsonp','trip-placeholder','trip-autocomplete-skin']
					},
					'trip-calendar':
					{
						path:'calendar/js/trip-calendar.v1.1.js',
						requires:["widget-position", "event-custom-complex", "calendar","trip-calendar-style",'trip-placeholder']
					},
					'calendar':{
						path:'calendar/js/calendar.js',
						requires:["widget-position", "event-custom-complex"]
					},
					'trip-calendar-style':{
						path:'calendar/css/calendar.v1.1-min.css',
						type: 'css'
					},
			        'trip-calendar-v2':
			        {
			          path:'calendar/js/trip-calendar.v2.0.js',
			          requires:['trip-calendar-v2-style']
			        },
			        'trip-calendar-v2-style':{
			        	path:'calendar/css/trip-calendar.v2.0.css',
			        	type: 'css'
			        },
					'trip-box' : {
						path : 'box/js/box.js',
						requires:['node-base','event-base','overlay','dd-plugin','box-css']
					},
					'box-css' : {
						path : 'box/css/box-min.css',
						type : 'css'
					}
				}

			}
		}
	};
var YTRIP = YUI(_YUI3_CONFIG_);
YTRIP.addTripModule = function(mod){
	this.applyConfig(mod);
};