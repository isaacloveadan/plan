app.factory('myFactory',function(){
  var service = {};
  //标题栏后退按钮的显示与否
  service.backshow=true;
  // 选择想去城市的数组
  service.chosencities=[]
  // 选择出发城市
  service.startcity=''
  // 选择城市的加号显示与否
  service.plusif = true;
  // 选择返回城市
  service.backcity = '海口'
  // 默认选中的月份
  service.nowdate = '';
  // 默认当前日期和地区
  service.toptitle = '';
  // 当前定位城市
  service.locationcity='';
  // 出行计划
  service.myplan=[];
  // 当前景点
  service.myview=[];
  // 天数
  service.m=0;
  // 用户信息
  service.userinfo='';
  // 用户游玩喜好
  service.chosenmyprefer='';
  // 优化路径
  service.myroute=[];
  // 城市与背景
  service.hainancity=[]
  // 用户在数据库的id
  service.userid=''
  return service;
})
