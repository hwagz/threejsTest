

angular
  .module('three',[])
  .controller("threeCtrl", ['$scope','$filter',function($scope, $filter) {

    $scope.scene = new THREE.Scene();
    $scope.camera = new THREE.PerspectiveCamera(45,window.innerWidth/(window.innerHeight-50), .1,500);
    $scope.renderer = new THREE.WebGLRenderer();

    $scope.renderer.setClearColor(0xdddddd);
    $scope.renderer.setSize(window.innerWidth,window.innerHeight-50);
    $scope.renderer.shadowMapEnabled = true;
    $scope.renderer.shadowMapSoft = true;

    $scope.axis = new THREE.AxisHelper(10);
    $scope.scene.add($scope.axis);

    var grid = new THREE.GridHelper(25,5);
    var color = new THREE.Color("rgb(255,0,0)");
    grid.setColors(color,0x000000);

    $scope.scene.add(grid);

    $scope.cubeGeometry = new THREE.BoxGeometry(5,5,5);
    $scope.cubeMaterial = new THREE.MeshLambertMaterial({color:0xff3300});


    $scope.cube = new THREE.Mesh($scope.cubeGeometry,$scope.cubeMaterial);

    $scope.cube.position.x = 2.5;
    $scope.cube.position.y = 5.5;
    $scope.cube.position.z = 2.5;
    $scope.cube.castShadow = true;

    var planeGeometry = new THREE.PlaneGeometry(50,50,50);
    var planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);


    plane.rotation.x = -.5*Math.PI;
    plane.receiveShadow = true;
    $scope.scene.add(plane);
    $scope.scene.add($scope.cube);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set(15,30,15);

    $scope.scene.add(spotLight);

    $scope.camera.position.x = 40;
    $scope.camera.position.y = 25;
    $scope.camera.position.z = 40;

    $scope.camera.lookAt($scope.cube.position);

    $('#webGL-container').append($scope.renderer.domElement);

    function render() {
      requestAnimationFrame( render );
      $scope.cube.rotation.x += 0.05;
      $scope.cube.rotation.z += 0.05;
      $scope.renderer.render( $scope.scene, $scope.camera );
    }
    render();


    $scope.cameraAdjust = function(axis,positive){
      var amount = -5;
      if(positive){
          amount *= -1;
      }
      $scope.camera.position[axis]+=amount
      $scope.camera.lookAt($scope.cube.position);
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
