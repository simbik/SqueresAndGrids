'use strict'

// particles
var materials = [],
    parameters, i, h, color, size, particles;

// trianglesMesh
var triangles;

// cubes
var clength = 100, cwidth = 100, cheight = 100;
var csize = 10;
var ccount;
var cube, cubes, cubeLeft, cubeRight, cubeTopIn, cubeBottomIn, cubeTopInRight, cubeBottomInRight;

var circle;


// square lines
var colorsArray = [0x0000ff, 0x00ff00, 0x0000ff, 0xff00ff, 0x00ffff, 0xffff00];
var currColor = 0;
var squares = [];

var lines;

var octo;

var sphere, linesSphere = [];

var dotedCube = [];

var dotsCube;
var container;
var particlesData = [];

var pointCloud;
var particlePositions, positions, colors, dotsCube;
var linesMesh;

var helper;

var maxParticleCount = 300;
var particleCount = 150;
var r = 800;
var rHalf = r / 2;




// init
function initObjects() {

    //trianglesMesh();
    //cubesMesh();
    //initSquares();
    particles();
    initCube();
    //initLines();
    //initSphere();
    //InitDotsCube();


}


function InitDotsCube() {

    dotsCube = new THREE.Group();
    scene.add(dotsCube);

    var segments = maxParticleCount * maxParticleCount;

    positions = new Float32Array(segments * 3);
    colors = new Float32Array(segments * 3);

    var pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 5,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: true
    });

    particles = new THREE.BufferGeometry();
    particlePositions = new Float32Array(maxParticleCount * 3);

    for (var i = 0; i < maxParticleCount; i++) {

        var x = Math.random() * r - r / 2;
        var y = Math.random() * r - r / 2;
        var z = Math.random() * r - r / 2;

        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        // add it to the geometry
        particlesData.push({
            velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
            numConnections: 0
        });

    }

    particles.setDrawRange(0, particleCount);
    particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));

    // create the particle system
    pointCloud = new THREE.Points(particles, pMaterial);
    dotsCube.add(pointCloud);

    var geometry = new THREE.BufferGeometry();

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3).setDynamic(true));

    geometry.computeBoundingSphere();

    geometry.setDrawRange(0, 0);

    var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    //linesMesh = new THREE.LineSegments(geometry, material);




    //dotsCube.add(linesMesh);
}

function initCube() {
    cubes = new THREE.Object3D();

    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    ccount = clength * cwidth * cheight / (csize*csize*csize);
    for (var i = 0; i < clength / csize; i++) {
        for (var j = 0; j < cwidth / csize; j++) {
            for (var k = 0; k < cheight / csize; k++) {
                var cube = new THREE.Mesh(new THREE.BoxGeometry(csize-1, csize-1, csize-1), material);
                cube.position.x = -clength / 2 + i * csize;
                cube.position.y = -cwidth / 2 + j * csize;
                cube.position.z = -cheight / 2 + k * csize;
                
                cubes.add(cube);
            }
        }
    }
    
    scene.add(cubes);
}


function initSphere() {

    var geometry = new THREE.Geometry(),
        scale = 4,
        width = 400, height = 200, size = 2 * scale, aStep = .02 * scale;

    var geometries = [];

    for (var a = - Math.PI / 2; a < Math.PI / 2; a += aStep) {

        var y = .5 * height * Math.sin(a);
        var r = .5 * height * Math.cos(a);
        var l = 2 * Math.PI * r;
        var steps = Math.floor(l / size);
        var offset = ((width - (Math.ceil(steps * size))) * 2 * Math.PI) / width;

        var g = new THREE.Geometry();
        g.ptIndex = [];

        for (var x = 0; x < steps; x++) {

            var ta = (x * 2 * Math.PI / steps) + offset;

            var v = new THREE.Vector3(
                - r * Math.cos(ta),
                -y,
                r * Math.sin(ta)
            );

            geometry.vertices.push(v);

            var v2 = v.clone();
            v2.multiplyScalar(1.2);
            g.vertices.push(v2);
            g.ptIndex.push(geometry.vertices.length - 1);

        }

        if (g.vertices.length) {
            g.vertices.push(g.vertices[0].clone());
            g.ptIndex.push(g.ptIndex[0]);
            geometries.push(g);
        }

    }

    var material = new THREE.PointsMaterial({
        color: 0xffae4e,
        size: 10,
        sizeAttenuation: true,
        opacity: .75,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    sphere = new THREE.Points(geometry, material);
    sphere.geometry.dynamic = true;
    scene.add(sphere);




}


function initLines() {

    var segments = 200;

    var geometry = new THREE.BufferGeometry();
    var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });

    var positions = new Float32Array(segments * 3);
    var colors = new Float32Array(segments * 3);

    var r = 700;

    for (var i = 0; i < segments; i++) {

        var x = Math.random() * r - r / 2;
        var y = Math.random() * r - r / 2;
        var z = Math.random() * r - r / 2;

        // positions

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // colors

        colors[i * 3] = (x / r) + 0.5;
        colors[i * 3 + 1] = (y / r) + 0.5;
        colors[i * 3 + 2] = (z / r) + 0.5;

    }

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    geometry.computeBoundingSphere();

    lines = new THREE.Line(geometry, material);
    scene.add(lines);

}

function initSquares() {



    var material = new THREE.MeshBasicMaterial({
        color: colorsArray[currColor]
    });


    for (var i = 0; i < 7; i++) {
        var geom = new THREE.TorusGeometry(150 + i * 20, 1, 10, 4);
        var square = new THREE.Mesh(geom, material);
        square.rotation.z = de2ra(45);
        scene.add(square);
        squares.push(square);
    }



}


function trianglesMesh() {

    // triangles

    triangles = new THREE.Object3D();
    scene.add(triangles);


    var geometry = new THREE.SphereGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    for (var i = 0; i < 60; i++) {

        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(Math.random() * 600);
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 38;
        triangles.add(mesh);

    }


}


function cubesMesh() {

    cubes = new THREE.Object3D();

    var geometry = new THREE.BoxGeometry(10, 80, 80);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });


    cube = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), material);

    cubes.add(cube);


    cubeLeft = new THREE.Mesh(geometry, material);
    cubeLeft.position.x = 0;
    cubes.add(cubeLeft);

    cubeRight = new THREE.Mesh(geometry, material);
    cubes.add(cubeRight);

    var smallGeometry = new THREE.BoxGeometry(10, 20, 20);

    cubeTopIn = new THREE.Mesh(smallGeometry, material);
    cubeTopIn.position.y = 0;
    cubeLeft.add(cubeTopIn);


    cubeBottomIn = new THREE.Mesh(smallGeometry, material);
    cubeBottomIn.position.y = -0;
    cubeLeft.add(cubeBottomIn);



    cubeTopInRight = new THREE.Mesh(smallGeometry, material);
    cubeTopInRight.position.y = 0;
    cubeRight.add(cubeTopInRight);


    cubeBottomInRight = new THREE.Mesh(smallGeometry, material);
    cubeBottomInRight.position.y = -0;
    cubeRight.add(cubeBottomInRight);






    scene.add(cubes);

}


function particles() {

    var geometry = new THREE.Geometry();

    for (i = 0; i < 500; i++) {

        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Math.random() * 2000 - 1000;
        vertex.z = Math.random() * 2000 - 1000;

        geometry.vertices.push(vertex);

    }

    parameters = [
        [
            0x6AE2F7, 5
        ],
        [
            0x8DACDC, 2
        ],
        [
            0xA38ACB, 1
        ],
        [
            0xCE45A8, 2
        ],
        [
            0xF90387, 5
        ]
    ];

    for (i = 0; i < parameters.length; i++) {

        materials[i] = new THREE.PointsMaterial({
            color: parameters[i][0],
            size: parameters[i][1]
        });

        particles = new THREE.Points(geometry, materials[i]);

        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;



        scene.add(particles);

    }
}