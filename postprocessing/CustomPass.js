import {
	ShaderMaterial,
	UniformsUtils
} from "https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js";

import { Pass } from "../postprocessing/Pass.js";
import CustomShader from "../shaders/CustomShader.js";

var CustomPass = function ( coolValue, coolTexture ) {

	Pass.call( this );

	if ( CustomShader === undefined )
		console.error( "CustomPass relies on CustomShader" );

	var shader = CustomShader;

	this.uniforms = UniformsUtils.clone( shader.uniforms );
	this.uniforms.metalTexture.value = coolTexture

	this.material = new ShaderMaterial( {
		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader
	} );


	if ( coolValue !== undefined ) this.uniforms.coolValue.value = coolValue;

	this.fsQuad = new Pass.FullScreenQuad( this.material );

};

CustomPass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: CustomPass,

	render: function ( renderer, writeBuffer, readBuffer, deltaTime /*, maskActive */ ) {

		this.uniforms[ "mainTexture" ].value = readBuffer.texture;

		//this.uniforms[ "coolValue" ].value = Math.sin(this.uniforms[ "time" ].value) * 0.5 + 0.5;

		this.uniforms[ "time" ].value += deltaTime;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear();
			this.fsQuad.render( renderer );

		}

	}

} );

export { CustomPass };
