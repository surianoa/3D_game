/**
 * Created by AleX on 3/27/2015.
 */

Scooter = function(){

    var scootG = new THREE.BoxGeometry(5,1,5);
    var scootM = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('textures/woodtex.jpg') } );
    var scooter = new THREE.Mesh(scootG,scootM);
    var spikeG = new THREE.CylinderGeometry(0,0.25,1,10);
    var spikeM = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('textures/metaltex.jpg') } );
    var spike = new THREE.Mesh(spikeG,spikeM);
    var group = new THREE.Group();

    var shaderProp = {
        vaertexShader: "",
        fragmentShader: ""

    }
    //scooter.rotateOnAxis(new THREE.Vector3(0,1,0).normalize(),0.75);

    group.add(scooter);
    //add spikes to front
    for( var i=-2; i<=2;i++){
        var temp = spike.clone();
        temp.translateX(i);
        temp.translateZ(2.5);
        temp.rotateX(1.5707);
        group.add(temp);

    }
    //add spikes to back
    for( var i=-2; i<=2;i++){
        var temp = spike.clone();
        temp.translateX(i);
        temp.translateZ(-2.5);
        temp.rotateX(-1.5707);
        group.add(temp);

    }
    //add spikes to left
    for( var i=-2; i<=2;i++){
        var temp = spike.clone();
        temp.translateZ(i);
        temp.translateX(-2.5);
        temp.rotateZ(1.5707);
        group.add(temp);

    }
    //add spikes to right side
    for( var i=-2; i<=2;i++){
        var temp = spike.clone();
        temp.translateZ(i);
        temp.translateX(2.5);
        temp.rotateZ(-1.5707);
        group.add(temp);

    }

    for(var i =-2; i<=2;i++){
        for( var j=-2; j<=2;j++){
            var temp = spike.clone();
            temp.translateZ(i);
            temp.translateY(-0.5);
            temp.translateX(j);
            temp.rotateZ(Math.PI);
            group.add(temp);
        }
    }




    return group;


}

/* Inherit from Object3D */
Scooter.prototype = Object.create (THREE.Object3D.prototype);
Scooter.prototype.constructor = Scooter;