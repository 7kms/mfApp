(function(){
  var modalSelectTemplates = {};
  modalSelectTemplates.singleTemplate =
    "<div class='emulate-select-control'>"+
    "<ion-modal-view>"+
    "<div class='emulate-select-bg'></div>"+
    "<div class='emulate-select-content'>"+
    "<ion-header-bar class='bar-balanced'>"+
    "<h3 class='title'>{{selectObj.title}}</h3>"+
    "<button class='button button-balanced' ng-click='selectObj.selectOk()'>确认</button>"+
    "</ion-header-bar>"+
    "<div class='emulate-select-inner has-header'>"+
    "<ion-scroll class='e-s-scroll-box' delegate-handle='{{ selectObj.handle }}' on-scroll='selectObj.getData()'>"+
    "<ul class='e-select-list text-center'>"+
    "<li class='e-select-item' ng-repeat='source in selectObj.sourceArr'>{{source}}</li>"+
    "</ul>"+
    "</ion-scroll>"+
    "<div class='select-picker-center-highlight'></div>"+
    "</div>"+
    "</div>"+
    "</ion-modal-view>"+
    "</div>";
  angular.module("ionic-source-select",[])
    .directive("ionicSingleSelect",["$timeout","$ionicModal","$ionicScrollDelegate",function($timeout,$ionicModal,$ionicScrollDelegate){
      return {
        restrict:"E",
        template:"<input type='text' ng-model='selectObj.modelData' readonly >",
        scope:false,
        replace:true,
        link:function(scope,element,attrs){
          var selectObj = scope.selectObj = {},controlModel=null;
          selectObj.title = attrs.controlTitle || "请选择";
          selectObj.handle = attrs.controlHandle || "selectHandle";
          selectObj.placeholder = attrs.placeholder || "请选择";
          selectObj.sourceArr = scope[attrs.controlDataSource];
          selectObj.initData = attrs.controlInitData;
          selectObj.modelData = selectObj.initData;
          selectObj.selectOk = function(){
            var source =  attrs.controlModelData.split(".");
            var data = selectObj.sourceArr[selectObj.index];
            scope[source[0]][source[1]] = selectObj.modelData = data;
            controlModel.hide();
          };
          selectObj.init = function(item,itemList){
            var handle = $ionicScrollDelegate.$getByHandle(selectObj.handle);
            var index;
            for(var i= 0,len=itemList.length; i<len; i++){
              if(itemList[i] === item){
                index = i;
                break;
              }
            }
            if(index === undefined){
              index = 0;
            }
            handle.scrollTo(0,index*36);
          };
          selectObj.getData = function(){
            var handle = $ionicScrollDelegate.$getByHandle(selectObj.handle);
            var scrollTop = handle.getScrollPosition().top;
            var itemIndex = Math.round(scrollTop/36);
            var len = selectObj.sourceArr.length;
            $timeout.cancel(selectObj.scrolling);
            itemIndex = (itemIndex < 0) ? 0 : ((itemIndex > len - 1) ? (len - 1) : itemIndex);
            if(itemIndex*36 === scrollTop){
              selectObj.index = itemIndex;
            }
            selectObj.scrolling = $timeout(function(){
              handle.scrollTo(0,itemIndex*36,true);
            },100);
          };
          element.on("click",function(){
            if(!attrs.checked){
              controlModel && controlModel.remove();
            }else{
              controlModel && controlModel.show();
              return false;
            }
            attrs.checked = true;
            controlModel = $ionicModal.fromTemplate(modalSelectTemplates.singleTemplate,{
              scope: scope,
              animation: 'slide-in-up',
              backdropClickToClose: true
            });
            selectObj.getData();
            selectObj.init(selectObj.initData,selectObj.sourceArr);
            controlModel.show();
          });
        }
      }
    }])
})();
