// Función para un Database Trigger de MongoDB Atlas sobre inserciones en alt2.experiencias.
// OPENAI_API_KEY y OPENAI_MODEL se configuran como Values de Atlas, fuera del código.
exports = async function (changeEvent) {
  if (changeEvent.operationType !== "insert") return;

  const experiencia = changeEvent.fullDocument;
  const db = context.services.get("mongodb-atlas").db("alt2");

  try {
    if (!experiencia?.anfitrionId || !experiencia?.titulo || !experiencia?.descripcion) {
      throw new Error("Faltan anfitrionId, titulo o descripcion");
    }

    const apiKey = context.values.get("OPENAI_API_KEY");
    const model = context.values.get("OPENAI_MODEL");
    if (!apiKey || !model) {
      throw new Error("Configura OPENAI_API_KEY y OPENAI_MODEL en Atlas Values");
    }

    const prompt = `Genera un anuncio publicitario de aproximadamente 100 palabras para esta experiencia culinaria:
Título: ${experiencia.titulo}
Descripción: ${experiencia.descripcion}
Días disponibles: ${experiencia.diasDisponibles?.join(", ") || "No especificado"}
Horario: ${experiencia.horario || "No especificado"}
Precio por persona: ${experiencia.precioPersona ?? "No especificado"}
Capacidad: ${experiencia.capacidadMaxima ?? "No especificada"}
Tipo de comida: ${experiencia.tipoComida?.join(", ") || "No especificado"}.
Usa un tono cálido y una invitación a reservar.`;

    const response = await context.http.post({
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        Authorization: [`Bearer ${apiKey}`],
        "Content-Type": ["application/json"],
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (Number(response.statusCode) < 200 || Number(response.statusCode) >= 300) {
      throw new Error(`La API respondió con estado ${response.statusCode}`);
    }

    const body = EJSON.parse(response.body.text());
    const anuncio = body.choices?.[0]?.message?.content?.trim();
    if (!anuncio) throw new Error("La respuesta no incluyó un anuncio");

    await db.collection("experiencias").updateOne(
      { _id: experiencia._id },
      {
        $set: {
          anuncioPublicitario: anuncio,
          triggerStatus: "success",
          apiUsed: model,
          adGenerationTime: new Date(),
        },
      }
    );
  } catch (error) {
    const message = String(error);
    console.error("Error en trigger:", message);
    await db.collection("trigger_errors").insertOne({
      documentId: changeEvent.documentKey?._id,
      error: message,
      timestamp: new Date(),
    });
    if (experiencia?._id) {
      await db.collection("experiencias").updateOne(
        { _id: experiencia._id },
        { $set: { triggerStatus: "error", lastError: message } }
      );
    }
  }
};
