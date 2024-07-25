---
pretitle: "Optimiza tus proyectos"
title: "Drupal y Ficheros Estáticos: Tu camino hacia la eficiencia en la carga de entidades" 
description: "Bienvenido a la presentación de mi proyecto personal de Drupal. Aquí descubrirás cómo he logrado generar ficheros estáticos para evitar consultas innecesarias a la base de datos al cargar una entidad, mejorando así la eficiencia y el rendimiento. Este proyecto te mostrará cómo puedes serializar entidades y cómo esta técnica puede ayudarte a optimizar tus propios proyectos de Drupal. No importa si eres un principiante total o simplemente necesitas un repaso, ¡estamos aquí para ayudarte a dominar Drupal!"
titleTeaser: "Drupal y Ficheros Estáticos" 
descriptionTeaser: "Descubre cómo optimizar la carga de entidades en Drupal. Aprende a generar ficheros estáticos y a serializar entidades para mejorar la eficiencia de tus proyectos de desarrollo."
---

## Necesidad del proyecto
Como bien sabemos los usuarios de Drupal, la base de datos no es precisamente su punto fuerte. Aunque Drupal nos ofrece una gran flexibilidad en la creación de entidades y campos, esta misma flexibilidad actúa como una espada de Damocles. La flexibilidad tiene un precio y, en este caso, ese precio es la eficiencia.

## Ejecución del proyecto

Decidí desarrollar un módulo personalizado para Drupal que, además de las funciones habituales de Drupal, almacena las entidades en archivos JSON dentro de un directorio público. 

La generación de estos archivos de entidad en formato JSON es posible gracias a la capacidad de serialización incorporada en el núcleo de Drupal.

Con Drupal, podemos serializar una entidad de manera sencilla utilizando el serializador. Esto nos permite generar una representación de la misma entidad en formato JSON. Posteriormente, podemos almacenar este archivo utilizando el sistema de archivos propio de Drupal.

```php
$json_entity = $this->serializer->serialize($entity, 'json', []);
$this->fileSystem->saveData($json_entity, $file_path, FileSystemInterface::EXISTS_REPLACE); 
```

De esta forma, en una arquitectura desacoplada, podríamos cargar entidades sin necesidad de consultar a Drupal. Incluso podríamos utilizar Drupal para generar estos archivos sin que ningún cliente tenga que hacer solicitudes para obtener las entidades.


Repositorio: <a href="https://github.com/santilopezpavon/entity_json_suite" target="_blank">https://github.com/santilopezpavon/entity_json_suite</a>
