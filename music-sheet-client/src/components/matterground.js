import { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World, Mouse, MouseConstraint} from 'matter-js';
import xiji from "./xiji.png"

function Matterground(props) {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  useEffect(() => {
    const cw = 400
    const ch = 400
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
 
      Bodies.rectangle(-50, ch / 2, 100, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 100 , cw, 200, { isStatic: true}),
      Bodies.rectangle(cw + 50, ch / 2, 100, ch, { isStatic: true , 
        
    }),
      
     
      
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
      const ball = Bodies.circle(
        e.clientX,
        e.clientY - 200,
        50,
     
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            sprite: {
                texture: xiji,
                xScale: 0.1,
                  yScale: 0.1,
                
          }
          }
        })
      World.add(engine.current.world, [ball])
    }
  }

  return (
    <div
    onMouseDown={handleDown}
    onMouseUp={handleUp}
    onMouseMove={handleAddCircle}
    >
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default Matterground