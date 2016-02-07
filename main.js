/**
 * Created by AleX on 3/29/2015.
 */
require([], function(){
    // detect WebGL
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
        throw 'WebGL Not Available'
    }
    // setup webgl renderer full page
    var renderer = new THREE.WebGLRenderer();
    var CANVAS_WIDTH = 1200, CANVAS_HEIGHT = 800;
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    var gbox = document.getElementById('graphicsbox');

    gbox.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60,CANVAS_WIDTH/CANVAS_HEIGHT, 0.01, 1000);
    var score=0;
    camera.position.y=5;
    camera.position.z=40;

    var onRenderFcts = [];

    var winResize = new THREEx.WindowResize(renderer, camera);

    var ambientLight= new THREE.AmbientLight( 0x404040 )
    scene.add( ambientLight)
    var frontLight	= new THREE.DirectionalLight(0xffffff, 2);
    frontLight.position.set(10,10,0.0);
    scene.add( frontLight )


    var path = "textures/"
    /* The image names can be ANYTHING, but the the order of the SIX images
     in the array will be used as follows:
     the 1st image => Positive X axis
     the 2nd image => Negative X axis
     the 3rh image => Positive Y axis
     the 4th image => Negative Y axis
     the 5th image => Positive Z axis
     the 6th image => Negative Z axis
     */

    var images = [path + "posx.jpg", path + "negx.jpg",
        path + "posy.jpg", path + "negy.jpg",
        path + "posz.jpg", path + "negz.jpg"];

    var cubemap = THREE.ImageUtils.loadTextureCube( images );

    var scooter_cf = new THREE.Matrix4();
    scooter_cf.makeTranslation(0,5,0);

    var scooter = new Scooter();
    scooter.position.x=0;
    scooter.position.y= 10;
    scooter.position.z= 0;

    scene.add(scooter);


    var stone_tex = THREE.ImageUtils.loadTexture("textures/stonetex.jpg");
    stone_tex.wrapS = THREE.RepeatWrapping;
    stone_tex.wrapT = THREE.RepeatWrapping;

    var groundGeo = new THREE.BoxGeometry(40,0,40);
    var groundMat = new THREE.MeshPhongMaterial({ map:stone_tex});
    var ground = new THREE.Mesh(groundGeo,groundMat);

    ground.position.y=-10;
    scene.add(ground);

    var sphereGeo = new THREE.SphereGeometry(2,30,30);
    var sphereMat = new THREE.MeshBasicMaterial({envMap:cubemap});
    var sphere = new THREE.Mesh(sphereGeo,sphereMat);
    var sArray = [];
    var cfArray = [];

    for(var x=-15; x<=15; x+=10){
        for(var z= -15; z<=15; z+=10){
            var ball = sphere.clone();
            ball.pointVal=1;
            ball.position.x=x;
            ball.position.y=-8;
            ball.position.z=z;
            ball.rad= 2;
            ball.pop=false;
            sArray.push(ball);
            scene.add(ball);
            var ball_cf = new THREE.Matrix4();
            cfArray.push(ball_cf);
        }
    }

    setBombs(3);



    camera.lookAt(new THREE.Vector3(0,5,0));
    var moveForward=0;
    var moveBack= 0;
    var moveLeft = 0;
    var moveRight = 0;
    var moveUp=0;
    var moveDown=0;
    var rotateCW=0;
    var rotateCCW=0;
    var rotateXPos=0;
    var rotateXNeg=0;
    var rotateZPos=0;
    var rotateZNeg=0;
    onRenderFcts.push(function(delta,now){

        var tran = new THREE.Vector3();
        var quat = new THREE.Quaternion();
        var rot = new THREE.Quaternion();
        var vscale = new THREE.Vector3();

        if(moveForward>=1) {
            var temp = new THREE.Matrix4().makeTranslation(0,0,-1);
            scooter_cf.copy(temp.multiply(scooter_cf));
            scooter_cf.decompose(tran, quat, vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            moveForward--;
        }
        if(moveBack>=1) {
            var temp = new THREE.Matrix4().makeTranslation(0,0,1);
            scooter_cf.copy(temp.multiply(scooter_cf));
            scooter_cf.decompose(tran, quat, vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            moveBack--;
        }
        if(moveUp>=1) {
            var temp = new THREE.Matrix4().makeTranslation(0,1,0);
            scooter_cf.copy(temp.multiply(scooter_cf));
            scooter_cf.decompose(tran, quat, vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            moveUp--;
        }
        if(moveDown>=1) {
            var temp = new THREE.Matrix4().makeTranslation(0,-1,0);
            scooter_cf.copy(temp.multiply(scooter_cf));
            scooter_cf.decompose(tran, quat, vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            moveDown--;
        }
        if(moveLeft>=1) {
            var temp = new THREE.Matrix4().makeTranslation(-1,0,0);
            scooter_cf.copy(temp.multiply(scooter_cf));
            scooter_cf.decompose(tran, quat, vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            moveLeft--;
        }
        if(moveRight>=1) {
            var temp = new THREE.Matrix4().makeTranslation(1,0,0);
            scooter_cf.copy(temp.multiply(scooter_cf));
            scooter_cf.decompose(tran, quat, vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            moveRight--;
        }
        if(rotateCW>=1){
            var temp = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(45));
            scooter_cf= scooter_cf.multiply(temp);
            scooter_cf.decompose(tran,quat,vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            rotateCW--;
        }
        if(rotateXPos>=1){
            var temp = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(45));
            scooter_cf= scooter_cf.multiply(temp);
            scooter_cf.decompose(tran,quat,vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            rotateXPos--;
        }
        if(rotateZPos>=1){
            var temp = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(45));
            scooter_cf= scooter_cf.multiply(temp);
            scooter_cf.decompose(tran,quat,vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            rotateZPos--;
        }
        if(rotateCCW>=1){
            var temp = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-45));
            scooter_cf= scooter_cf.multiply(temp);
            scooter_cf.decompose(tran,quat,vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            rotateCCW--;
        }
        if(rotateXNeg>=1){
            var temp = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-45));
            scooter_cf= scooter_cf.multiply(temp);
            scooter_cf.decompose(tran,quat,vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            rotateXNeg--;
        }
        if(rotateZNeg>=1){
            var temp = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-45));
            scooter_cf= scooter_cf.multiply(temp);
            scooter_cf.decompose(tran,quat,vscale);
            scooter.position.copy(tran);
            scooter.quaternion.copy(quat);
            rotateZNeg--;
        }
        for(var i = 0; i<sArray.length;i++){
            var ball= sArray[i];
            var ball_cf= cfArray[i];
            if(ball.pop===true){
                if(ball.rad>0.4){
                    ball.rad=ball.rad*0.85;
                    ball.scale.set(0.85,0.85,0.85);
                }
                else{
                    scene.remove(ball);
                }


            }
        }

        checkCol();
        checkScore();


    });

    function setBombs(num){
        for(var i =0; i<num; i++){
            var bomb= Math.floor(Math.random()*16);
            if(sArray[bomb].pointVal!=1){
                i--
            }
            else{
                sArray[bomb].pointVal=-10;
            }
        }

    }

    document.addEventListener('keypress', function(event){
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if(key == 'w'){
            moveForward+=1;
        }
        if(key == 's'){
            moveBack+=1;
        }
        if(key == 'a'){
            moveLeft+=1;
        }
        if(key == 'd'){
            moveRight+=1;
        }
        if(key=='q'){
            rotateCW+=1;

        }
        if(key=='e'){
            rotateCCW+=1;

        }
        if(key=='z'){
            moveDown++;
        }
        if(key=='x'){
            moveUp++;
        }
        if(key=='p'){
            popBalloon(ball);
        }
        if(key=='1'){
            rotateXPos++;
        }
        if(key=='2'){
            rotateXNeg++;
        }
        if(key=='3'){
            rotateZPos++;
        }
        if(key=='4'){
            rotateZNeg++;
        }




    }, false);
    document.addEventListener('keydown', function(event){
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if(key == 'w'){
            moveUp =true;
        }
    }, false);

    document.addEventListener('keyup', function(event){
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if(key == 'w'){
            moveUp =false;
        }
    }, false);

    function checkScore(){
        if(score>=10){
            for(var i=0; i<sArray.length;i++){
                sArray[i].pop=true;
            }
            alert("You have won the game! Refresh the page to start a new game");
            score=0;

        }
        if(score<0){
            for(var i=0; i<sArray.length;i++){
                sArray[i].pop=true;
            }
            alert("Oh no! You lost the game. Refresh the page to start again")
            score=0;
        }
    }
    function checkCol(){
        /* use elemets to get last col of scooter cf, take that with the position of each*/
        var scootX = scooter_cf.elements[12];
        var scootY = scooter_cf.elements[13];
        var scootZ = scooter_cf.elements[14];

        for(var i =0; i<sArray.length;i++){

            var ball = sArray[i];
            var bx= ball.position.x;
            var by= ball.position.y;
            var bz= ball.position.z;
            var x = bx-scootX;
            x= x*x;

            var y= by-scootY;
            y=y*y;

            var z = bz-scootZ;
            z=z*z;


            var distance = Math.sqrt(x+y+z);
            //console.log(distance);
            if(distance<=4.5){

                popBalloon(ball);
            }
        }


    }
    function popBalloon(obj){
        if(obj.pop==false){
            score+=obj.pointVal;
        }
        obj.pop=true;
        checkScore();
    }
    onRenderFcts.push(function(delta, now){

        camera.lookAt( scene.position )
    });
    onRenderFcts.push(function(){

        renderer.render(scene,camera);

    });

    var lastTimeMsec = null;
    requestAnimationFrame(function animate(nowMsec){

        requestAnimationFrame( animate );

        lastTimeMsec = lastTimeMsec || nowMsec-1000/60;
        var deltaMsec = Math.min(200, nowMsec- lastTimeMsec)
        lastTimeMsec = nowMsec;

        onRenderFcts.forEach(function(f){
            f(deltaMsec / 1000, nowMsec / 1000)
        })


    })


    });


