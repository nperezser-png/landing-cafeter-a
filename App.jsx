import { useState } from 'react'

// Contenido de ejemplo: cámbialo por el de tu cafetería.
const carta = [
  { grupo: 'Cafés', items: [
    ['Espresso', '1,60 €'], ['Cortado', '1,90 €'], ['Flat white', '3,00 €'],
    ['Café con leche', '2,20 €'], ['Filtrado del día', '3,20 €'],
  ]},
  { grupo: 'Para comer', items: [
    ['Tostada con tomate y aceite', '3,50 €'], ['Croissant de mantequilla', '2,40 €'],
    ['Bocadillo de tortilla', '5,50 €'], ['Tarta de queso', '4,80 €'],
  ]},
]

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY // ver README

export default function App() {
  const [estado, setEstado] = useState('idle') // idle | enviando | ok | error

  async function enviar(e) {
    e.preventDefault()
    const form = e.currentTarget
    setEstado('enviando')
    try {
      const datos = new FormData(form)
      datos.append('access_key', WEB3FORMS_KEY)
      datos.append('subject', 'Nuevo mensaje desde la web de Cafè Alba')
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: datos })
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      form.reset()
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  return (
    <>
      <header className="top">
        <a href="#inicio" className="logo">Cafè Alba</a>
        <nav>
          <a href="#nosotros">Nosotros</a>
          <a href="#carta">Carta</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="sol" aria-hidden="true" />
          <h1>Café tostado<br />aquí mismo,<br />cada mañana.</h1>
          <p>Desayunos, meriendas y café de especialidad en una esquina tranquila. Abrimos de 7:30 a 20:00.</p>
          <a className="btn" href="#carta">Ver la carta</a>
        </section>

        <section id="nosotros" className="bloque">
          <h2>Nosotros</h2>
          <p className="texto">
            Alba nació como un tostadero pequeño y acabó siendo el sitio donde los vecinos
            se quedan a leer. Tostamos en lotes cortos, compramos a productores que conocemos
            por su nombre y horneamos el pan y los dulces cada día.
          </p>
        </section>

        <section id="carta" className="bloque carta">
          <h2>Carta</h2>
          <div className="columnas">
            {carta.map((c) => (
              <div key={c.grupo}>
                <h3>{c.grupo}</h3>
                <ul>
                  {c.items.map(([nombre, precio]) => (
                    <li key={nombre}><span>{nombre}</span><b>{precio}</b></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contacto" className="bloque">
          <h2>Escríbenos</h2>
          <p className="texto">¿Reservas para un grupo, encargos de tarta o una duda? Te respondemos en un día laborable.</p>
          <form onSubmit={enviar}>
            <label>Nombre<input name="name" required autoComplete="name" /></label>
            <label>Correo<input name="email" type="email" required autoComplete="email" /></label>
            <label>Mensaje<textarea name="message" rows="5" required /></label>
            <input type="checkbox" name="botcheck" className="oculto" tabIndex="-1" autoComplete="off" />
            <button className="btn" disabled={estado === 'enviando'}>
              {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
            </button>
            <p role="status" className={`aviso ${estado}`}>
              {estado === 'ok' && 'Mensaje enviado. Te responderemos pronto.'}
              {estado === 'error' && 'No se ha podido enviar. Revisa tu conexión e inténtalo de nuevo.'}
            </p>
          </form>
        </section>
      </main>

      <footer>
        <p>Cafè Alba · Calle Ejemplo 12 · Lunes a domingo, 7:30–20:00</p>
      </footer>
    </>
  )
}
