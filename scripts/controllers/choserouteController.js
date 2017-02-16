  app.controller('choserouteController', ['$scope', '$state', 'myFactory','$http',function($scope, $state, myFactory,$http) {
      $scope.cities2 = [];
      for (var a in myFactory.myroute) {
          $scope.cities2.push(a)
      }
      console.log($scope.cities2)
      console.log(myFactory.chosencities);
      $scope.cities3=[];
      for(var b=0;b<$scope.cities2.length;b++){
        for(var c=0;c<myFactory.chosencities.length;c++){
          if($scope.cities2[b] == myFactory.chosencities[c].name){
            $scope.cities3.push({
              'name':$scope.cities2[b],
              'days':myFactory.chosencities[c].days
            })
          }
        }
      }
      console.log($scope.cities3);
          // 页面刚加载默认选中第一个
      $scope.chose1 = true;
      $scope.chose2 = false;
      // 点击优化行程
      $scope.choseone = function() {
              $scope.chose1 = true;
              $scope.chose2 = false;
          }
          // 点击原行程
      $scope.chosetwo = function() {
              $scope.chose1 = false;
              $scope.chose2 = true;
          }
          // loading显示
      $scope.loadingif = false;
      // 下一步的点击事件
      $scope.next = function() {
              angular.element('.myroute').css('display','none')
              $scope.loadingif = true;
              // 选择优化
              if($scope.chose1 == true){
                $http({
                    url: 'http://plan.icloudinn.com/zoule/index.php/home/index/detailInfo',
                    method: 'GET',
                    params: {
                        'prefer': myFactory.chosenmyprefer,
                        'startcity': myFactory.startcity,
                        'backcity': myFactory.backcity,
                        'nowdate': myFactory.nowdate,
                        'cities': JSON.stringify($scope.cities3),
                        'openid': myFactory.userinfo.openid
                    }
                }).success(function(data, header, config, status) {
                    console.log('success')
                    console.log(data)
                    if (data.code == '100') {
                        console.log('请求成功')
                        $state.go('main.home.city.confirm.infor.choseroute.dazhi')
                        myFactory.myplan = data.data;
                        console.log(myFactory.myplan);
                    } else {
                        Showbo.Msg.alert('很尴尬,服务器傲娇了')
                        $scope.loadingif=false;
                        angular.element('.myroute').css('display','block')
                        $state.go('main.home.city.confirm.infor.choseroute')
                    }
                }).error(function(data, header, config, status) {
                    console.log('error')
                    Showbo.Msg.alert('很尴尬,服务器傲娇了')
                    angular.element('.myroute').css('display','block')
                    $scope.loadingif=false;
                    $state.go('main.home.city.confirm.infor.choseroute')
                    console.log(data);
                })
              }else{
                // 选择原行程
                $http({
                    url: 'http://plan.icloudinn.com/zoule/index.php/home/index/detailInfo',
                    method: 'GET',
                    params: {
                        'prefer': myFactory.chosenmyprefer,
                        'startcity': myFactory.startcity,
                        'backcity': myFactory.backcity,
                        'nowdate': myFactory.nowdate,
                        'cities': JSON.stringify(myFactory.chosencities),
                        'openid': myFactory.userinfo.openid
                    }
                }).success(function(data, header, config, status) {
                    console.log('success')
                    console.log(data)
                    if (data.code == '100') {
                        console.log('请求成功')
                        $state.go('main.home.city.confirm.infor.choseroute.dazhi')
                        myFactory.myplan = data.data;
                        console.log(myFactory.myplan);
                    } else {
                                            Showbo.Msg.alert('很尴尬,服务器傲娇了')
                        $scope.loadingif=false;
                        angular.element('.myroute').css('display','block')
                        $state.go('main.home.city.confirm.infor.choseroute')
                    }
                }).error(function(data, header, config, status) {
                    console.log('error')
                    Showbo.Msg.alert('很尴尬,服务器傲娇了')
                    angular.element('.myroute').css('display','block')
                    $scope.loadingif=false;
                    $state.go('main.home.city.confirm.infor.choseroute')
                    console.log(data);
                })
              }
          }
          //掉起高德地图
          //行程是否显示
      $scope.isroute = function() {
              if ($scope.cities2.length == 1) {
                  console.log('here');
                  return false;
              } else {
                  console.log('there');
                  return true;
              }
          }
          // 城市-是否显示
      $scope.isheng = function(index) {
          if (index == $scope.cities2.length - 1) {
              return false;
          } else {
              return true;
          }
      }

      function gaode2(num, array) {
          if (num == 1) {
              var map = new AMap.Map('container2', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, ]);
              });
          } else if (num == 2) {
              var map = new AMap.Map('container2', {
                  zoom: 10,
                  center: [110.35, 20.02],
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, {
                      keyword: array[1]
                  }]);
              });
          } else if (num == 3) {
              var map = new AMap.Map('container2', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, {
                      keyword: array[1]
                  }, {
                      keyword: array[2]
                  }]);
              });
          } else if (num == 4) {
              var map = new AMap.Map('container2', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, {
                      keyword: array[1]
                  }, {
                      keyword: array[2]
                  }, {
                      keyword: array[3]
                  }]);
              });
          } else if (num == 5) {
              var map = new AMap.Map('container2', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, {
                      keyword: array[1]
                  }, {
                      keyword: array[2]
                  }, {
                      keyword: array[3]
                  }, {
                      keyword: array[4]
                  }]);
              });
          } else if (num == 6) {
              var map = new AMap.Map('container2', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, {
                      keyword: array[1]
                  }, {
                      keyword: array[2]
                  }, {
                      keyword: array[3]
                  }, {
                      keyword: array[4]
                  }, {
                      keywordk: array[5]
                  }]);
              });
          }
      }
      gaode2($scope.cities2.length, $scope.cities2)
      var cities = [];
      for (var a = 0; a < myFactory.chosencities.length; a++) {
          cities[a] = myFactory.chosencities[a].name
      }
      console.log(cities)

      function gaode(num, array) {
          if (num == 1) {
              var map = new AMap.Map('container', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, ]);
              });
          } else if (num == 2) {
              var map = new AMap.Map('container', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, {
                      keyword: array[1]
                  }]);
              });
          } else if (num == 3) {
              var map = new AMap.Map('container', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, {
                      keyword: array[1]
                  }, {
                      keyword: array[2]
                  }]);
              });
          } else if (num == 4) {
              var map = new AMap.Map('container', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, {
                      keyword: array[1]
                  }, {
                      keyword: array[2]
                  }, {
                      keyword: array[3]
                  }]);
              });
          } else if (num == 5) {
              var map = new AMap.Map('container', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, {
                      keyword: array[1]
                  }, {
                      keyword: array[2]
                  }, {
                      keyword: array[3]
                  }, {
                      keyword: array[4]
                  }]);
              });
          } else if (num == 6) {
              var map = new AMap.Map('container', {
                  zoom: 10,
                  center: [110.35, 20.02]
              })
              AMap.service(["AMap.Driving"], function() {
                  var driving = new AMap.Driving({
                      map: map,
                  }); //构造路线导航类
                  // 根据起终点坐标规划步行路线
                  driving.search([{
                      keyword: array[0]
                  }, {
                      keyword: array[1]
                  }, {
                      keyword: array[2]
                  }, {
                      keyword: array[3]
                  }, {
                      keyword: array[4]
                  }, {
                      keywordk: array[5]
                  }]);
              });
          }
      }
      gaode(cities.length, cities)
  }])
