# nutrifami-mobile

NUTRIMAFI-MOBILE
=======================

Instalación de de modulos con Node
----------------------------------

1. Instalar Node global
2. En el root del proyecto ejecutar el comando "npm install"


Instalación de librerias con Bower.
-----------------------------------

Una vez instalados los modulos con node, se debe ejecutar:

1. Instalar bower globalmente con "npm install -g bower"
2. Instalar las librerias usadas en el prouecto con el comando "bower install"

Instalación de Cordova.
-----------------------------------

1. Instalar cordava globalmente con 'npm install -g cordova'
2. Crear una carpeta llamada 'www' en el root del proyecto
3. Crear una carpeta llamada 'platforms' en el root del proyecto
4. Instalar plataformas y plugin para el proyecto de cordova 'cordova prepare'

Tareas Gulp
------------

En la consola de comandos (sin las comillas):

Instalar dependencias antes de los siguientes pasos

    $npm install --save-dev

1. 'gulp' -> Ejecutar servidor web de desarrollo
2. 'gulp cordovaDev' -> Alistar los archivos rapidamente y sin comprimir para probarlos como aplicaciones mobiles
3. 'gulp compileCordova' -> Alistar archivos comprimirdos para generar una versión para publicar


Probar aplicación móvil
------------------------

Para dispositivos android ejecutar

1. Preparar android

    cordova prepare android

2. Pompilar cordodva

    cordova compile android

3. Correr la aplicación

    cordova run android

Caracterizticas tecnicas
------------------------

 1. AngularJS
 2. Mobile Angular UI
 3. Cordova


Distribución de Archivos
------------------------

    /
    /app
    /app/js/                                           ->  Archivos javascript
    /app/js/controllers                                ->  Controladores de angularjs
    /app/js/directives                                 ->  Archivos js de las directivas
    /app/js/services                                   ->  Servicios de angularjs
    /app/lib                                           ->  Librerias usadas (angular, bootstrap, etc)
    /app/css/                                          ->  Hojas de estilo
    /app/img/                                          ->  Imagenes de la aplicación
    /app/views/                                        ->  Vistas de angular
    /app/views/template                                ->  Archivos HTML de la plantilla layout de la app
    /app/views/directives                              ->  Archivos HTML de las directivas 
