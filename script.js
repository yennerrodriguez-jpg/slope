// Basic Slope Clone using Three.js
let scene, camera, renderer, ball, slope;
let speed = 0.2;
let xSpeed = 0;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Ball
  const ballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
  const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  ball = new THREE.Mesh(ballGeometry, ballMaterial);
  ball.position.y = 0.5;
  scene.add(ball);

  // Slope (infinite illusion)
  const slopeGeometry = new THREE.BoxGeometry(4, 0.1, 200);
  const slopeMaterial = new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: true });
  slope = new THREE.Mesh(slopeGeometry, slopeMaterial);
  slope.position.z = -100;
  scene.add(slope);

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  animate();
}

function onKeyDown(event) {
  if (event.code === 'ArrowLeft') xSpeed = -0.05;
  if (event.code === 'ArrowRight') xSpeed = 0.05;
}

function onKeyUp(event) {
  if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') xSpeed = 0;
}

function animate() {
  requestAnimationFrame(animate);

  // Ball movement
  ball.position.z -= speed;
  ball.position.x += xSpeed;

  camera.position.z = ball.position.z + 5;
  camera.position.x = ball.position.x;

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
