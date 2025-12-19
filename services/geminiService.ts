
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const generateChristmasPortrait = async (base64Image: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // Extract base64 data (removing the prefix)
  const base64Data = base64Image.split(',')[1];
  const mimeType = base64Image.split(';')[0].split(':')[1];

  const prompt = `
    高度优化图像编辑指令（CCD 氛围强化 & 纯净边框版）：
    1. 核心保留：极其精确地保留图中【所有人】的面部相貌特征、表情和眼神。务必完整保留图中人物的【原始动作、手势和肢体姿态】（如敬礼、提灯等）。
    2. 圣诞主题：为每个人戴上精美的圣诞帽或驯鹿角发卡（需贴合头部姿态）。在背景中加入梦幻的圣诞树、温暖的节日灯火和大光斑（Bokeh）。
    3. CCD 滤镜深度强化：
       - 色差 (Chromatic Aberration)：在人物边缘和高对比度区域添加轻微的红绿/蓝黄色彩偏移边缘。
       - 漏光 (Light Leaks)：在画面边缘随机加入温暖的橙红色或淡紫色漏光效果。
       - 高光溢出 (Bloom/Glow)：让背景的圣诞灯火产生柔和的光晕溢出感。
       - 数字噪点 (Digital Grain)：添加明显的低感光度数字颗粒感，呈现 2000 年代初期的 Lo-fi 质感。
       - 色彩特征：整体色调偏暖，高饱和度，反差略高。
    4. 道具联动：保持原有动作的同时，让手中的道具（如提灯、礼盒）与画面光影完美融合。
    5. 边框：将图像嵌入一个纯净的、没有任何文字的白色宝丽来宽幅相框中。请确保相框底部留白区域完全干净，不要添加任何手写体或打印文字。
    6. 最终效果：生成的照片应像是一张被珍藏多年的、用早期经典 CCD 数码相机拍摄的、构图纯净且充满怀旧感的圣诞写真。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          },
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("未能生成图像，请重试。");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
