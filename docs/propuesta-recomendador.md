# Propuesta de recomendación de experiencias culinarias

El trabajo final planteó un sistema de recomendación para ayudar a cada invitado a descubrir experiencias acordes con sus preferencias. Esta sección describe una **propuesta conceptual**: no se entrenó un modelo ni se midió su desempeño.

## Enfoque propuesto

1. **Preferencias compartidas.** El filtrado colaborativo usaría reservas y valoraciones para buscar patrones entre personas con intereses similares. Requiere suficientes interacciones para generar comparaciones útiles.
2. **Características de la experiencia.** El filtrado basado en contenido compararía tipo de comida, ingredientes, ubicación y precio con las experiencias que una persona haya preferido. El trabajo propuso representar textos con TF-IDF y comparar similitud mediante coseno.
3. **Contexto.** Ubicación, horario y ocasión especial podrían ayudar a ordenar las opciones que ya son compatibles con las preferencias del invitado.

Para una persona nueva sin historial, la propuesta considera comenzar con experiencias populares o con preferencias declaradas al registrarse. Para evitar recomendaciones repetitivas, plantea combinar relevancia con diversidad y novedad.

## Qué faltaría para implementarlo

Haría falta reunir interacciones reales y consentidas, definir el objetivo de la recomendación, preparar un conjunto de evaluación y comparar el enfoque híbrido con una referencia sencilla. Los diez documentos ficticios del repositorio muestran el modelo de datos, pero no permiten entrenar ni validar un recomendador.
