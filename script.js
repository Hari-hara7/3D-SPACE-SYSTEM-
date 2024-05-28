function init3DBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('background').appendChild(renderer.domElement);

    // Add space background
    const spaceTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/space.jpg');
    scene.background = spaceTexture;

    // Add stars
    const starGeometry = new THREE.SphereGeometry(0.1, 24, 24);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < 1000; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
        star.position.set(x, y, z);
        scene.add(star);
    }

    // Add animated planet
    const planetTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
    const planetGeometry = new THREE.SphereGeometry(3, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ map: planetTexture });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // Add animated asteroids
    const asteroidTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
    const asteroidGeometry = new THREE.PlaneGeometry(2, 2);
    const asteroidMaterial = new THREE.MeshBasicMaterial({ map: asteroidTexture, transparent: true });
    const asteroids = [];
    for (let i = 0; i < 50; i++) {
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
        const distance = THREE.MathUtils.randFloat(100, 300);
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const z = THREE.MathUtils.randFloatSpread(200);
        asteroid.position.set(x, y, z);
        asteroids.push(asteroid);
        scene.add(asteroid);
    }

    camera.position.z = 10;

    // Animate planets and asteroids
    function animate() {
        requestAnimationFrame(animate);
        planet.rotation.y += 0.005;
        asteroids.forEach(asteroid => {
            asteroid.rotation.z += 0.01;
        });
        renderer.render(scene, camera);
    }

    animate();

    // Adjust camera and renderer on window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

init3DBackground();
