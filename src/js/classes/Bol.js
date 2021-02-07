import Vector from './Vector.js';
import {random} from '../functions/lib.js';

export default class Bol {
    constructor(x, y, radius, color) {
        this.loc = new Vector(x,y);
        this.radius = radius;
        this.color = color;
        this.vel = new Vector(random(-1,1),random(-1,1));
        this.acc = new Vector(0, 0);
    }
    draw(ctx, $canvas) {
      this.vel.limit(10);
      
      ctx.fillStyle = this.color; 
      
      ctx.beginPath();
      ctx.arc(this.loc.x-this.radius/2, this.loc.y-this.radius/2, this.radius, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();

    //   if(this.loc.x > $canvas.width) {
    //       this.loc.x = 0;
    //   } else if(this.loc.x < 0) {
    //       this.loc.x = $canvas.width;
    //   }
    //   if(this.loc.y > $canvas.height) {
    //       this.loc.y = 0;
    //   } else if(this.loc.y < 0) {
    //       this.loc.y = canvas.height;
    //   }

    if(this.loc.x > $canvas.width-this.radius) {
        this.vel.x = -Math.abs(this.vel.x);
    }
    if(this.loc.x < 0+this.radius) {
        this.vel.x = Math.abs(this.vel.x);
    }
    if(this.loc.y > $canvas.height-this.radius) {
        this.vel.y = -Math.abs(this.vel.y);
    }
    if(this.loc.y < 0+this.radius) {
        this.vel.y = Math.abs(this.vel.y);
    }
    }
    update(mouse) {
        // let dir = Vector.sub(mouse, this.loc).limit(0.3);
        // this.acc = dir;
        // this.acc.x = random(-1,1);
        // this.acc.y = random(-1,1);
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        // console.log(`update: ${this.acc.y}`);
        this.acc.mult(0);
        
    }
    applyForce(force) {
        this.acc.add(force);
    }
    getDistance(obj) {
        return Vector.sub(this.loc,obj).mag()
        
    }
    // export const getDistance = (obj1,obj2) => {
        
    // };
    

  };