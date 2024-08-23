# Proyecto Todo List - Backend

Este es el backend para la aplicación de gestión de tareas (Todo List) utilizando Node.js, Express y MongoDB.

## Requisitos Previos

- Node.js (versión recomendada: 16.x o superior)
- Un editor de código (opcional, pero recomendado: VSCode)

## Clonación del Repositorio

- Clona el repositorio en tu máquina local

   **En tu terminal ejecuta el siguiente comando:
  ```bash
   git clone https://github.com/AngelAlfGar/toDoList-backend.git

- Navega hasta el repositorio clonado

  **En tu terminal ejecuta el siguiente comando:
  ```bash
  cd toDoList-backend

## Instalación dependencias

- Ya en tu repositorio clonado
  
  **Ejecuta el siguiente comando:
  ```bash
  npm install

## Configuración del entorno

  En la carpeta raíz del proyecto crea un archivo llamado '.env' y agrega las siguientes variables de entorno (puedes usar VSCode)

  MONGO_URI=mongodb+srv://luigyalfaro64:rOrTXRHZL8mhX0eS@cluster0.8xblg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  
  JWT_SECRET=@SuperSecure$ecretKey123!@

## Ejecución del servidor

  **En tu terminal ejecuta el siguiente comando:
  ```bash
  npm start 

  o

  ```bash
  nodemon server
