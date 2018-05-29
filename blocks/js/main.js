'use strict'

var maxTicksAfterExplosion = 40;

var animation = true;

var expolesed = false;
var ticksAfterExplosion;
var expolosionTime;

var effectController = {
    showCubes: true,
    showTriangles: true,
    effectRGB: 0.002,
    effectDots: 8,
    camFOV: true,
    audioFactor: 300,
    resonanceFreq1: 1,
    resonanceFreq2: 1,
    resonanceFreq3: 1,
    resonanceFreq4: 1,
    resonanceFreq5: 1,
    resonanceFreq6: 1

};

init();
animate();

function init() {

    //initGUI();

    //addSpectrumVisualiser();

    /*AudioManager.start({
        microphone: useMicrophone,
        track: 'audio'
    });*/

    initScene();

    initObjects();

    var helper = new THREE.GridHelper( 1000, 50, 0xFF0088, 0xFF0088);
	helper.position.y = - 200;
    scene.add( helper );

    initLights();

    postProcess();
}


/*function initGUI() {

    var gui = new dat.GUI();



    gui.add(effectController, "camFOV").onChange(function(value) {
        camFOV = value;
    });

    gui.add(effectController, "effectRGB", 0, 0.01).onChange(function(value) {
        effectRGB.uniforms['amount'].value = value;
    });
    gui.add(effectController, "effectDots", 0, 40).onChange(function(value) {
        effectDots.uniforms['scale'].value = value;
    });

    gui.add(effectController, "resonanceFreq1", 0, 2).onChange(function(value) {
        resonanceFreq1 = value;
    });

     gui.add(effectController, "resonanceFreq2", 0, 2).onChange(function(value) {
        resonanceFreq2 = value;
    });
      gui.add(effectController, "resonanceFreq3", 0, 2).onChange(function(value) {
        resonanceFreq3 = value;
    });
       gui.add(effectController, "resonanceFreq4", 0, 2).onChange(function(value) {
        resonanceFreq4 = value;
    });
        gui.add(effectController, "resonanceFreq5", 0, 2).onChange(function(value) {
        resonanceFreq5 = value;
    });
         gui.add(effectController, "resonanceFreq6", 0, 2).onChange(function(value) {
        resonanceFreq6 = value;
    });


    //gui.add(effectController, "resonance", 0.1, 2);

   gui.close();
    //dat.GUI.toggleHide();
}*/

function recomposeBlock() {
    var maxRemoveCount = 300;
    for (var i = 0; i < maxRemoveCount; i++) {
        var prey = Math.floor(Math.random()*ccount);
        cubes.children[prey].visible = !cubes.children[prey].visible;
    }
}

function booom() {
    console.log("boom");
    effectGlitch.enabled = true;
    for (var i= 0; i< ccount; i++) {
        var cube = cubes.children[i];
        cube.position.x = cube.position.x + Math.random()*200-100;
        cube.position.y = cube.position.y + Math.random()*200-100;
        cube.position.z = cube.position.z + Math.random()*200-100;
    }
    expolesed = true;
    ticksAfterExplosion = 0;
}

function restore() {
    effectGlitch.enabled = false;
    console.log("restore");
    for (var i = 0; i < clength / csize; i++) {
        for (var j = 0; j < cwidth / csize; j++) {
            for (var k = 0; k < cheight / csize; k++) {
                var cube = cubes.children[i+j*(clength / csize)+k*(clength / csize)*(cwidth / csize)]
                cube.position.x = -clength / 2 + i * csize;
                cube.position.y = -cwidth / 2 + j * csize;
                cube.position.z = -cheight / 2 + k * csize;
            }
        }
    }
    expolesed = false;
}

function animate() {
    
    requestAnimationFrame(animate);
    recomposeBlock();
    var luck = Math.random();
    if (expolesed) {
        ticksAfterExplosion ++;
    }
    if (expolesed && ticksAfterExplosion >= maxTicksAfterExplosion) {
       restore();
    }
    if (luck<0.003 && !expolesed) {       
        booom()
    }
    //updateFrequencyData();

/*
    if (animation) {

        var time = Date.now() * 0.001;



        freq1 = getFreqRange(10, 20)*resonanceFreq1;
        freq2 = getFreqRange(20, 30)*resonanceFreq2;
        freqTriangle = getFreqRange(45, 55)*resonanceFreq3;
        freq3 = getFreqRange(85, 110)*resonanceFreq3;
        freq4 = getFreqRange(120, 140)*resonanceFreq4;
        freq5 = getFreqRange(140, 155)*resonanceFreq5;
        freq6 = getFreqRange(155, 190)*resonanceFreq6;
        freq7 = getFreqRange(191, 250)*resonanceFreq6;
        
        console.log("1 >>" + freq1);
        console.log("2 >>" + freq2);
        console.log("3 >>" + freq3);
        console.log("4 >>" + freq4);
        console.log("5 >>" + freq5);
        console.log("6 >>" + freq6);
        console.log("7 >>" + freq7);
        



        if (freq3 > 115) {
            effectGlitch.enabled = true;
        } else {
            effectGlitch.enabled = false;
        }




        if (freq6 > 39) {

            cubeTopIn.position.y = (freq5 * 2) + 8;
            cubeBottomIn.position.y = -(freq5 * 2) + 8;
            cubeTopInRight.position.y = (freq5 * 2) + 8;
            cubeBottomInRight.position.y = -(freq5 * 2) + 8;

            cubeTopIn.scale.z = freq5 / 35;
            cubeBottomIn.scale.z = -freq5 / 35;
            cubeTopInRight.scale.z = freq5 / 35;
            cubeBottomInRight.scale.z = -freq5 / 35;

        } else {

            if (cubeTopIn.position.y > 0) {
                cubeTopIn.position.y -= 10;
                cubeTopInRight.position.y -= 10;

            }
            if (cubeBottomInRight.position.y < 0) {
                cubeBottomInRight.position.y += 10;
                cubeBottomIn.position.y += 10;

            }


        }




        if (freq5 > 145) {

            lines.visible = true;
            cube.visible = false;
            sphere.visible = true;

        } else {

            lines.visible = false;
            cube.visible = true;
            sphere.visible = false

        }

        if (freq6 > 60) {

            cubeLeft.rotation.z += 0.1;
            cubeRight.rotation.x += 0.1;


        } else {

            if (cubeLeft.rotation.z > 0) {
                cubeLeft.rotation.z -= 0.1;
                cubeRight.rotation.x -= 0.1
            }
            if (cubeLeft.rotation.z < 0) {
                cubeLeft.rotation.z += 0.1;
                cubeRight.rotation.x += 0.1
            }
        }
        triangles.scale.x = freq3 / 50;
        triangles.scale.y = freq3 / 50;
        triangles.scale.z = freq3 / 50;


        if (freqTriangle > 125) {
            triangles.visible = true;

            cube.rotation.y += 0.03;
            cube.rotation.x += 0.03;


        } else {
            triangles.visible = false;

            if (cube.rotation.y > 0) {
                cube.rotation.y -= 0.2;
                cube.rotation.x -= 0.2;
            }
            if (cube.rotation.y < 0) {
                cube.rotation.y += 0.2;
                cube.rotation.x += 0.2;
            }

        }

        if (freq6 > 30) {

            dotsCube.visible = true;
           



        } else {
            dotsCube.visible = false;
          

        }

         if (freq6 > 48) {

         
            for (var i = 0; i < squares.length; i++) {
                squares[i].visible = false;
            }



        } else {
          
            for (var i = 0; i < squares.length; i++) {
                squares[i].visible = true;
            }


        }


        audioFactor = effectController.audioFactor;



        cubeLeft.position.x = (freq3 * -2) - 35;
        cubeRight.position.x = (freq3 * 2) + 35;


        triangles.rotation.x = freq2 / (audioFactor / 11);
        triangles.rotation.y = freq2 / (audioFactor / 14);

        cubes.rotation.y = time * 0.07;



        lines.rotation.y = freq5 / (audioFactor / 100);
        if (freq2 / 190 > 0) {
            lines.scale.x = lines.scale.y = lines.scale.z = (freq2 / 190);

        }



        for (var i = 0; i < squares.length; i++) {
            //ssquares[i].rotation.z = de2ra(freq1/10) * i;


            squares[i].rotation.y = time * 0.07 + de2ra(90);



            squares[i].rotation.z = freq1 / 100 * i + de2ra(45);

            squares[i].scale.x = (freq1 / (audioFactor / 2)) + 0.001;
            squares[i].scale.y = (freq1 / (audioFactor / 2)) + 0.001;

        }


        if (freq1 > 120 && freq1 / (audioFactor / 2) > 0) {
            cube.scale.x = (freq1 / (audioFactor / 2));
            cube.scale.y = (freq1 / (audioFactor / 2));
            cube.scale.z = (freq1 / (audioFactor / 2));
        }

        var rx = .0001 * 130,
            ry = .0001 * 120,
            rz = .0001 * 110;

        var t = .001 * (Date.now() - startTime);

        t += .01 * freq7;

        var r = 50 * noise.noise(t, 0, 0) + 50 * .01 * getFreqRange(150, 160);
        var n = new THREE.Vector3(0, 0, 0);
        var radius = 50;
        var d = .5 + .05 * getFreqRange(200, 210);
        var noiseArray = [];
        for (var j = 0; j < sphere.geometry.vertices.length; j++) {
            n.copy(sphere.geometry.vertices[j]);
            n.normalize();
            var pn = noise.noise(d * n.x + t, d * n.y + t, d * n.z + t);
            var o = 100 + r + radius * pn;

            noiseArray.push(pn);
        }

        sphere.geometry.verticesNeedUpdate = true;

        sphere.rotation.x += rx;
        sphere.rotation.y += ry;
        sphere.rotation.z += rz;


        sphere.material.opacity = 10 * getFreqRange(40, 150);
        if (sphere.material.opacity > 1) sphere.material.opacity = 1;
        


        var vertexpos = 0;
        var colorpos = 0;
        var numConnected = 0;

        for (var i = 0; i < particleCount; i++)
            particlesData[i].numConnections = 0;

        for (var i = 0; i < particleCount; i++) {

            // get the particle
            var particleData = particlesData[i];

            particlePositions[i * 3] += particleData.velocity.x;
            particlePositions[i * 3 + 1] += particleData.velocity.y;
            particlePositions[i * 3 + 2] += particleData.velocity.z;

            if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
                particleData.velocity.y = -particleData.velocity.y;

            if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
                particleData.velocity.x = -particleData.velocity.x;

            if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf)
                particleData.velocity.z = -particleData.velocity.z;

            if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections)
                continue;

            // Check collision
            for (var j = i + 1; j < particleCount; j++) {

                var particleDataB = particlesData[j];
                if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections)
                    continue;

                var dx = particlePositions[i * 3] - particlePositions[j * 3];
                var dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
                var dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
                var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < freq3) {

                    particleData.numConnections++;
                    particleDataB.numConnections++;

                    var alpha = 1.0 - dist / (freq3 - 0.1);

                    positions[vertexpos++] = particlePositions[i * 3];
                    positions[vertexpos++] = particlePositions[i * 3 + 1];
                    positions[vertexpos++] = particlePositions[i * 3 + 2];

                    positions[vertexpos++] = particlePositions[j * 3];
                    positions[vertexpos++] = particlePositions[j * 3 + 1];
                    positions[vertexpos++] = particlePositions[j * 3 + 2];

                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;

                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;

                    numConnected++;
                }
            }
        }


        linesMesh.geometry.setDrawRange(0, numConnected * 2);
        linesMesh.geometry.attributes.position.needsUpdate = true;
        linesMesh.geometry.attributes.color.needsUpdate = true;

        pointCloud.geometry.attributes.position.needsUpdate = true;


        var lOpacity = .1 * getFreqRange(140, 200);
        if (lOpacity > .75) lOpacity = .75;

        nfov = 70 + getFreqRange(200, 250);
        if (nfov > 120) nfov = 120;





        if (camFOV) {
            fov += (nfov - fov) * .1;
            camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, camera.near, camera.far);

            lon += (nlon - lon) * .1;
            lat += (nlat - lat) * .1;

            lat = Math.max(-85, Math.min(85, lat));
            phi = (90 - lat) * Math.PI / 180;
            theta = lon * Math.PI / 180;
        }

    }
*/
    if (camera.position.z > 410) {
        camera.position.z -= 10 * 0.05;
        camera.position.x -= 10 * 0.05;
    } else {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;

        camera.position.z = 410;
    }

    camera.lookAt(scene.position);

    composer.render(scene, camera);

}
