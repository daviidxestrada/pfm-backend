# Backend PFM

## Requisitos

- Tener MongoDB accesible en la URL definida en `MONGO_URI`.
- Configurar las variables de entorno a partir de `.env.example`.

## Variables de entorno

1. Copia `backend/.env.example` como `backend/.env.local`.
2. Ajusta `PORT`, `MONGO_URI`, `JWT_SECRET` y `CORS_ORIGIN` a tu entorno.

## Arranque

```bash
npm install
npm run dev
```

## Bootstrap del primer admin

Para crear el primer usuario administrador sin tocar MongoDB manualmente:

```bash
npm run crear-admin -- --name "Administrador" --email admin@demo.com --password "ClaveSegura123"
```

Comportamiento del script:

- Si el usuario no existe, lo crea con rol `admin`.
- Si el usuario ya existe, actualiza nombre, contraseña y rol a `admin`.

Despues de ejecutar el script ya puedes iniciar sesion en el panel admin desde el frontend.
