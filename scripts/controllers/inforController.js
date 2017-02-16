app.controller('inforController', ['$scope', '$state', '$cookieStore', 'myFactory','$http',function($scope, $state, $cookieStore, myFactory,$http) {
    //选择出发城市根据定位
    if(myFactory.startcity == ''){
      angular.element.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function() {
          myFactory.startcity = remote_ip_info.city;
          $scope.startcity = myFactory.startcity;
          $scope.$apply(function() {　　　　
              $scope.startcity = myFactory.startcity;　　　　 //在这里去手动触发脏检查
              myFactory.locationcity=remote_ip_info.city;
              $scope.locationcity=myFactory.locationcity;
          })
      });
    }else{
      $scope.startcity = myFactory.startcity
      $scope.locationcity=myFactory.locationcity;
    }
    // 已选择的旅游城市
    $scope.chosencities = myFactory.chosencities;
    console.log($scope.chosencities);
    // 点击进去出发城市页面
    $scope.gotostart=function(){
      $state.go('main.home.city.confirm.infor.startcity')
    }
    // 当前选中的出发城市
    $scope.startshow=true;
    // 改变当前选择的出发城市
    $scope.city=new Array();
    // 选择定位城市
    $scope.choselocation=function(){
      $scope.startshow=true;
      angular.element.each($scope.city,function(index,obj){
        obj=false;
        $scope.city[index]=false;
      })
      myFactory.startcity=myFactory.locationcity;
      $scope.startcity=myFactory.startcity;
      setTimeout(function(){
        $state.go('main.home.city.confirm.infor')
      },1000)
    }
    $scope.choselocation2=function(){
      $scope.backshow=true;
      angular.element.each($scope.city2,function(index,obj){
        obj=false;
        $scope.city2[index]=false;
      })
      myFactory.backcity=myFactory.locationcity;
      $scope.backcity=myFactory.startcity;
      setTimeout(function(){
        $state.go('main.home.city.confirm.infor')
      },1000)
    }
    // 选择除定位城市之外的
    $scope.chosestartcity = function(city,$index) {
            console.log('city =' + city);
            myFactory.startcity = city;
            console.log('myFactory.startcity =' + myFactory.startcity);
            $scope.startcity = myFactory.startcity;
            $scope.startshow=false;
            $scope.city[$index]=true;
            angular.element.each($scope.city,function(index,obj){
              if(index == $index){
                obj=true;
                $scope.city[index]=true;
              }else{
                obj=false;
                $scope.city[index]=false;
              }
              console.log(index);
              console.log(obj);
            })
            setTimeout(function(){
              $state.go('main.home.city.confirm.infor')
            },1000)
        }
        // 选择游玩偏好
    $scope.chose1 = false;
    $scope.chose2 = true;
    $scope.chose3 = false;
    $scope.chosenmyprefer=2;
    myFactory.chosenmyprefer=2;
    $scope.chosenprefer = function(num) {
            if (num == 1) {
                $scope.chose1 = true;
                $scope.chose2 = false;
                $scope.chose3 = false;
                $scope.chosenmyprefer=1;
                myFactory.chosenmyprefer=1;
            } else if (num == 2) {
                $scope.chose1 = false;
                $scope.chose2 = true;
                $scope.chose3 = false;
                $scope.chosenmyprefer=2
                myFactory.chosenmyprefer=2
            } else if (num == 3) {
                $scope.chose1 = false;
                $scope.chose2 = false;
                $scope.chose3 = true;
                $scope.chosenmyprefer=3
                myFactory.chosenmyprefer=3
            }
        }
        // 游玩城市天数的确定
    $scope.minus = function(num,index) {
        if (num == 1) {
            // alert('不能再减了')
            Showbo.Msg.alert('不能再减了')
        } else {
            num--;
            myFactory.chosencities[index].days = num;
            console.log(myFactory.chosencities[index].days);
            $scope.chosencities = myFactory.chosencities
        }
    }
    $scope.plus = function(num,index) {
        if(num == 4){
          // alert('最多只能选择4天')
          Showbo.Msg.alert('最多只能选择4天')
        }else{
          num++;
          myFactory.chosencities[index].days = num;
          console.log(myFactory.chosencities[index].days);
          $scope.chosencities = myFactory.chosencities
        }
    }
    $scope.delete = function(num) {
            myFactory.chosencities.splice(num, 1)
            $scope.chosencities = myFactory.chosencities
            if (myFactory.chosencities.length < 6) {
                $scope.morecity = true;
            }
        }
        // 选择返回城市
    $scope.backcity = myFactory.backcity;
    // 改变当前选择的返回城市
    $scope.backshow=true;
    $scope.city2=new Array();
    $scope.chosebackcity = function(city,$index) {
            myFactory.backcity = city;
            $scope.backcity = myFactory.backcity;
            $scope.backshow=false;
            $scope.city2[$index]=true;
            angular.element.each($scope.city2,function(index,obj){
              if(index == $index){
                obj=true;
                $scope.city2[index]=true;
              }else{
                obj=false;
                $scope.city2[index]=false;
              }
            })
            setTimeout(function(){
              $state.go('main.home.city.confirm.infor')
            },1000)
        }
        // 默认选中的月份
    if(myFactory.nowdate == ''){
      var mydate = new Date();
      console.log((mydate.getMonth()+1) + "月");
      myFactory.nowdate = mydate.getMonth()+1;
      // $scope.$apply(function() {　　　　
      //      $scope.nowdate = myFactory.nowdate;　　　　 //在这里去手动触发脏检查
      // })
      $scope.nowdate = myFactory.nowdate;　
      console.log($scope.nowdate);
    }else{
      $scope.nowdate = myFactory.nowdate;　
    }
        // 点击添加更多城市按钮的显示与否
    angular.element(document).ready(function() {
        if (myFactory.chosencities.length == 6) {
            $scope.morecity = false;
        } else {
            $scope.morecity = true;
        }
    })
    // 创建行程按钮
    $scope.choseroute = function(){
      if(myFactory.chosencities.length == 0){
        // alert('您还没有选择任何目的地哦')
        Showbo.Msg.alert('您还没有选择任何目的地哦')
      }else{
        $http({
          url:'http://plan.icloudinn.com/zoule/index.php/home/index/tour',
          method:'GET',
          params:{
            'startcity':$scope.startcity,
            'backcity':$scope.backcity,
            'cities':JSON.stringify(myFactory.chosencities)
          }
        }).success(function(data,header,config,status){
          console.log('success');
          console.log(data);
          if(data.code==100){
            myFactory.myroute=data.data
            $state.go('main.home.city.confirm.infor.choseroute')
          }else{
            Showbo.Msg.alert('很尴尬,服务器傲娇了')
            $state.go('main.home.city.confirm.infor')
          }
        }).error(function(data,header,config,status){
          console.log('error');
          console.log(data);
        })
      }
    }
}])
