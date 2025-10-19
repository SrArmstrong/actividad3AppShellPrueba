# Tienda Campus - PWA

Una aplicación web progresiva creada como práctica para aprender el funcionamiento de las PWA. Simula una tienda del campus universitario y permite explorar cómo se estructura una app instalable, con funcionamiento offline y contenido dinámico.

## Características

- Estructura tipo App Shell con navegación, contenido y pie de página
- Funciona sin conexión gracias al Service Worker
- Estrategias de caché para mejorar rendimiento y disponibilidad
- Archivo `manifest.json` para instalación como app
- Filtro de productos por categoría usando JavaScript

## Instalación

1. Clona o descarga los archivos del proyecto  
2. Usa un servidor local  
3. Abre la aplicación en tu navegador

## Prueba sin conexión

1. Abre la aplicación con conexión a internet  
2. Luego desconéctate  
3. Recarga la página: la interfaz seguirá funcionando  
4. Los productos se mostrarán desde la caché

## Arquitectura

- **App Shell**: estructura HTML que se mantiene estable y rápida
- **Service Worker**: maneja caché con enfoque mixto (shell en caché, datos desde red)
- **Datos simulados**: archivo JSON que representa una API de productos
