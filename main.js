

angular
  .module('three',[])
  .controller("threeCtrl", ['$scope','$filter',function($scope, $filter) {

    $scope.scene = new THREE.Scene();
    $scope.camera = new THREE.PerspectiveCamera(45,window.innerWidth/(window.innerHeight-50), .1,500);
    $scope.renderer = new THREE.WebGLRenderer();

    $scope.renderer.setClearColor(0x000000);
    $scope.renderer.setSize(window.innerWidth,window.innerHeight-50);

    $scope.axis = new THREE.AxisHelper(10);
    $scope.scene.add($scope.axis);

    $scope.cubeGeometry = new THREE.BoxGeometry(5,5,5);
    $scope.cubeMaterial = new THREE.MeshBasicMaterial({color:0xdddddd, wireframe:true});

    $scope.cube = new THREE.Mesh($scope.cubeGeometry,$scope.cubeMaterial);

    $scope.cube.position.x = 10;
    $scope.cube.position.y = 10;
    $scope.cube.position.z = 10;

    $scope.scene.add($scope.cube);

    $scope.camera.position.x = 40;
    $scope.camera.position.y = 40;
    $scope.camera.position.z = 40;

    $scope.camera.lookAt($scope.scene.position);

    $('#webGL-container').append($scope.renderer.domElement);
    $scope.renderer.render($scope.scene,$scope.camera);

    $scope.cameraAdjust = function(axis,positive){
      var amount = -1;
      if(positive){
          amount *= -1;
      }
      $scope.camera.position[axis]+=amount
      $scope.camera.lookAt($scope.scene.position);
      $scope.renderer.render($scope.scene,$scope.camera);
    };


  }]);
