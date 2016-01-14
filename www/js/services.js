mfApp
  .factory("resumeObj",["$http",function($http){
    var resumeHandle = {
      resumeData: {},
      updateInfo: function(){
        console.log(this.resumeData);
      }
    };
    $http.get("resume-info.json")
      .success(function(data){
        angular.copy(data,resumeHandle.resumeData);
      });
    return resumeHandle;
  }])
  .factory("currentCityService",function(){
    return {
      currentCity: ""
    }
  });
