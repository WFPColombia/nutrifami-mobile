# nutrifami-mobile

NUTRIMAFI-MOBILE
=======================

Instalación de de modulos con Node
----------------------------------

  - Instalar node.js (Agregar al path)
  - Navegar al root del proyecto
  - Instalar dependencias.
```bash
[sudo] npm install 
[sudo] npm install --save-dev
```


Instalación de librerias con Bower.
-----------------------------------

Una vez instalados los modulos con node, se debe:

  - Instalar Bower goblamente
  -     $npm install -g bower"
  - Instalar librerias usadas en el proyecto.
  -     $bower install

Instalación de Ionic y Cordova.
-----------------------------------

  - Instalar cordova y ionic globalmente
```bash
[sudo] npm install -g cordova ionic
```
  - Crear una carpeta llamada 'www' en el root del proyecto.
```bash
[sudo] ionic plarform add android
```
  - Generar los 'resources'
```bash
[sudo] ionic resources
```
  - Copiar la carpeta generada /res en plataforms/android y remplazar todo lo existente
  - IMPORTANTE: Crear una aplicación de ionic en una ubicación diferente a la de nuestro proyecto:
```bash
[sudo] ionic start IonicApp blank
```
  - Del proyecto creado copiar la carpeta IonicApp/www/lib/ionic en /nutrifami-mobile/app/lib/ionic


Tareas Gulp
------------

- Instalar gulp globalmente
```bash
[sudo] npm install -g gulp
```

Tareas configuradas con gulp:

- Ejecutar servidor web de desarrollo [Tarea por defecto]
```bash
[sudo] gulp
```
-   Alistar los archivos rapidamente y sin comprimir para probarlos como aplicaciones mobiles
```bash
[sudo] gulp cordovaDev
```

Empaquetar aplicación móvil
------------------------

Para dispositivos android ejecutar
- Preparar android
```bash
[sudo] ionic prepare android
```
-   Compilar cordodva
```bash
[sudo] ionic compile android
```
-   Correr la aplicación
```bash
[sudo] ionic run android
```


Distribución de Archivos
------------------------

    /
    /app
    /app/js/                                           ->  Archivos javascript
    /app/js/controllers                                ->  Controladores de angularjs
    /app/js/directives                                 ->  Archivos js de las directivas
    /app/js/services                                   ->  Servicios de angularjs
    /app/lib                                           ->  Librerias usadas (angular, etc)
    /app/css/                                          ->  Hojas de estilo
    /app/img/                                          ->  Imagenes de la aplicación
    /app/views/                                        ->  Vistas de angular
    /app/views/template                                ->  Archivos HTML de la plantilla layout de la app
    /app/views/directives                              ->  Archivos HTML de las directivas 
