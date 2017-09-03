/**
 * Created by sanolab on 2017/07/19.
 */

(function (){
    'use strict';

    angular
        .module('hxPhotos')
        .factory('WebcamService', WebcamService);

    WebcamService.$inject = [];

    function WebcamService () {
        var service = this;
        service.webcam = {};
        service.webcam.isTurnOn = false;
        service.webcam.patData = null;
        service.video = null;
        service.stream = null;
        service.webcam.patOpts = {x: 0, y: 0, w: 100, h: 100};
        service.webcam.channel = {};
        service.webcam.webcamError = false;

        service.getVideoData = function getVideoData(x, y, w, h) {
            var hiddenCanvas = document.createElement('canvas');
            hiddenCanvas.width = service.video.width;
            hiddenCanvas.height = service.video.height;
            var ctx = hiddenCanvas.getContext('2d');
            ctx.drawImage(service.video, 0, 0, service.video.width, service.video.height);
            return ctx.getImageData(x, y, w, h);
        };

        service.sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
            service.webcam.snapshotData = imgBase64;
        };

        service.webcam.makeSnapshot = function() {
            if (service.video) {
                var patCanvas = document.querySelector('#snapshot');
                if (!patCanvas) return;

                // patCanvas.width = service.video.width;
                // patCanvas.height = service.video.height;
                var ctxPat = patCanvas.getContext('2d');

                var idata = service.getVideoData(service.webcam.patOpts.x, service.webcam.patOpts.y, service.webcam.patOpts.w, service.webcam.patOpts.h);
                ctxPat.putImageData(idata, 0, 0);

                service.sendSnapshotToServer(patCanvas.toDataURL());

                service.webcam.patData = idata;

                service.webcam.success(service.webcam.snapshotData.substr(service.webcam.snapshotData.indexOf('base64,') + 'base64,'.length), 'image/png');
                // service.webcam.turnOff();
                console.log('take a photo');
            }
        };

        service.webcam.onSuccess = function () {
            service.video = service.webcam.channel.video;
            service.webcam.patOpts.w = service.video.width;
            service.webcam.patOpts.h = service.video.height;
            service.webcam.isTurnOn = true;
        };

        service.webcam.onStream = function (stream) {
            var activeStream = stream;
            return activeStream;
        };

        service.webcam.downloadSnapshot = function downloadSnapshot(dataURL) {
            window.location.href = dataURL;
        };

        service.webcam.onError = function (err) {
            service.webcam.webcamError = err;
        };

        service.webcam.turnOff = function () {
            service.webcam.isTurnOn = false;
            if (activeStream && activeStream.getVideoTracks) {
                checker = typeof activeStream.getVideoTracks === 'function';
                if (checker) {
                    return activeStream.getVideoTracks()[0].stop();
                }
                return false;
            }
            return false;
        };

        var webCamResults = {
            webcam: service.webcam
        };
        return webCamResults;

    }

})();
