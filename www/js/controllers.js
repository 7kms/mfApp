mfApp
  .filter("limitDesc",function(){
    return function(input,limitLength){
        var limit = limitLength || 25;
        var str;
        if(limit < input.length){
          str = input.slice(0,limit) + "...";
        }else{
          str = input;
        }
        return str;
    }
  })
  .controller("resumeControl",["$scope","$state","resumeObj",function($scope,$state,resumeObj){
    $scope.resumeData = resumeObj.resumeData;
    $scope.resumeViewObj = {
      career:[],
      projects:[],
      education:[]
    };
    $scope.limitCount = 25;
    $scope.changeDescView = function(item,index){
      this.resumeViewObj[item][index] = !this.resumeViewObj[item][index];
    };
    $scope.handleInfo = {
      education : function(eduIndex){
        $state.go("education",{index: eduIndex});
      },
      positionExp : function(){
        $state.go("position");
      },
      workInfo : function(careeIndex){
        $state.go("work",{index: careeIndex});
      },
      basicInfo : function(){
        $state.go("basic");
      },
      projectInfo : function(projectIndex){
        $state.go("project",{index: projectIndex});
      },
      languageInfo : function(){
        $state.go("language");
      },
      evaluationInfo : function(){
        $state.go("evaluation");
      },
      otherInfo : function(){
        $state.go("other");
      }
    };
  }])
  .controller("basicControl",["$scope","$timeout","$ionicHistory","$ionicModal","$ionicScrollDelegate","resumeObj","cityLinkObj","datePickObj",function($scope,$timeout,$ionicHistory,$ionicModal,$ionicScrollDelegate,resumeObj,cityLinkObj,datePickObj){
    $scope.basicData = resumeObj.resumeData;
    $scope.switchGender = function(gender){
      this.basicData.gender = gender;
    };
    $scope.updateBasic = function(){
      resumeObj.updateInfo();
      console.log("修改成功");
      $ionicHistory.goBack();
    };
    $scope.workExpArr = ["在读学生", "应届毕业生", "1年以下", "1-3年", "3-5年", "5-10年", "10年以上"];
    $scope.citySourceObj = cityLinkObj;
    $scope.datePickObj = datePickObj;
  }])
  .controller("eduControl",["$scope","$state","$ionicHistory","resumeObj","datePickObj",function($scope,$state,$ionicHistory,resumeObj,datePickObj){
    var index = parseInt($state.params.index);
    $scope.eduData = resumeObj.resumeData.education[index];
    if(!$scope.eduData){
      $scope.eduData = {};
      $scope.updateEdu = function(){
        resumeObj.resumeData.education.push($scope.eduData);
        resumeObj.updateInfo();
        console.log("新增成功");
        $ionicHistory.goBack();
      }
    }else{
      $scope.updateEdu = function(){
        resumeObj.updateInfo();
        console.log("修改成功");
        $ionicHistory.goBack();
      };
      $scope.deleteInfo = function(){
        resumeObj.resumeData.education.splice(index,1);
        console.log("删除成功");
        $ionicHistory.goBack();
      };
      $scope.datePickObj = datePickObj;
    }
  }])
  .controller("positionExpControl",["$scope","$state","$ionicHistory","resumeObj","cityLinkObj",function($scope,$state,$ionicHistory,resumeObj,cityLinkObj){
    $scope.positionExpData = resumeObj.resumeData;
    $scope.updatePositionExp = function(){
      resumeObj.updateInfo();
      $ionicHistory.goBack();
    };
    $scope.citySourceObj = cityLinkObj;
  }])
  .controller("workControl",["$scope","$state","$ionicHistory","resumeObj","datePickObj",function($scope,$state,$ionicHistory,resumeObj,datePickObj){
    var index = parseInt($state.params.index);
    $scope.workData = resumeObj.resumeData.career[index];
    if(!$scope.workData){
      $scope.workData = {};
      $scope.updateWork = function(){
        resumeObj.resumeData.career.push($scope.workData);
        resumeObj.updateInfo();
        console.log("新增成功");
        $ionicHistory.goBack();
      }
    }else{
      $scope.updateWork = function(){
        resumeObj.updateInfo();
        console.log("修改成功");
        $ionicHistory.goBack();
      };
      $scope.deleteInfo = function(){
        resumeObj.resumeData.career.splice(index,1);
        console.log("删除成功");
        $ionicHistory.goBack();
      }
    }
    $scope.datePickObj = datePickObj;
  }])
  .controller("projectControl",["$scope","$state","$ionicHistory","resumeObj","datePickObj",function($scope,$state,$ionicHistory,resumeObj,datePickObj){
    var index = parseInt($state.params.index);
    $scope.projectData = resumeObj.resumeData.projects[index];
    if(!$scope.projectData){
      $scope.projectData = {};
      $scope.updateProject = function(){
        resumeObj.resumeData.projects.push($scope.projectData);
        resumeObj.updateInfo("project");
        console.log("新增成功");
        $ionicHistory.goBack();
      }
    }else{
      $scope.updateProject = function(){
        resumeObj.updateInfo("project");
        console.log("修改成功");
        $ionicHistory.goBack();
      };
      $scope.deleteInfo = function(){
        resumeObj.resumeData.projects.splice(index,1);
        console.log("删除成功");
        $ionicHistory.goBack();
      }
    }
    $scope.datePickObj = datePickObj;
  }])
  .controller("languageControl",["$scope","$state","$ionicHistory","resumeObj",function($scope,$state,$ionicHistory,resumeObj){
    var lanArr = ["普通话","粤语","英语","法语","日语"];
    var lanDefault = {};
    var lanOld = resumeObj.resumeData.languages;
    $scope.lanArr = lanArr;
    $scope.languageInfo = {};
    $scope.languageInfo.lanData = lanDefault;
    angular.forEach(lanArr,function(ele){
      lanDefault[ele] = false;
    });
    $scope.languageInfo.otherLanguage = "";
    angular.forEach(lanOld,function(element){
      if(lanDefault[element] != undefined){
        lanDefault[element] = true;
      }else{
        $scope.languageInfo.otherLanguage = element;
      }
    });
    $scope.changeLanguage = function(lan){
      lanDefault[lan] = !lanDefault[lan];
    };
    $scope.updateLanguage = function(){
      var newLanguage = [];
      angular.forEach(lanDefault,function(value,key){
        if(value){
          this.push(key);
        }
      },newLanguage);
      console.log("$scope.otherLanguage",$scope.otherLanguage);
      if($scope.languageInfo.otherLanguage){
        newLanguage.push($scope.languageInfo.otherLanguage);
      }
      resumeObj.resumeData.languages = newLanguage;
      resumeObj.updateInfo("language");
      console.log("修改成功");
      $ionicHistory.goBack();
    }
  }])
  .controller("evaluatControl",["$scope","$state","$ionicHistory","resumeObj",function($scope,$state,$ionicHistory,resumeObj){
    $scope.evaluationData = resumeObj.resumeData;
    $scope.updateEvaluation = function(){
      resumeObj.updateInfo("evaluation");
      console.log("修改成功");
      $ionicHistory.goBack();
    };
  }])
  .controller("otherControl",["$scope","$state","$ionicHistory","resumeObj",function($scope,$state,$ionicHistory,resumeObj){
    $scope.otherInfoData = resumeObj.resumeData;
    $scope.updateOtherInfo = function(){
      resumeObj.updateInfo("other");
      console.log("修改成功");
      $ionicHistory.goBack();
    };
  }]);
