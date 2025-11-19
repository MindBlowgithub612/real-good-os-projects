import { GoogleGenAI } from "@google/genai";

// FIX: Per coding guidelines, initialize directly with the environment variable.
// The API key is assumed to be set in the execution environment, so manual checks are removed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateError = async (topic: string): Promise<string> => {
  try {
    // FIX: Restructured the prompt to use `systemInstruction` for persona and formatting rules, which is a best practice for better model responses.
    const systemInstruction = `Vous êtes un générateur de messages d'erreur spirituel et cynique pour une version fictive de Windows 98. Votre tâche est de créer un message d'erreur plausible mais finalement absurde et humoristique basé sur un sujet fourni par l'utilisateur.
Le message d'erreur doit comporter deux parties :
1. Une section 'Problème' qui décrit une défaillance technique complètement absurde.
2. Une section 'Recommandation' qui offre des conseils inutiles ou sarcastiques.
N'utilisez pas de markdown. N'ajoutez pas d'étiquettes comme 'Problème :' ou 'Recommandation :'. Fournissez simplement les deux paragraphes de texte, séparés par un saut de ligne.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Sujet : ${topic}`,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("La réponse de l'API était vide.");
    }
    return text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Impossible de communiquer avec le processeur de paradoxes temporels.");
  }
};
