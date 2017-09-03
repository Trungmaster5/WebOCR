/**
 * Created by sanolab on 2017/07/18.
 */

(function(){
    "use strict";
    angular.module('hxPhotos')
        .component('capturePhotos',{
            templateUrl:'/hxPhotos/capturePhotos.html',
            controller:capturePhotosController,
            bindings:{
                bindingData:'<',
                outputImage:'&'
            }
        });

    capturePhotosController.$inject=['$scope','WebcamService'];
    function capturePhotosController($scope,WebcamService) {
        var $ctrl = this;
        console.log('inside component');

        $ctrl.dataPrint=$ctrl.bindingData;
        console.log('binding data =',$ctrl.dataPrint);

        $ctrl.myChannel = {
            // the fields below are all optional
            videoHeight: 1000,
            videoWidth: 500,
            video: null // Will reference the video element on success
        };


        // $ctrl.showweb = false;
        $ctrl.showweb=true;
        $ctrl.statusCamera='ON CAMERA';
        $ctrl.statusCamButton=function () {
          if ($ctrl.showweb===false){
              $ctrl.statusCamera='OFF CAMERA';
              $ctrl.showweb=true;
          }
          else {
              $ctrl.statusCamera='ON CAMERA';
              $ctrl.showweb=false;
              $ctrl.webcam.turnOff();
          }
        };
        $ctrl.webcam = WebcamService.webcam;
        $ctrl.webcam.channel=$ctrl.myChannel;
        console.log('webcam channel =',$ctrl.webcam.channel);

        //override function for be call when capture is finalized
        $ctrl.webcam.success = function(image, type) {
            $ctrl.photo = image;
            $ctrl.fotoContentType = type;
            $ctrl.snapshotData=$ctrl.webcam.snapshotData;
            $ctrl.outputImage=image;
            console.log($ctrl.snapshotData);
            // console.log('photo',$ctrl.snapshotData);
            // $ctrl.showweb = false;

        };



        $ctrl.downLoad= function () {
            $ctrl.webcam.downloadSnapshot($ctrl.snapshotData);
            console.log('Download image');
        };
        // function turnOffWebCam() {
        //     if($ctrl.webcam && $ctrl.webcam.isTurnOn===true)
        //         $ctrl.webcam.turnOff();
        // }
    }


})();
