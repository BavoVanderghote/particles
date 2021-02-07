// knop om cursor bol te toggelen
// klikken = bollen weg van je (mousedown/mouseup)

import Vector from './classes/Vector.js';
import Bol from './classes/Bol.js';
import {random} from './functions/lib.js';
  
    const $canvas = document.querySelector(`#canvas`),
    ctx = $canvas.getContext(`2d`),
    SPACE = 32,
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40;

    const aantalBollen = 2000;

    let particles = [],
    mouse = new Vector(window.innerWidth/2,window.innerHeight/2),
    pressed = false,
    keys = {},
    incoming = false,
    direction = false;

    const init = () => {
        $canvas.width = window.innerWidth;
        $canvas.height = window.innerHeight;

        for(let i=0;i<aantalBollen;i++) {
            // const randomVX = Math.floor(Math.random()*7)+1;
            // const randomVY = Math.floor(Math.random()*7)+1;
            // const randomColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
            const randomColor = `rgb(${Math.floor(Math.random()*255)},0,0)`;
            const randomR = Math.floor(Math.random()*1)+3;
            const randomX = Math.floor(Math.random()*$canvas.width);
            const randomY = Math.floor(Math.random()*$canvas.height);
            
            particles.push(new Bol(randomX,randomY,randomR,randomColor));
            
            // console.log(particles);
            // console.log(mouse);
            
            
        }

        $canvas.addEventListener(`mousemove`, e => handleMouseMove(e));
        $canvas.addEventListener(`mousedown`,handleMouseDown);
        $canvas.addEventListener(`mouseup`,handleMouseUp);
        window.addEventListener(`keydown`, handleKeyDown);
        window.addEventListener(`keyup`, handleKeyUp);
        
        draw();
    };

    const draw = () => {
        // console.log(incoming);
        
        ctx.fillStyle = `#000000`;
        ctx.fillRect(0,0,$canvas.width,$canvas.height);

        
    
        // particles.forEach(p => console.log(p));
        particles.forEach(p => {
            const dir = Vector.sub(mouse,p.loc).limit(0.3);
            const negDir = Vector.mult(dir,-1).limit(0.2);
    
            p.applyForce(dir);
            
            if(p.getDistance(mouse) <= 150) {
                p.applyForce(Vector.sub(mouse, p.loc).mult(-1).limit(3));
            } 
            // else if (p.getDistance(mouse) >= 125) {
            //     p.applyForce(dir.mult(1));
            // }
            
            if (pressed) {
                const negForce = negDir.set(3);
                // console.log(mouse.sub(p.loc).mag()/1000000);
                p.applyForce(negForce);
            }

            if (incoming) {
                // const force = new Vector(negDir.x*-5, negDir.y*-5);
                const force = negDir.mult(-3);
                p.applyForce(force);
            }

            p.update(mouse)
        });
        
        particles.forEach(p => p.draw(ctx, $canvas));

        ctx.fillStyle = `#ffffff`;
        ctx.beginPath();
        ctx.arc(mouse.x,mouse.y,5,0,2*Math.PI);
        ctx.fill();
        ctx.closePath()
        
  
        requestAnimationFrame(draw);
    };

    const handleMouseMove = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    
    const handleMouseDown = () => {
        // console.log('mouseDOWN');

        pressed = true;
        // console.log(pressed);
        
    };

    const handleMouseUp = () => {
        // console.log('mouseUP');

        pressed = false;

    };

    const handleKeyDown = e => {
        // console.log('down')
        // console.log(keys);
        keys[e.keyCode] = true;
        if(e.keyCode === 32  && Object.keys(keys).length > 0) {
            incoming = true;
        }

        // if(Object.keys(keys).length > 0 && e.keyCode != 32) {
        //     direction = true;
        // }
        
    }

    const handleKeyUp = e => {
        delete keys[e.keyCode];
        incoming = (Object.keys(keys).length > 0);
    }
  
    init();
  