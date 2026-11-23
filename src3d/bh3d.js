/* Black hole for the home stop, built with three.js meshes (no ray marching, so it stays sharp and smooth):
   a black horizon, an accretion disk with Daniel's dust texture, the lensed image of the far side of the disk
   (camera-facing), a photon ring and a soft glow. The page calls render() with where the hole must appear. */
import { WebGLRenderer, Scene, PerspectiveCamera, Mesh, SphereGeometry, RingGeometry, PlaneGeometry, ShaderMaterial,
  MeshBasicMaterial, TextureLoader, CustomBlending, OneFactor, ZeroFactor, AddEquation, DoubleSide, RepeatWrapping, Vector3, SRGBColorSpace } from "three";

const DISK_VS = `varying vec3 wp; void main(){ vec4 w = modelMatrix * vec4(position,1.); wp = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`;
const DISK_FS = `uniform sampler2D tex; uniform float t; uniform vec3 cam; varying vec3 wp;
void main(){
  float r = length(wp.xz), a = atan(wp.z, wp.x), rin = 1.55, rout = 7.6, v = (r - rin) / (rout - rin);
  if (v < 0. || v > 1.) discard;
  float spin = t * .9 / pow(r, 1.5);
  vec3 d1 = texture2D(tex, vec2(a / 6.2831 * 2. + spin, v * .9 + .05)).rgb;
  vec3 d2 = texture2D(tex, vec2(a / 6.2831 * 5. - spin * .6, v * .5 + .3)).rgb;
  float dust = dot(d1, vec3(.4)) * .75 + dot(d2, vec3(.4)) * .45;
  float temp = pow(rin / r, 1.35);
  vec3 col = mix(vec3(.95, .38, .1), vec3(1., .92, .78), clamp(temp * 1.1, 0., 1.));
  vec3 tg = normalize(vec3(-wp.z, 0., wp.x)), vd = normalize(cam - wp);
  float dop = clamp(1. + .6 * dot(tg, vd), .35, 1.7);
  float edge = smoothstep(0., .06, v) * smoothstep(1., .5, v);
  float I = (.25 + 1.5 * dust) * (temp * 1.7 + .12) * dop * dop * edge;
  gl_FragColor = vec4(col * I, 1.);
}`;
const HALO_VS = `varying vec2 p; void main(){ p = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`;
const HALO_FS = `uniform sampler2D tex; uniform float t; uniform float tilt; varying vec2 p;
void main(){
  float r = length(p), a = atan(p.y, p.x);
  float ring = exp(-pow((r - 1.09) / .035, 2.)) * 1.3 + exp(-pow((r - 1.16) / .09, 2.)) * .35;      // photon ring
  float band = smoothstep(1.2, 1.4, r) * smoothstep(3.1, 1.7, r);                                      // lensed far side
  float up = smoothstep(-.15, .75, p.y / r);                                                           // mostly over the top
  float low = smoothstep(.1, -.8, p.y / r) * smoothstep(1.75, 1.35, r) * .5;                           // thin image under it
  vec3 d = texture2D(tex, vec2(a / 6.2831 * 2. + t * .05, (r - 1.2) / 2.)).rgb; float dust = dot(d, vec3(.45));
  float temp = pow(1.3 / r, 1.2);
  vec3 col = mix(vec3(.95, .4, .12), vec3(1., .93, .8), clamp(temp, 0., 1.));
  float I = band * (up * (1. - tilt * .55) + low) * (.3 + 1.3 * dust) * (temp * 1.5 + .1) + ring;
  float glow = exp(-pow(r / 2.6, 2.)) * .1, fadeE = smoothstep(3.5, 2.9, r);
  gl_FragColor = vec4((col * I + vec3(1., .6, .3) * glow) * fadeE, 1.);
}`;

/* light only adds colour; it never makes the canvas opaque, so the nebula behind stays visible */
const LIGHT = { transparent: true, depthWrite: false, blending: CustomBlending, blendEquation: AddEquation, blendSrc: OneFactor, blendDst: OneFactor, blendSrcAlpha: ZeroFactor, blendDstAlpha: OneFactor };

export function create(canvas) {
  let gl;
  try { gl = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" }); } catch (e) { return null; }
  gl.setClearColor(0x000000, 0);
  const scene = new Scene(), cam = new PerspectiveCamera(32, 1, .1, 200);
  const tex = new TextureLoader().load("assets/space/dust.webp"); tex.wrapS = tex.wrapT = RepeatWrapping; tex.colorSpace = SRGBColorSpace;
  const hole = new Mesh(new SphereGeometry(1, 64, 32), new MeshBasicMaterial({ color: 0x000000 }));
  const diskMat = new ShaderMaterial({ vertexShader: DISK_VS, fragmentShader: DISK_FS, uniforms: { tex: { value: tex }, t: { value: 0 }, cam: { value: new Vector3() } }, ...LIGHT, side: DoubleSide });
  const disk = new Mesh(new RingGeometry(1.5, 7.7, 256, 8), diskMat); disk.rotation.x = -Math.PI / 2;
  const haloMat = new ShaderMaterial({ vertexShader: HALO_VS, fragmentShader: HALO_FS, uniforms: { tex: { value: tex }, t: { value: 0 }, tilt: { value: 0 } }, ...LIGHT });
  const halo = new Mesh(new PlaneGeometry(7, 7), haloMat);
  hole.renderOrder = 0; halo.renderOrder = 1; disk.renderOrder = 2;
  scene.add(hole, halo, disk);
  let W = 0, H = 0, pr = 0;
  return {
    /* st: {x, y} screen position of the hole, s: zoom, a: opacity; size: base radius in px of the disk; mx,my: mouse (-.5..5) */
    render(st, w, h, size, mx, my, time) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (w !== W || h !== H || dpr !== pr) { W = w; H = h; pr = dpr; gl.setPixelRatio(dpr); gl.setSize(w, h, false); }
      const t = time, yaw = .35 + Math.sin(t * .07) * .22 + mx * .12, el = .3 + Math.sin(t * .05) * .05 - my * .06, D = 20;
      cam.position.set(Math.sin(yaw) * Math.cos(el) * D, Math.sin(el) * D, Math.cos(yaw) * Math.cos(el) * D); cam.lookAt(0, 0, 0);
      // put the hole at (st.x, st.y) on screen and scale it: render a larger virtual image and view a window of it
      const k = (size * st.s) / 7.6, vh = 2 * D * Math.tan(cam.fov * Math.PI / 360);        // px per world unit at the hole
      const FH = vh * k, FW = FH * w / h;                                                        // virtual frame as tall as the view frustum
      cam.aspect = w / h; cam.setViewOffset(FW, FH, FW / 2 - st.x, FH / 2 - st.y, w, h); cam.updateProjectionMatrix();
      halo.quaternion.copy(cam.quaternion);
      diskMat.uniforms.t.value = t; diskMat.uniforms.cam.value.copy(cam.position);
      haloMat.uniforms.t.value = t; haloMat.uniforms.tilt.value = Math.min(1, Math.max(0, (el - .2) * 1.5));
      canvas.style.opacity = st.a;
      gl.render(scene, cam);
    },
    dispose() { gl.dispose(); }
  };
}
