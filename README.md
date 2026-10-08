# Landing de cafetería (React + Vite)

## Probar en local
    npm install
    cp .env.example .env     # y pega tu access key de Web3Forms
    npm run dev

## Formulario
1. Entra en https://web3forms.com, escribe tu correo y recibirás una *access key* gratis.
2. Pégala en `.env` como `VITE_WEB3FORMS_KEY`.

## Publicar gratis en Vercel
1. Sube la carpeta a un repositorio de GitHub (`.env` no se sube).
2. En Vercel: Add New > Project > importa el repo.
3. En Environment Variables añade `VITE_WEB3FORMS_KEY` con tu clave.
4. Deploy. Esa URL es tu previsualización pública.
