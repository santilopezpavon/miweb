---
title: "Fundamentos de GIT"
description: "En esta Guía aprenderás los conceptos fundamentales de GIT"
date: "2024-07-17"
author: "Juan Pérez"
---

# Guía Fundamental de GIT

## Qué es git

Git es un sistema de control de versiones distribuido de código abierto bajo la licencia pública general de GNU.

Un **sistema de control de versiones** es un software que rastrea y registra lo cambios que se hacen en los documentos de un proyecto. Nos permite ver qué ficheros se modifican o crean, qué se ha cambiado, cuándo se ha cambiado y qué usuarios han hecho ese cambio.

Y no solo eso, sino que gracias al registro podemos controlar el versionado del proyecto pudiendo revertir cambios o volver a estados anteriores.

Git es un sistema de control de versiones **distribuido**, lo que significa que los usuarios de cualquier parte del mundo pueden tener una copia de su proyecto en su propio ordenador.

Realmente lo que hay es un servidor remoto que contiene el respositorio y cada usuario que participa en el proyecto se copia ese repositorio en su entorno local. Si un usuario hace un cambio, lo hará en su propio entorno local, se sincronizará con el repositorio remoto y el resto de usuario sincronizarán sus repositorios locales con el remoto y así se logra la sincroniza entre todos.

Es decir, hay varios repositorios junto a uno remoto, y lo que se hace es realizar sincronizaciones de local a remoto y de remoto a local.

**Git no es el único sistema de control de versiones**, pero el aspecto distribuido es una de las principales razones por las que se ha convertido en uno de los sistemas de control de versiones más comunes disponibles. 

Los sistemas de control de versiones se utilizan ampliamente para cosas que involucran código, pero también puede controlar versiones imágenes, documentos y cualquier número de tipos de archivo. 

Para lograr todo esto, este efecto de sistema distribuido necesitamos ese repositorio remoto, es decir, un **sistema de alojamiento basado en GIT**, en el mercado hay varios: GitHub, GitLab, BitBucket, Beanstalk.

## Algunos conceptos clave

Hay algunos términos básicos que necesitarás saber antes de empezar. 

* El **protocolo SSH** es un método para el inicio de sesión remoto seguro de un equipo a otro. 
* Un **repositorio** contiene las carpetas de proyecto configuradas para el control de versiones. 
* Una **bifurcación** es una copia de un repositorio. 
* Una **pull request** es la forma en que solicitas que alguien revise y apruebe tus cambios antes de que sean definitivos. 
* Un **directorio de trabajo** contiene los archivos y subdirectorios del equipo que están asociados con un repositorio de Git. 

## Las areas de trabajo en GIT

Cuando trabajamos con GIT, nos moveremos entre cuatro áreas de trabajo. 

* Stash: Es una memoria de uso temporal, como puede ser el copia papeles. No suele ser utilizada.
* Directorio de trabajo: El código en sí mismo, nuestro sistema de ficheros local.
* Índice: Es un intermediario entre el área de trabajo y el repositorio.
* Respositorio Local: Aquello que va registrando los cambios y guarda el historico.

## Primer Commit y Inicializar el repositorio

Supongamos que tengo un directorio con una serie de ficheros:

* Curso de Git/
    * dir/
        * fichero03.txt
    * fichero01.txt
    * fichero02.txt

Lanzamos el comando que nos permitirá inicializar el repositior de GIT, eso sí, lo hará de forma local.

```bash
git init
```

Ahora en nuestro sistema de ficheros tendremos un directorio oculto llamado **.git**, que es el repositior de git en sí mismo que se ha creado al inicializarlo con "git init":

* Curso de Git/
    * dir/
        * fichero03.txt
    * fichero01.txt
    * fichero02.txt
    * .git/

> Un **archivo sin seguimiento**, es un archivo que no ha sido notificado al indice. 

Ahora podriamos notificar los archivos al índice:
```bash
git add . # Cualquier archivo sin seguimiento o modificado será notificado al índice.
git add <ruta_archivo> # Notificar el archivo concreto al índice. 
```
Ahora podemos comitear los cambios notificados al indice, para que esos cambios pasen al repositorio y quedé así rastreado en el historico.

```bash
git commit -m "Comentario" # git commit -m "Comentario identificativo de lo que hemos hecho"
```

Commitear significa trasladar todo las modificaiones del sistema de ficheros que hay en el indice al repositirio y que así queden rastreadas en el historico, es como tomar una instantanea de nuestro sistema de ficheros.

Si queremos conocer el estado del sistema de ficheros local, podemos utilizar el comando "git status" este comando me identificará los cambios que han habido en el sistema de ficheros (creación de ficheros, borrado de ficheros, y modificación de ficheros) sin que estén commiteados.

```bash
git status 
```

## Sincronización entre áreas de trabajo

Como vemos cuando hacemos un commit los datos cambios circulan entre el sistema de ficheros, el índice y el respositorio.

```bash
git diff # Qué cambios hay entre el sistema de ficheros y el índice. Si la salida del comando está vacía significa que el índice está sincronizado con el sistema de ficheros.
git diff --cached ## Igual que el anterior, per revisando las diferencias entre el índice y el respositorio.
```
## Cómo rastrea el contenido GIT y cómo funciona su base de datos

GIT es capaz de rastrear el contenido gracias a un sistema de mapeo clave - valor.

Su base de datos se compone de objetos y cada uno de ellos tiene un identificador que nos permite encontrarlo.

Si yo quiero ver los commits que se han realizado en el proyecto puedo lanzar el siguiente comando:

```bash
git log # Historico de los commits que se han ido haciendo en el respositorio.
git log -1 # Devuelve el último elemento del historico. => A qué commit estoy apuntando
git log -2 # Devuelve los dos ultimos elementos del historico elemento del historico.
```
Nos mostrará un listado de commits y de cada uno tendremos:
* Autor
* Commentario
* Fecha
* Identificador: Un hash generado a partir del contenido del commit.

Para ver la información del commit concreto podemos utilizando su id lanzar el siguiente commando:

```bash
git cat-file -p <identificador_commit> 
```

Pero no solo eso, sino que hay más objetos además de commits, todos tienen un identificador en forma de hash y podemos ver su contenido con el mismo comando. En concreto tenemos cuatro tipos de objetos:

* Tags => Similares a los commits
* Commits
* Blob => Fichero
* Tree => Directorio

Cuando entramos en un blob veremos su contenido y cuando entramos en un tree vemos los ficheros y subdirectorios que lo conforman.

Todos los objetos en git están dentro del directorio .git/objects

En este imagen vemos unos circulos que cada uno representa un objeto:
* Rojo: Commit
* Lila: Directorio
* Amarillo: Fichero

Entonces tenemos un commit que está representando el estado del sistema de ficheros en un momento dado.

![Esta es una imagen de ejemplo](../../assets/git/commit.png)

Si hacemos un nuevo commit que del fichero01, se crearán unicamente los objetos indispensables, es decir, un objeto para el fichero en cuestion que ha sufrido la modificación y tantos objetos como directorios superiores haya. El resto de referencias se aprovechan y si nos fijamos el commit nuevo generado tiene un **parent**, que es el commit del cual nace. 

![Esta es una imagen de ejemplo](../../assets/git/commit02.png)


## Las Ramas de GIT

Una Rama es una referencia hacía un Commit. 

Pero antes de entrar necesitamos conocer el **Head**. Head es a la fotografía del proyecto a la que apunta nuestro sistema de ficheros. Generalmente lo hace a una rama, pero también podría estar apuntado a un commit concreto.

Para saber dónde está apuntando nuestro Head podemos hacer uso del comando "git status" que ya conocemos.

Cuando hacemos un nuevo commit, y nuestro head apunta una rama, esa rama moverá su referencia y apuntará al commit que acabamos de hacer. 

> **Detached Head**: Es la situación que se ha comentado, cuando el Head apunta hacia un commit concreto, que identificamos con el comando "git status". Cuando ocurre esto, al commitear nuestro head apuntará al nuevo commit como si de una rama se tratara.

```bash
git branch # Listado de ramas locales disponibles. También indica en qué rama estamos.
git branch <nombre> # Crea una rama que apunta al commit en el que estabamos al crear la rama.
git checkout <nombre_rama> # Apuntar el Head a la rama indicada
git checkout -b  <nombre_rama> # Crear rama y apuntar el head hacia esa nueva rama.
git branch -d <nombre> # Borrar rama
git branch -D <nombre> # Borrar rama modo fuerte
``` 

Para saber a qué commit está apuntando una rama podemos mirar dentro de nuestro repositorio:

```bash
cat .git/refs/heads/<nombre_rama>
``` 

### El Merge de Ramas

Trata de fusionar dos ramas. Coger las líneas independientes de desarrollo creadas por git branch e integrarlas en una sola rama.

Sirve sobretodo en los casos en los que estamos haciendo un desarrollo en un rama, y queremos llevar esas funcionalidades a otra rama.

En esta imagen tenemos dos commits, el rojo que es dónde apunta la rama master y el verde que es donde apunta una rama llamada "nueva" .

![Esta es una imagen de ejemplo](../../assets/git/merge.png)

Si queremos traernos los cambios de nueva a master, lo que haremos será:

```bash
git checkout master # Posicionarnos en la rama máster.
git merge nueva 
```

Este "merge" lo que hará es **crear un nuevo commit (el cyan) a partir de la fusión de los commits a los que apuntan ambas ramas**, y si nos fijamos los commits a partir de los cuales se ha generado ese nuevo commit son Parents del nuevo commit. Por tanto, un commit puede tener uno o dos parents.

Posteriormente la **rama master (la rama en la que estabamos) pasará a apuntar a ese nuevo commit (cyan)**, mientras que la rama nueva permancerá en el commit en el que estaba (verde).

Cuando hacemos el git merge se genera un proceso que consta de dos pasos:

1. Se trae los cambios de la rama a nuestro sistema de ficheros.
2. Realiza un commit automatico => Moviendo la referencia de la rama en al que estamos a ese nuevo commit creado.


### Conflictos al hacer merge

Cuando hacemos un Merge se genera un nuevo Commit fusión de dos commits. 

En determinadas situaciones es posible que GIT no sea capaz de generar ese nuevo commit porque hayan cambios que afecten a los mismos ficheros y además se solapen. Esto genera lo que se conoce como **conflicto**.

En estos casos GIT dejará el proceso a medias: nuestro sistema de ficheros tendrá la fusión de ambos commits, pero no ha sido capaz de realizar el commit.

GIT nos indicará que ficheros tienen problemas y dónde están los problemas para que los arreglemos nosotros y una vez solucionados finalizemos el proceso del merge, es decir, generemos el nuevo commit.

A los ficheros afectados les añadirá las siguientes marcas:

![Esta es una imagen de ejemplo](../../assets/git/conflicto.png)

La parte HEAD es lo que había en nuestro sistema de ficheros y la otra parte es la que había en la rama que queremos traernos.

### Etiquetas

Una etiqueta es una referencia a un commit (como una rama). La diferencia entre la etiqueta y la rama, es que al hacer un nuevo commit su referencia no cambia, cosa que si que pasa en una rama. 

Existen dos tipos de etiquetas:
* Anotadas: Objetos de GIT que referencian a un Commit. Esto quiere decir que tienen un identificador y que están en la Base de Datos de GIT.
* Ligeras: Referencia a un Commit. No es un objeto de GIT. 


```bash
git tag # Lista las etiquetas que hay en el repositorio.
git tag -a <nombre_etiqueta> -m "Comentario etiqueta" # Crear una etiqueta anotada
git tag <nombre_etiqueta> # Crear una etiqueta ligera
git cat-file -p <nombre_etiqueta> # ver la información de la etiqueta, incluyendo a qué objetos referencia.
git tag -d <nombre_etiqueta # Borrar etiqueta.
```

Cuando miramos la información propia de una etiqueta veremos diferencias entre las anotadas y la ligera:

* anotada: tendrá información propia de la etiqueta, cómo el comentario, el objeto al qué referencia y el tipo de objetos referenciado. 
* ligera: mostrará unicamente la información del commit al que referencia, porque como sabemos no es un objeto y por tanto no tiene información propia.

## Git Ignore

Dentro de nuestro proyecto podemos crear un fichero especial llamado .gitignore

En este fichero se indica qué ficheros queremos ignorar, esto es que no formen parte del respositorio, que no se traqueen ni rastreen.

Esto es interesante porque podemos evitar cosas como subir al repositorio las dependencias que se instalan a través de un gestor de paquetes.

Cada línea del fichero representa la ruta hacia un directorio o un fichero que queremos ignorar.

dir/* => omitir los ficheros interiores al directorio
dir/*.php => omitir ficheros php dentro del directorio dir


### Omitir un fichero que ya está traqueado

Cuando un fichero ya está traqueado, aunque lo incluyamos en el .gitignore a priori seguirá siendo traqueado y rastreado. Esto ocurre porque el índice o (stage area) los sigue considerando.

Para indicarle al indice que deje de considerar un archivo lo tenemos que eliminar del índice (no del sistema de ficheros).


```bash
git remote --cached <ruta_fichero> # Eliminar fichero del índice
git remote --cached <ruta_fichero> -r # Eliminar directorio y ficheros dentro del directorio del indice
```

Con esto, y los ficheros en el .gitignore podemos hacer una nuevo proceso de commit.

## Git Distribuido

### Crear un repositorio

Lo primero es crear una cuenta en algunos de los proveedores de sistema de alojamiento basado en GIT, como por ejemplo Github.

Un repositorio tiene:
* Nombre: El nombre afectará a su URL.
* Descripción
* Privacidad:
    * Publico: Cualquier persona puede acceder a él pero no puede comitear cambios.
    * Privado: Es como el anterior pero se necesitan permisos para acceder al repositorio.
* Añadir elementos: Si añadimos algo el repositorio será inicializado con un commit, esto no interesa si ya hemos  inicializado en local.
    * Readme
    * Gitignore

Vamos a nuestro código (nuestro sistema de ficheros) y hacemos:

```bash
git remote add origin https://<url_repo> # Añadir un nuevo repositorio con nombre origin, vinculado a la url del repositorio que hemos creado.
git branch -M main # Renombrar la rama actual a main (será la principal)
git push -u origin main # Subir la rama main local hacia el repositior remoto al que hemos llamado origin
```

### Acceso al repositorio

Cuando interactuamos con el respositorio remoto necesitamos utilizar credenciales, y el sistema de acceso puede ser de dos tipos:
* https
* ssh

En el código anterior lo hemos hecho a través de https, porque así es cómo hemos vinculado nuestro repositorio local con el remoto:

```bash
git remote add origin https://<url_repo>
```

Para configurar el ssh: https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-DS0105EN-SkillsNetwork/labs/Module2/GitHub_AddSSHtoRepo.md.html?origin=www.coursera.org

Si lo accedemos mediante ssh, lo haremos con un par de claves, lo que nos facilita el acceso porque no tendremos que escribir usuario y contraseá con cada interacción.

Con https, tenemos diferentes métodos para evitar la autenticación de forma constante gracias al sistema de control de credenciales de GIT. Para saber qué sistema de control de credenciales estamos utilizando podemos lanzar el siguiente comando:

```bash
git config --global credential.helper
```

Existen tres sistemas:
* default => cada vez que interactuas necesitas poner usuario y contraseña
* cache => pues el usuario y la contraseña queda guardado en memoria durante un tiempo
* store => guarda el usuario y la contraseña en un fichero de texto plano dentro de nuestor pc (desaconsejado)

Para cambiar el valor:
```bash
git config --global credential.helper cache
```

Si habro el fichero de configuración de git:

```bash
code .git/config 

```
 Veré los repositiorios remotos que tenemos configurados y la ruta remota del respositiorio junto al nombre que le hemos asignado localmente para referirno a el:

```yml
 [core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
[remote "origin"]
	url = https://github.com/snt1986/criptobot.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
[branch "integrationaccount"]
	remote = origin
	merge = refs/heads/integrationaccount
```

Entonces en el modo HTTPS si queremos que no nos pida la contraseña podemos cambiar el parametro de la URL por el siguietne formato que contiene el usuario y la contraseña el propia URL (método que seguramente sea eliminado en el futuro)
```bash
git remote set-url origin  https://usuario:contraseña@github.com/snt1986/criptobot.git

```
### Clonar repositorio

Cuando queremos descargar en nuestro sistema de ficheros un repositorio remoto lo podemos hacer clonandolo.

```bash
git clone <ruta_repositorio> # La ruta puede ser ssh o https
git clone <ruta_repositorio> . # Clona el directorio actual, sin crear un sub directorio
```

### Ramas remotas

Cuando lanzamos un git status, seguramente veamos una salida similar a esta:

```bash
En la rama main
Tu rama está actualizada con 'origin/main'.
``` 
origin/main es una rama oculta que indica el estado de la rama remota, entonces, aquí nos dice que la rama main local está sincronizada con la rama origin/main, es decir que apuntan al mismo commit. 


```bash
git branch --all # Muestra las ramas que tenemos en nuestro repositorio local y también las ramas ocultas que representan a las del repositorio remoto.
# Salida
* main
  remotes/origin/integrationaccount
  remotes/origin/main
```

Las ramas remotes/origin/integrationaccount y remotes/origin/main, son esas ramas ocultas que representan al repositorio remoto, si yo quiero tener la rama integrationaccount en mi local, lo puedo hacer haciendo un simple checkout. Para así tener esa rama tamibién en mi repositior local.

```bash
git checkout integrationaccount
git branch --all 
# Salida
  main
* integrationaccount
  remotes/origin/integrationaccount
  remotes/origin/main
```

### Sincronía remoto - local

Nos imaginamos que tenemos nuestra rama main en nuestro repositorio local y la rama main del respositorio remoto. Ambas apuntan al mismo commit.

![Esta es una imagen de ejemplo](../../assets/git/fetch.png)

Seguimos desarrollando y llegamos a un punto en el que nuestra rama main apunta a un commit, y la remota apunta a otro, porque los compañeros han seguido trabajando.

![Esta es una imagen de ejemplo](../../assets/git/fecth02.png)

```bash
git fetch
```

Cuando lanzamos el comando git fectch, se cogerá el estado de la rama main remota y la traerá a la rama oculta remota del repositorio local remotes/origin/main.

Entonces para fusaionar la rama remota con la local tenemos que hacer un merge que ya sabemos como funciona.

```bash
git merge origin/main
```

Finalmente, como sabemos pueden conflictos y tener que acabar nosotros el proceso del commit generado con el merge,

Por ultimo subimos la rama main, ya fusionada al repositorio remoto y así tanto main del respositorio remoto como main local apuntarán al mismo commit:

```bash
git push origin main
```

Para saber si la rama local y remota oculta están sincronizadas (en el estado que tenemos actualmente del repositorio remoto)

```bash
git show-ref main # Muestra dónde apuntan las ramas que contienn main en su nombre
```
#### git pull

Git pull es un comando que es una nos simplifica la sincronización con el respositior remoto. Supongamos que estamos sobre nuestra rama main.

```bash
git checkout main
```

Para sincronizar nuestra rama main con la rama main remota tenemos que hacer dos pasos.

```bash
git fetch # Sincronizar nuestra ramas ocultas
git merge origin/main # Sincronizar la rama oculta acutalizada con la local
```

Esto lo podemos hacer con un solo paso:

```bash
git pull origin main
```

# Git Avanzado

## Git checkout

Git checkout permite ubicarnos en una rama, una etiqueta o un commit y esto es posible porque tanto el indice como el sistema de ficheros se sincronizan con el repositorio. Pasando el estado del respositorio en ese commit al indice y la sistema de ficheros.

Si hago cambios en mi sistema de ficheros y me quiero cambiar de rama, no puedo moverme. Si estamos creando una nueva rama esto no pasaría porque partimos del estado actual, con lo cambios realizados.

Para revertir un cambio de un fichero hacia el estado del commit al que apuntamos podemos hacer:

```bash
git checkout <ruta_fichero> # Resincronizar el fichero con el commit actual
git checkout . # Resincronizar todos los ficheros  cambiados con el commit actual
```
## Git reset

Es un comando que la rama en la que estoy apunte hacia el commit que le diga.

```bash
git reset <commit>
```

Tenemos varias opciones:
* hard => copia el estado del commit en el índice y en nuestro sistema de ficheros.
* mixed => es la opción por defecto, que copia el estado del commit al índice pero no toca el sistema de ficheros
* soft => no toca ni el índice ni el área de trabajo

Lo habitual para volver completamente a una versión anterior es utilizar la versión hard.
```bash
git reset --hard <commit>
```

Como commit también le podriamos pasar HEAD. 
```bash
git reset --hard HEAD
```

Esto hace que la rama en la que estamos apunte al mismo commit per restaurando tanto el índice como el sistema de ficheros, como si no hubieramos hecho nada.


* Hemos hecho un pull y nos han aparecido muchos conflictos. En este caso nos interesa restaurar todo, hasta que alguien nos ayuda a solucionar los conflictos.
```bash
git reset --hard HEAD
```

* Hemos añadido cosas al indice y nos arrepentimos. En este caso aplicamos la opción por defecto para no tocar nuestro sistema de ficheros.
```bash
git reset HEAD
```

Si queremos forzar que la versión origin apunte al mismo comit local:

```bash
git push origin master --force
```
## Stash

Es una memoria temporal

Nos imaginamos que hacemos cambios en nuestro sistema de ficheros y acto seguido, sin hacer nada más ni añadir el indice:

```bash
git stash
```

Esto hará que los cambios desaparezcan, porque los cambios los ha guardado en la memoria y luego internamente se ha hecho un git reset --hard HEAD. 

Para ver el listado se stashes (podemos tener más de uno) podemos lanzar el siguietne comando:

```bash
git stash list # Listado de stashes guardados
```
La salida será del tipo stash@{0}: WIP un nuevo nombre.... lo que hay por delante de los dos puntos es el identificador del stash, en este caso stash@{0}.

Para recuperar el stash podemos hacer:
```bash
git stash pop <id_stash> # Recuperar los cambios del stash y eliminar de la memoria.
```

Git stash por defecto no tiene en cuenta los fichero no traqueados, es decir, aquellos creados que no se han comiteado.

```bash
git stash --include-untracked # Stash teniendo en cuenta los ficheros no rastreados.
```

```bash
git stash clear # Limpiar memoria del stash
```

## Git log

Git log es muy útil pero dificil de analizar. Pero si le lanzamos los siguiente parametros tendremos una interfaz más amigable.

```bash
git log --oneline --graph --decorate 
```

Para ver el contenido de un commit.
```bash
git show <id_commit>
```


## Git reflog

Este comando dá el historico pero del HEAD, es decir, todos aquello commits a los que ha apuntado el HEAD y todos los movimientos que he hecho.

```bash
git reflog 
```

## Problemas comunes
### Cambiar de repositorio

1. Identificar con qué repositorios estoy trabajando al hacer push y fetch. 
```bash
git remote -v 
# Salida
origin  https://github.com/snt1986/criptobot.git (fetch)
origin  https://github.com/snt1986/criptobot.git (push)
```
2. Eliminar repositorio origin
```bash
git remote rm origin
```

3. Apuntamos al nuevo repositorio
```bash
git remote add origin <direccion_reposito_nuevo>
```

4. Subimos las ramas y etiquetas al nuevo repositorio.
```bash
git push origin --all # Subir todas las ramas
git push origin --tags # Subir todas las tags
```
### Eliminar un commit

Si tengo un historico de commits, y quiero borrar un commit intermedio. 

```bash
git revert <id_commit>
```

Esto hará añadir un commit alfinal del historico que hace el proceso inverso al commit que queremos eliminar.