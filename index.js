let canvas=document.querySelector('canvas')
canvas.width=1362
canvas.height=617.5
let c=canvas.getContext('2d')


class Player
{
    constructor()
    {
        this.position={x:canvas.width/2,y:400}
        this.velocity={x:0,y:0}
        const image=new Image()
        image.src='images.jpg'
        this.width=100;
        this.height=100;
        this.image=image


    }
    draw=()=>
    {
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }
    update=()=>
    {
        if (keys.a && this.position.x>=0)
        {
            this.velocity.x=-5;
        }
        else if(keys.d && this.position.x<1160)
        {
            this.velocity.x=+5;
        }
        else
        {
            this.velocity.x=0;
        }   
        this.position.x+=this.velocity.x;
        
        this.draw();
    }
}


class Projectile
{
    constructor(position,velocity)
    {
        this.position=position
        this.velocity=velocity
        this.radius=3;
    }
    draw=()=>
    {
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,Math.PI*2,false);
        c.fill;
        c.strokeStyle='red';
        c.stroke();
        c.closePath();
    }
    update=()=>
    {
        this.position.x+=this.velocity.x;
        this.position.y+=-5;
        this.draw()
    }
}


class Invader
{
    constructor(position)
    {
        this.position=position
        const image=new Image()
        image.src='download1.png'
        this.width=50;
        this.height=50;
        this.image=image


    }
    draw=()=>
    {
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }
    update=(dx,dy)=>
    {
        this.position.x+=dx
        this.position.y+=dy
        this.draw();
    }
}


class Grid
{
    constructor()
    {
        this.position={x:0,y:0}
        this.velocity={x:3,y:0}
        this.columns=Math.floor(Math.random()*5)+2
        this.rows=Math.floor(Math.random()*5)
        this.invaders=[]
        for (let i=0;i<this.rows;i++)
        {
            for (let j=0;j<this.columns;j++)
            {
                let position={x:this.position.x+j*50,y:this.position.y+i*50}
                this.invaders.push(new Invader(position))
            }
            
        }
    }

    update()
    {
        if (this.position.x<0 || this.position.x>canvas.width*this.columns)
        {
            this.velocity.x=-this.velocity.x
            this.velocity.y=+(10*this.rows)
        }
        else
        {
            this.velocity.y=0;
        }

        

        this.position.x+=(this.velocity.x*this.columns)
        this.position.y+=(this.velocity.y*this.rows)
    }
}

const keys=
{
    a:false,
    d:false
}

let p1=new Player()
let Projectiles=[]

let g1=new Grid()




class Particle
{
    constructor()
    {
        this.position={x:Math.random()*canvas.width,y:Math.random()*canvas.height}
        this.velocity={x:0,y:1}
        this.radius=Math.random()*3
    }
    draw()
    {
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false);
        c.fillStyle='white';
        c.fill;
        c.strokeStyle='White';
        c.stroke();
        c.closePath();
    }
}


let stars=[]
for (let i=0;i<100;i++)
{
    let newStar=new Particle()
    stars.push(newStar)
}





function animate()
{
    window.requestAnimationFrame(animate);
    c.fillStyle='black';
    c.fillRect(0,0,canvas.width,canvas.height)
    p1.update();
    g1.update()
    Projectiles.forEach((item,index)=>
    {
        if (item.position.y+item.radius<=0)
        {
            Projectiles.splice(index,1);
        }
        else
        {
            item.update();
        }   
    })

    // Background

    stars.forEach((star)=>
    {
        if (star.position.y+star.radius>=canvas.height)
        {
            star.position.y=Math.random()*canvas.height
        }
        star.draw()
    })

    // shooting logic
    g1.invaders.forEach((invader,i)=>{
        invader.update(g1.velocity.x,g1.velocity.y);
        Projectiles.forEach((project,j)=>
        {
            if (project.position.y-project.radius<=invader.position.y+invader.height && project.position.x+project.radius>=invader.position.x && project.position.x-project.radius<=invader.position.x && project.position.y+project.radius>=invader.position.y)
            {
                console.log("Hello")
                setTimeout(()=>
                {
                    const invaderFound=g1.invaders.find(invader2=>{return invader2==invader})
                    const projectileFound=Projectiles.find(projectile2=>{return projectile2==project})
                    if (invaderFound)
                    {
                        g1.invaders.splice(i,1);
                    }
                    if (projectileFound)
                    {
                        Projectiles.splice(j,1);
                    }
                },0)
            }
        })

    })
}

animate()








window.addEventListener('keydown',function({key})
{
    if (key=='a')
    {
        keys.a=true;
    }
    else if (key=='d')
    {
        keys.d=true;
    }
    else if(key=="s")
    {
        position={x:p1.position.x+p1.width/2,y:p1.position.y};
        velocity={x:0,y:-5}
        Projectiles.push(new Projectile(position,velocity))
    }
});


window.addEventListener('keyup',function({key})
{
    if (key=='a')
    {
        keys.a=false;
    }
    else if (key=='d')
    {
        keys.d=false;
    }
})

