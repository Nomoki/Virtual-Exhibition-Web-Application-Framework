import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
      
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry(1, 2, 1);
			const material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
			const cube = new THREE.Mesh( geometry, material );

            const size = 10;                                                 //grid size
            const divisions = 15;
            const gridHelper = new THREE.GridHelper( size, divisions );    //grid

			scene.add( cube );
            scene.add( gridHelper );

			camera.position.z = 10;
            camera.position.y = 3;
            

    
            renderer.render( scene, camera );

	