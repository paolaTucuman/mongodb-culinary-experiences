# Datos de ejemplo

Estos cinco archivos contienen los diez documentos ficticios usados en el trabajo final: dos por colección. Los identificadores `_id` son cadenas de texto y los campos terminados en `Id` vinculan documentos. Los nombres, contactos, direcciones, fechas y transacciones son ejemplos de la práctica, no registros de una plataforma en funcionamiento.

| Archivo | Campos principales | Relación |
| --- | --- | --- |
| [`usuarios.json`](usuarios.json) | `nombre`, `email`, `telefono`, `direccion`, `fechaRegistro`, `roleType` | Un usuario puede ser anfitrión o invitado. |
| [`experiencias.json`](experiencias.json) | `anfitrionId`, `titulo`, `descripcion`, `diasDisponibles`, `precioPersona`, `capacidadMaxima`, `ubicacion` | `anfitrionId` apunta a `usuarios._id`. |
| [`reservas.json`](reservas.json) | `experienciaId`, `invitadoId`, `fecha`, `numeroPersonas`, `precioTotal`, `estado` | Enlaza una experiencia con un invitado. |
| [`resenas.json`](resenas.json) | `reservaId`, `autorId`, `destinatarioId`, `experienciaId`, `calificacion` | Enlaza reseña, reserva, experiencia y usuarios. |
| [`pagos.json`](pagos.json) | `reservaId`, `monto`, `comision`, `montoNeto`, `metodoPago`, `estado` | `reservaId` apunta a `reservas._id`. |

El conjunto es demasiado pequeño para medir demanda, ingresos o calidad de recomendaciones. Solo documenta el modelo propuesto y permite probar las relaciones y el trigger.
