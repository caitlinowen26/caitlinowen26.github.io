import React, { useRef } from 'https://cdn.skypack.dev/react@17.0.0';
import { render } from 'https://cdn.skypack.dev/react-dom@17.0.0';
import { Canvas, useFrame } from 'https://cdn.skypack.dev/@react-three/fiber@7.0.0';
import * as THREE from 'https://cdn.skypack.dev/three@v0.138.0';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uPi;
  varying vec2 vUv;

  vec2 fn(vec2 uv, float t) {
    float x = (cos(uv.x * t) + cos(tan(uv.x * uv.y + t))) / 2.0;
    float y = (sin(uv.y * t) + cos(uv.x * uv.y)) / 2.0;

    return vec2(x, y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    float t = sin((uTime + 24.0) / 100.0) * 100.0 / uPi;

    vec2 result = fn(uv, t);

    float dist = length(result);
    float oscillatingIntensity = 0.5 + 0.5 * sin(sqrt(dist) * t);

    vec3 color = vec3(oscillatingIntensity);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function MainShader() {
	const shaderRef = useRef(null);

	useFrame(({ clock, size }) => {
		if (shaderRef.current) {
			shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
			shaderRef.current.uniforms.uResolution.value.set(size.width, size.height);
		}
	});

	return (
		<mesh>
			<planeGeometry args={[2, 2]} />
			<shaderMaterial
				ref={shaderRef}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={{
					uTime: { value: 0 },
					uResolution: { value: new THREE.Vector2() },
					uPi: { value: Math.PI }
				}}
			/>
		</mesh>
	);
}

function App() {
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<Canvas>
				<MainShader />
			</Canvas>
		</div>
	);
}

render(<App />, document.getElementById("app"));