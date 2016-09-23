# nutrifami-mobile

NUTRIMAFI-MOBILE
=======================

Instalación de de modulos con Node
----------------------------------

1. Instalar NodeJS globalmente

2. Navegar al root del proyecto

3. Instalar dependencias.

    $npm install
    $npm install --save-dev

Instalación de librerias con Bower.
-----------------------------------

Una vez instalados los modulos con node, se debe:

1. Instalar Bower goblamente

    $npm install -g bower"

2. Instalar librerias usadas en el proyecto.

    $bower install

Instalación de Ionic y Cordova.
-----------------------------------

1. Instalar cordova y ionic globalmente

    $npm install -g cordova ionic

2. Crear una carpeta llamada 'www' en el root del proyecto

3. Agregar plataforma android al proyecto

    $cardova plarform add android

4. IMPORTANTE: Crear una aplicación de ionic en una ubicación diferente a la de nuestro proyecto:

    $ionic start IonicApp blank

5. Del proyecto creado copiar la carpeta IonicApp/www/lib/ionic en /nutrifami-mobile/app/lib/ionic


Tareas Gulp
------------

Instalar gulp globalmente

    $npm install -g gulp

Tareas configuradas con gulp

1. Ejecutar servidor web de desarrollo [Tarea por defecto]

    $gulp

2. Alistar los archivos rapidamente y sin comprimir para probarlos como aplicaciones mobiles

    $gulp cordovaDev

Empaquetar aplicación móvil
------------------------

Para dispositivos android ejecutar

1. Preparar android

    $ionic prepare android

2. Compilar cordodva

    $ionic compile android

3. Correr la aplicación

    $ionic run android


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
