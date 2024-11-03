let scene = new THREE.Scene();
// Mendapatkan ukuran jendela
const aspect = window.innerWidth / window.innerHeight;
const width = 5; // Lebar kamera ortografis
const height = width / aspect; // Tinggi kamera ortografis

// Membuat kamera ortografis
let camera = new THREE.OrthographicCamera(
    -width / 2,   // left
    width / 2,    // right
    height / 2,   // top
    -height / 2,  // bottom
    0.05,          // near
    10000          // far
);

// Mengatur posisi kamera
camera.position.set(5, 10, 0); // Sesuaikan posisi kamera sesuai kebutuhan
camera.lookAt(5, 10, 0); // Mengarahkan kamera ke titik asal (0, 0, 0)

let renderer = new THREE.WebGLRenderer();

renderer.setClearColor("#141414")
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);
camera.position.set(0, 2, 3);

// Menambahkan event listener untuk resize
window.addEventListener('resize', () => {
    const aspect = window.innerWidth / window.innerHeight;
    const width = 5; // Lebar kamera ortografis
    const height = width / aspect; // Tinggi kamera ortografis

    // Mengupdate ukuran renderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Mengupdate batas kamera ortografis
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix(); // Perbarui matriks proyeksi
});

let loader = new THREE.GLTFLoader();
let model;
loader.load('train.glb', function(gltf){
    model = gltf.scene;

    model.position.y = -0.5;
    scene.add(model);
});

let ambient = new THREE.AmbientLight("#141414");
scene.add(ambient);

let directionalLight = new THREE.DirectionalLight("141414");
directionalLight.position.set(-1, 20, -10); //  Atur posisi light
scene.add(directionalLight);

const light = new THREE.HemisphereLight( 0xffffbb, "#141414", 1 );
scene.add( light );

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = true;
controls.enableDamping = true;
controls.dampingFactor = 0.07;

function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    controls.update();

    model.rotation.y -= 0.005;
}

render();