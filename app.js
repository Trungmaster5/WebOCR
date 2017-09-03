(function () {
'use strict';

angular.module('WebOCRApp',['hxPhotos'])
       .controller('AdminController', AdminController);


  AdminController.$inject = ['WebcamService'];
  function AdminController(WebcamService){
    var $ctrl=this;

    $ctrl.data=4;
    $ctrl.webcam = WebcamService.webcam;

    $ctrl.capture=function(){
      console.log('Image captured');
      $ctrl.webcam.makeSnapshot();
    };

    $ctrl.convert=function(){
      var img = document.getElementById("capturedImage");
      Tesseract.recognize(img,{
              //lang: 'jpn',
              lang:'eng'
          })
         .progress(function (p) { console.log('progress', p);})
         .then(function (result) {
           console.log('result', result);
           var div = document.getElementById('display');
           div.innerHTML += result.html;
         });
    };
  }
})();
