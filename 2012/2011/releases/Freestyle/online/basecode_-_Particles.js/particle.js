/**
 * Particle Class v0.0.1
 * http://basecode.appspot.com/particles.html
 * Copyright 2011, Tobias Reiss, @basecode
 * Licensed under the MIT license.
 * Date: Jun 17 2011
 */

;(function(w, undefined) {
    
    "use strict";
    
    //- mark Particle constructor
    var P = function(aParticleSystem) {
        
        if (!aParticleSystem) {
            return this;
        }
        
        // internal
        this.ps = aParticleSystem;
        this.id = Glb.createUUID();
    
        this.timeToLive = 0;
        this.startPosition = Glb.point.zero();
        this.lastDelta = 0;
        this.deltaCounter = 0;
        
        this.position                = Glb.point.zero();
        this.color                   = null;
        this.deltaColor              = null;
        this.size                    = null;
        this.deltaSize               = null;
        this.rotation                = null;
        this.deltaRotation           = null;
        this.direction               = null;
        this.radialAcceleration      = null;
        this.tangentialAcceleration  = null;
    
        this.init();
    };
    
    P.prototype.id = null;
    
    P.prototype.init = function() {
        
        //Glb.console.log("[%s] initialised", this.id);
        
        var c = this.ps._config;
        
        // timeToLive
        // prevent division by 0
        this.timeToLive = Math.max( 0, c.lifespan + c.lifespanVariance * Glb.random() );
       
        // position
        this.position.x = c.position.x + c.positionVariance.x * Glb.random();
        this.position.y = c.position.y + c.positionVariance.y * Glb.random();
        this.startPosition = this.position;
        
        // set composite operation
        this.ps.context.globalCompositeOperation = c.globalComposite;
        
        // angle
        var newAngle = Glb.angle.degreesToRadians( 360 - c.angle + c.angleVariance * Glb.random() );	
        
        // color
        
        var startColor = Glb.color.makeRGBA(
           Math.min(1, Math.max(0, c.startColor.red + c.startColorVariance.red * Glb.random()) ),
           Math.min(1, Math.max(0, c.startColor.green + c.startColorVariance.green * Glb.random()) ),
           Math.min(1, Math.max(0, c.startColor.blue + c.startColorVariance.blue * Glb.random()) ),
           Math.min(1, Math.max(0, c.startColor.alpha + c.startColorVariance.alpha * Glb.random()) )
        );
        
        var endColor = Glb.color.makeRGBA(
           Math.min(1, Math.max(0, c.endColor.red + c.endColorVariance.red * Glb.random()) ),
           Math.min(1, Math.max(0, c.endColor.green + c.endColorVariance.green * Glb.random()) ),
           Math.min(1, Math.max(0, c.endColor.blue + c.endColorVariance.blue * Glb.random()) ),
           Math.min(1, Math.max(0, c.endColor.alpha + c.endColorVariance.alpha * Glb.random()) )
        );
        
        this.color = startColor;
        
        this.deltaColor = Glb.color.makeRGBA(
           (endColor.red - startColor.red) / this.timeToLive,
           (endColor.green - startColor.green) / this.timeToLive,
           (endColor.blue - startColor.blue) / this.timeToLive,
           (endColor.alpha - startColor.alpha) / this.timeToLive
        );
        
        // size
        var startSize = Math.max(0, c.startSize + c.startSizeVariance * Glb.random());
        var endSize   = Math.max(0, c.endSize + c.endSizeVariance * Glb.random());
        
        this.size = startSize;
        this.deltaSize = (endSize - startSize) / this.timeToLive;
    
        // mode: gravity
        //if( this.ps._config['emitterMode'] === "GRAVITY" ) {
    
        var vector = Glb.point.make(Math.cos(newAngle), Math.sin(newAngle));
        var vectorSpeed = c.speed + c.speedVariance * Glb.random();
        
        // direction
        this.direction = Glb.point.mult(vector, vectorSpeed);
        
        // radial accel
        this.radialAcceleration = c.radialAcceleration + c.radialAccelerationVariance * Glb.random();
        
        // tangential accel
        this.tangentialAcceleration = c.tangentialAcceleration + c.tangentialAccelerationVariance * Glb.random();
        
        //}
    };
    
    P.prototype.isAlive = function(t) {
        return this.timeToLive > 0;
    };
    
    P.prototype.die = function() {
        this.timeToLive = 0;
    };
    
    P.prototype.reset = function() {
        this.init();
    };
    
    P.prototype.draw = function(delta) {
        
        var dt = delta/1000;
        var tmp, radial, tangential, gravity, diff;
        
        //dt = 0.05;

        this.timeToLive -= dt;
        
        //if( this.ps._config['emitterMode'] === "GRAVITY" ) {
            
        radial = Glb.point.zero();
        diff = Glb.point.sub(this.startPosition, Glb.point.zero());
        this.position = Glb.point.sub(this.position, diff);

        if (this.position.x || this.position.y) {
            radial = Glb.point.normalize(this.position);
        }

        // radial acceleration
        tangential = radial;
        radial = Glb.point.mult(radial, this.radialAcceleration);
        gravity = Glb.point.make(this.ps._config['gravity'].x, -1*this.ps._config['gravity'].y);

        // tangential acceleration
        tangential = Glb.point.mult(Glb.point.make(-tangential.y, tangential.x), -1*this.tangentialAcceleration);
        
        // (gravity + radial + tangential) * dt
        tmp = Glb.point.add( Glb.point.add(radial, tangential), gravity);
        tmp = Glb.point.mult(tmp, dt);
        this.direction = Glb.point.add(this.direction, tmp);
        tmp = Glb.point.mult(this.direction, dt);
        this.position = Glb.point.add(this.position, tmp);
        this.position = Glb.point.add(this.position, diff);
    
        //}
        
        // color
        this.color.red += (this.deltaColor.red * dt);
        this.color.green += (this.deltaColor.green * dt);
        this.color.blue += (this.deltaColor.blue * dt);
        this.color.alpha += (this.deltaColor.alpha * dt);
        
        // size
        this.size += (this.deltaSize * dt);
        this.size = Math.max( 0, this.size );
        
        // angle
        this.rotation += (this.deltaRotation * dt);
    
    };

    w.Particle = P;

})(window);


// particle subclass: bubble

;(function(w, undefined) {

    var P = function(aParticleSystem) {
        this.constructor(aParticleSystem);
        this.colorStop = [0.0, '#FFF', 1, 'rgba(0,0,0,0)'];
    };
    
    P.prototype = new Particle();
    
    P.prototype.draw = function(delta) {
        
        Particle.prototype.draw.call(this, delta);
        
        // break when particle is not visible
        if (this.size < 1 || this.position.x < this.size || this.position.y < this.size) {
            return;
        }
        
        var x = this.position.x;
        var y = this.position.y;
        var s = this.size;
        var c = this.color;
    
        var gradient = this.ps.context.createRadialGradient(x, y, 0, x, y, s);
        gradient.addColorStop(0, Glb.color.css(c));
        gradient.addColorStop(1, Glb.color.cssAlpha(c));
    
        this.ps.context.save();
        this.ps.context.fillStyle = gradient;
        this.ps.context.beginPath();
        this.ps.context.arc(x, y, s, 0, Math.PI * 2, true);
        this.ps.context.fill();
        this.ps.context.restore();
    };

    w.ParticleBubble = P;

})(window);


// particle subclass: sun

;(function(w, undefined) {

    var P = function(aParticleSystem) {
        this.constructor(aParticleSystem);
    };
    
    P.prototype = new Particle();
    
    P.prototype.draw = function(delta) {
        
        Particle.prototype.draw.call(this, delta);
        
        // break when particle is not visible
        if (this.size < 1 || this.position.x < this.size || this.position.y < this.size) {
            return;
        }
        
        var x = this.position.x;
        var y = this.position.y;
        var s = this.size;
        var c = this.color;
    
        var gradient = this.ps.context.createRadialGradient(x, y, 0, x, y, s);
        gradient.addColorStop(0.8, Glb.color.css(c));
        gradient.addColorStop(1, Glb.color.cssAlpha(c));
    
        this.ps.context.save();
        this.ps.context.fillStyle = gradient;
        this.ps.context.beginPath();
        this.ps.context.arc(x, y, s, 0, Math.PI * 2, true);
        this.ps.context.fill();
        this.ps.context.restore();
    };

    w.ParticleSun = P;

})(window);


// particle subclass: star

;(function(w, undefined) {

    var P = function(aParticleSystem) {
        this.constructor(aParticleSystem);
    };
    
    P.prototype = new Particle();
    
    P.prototype.draw = function(delta) {
        
        Particle.prototype.draw.call(this, delta);
        
        // break when particle is not visible
        if (this.size < 1 || this.position.x < this.size || this.position.y < this.size) {
            return;
        }
        
        var x = this.position.x;
        var y = this.position.y;
        var s = this.size;
        var c = this.color;
    
        this.ps.context.fillStyle = Glb.color.css(c);
        
        this.ps.context.save();
        this.ps.context.translate(x,y);
        this.ps.context.scale(s/50, s/50);
        this.ps.context.beginPath();
        this.ps.context.moveTo(-26,-5.5);
        this.ps.context.lineTo(-7.5,-7.5);
        this.ps.context.lineTo(-1.5,-26);
        this.ps.context.lineTo(5.6, -9);
        this.ps.context.lineTo(25,-10);
        this.ps.context.lineTo(10,3.5);
        this.ps.context.lineTo(17,22);
        this.ps.context.lineTo(0.5, 12);
        this.ps.context.lineTo(-14, 24);
        this.ps.context.lineTo(-10.5, 4.5);
        this.ps.context.closePath();
        this.ps.context.fill();
        this.ps.context.restore();
    };

    w.ParticleStar = P;

})(window);


// particle subclass: star-image

;(function(w, undefined) {

    var P = function(aParticleSystem) {
    
        this.constructor(aParticleSystem);
        
        this.image = new Image();
        // @? onload
        this.image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAFJElEQVRo3sWZXYgVZRjHn3N2N8SKXUu8CLYPhS0xacEUgj6wLioikS4sNmgLEoJKNwiyvKjsIjHELurGJBDTuiqMQBJFkQJrvUrM8qKkYsOsldzaXdqd/6+LmXfmfefMLufMOZ4z+3VmZ+Z9/8//+T8f77xm8xxawWdUzGQdO/iHs1zXCgjk/tb5CPtAE7rDjGr5yZVMS3/DozAkhOCxBtHX2E6FD3mn8Yf7hQDB62UgpMSv40/QioZHoEtjgDQjtDu2pGHbr+ZzAJ0rxaEOAiAhdEJXmVHXME62vKRZYg6fLAfgTUCS0IzQbyyqZ5jE9mUaBYkIuMz1peTD/QIhxSgg4l4zzROYqd93JeqJZfRR2fitKlKEBAmTwEYzqiqkXVUzMz3Ixex+zQJ3lnOAmennWAPJcDGE7b6fc8T36WNHmtMPF8zoKcvBTsdixoLgYBwT8rgyM+M5ZhXLhuRLoJfNVCkL4AElDCQAkBQJvlGvU0NsuwZ0PFasFECOuLmZLH4TyPtKziLgbwbMqNBlRrfeJrQ8sV9wuLky0sMZvOnxhpZ42MxM93FeKMqBRDADWlc2jTsp7kssi4lNPyWh8SK7E9uVAssASONmdDVRyczYlFCuNLRcWEJs9WwMEZRec1JkZ5P2m+lWoZkMgFwk4IGSIz4TbHJpdZOthLrNmE4Z8GKLQJ1yqJS4Kf70Q/lC7gBUzXQoTan+BHi5VqlIUy4k0HDTDqBixlZvzlADKYDMKdltRFrYmt7wbj8RZWT4KPwgTX/vbcHkMjNu5NIcURC4AN8FEjzasp6aUwpKUspIDkAaBRIab8XERrcZfXwbhmEoQl96GQBea9J+ksc1xKQI3a78Zz/9xD8RNzQRARimbjMt5pgrMkn0pxHmzuTlAWWJ6hKDpdcTaVs1rEheniuOglADypIwrC2ZhlQ1Ywkn04Lqd0Q1mVDFmTD+z1CDAFy7yWZm5EpN2BEFpTlkICjHrjo2tqShasZtOum3VYGHvShQQSqWn4pdhdxTJ4SksdoCrrkgZTdzBq5D9888iAqLEUSgQ0VNbE7zVMxYySmP1ey7bg3IL9cZjfAdfXMu7Nxii1ddc0HQWuVdUFcmDFRDJPSH+s1UoSDezUyDOpuLMPlZX4QjKuzTofY8r1uYZk2NFhK/7wBgNigzXu3JpcHCTOjPNtcdoPU1gtQq/epXuYKg8iUWRIEKniDfmGdUxLQ9EzLwbi1bQZHxrs6fCcP7azlLrkWgtzwWdBf36Ak2sk072M+njHKaCabmGU71FKPiI0V5YM7MQA8LWKwlWsZSHtcGtrOLLzmuMS4ywXSzLkjj7FguM9Tz3kN99DFKVmryYegFYJHDshSNhM5oUYn6qJFsFZBvSIR+YjXDeoUt7GU/h/Uj3/MLv3OBSf6tUcYkg40X6lW+xwMAEnq28JmF6mUly1nLeh5hRM/zBh/wno5ytPFCfa3Op6U2zFgwnieVK/GalyNzNiQHGnNnyU5JW4sW4vwnWN6WF9u6PZ4uKBoCzpmp68pP323GVNYpZa2Jnmp6FVj3SvELLw5dHvhL17RlB0Fmphe8VKSk59jTFvvdUtXrD1zLfksb91G0QGPe0kygr9u8scORXCZ8up2Tm5lGgrXidNu3tTSQxoEE77dRgG4TistekR1ot/1mxidpbT3cbv7jjYzNyWto2NCRrU3WJMuuCTO6O7OrOoWAbY3tpLVSBScEaKl16tAmJ0A6A4B+4KGOTW9GL19RVbW5Uf4HMZHIPWempS0AAAAASUVORK5CYII=";
    };
    
    P.prototype = new Particle();
    
    P.prototype.draw = function(delta) {
        
        Particle.prototype.draw.call(this, delta);
        
        // break when particle is not visible
        if (this.size < 1 || this.position.x < this.size || this.position.y < this.size) {
            return;
        }
        
        var x = this.position.x;
        var y = this.position.y;
        var extraContext = this.ps.__extraContext;
        var extraCanvas  = this.ps.__extraContext.canvas;
    
        extraCanvas.width = this.size;
        extraCanvas.height = this.size;
        extraContext.drawImage(this.image, 0, 0, this.size, this.size);
        
        var imageData = extraContext.getImageData(0, 0, this.size, this.size);
        var pixels = imageData.data;
        var numPixels = pixels.length;
        
        for (var i = 0; i < numPixels; i += 4) {
            
            // skip transparent pixels
            if (pixels[i+3] === 0) {
                continue;
            }
    
            pixels[i]   = 255 * this.color.red;     // Red
            pixels[i+1] = 255 * this.color.green; // Green
            pixels[i+2] = 255 * this.color.blue; // Blue
            pixels[i+3] = 255 * this.color.alpha; // Alpha
        };
        extraContext.clearRect(0, 0, this.size, this.size);
        extraContext.putImageData(imageData, 0, 0);
    
        //this.ps.context.putImageData(imageData, x, y);
        this.ps.context.drawImage(extraCanvas, x, y );
        //this.ps.context.drawImage(this.image, x, y, this.size, this.size);
    };

    w.ParticleStarImage = P;

})(window);


// particle subclass: demoJS

;(function(w, undefined) {

    var P = function(aParticleSystem) {
    
        this.constructor(aParticleSystem);
        
        this.image = new Image();
        // @? onload
        this.image.src = "data:image/png;base64,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";
    };
    
    P.prototype = new Particle();
    
    P.prototype.draw = function(delta) {
        
        Particle.prototype.draw.call(this, delta);
        
        // break when particle is not visible
        if (this.size < 1 || this.position.x < this.size || this.position.y < this.size) {
            return;
        }
        
        this.ps.context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    };

    w.ParticleDemoJS = P;

})(window);