import { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World, Mouse, MouseConstraint, Composites, Composite, Common, Events } from 'matter-js';
import koi from "./koi.png"

function Comp (props) {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  useEffect(() => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight - 75

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
        
      }
    })
    engine.current.gravity.y = 0;
    const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine.current, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

  mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
  mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
World.add(engine.current.world, mouseConstraint);
    



    World.add(engine.current.world, [

      Bodies.rectangle(cw / 2, -50, cw, 100, { isStatic: true }),
 
    
        Bodies.circle(240, 880, 140,  
            { isStatic: true, render: {fillStyle: '#204f6b'}}),
       
            Bodies.circle(1171, 1020, 200,  
              { isStatic: true, render: {fillStyle: '#204f6b'}}),
              Bodies.circle(750, 1200, 100,  
                { isStatic: true, render: {fillStyle: '#3073ab'}}),
                Bodies.circle(460, 1300, 60,  
                  { isStatic: true, render: {fillStyle: '#3073ab'}}),
      Bodies.rectangle(-50, ch / 2, 100, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 100 , cw, 200, { isStatic: true}),
      Bodies.rectangle(cw + 50, ch / 2, 100, ch, { isStatic: true , 
    }),
      
      Bodies.rectangle(250, 1300, 125, 50, {restitution: 1, angle: 2.3, render: {
          fillStyle: "blue",
          sprite: {
                texture: koi,
                xScale: 0.1,
                yScale: 0.1,
                
          }
      }}),
      Bodies.rectangle(1200, 1350, 125, 50, {restitution: 1,  render: {
        fillStyle: "blue",
        sprite: {
              texture: koi,
              xScale: 0.1,
                yScale: 0.1,
              
        }
    }}),
    Bodies.rectangle(600, 850, 125, 50, {restitution: 1, angle: 3.6,render: {
        fillStyle: "blue",
        sprite: {
              texture: koi,
              xScale: 0.1,
                yScale: 0.1,
              
        }
    }})
      
    ])

    Engine.run(engine.current)
    Render.run(render)
   

    return () => {
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  const handleDown = () => {
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  const handleAddCircle = e => {
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    console.log(randomColor)
    if (isPressed.current) {
      const ball = Bodies.rectangle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: randomColor
          }
        })
      World.add(engine.current.world, [ball])
    }
  }

  return (
    <div
      
    >
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default Comp