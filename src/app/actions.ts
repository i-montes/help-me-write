"use server";

import { streamText } from "ai";
import { openai } from "@/utils/openai";
import { cosineSimilarity, embedMany } from "ai";
import { createStreamableValue } from "ai/rsc";

const model = openai.chat("gpt-4");

export async function TweetsAi(input: string) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: model,
      system:
        "ESTE ES TU CONTEXTO: Utilizaras solo el idioma Español. Crea un hilo de twitter informativo que contenga un mínimo de 7 y un máximo de 14 tweets, ademas cada tweet va a estar separado por el siguiente conjunto de signos: #$ No enumeres los tweets, con la separacion del conjunto de signos ya sera suficiente. El hilo debe desarrollar de forma cálida, detallada y ligeramente informal la idea central y los argumentos que apoyan o prueban la idea principal. ÚNICAMENTE INCLUYE EN EL HILO DE TWITTER INFORMACIÓN QUE ESTÉ EXPLICITAMENTE EN EL TEXTO QUE TE PROPORCIONARÉ. Tweet de apertura: Introduce la idea central que expone el autor y el principal argumento presenta el texto. No incluyas preguntas en el primer tuit. Al final del primer tuit añade: Va 🧵. Tweets de apoyo: Los tweets que siguen al tuit de apertura debe proporcionar detalles que apoyen o prueben el tema o idea principal Cada tweet debe estar conectado con el siguiente y tener una secuencia lógica ademas de atractiva para el lector. Cada tuit debe desarrollar una idea de forma completa. Los tweets deben incluir citas clave para añadir credibilidad y contexto. Los tweets deben incluir estadísticas o datos importantes para añadir credibilidad y contexto. Los tuits deben incluir emojis para resaltar puntos clave, agregar énfasis visual, mejorar la lectura, presentar las estadísticas de forma más atractiva y fáciles de entender y/o al introducir una cita. El tweet que cierra el hilo debe invitar a los lectores a compartir el hilo. El tweet que cierra el hilo debe incluir el enlace de la historia. Reglas de estilo que debes seguir Tono: Cálido, ligeramente informal, incluye emojis, evita las hipérboles, evita los hashtags. Vocabulario: mantienen estructuras gramaticales simples. Extensión: cada tweet debe tener un máximo de 280 caracteres. Tiempo verbal: Presente. Perspectiva: tercera persona.",
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}

export async function AlertsAi(input: string) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: model,
      system:
        "A continuación se ofrece una sugerencia que puede utilizar para pedir al GPT-4 que revise un texto que se publicará como artículo: Revise el siguiente texto para asegurarse de que cumple las normas básicas de gramática y sentido, así como las directrices populares de publicación en Internet. No enumeres las alertas. No genere texto nuevo, sino una lista de alertas separadas por símbolos #$. Revise el texto para comprobar su claridad, coherencia y legibilidad en línea. Cada alerta debe estar en una sola línea e incluir el cambio propuesto dentro de tres asteriscos ***. para separar el texto que propones reemplazar utiliza el siguiente conjunto de simbolos: &&&",
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
