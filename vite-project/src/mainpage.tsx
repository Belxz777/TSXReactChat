import { useRef } from "preact/hooks"
import { Link } from "react-router-dom"
import './main.css'
import Typewriter from 'typewriter-effect'
import {motion} from 'framer-motion'
export default function mainpage() {
  const constraintsRef = useRef(null);
  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    spaceBetween: 1.1
  }
  return (
    <>
 <header  >
   <Link  class='headinfo'to='/sign-up'>Регистрация</Link>
        <Link class='headinfo' to='/sign-in'>Вход</Link>
      <Link class='headinfo' to='/more'>Подробнее</Link>
  </header>
  <section>
  <Typewriter
 onInit={(typewriter:any) => {
     typewriter
         .typeString("Простой мессенджер без понтов и сложных иновации")
         .pauseFor(1000)
         .deleteAll()
         .typeString("Но все же довольно безопасный ")
         .pauseFor(1000)
         .deleteAll()
         .typeString("И конечно же быстрый ")
         .pauseFor(1000)
         .deleteAll()
         .typeString("Общайтесь на здоровье")
         .start();
 }}
/>
  </section>
  <section>
  <motion.div className="container" ref={constraintsRef}>
      <motion.div className="item" drag dragConstraints={constraintsRef} />
    </motion.div>
    </section>
  </>
  )};
