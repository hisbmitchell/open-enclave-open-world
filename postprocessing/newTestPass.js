import {
	ShaderMaterial,
	UniformsUtils
} from "https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js";

import { Pass } from "../postprocessing/Pass.js";
import NewTestPassShader from "../shaders/NewTestPassShader.js";

var NewTestPass = function ( coolValue ) {

	Pass.call( this );

	if ( NewTestPassShader === undefined )
		console.error( "NewTestPass relies on NewTestPassShader" );

	var shader = NewTestPassShader;

	this.uniforms = UniformsUtils.clone( shader.uniforms );

	this.material = new ShaderMaterial( {
		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader
	} );


	if ( coolValue !== undefined ) this.uniforms.coolValue.value = coolValue;

	this.fsQuad = new Pass.FullScreenQuad( this.material );

};

NewTestPass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: NewTestPass,

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

export { NewTestPass };
