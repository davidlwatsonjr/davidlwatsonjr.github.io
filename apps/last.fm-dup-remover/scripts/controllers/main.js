'use strict';

angular.module('last.fmDupRemoverApp').controller('MainCtrl', function ($scope, lastFM) {
  $scope.apiAccount = {
    'apiKey': '0f77640817004a0630133cff90dc70fe'
  };

  $scope.recentTracks = [];
  $scope.page = 1;
  $scope.duplicateThreshold = 2;
  $scope.window = window;

  var loadRecentTracks = function () {
    if (!angular.isObject($scope.lastFmSessionInfo)) {
      return;
    }

    $scope.communicating = true;
    $scope.retreivingTracks = true;

    lastFM.get('user_getRecentTracks', {user: $scope.lastFmSessionInfo.name, limit: 200, page: $scope.page})
      .then(function (data) {
        $scope.communicating = false;
        $scope.retreivingTracks = false;

        if (data.data.success && data.data.lastFmResponse.recenttracks.track.length) {
          $scope.recentTracksMeta = data.data.lastFmResponse.recenttracks['@attr'];
          $scope.recentTracks = $scope.recentTracks.concat(data.data.lastFmResponse.recenttracks.track);
          if (!$scope.stopRetrieving) {
            $scope.page++;
          }
        }
      });
  };

  $scope.$watch('lastFmSessionInfo.name', function (username) {
    if (username) {
      loadRecentTracks();
    }
  });

  $scope.$watch('page', function (page) {
    if (page) {
      loadRecentTracks();
    }
  });

  $scope.$watch('recentTracks', function (tracks) {
    computeRecentTracks();
  });

  $scope.$watch('duplicateThreshold', function (threshold) {
    computeRecentTracks();
  });

  var computeRecentTracks = function() {
    var trackIndex, track;

    $scope.duplicateTracks = [];

    for (trackIndex in $scope.recentTracks) {
      track = $scope.recentTracks[trackIndex];

      if (isDuplicateTrackAt(trackIndex)) {
        track.index = parseInt(trackIndex, 10) + 1;
        $scope.duplicateTracks.push(track);
      }
    }
  };

  var isDuplicateTrackAt = function (index) {
    index = parseInt(index, 10);

    var thisTrack = $scope.recentTracks[index],
        nextTrack = $scope.recentTracks[index + 1],
        thisDate, nextDate;

    if (angular.isObject(thisTrack) &&
        angular.isObject(thisTrack.date) &&
        thisTrack.date.uts) {
      thisDate = parseInt(thisTrack.date.uts, 10);
    }

    if (angular.isObject(nextTrack) &&
        angular.isObject(nextTrack.date) &&
        nextTrack.date.uts) {
      nextDate = parseInt(nextTrack.date.uts, 10);
      if ((Math.abs(nextDate - thisDate) < $scope.duplicateThreshold) && 
          (nextTrack.mbid === thisTrack.mbid) &&
          (nextTrack.name === thisTrack.name)) {
        return true;
      }
    }

    return false;
  };

  $scope.setPage = function (page) {
    $scope.page = page;
  };

  $scope.unscrobble = function(track) {
    lastFM
      .post('track_unscrobble', {
        artist: track.artist['#text'],
        title: track.name,
        timestamp: track.date.uts
      })
      .then(function (data) {
        console.log(data);
      });
  };

  $scope.communicating = true;
  $scope.checkingAuthentication = true;
  lastFM.getSession()
    .then(function (data) {
      $scope.communicating = false;
      $scope.checkingAuthentication = false;

      if (data.data.lastFmSessionInfo) {
          $scope.lastFmSessionInfo = data.data.lastFmSessionInfo;
      }
    });
});

