# nutrifami-mobile

NUTRIMAFI-MOBILE
=======================

Instalación de de modulos con Node
----------------------------------

  - Instalar node.js (Agregar al path)
  - Navegar al root del proyecto
  - Instalar dependencias.
  -     $npm install
        $npm install --save-dev



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
  -     $npm install -g cordova ionic
  - Crear una carpeta llamada 'www' en el root del proyecto.
  - Copiar y remplazar el contenido de la carpeta plugins_ en puglins
  - IMPORTANTE: Remover plataforma android del proyecto 
  -     $cordova plarform remove android     
  - IMPORTANTE: Agregar plataforma android al proyecto (El paso anterior y este es para actualiar el plugin de audio y que funcione el sonido dentro de la aplicación)
  -     $cordova plarform add android
  - IMPORTANTE: Crear una aplicación de ionic en una ubicación diferente a la de nuestro proyecto:
  -     $ionic start IonicApp blank
  - Del proyecto creado copiar la carpeta IonicApp/www/lib/ionic en /nutrifami-mobile/app/lib/ionic


Tareas Gulp
------------

- Instalar gulp globalmente
-       $npm install -g gulp

Tareas configuradas con gulp

- Ejecutar servidor web de desarrollo [Tarea por defecto]
-       $gulp
-   Alistar los archivos rapidamente y sin comprimir para probarlos como aplicaciones mobiles
-       $gulp cordovaDev

Empaquetar aplicación móvil
------------------------

Para dispositivos android ejecutar
- Preparar android
-       $ionic prepare android
-   Compilar cordodva
-       $ionic compile android
-   Correr la aplicación
-       $ionic run android


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
