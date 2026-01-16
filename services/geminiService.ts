
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIRecommendations = async (currentProduct: Product, allProducts: Product[]): Promise<Product[]> => {
  try {
    const productList = allProducts.map(p => ({ id: p.id, name: p.name, category: p.category, description: p.description }));
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on the product "${currentProduct.name}" (${currentProduct.category}), which of these products would a customer also like? Pick 3-4 IDs.
      Available products: ${JSON.stringify(productList)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '{"recommendedIds": []}');
    const ids: string[] = data.recommendedIds;
    return allProducts.filter(p => ids.includes(p.id) && p.id !== currentProduct.id);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return allProducts.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4);
  }
};
