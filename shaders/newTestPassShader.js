const newTestPassShader = {

	uniforms: {

		"mainTexture":   { type: "t", value: null },
		"time":       { type: "f", value: 0.0 },
		"coolValue": { type: "f", value: 0.5 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float time;",
		"uniform float coolValue;",
		"uniform sampler2D mainTexture;",
		"varying vec2 vUv;",

		"void main() {",

			// sample the source
			"vec4 cTextureScreen = texture2D( mainTexture, vUv );",

      "cTextureScreen.rgb = sin(cTextureScreen.rgb * vec3(0.33, 0.66, 1.) + length(cTextureScreen) + coolValue) * 0.5 + 0.5;",

			"gl_FragColor =  vec4( 1. - cTextureScreen.rgb, cTextureScreen.a );",

		"}"

	].join("\n")

};

export default newTestPassShader ;
