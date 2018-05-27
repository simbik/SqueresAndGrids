

    /************************
    *                       *
    *                       *
    *                       *
    *          THE          *
    *       RESONANCE       *
    *          BOX          *
    *                       *
    *                       *
    *      by fabio luis    *
    *                       *
    ************************/



'use strict'



var composer;
var effectGlitch;
var effectDots;
var effectRGB;


function postProcess() {

	composer = new THREE.EffectComposer( renderer );
    composer.addPass( new THREE.RenderPass( scene, camera ) ); 
 
   
    effectGlitch = new THREE.GlitchPass();
    effectGlitch.enabled = false;		
	composer.addPass( effectGlitch );
   


    effectRGB = new THREE.ShaderPass( THREE.RGBShiftShader );
    effectRGB.uniforms[ 'amount' ].value = effectController.effectRGB;
   effectRGB.renderToScreen = true;
   
    composer.addPass( effectRGB );
  

 



}


