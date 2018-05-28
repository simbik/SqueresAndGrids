
'use strict'
var camera, scene, renderer, light, lightLeft;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;    

function initScene() {


	renderer = new THREE.WebGLRenderer({ antialias: true });
	

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.getElementById('container').appendChild( renderer.domElement );


	// Camera

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1500 );
	camera.position.z = 300;
    camera.position.y  = 6000;
    camera.position.x  = 6000;

	// Scene

    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog( 0xFFFFFF, 1, 1000 );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    document.addEventListener( 'mouseup', onMouseUp, false);
    window.addEventListener( 'resize', onWindowResize, false );

}

function initLogo() {
var loader = new THREE.SVGLoader();
    loader.load(
	'css/main title.svg',
	// called when the resource is loaded
	function ( doc ) {

		scene.add( new THREE.SVGObject(doc) );

	});
}

function initLights() {

 
    scene.add( new THREE.AmbientLight( 0x6AE2F7));//0x222222 ) );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 200, 200, -200);
    scene.add( light );

    lightLeft = new THREE.DirectionalLight( 0xffffff );
    lightLeft.position.set( -200, 200, 200 );
    scene.add( lightLeft );

    scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );

}

 function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

function onMouseUp(event) {
    restore();
}

function onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;

            }

            function onDocumentTouchStart( event ) {

                if ( event.touches.length === 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

            }

            function onDocumentTouchMove( event ) {

                if ( event.touches.length === 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

            }
