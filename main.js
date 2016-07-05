

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
    $scope.cubeMaterial = new THREE.MeshBasicMaterial({color:0x00ff00, wireframe:true});

    $scope.cube = new THREE.Mesh($scope.cubeGeometry,$scope.cubeMaterial);

    $scope.cube2 = new THREE.Mesh($scope.cubeGeometry,$scope.cubeMaterial);

    $scope.cube.position.x = 10;
    $scope.cube.position.y = 10;
    $scope.cube.position.z = 10;

    $scope.cube2.position.x = -10;
    $scope.cube2.position.y = 10;
    $scope.cube2.position.z = 20;

    $scope.scene.add($scope.cube);
    $scope.scene.add($scope.cube2);

    $scope.camera.position.x = 40;
    $scope.camera.position.y = 25;
    $scope.camera.position.z = 40;

    $scope.camera.lookAt($scope.scene.position);

    $('#webGL-container').append($scope.renderer.domElement);

    function render() {
      requestAnimationFrame( render );
      $scope.cube.rotation.x += 0.05;
      $scope.cube.rotation.y += 0.05;
      $scope.cube2.rotation.x += 0.05;
      $scope.cube2.rotation.y += 0.05;
      $scope.renderer.render( $scope.scene, $scope.camera );
    }
    render();


    $scope.cameraAdjust = function(axis,positive){
      var amount = -5;
      if(positive){
          amount *= -1;
      }
      $scope.camera.position[axis]+=amount
      $scope.camera.lookAt($scope.scene.position);
    };
    // Handles key presses
    $scope.keyHandler = function(e){
      e = e.keyCode;
      //console.log(e);
      //w: 87 s: 83, y axis
      //a: 65 d: 68, x axis
      //q: 81 e: 69, z axis

      if(e>=65 && e<=87){
        var axis = 'y';
        var positive = false;
        if(e<83){
          axis = e<69 ? 'x' : 'z';
        }
        if(e==87 || e==65 || e==81){
          positive = true;
        }
        $scope.cameraAdjust(axis,positive);
      }

    };


  }]);
