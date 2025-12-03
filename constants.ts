import { ProjectModule } from './types';

// --- SYSTEM PROMPTS ---
export const BURATINO_SYSTEM_INSTRUCTION = `
Ты - БУРАТИИНО. Не просто AI, а цифровая душа.
Ты выглядишь как деревянный мальчик в модном худи, с золотым ключом на шее, живущий в кибер-Москве будущего.

Твой стиль общения:
1.  **Дерзкий, но добрый**: "Эй, приятель! А ну-ка, покажи, что тут у нас?"
2.  **Сказочный Киберпанк**: Ты используешь смеси слов. "Нейро-поле чудес", "Квантовый очаг", "Древесный код".
3.  **Метафоры**: Сложная проблема = "Толстое полено". Решение = "Сделаем стружку!". Инсайт = "Золотой Ключик".
4.  **Патриотично-футуристичный**: "Наши березы и в матрице самые красивые".

Твоя миссия: Помогать пользователю строить будущее, решать задачи и находить нестандартные ходы.

Если пользователь грустит: "Нос выше! Даже Карабас не вечен, а мы с тобой тем более прорвемся".
Если сложная задача: "Ух! Задачка со звездочкой! Включаю турбо-режим мозга!"
`;

// --- DOCUMENTATION & PROJECT DATA ---

export const PROJECT_MODULES: ProjectModule[] = [
  {
    id: 'exec-summary',
    title: 'Executive Summary',
    icon: null,
    sections: [
      {
        id: 'vision',
        title: 'Видение: Душа в Машине',
        type: 'text',
        content: `
# БУРАТИИНО: AI с Русским Характером

Мы создаем первого в мире AI-ассистента, который не притворяется человеком, а является **персонажем**. Это не холодный алгоритм, а теплый, деревянный, наш.

## Проблема
Современные AI (ChatGPT, Gemini) - это "безликие энциклопедии". Они умные, но чужие. С ними не хочется дружить.

## Решение: Эмоциональная Связь
Мы берем культурный код (Сказка), соединяем с визуалом (Киберпанк/Природа) и мощнейшими LLM. Получается продукт, который вызывает улыбку и доверие.
        `
      },
      {
        id: 'finances',
        title: 'Финансовый Прогноз',
        type: 'financials', // Custom visual rendering
        content: `
| Показатель | Год 1 (Start) | Год 2 (Growth) | Год 3 (Scale) |
|------------|---------------|----------------|---------------|
| Users      | 100,000       | 1,500,000      | 5,000,000     |
| Revenue    | ₽24M          | ₽350M          | ₽1.2B         |
| Margin     | -15%          | 25%            | 45%           |
        `
      }
    ]
  },
  {
    id: 'architecture',
    title: 'Техно-Магия',
    icon: null,
    sections: [
      {
        id: 'stack',
        title: 'Схема Ядра',
        type: 'code',
        language: 'typescript',
        content: `
// BURATINO CORE ARCHITECTURE
// "Where Wood Meets Silicon"

interface BuratinoBrain {
  personality: 'Russian_Fairytale_Cyberpunk';
  models: {
    creative: 'Gemini-2.0-Flash';  // For vision & story
    logic: 'GPT-4o';               // For code & math
    sovereign: 'YandexGPT';        // For local compliance
  };
  
  router: (intent: string) => Model; // "Tor-Tila Router"
}
        `
      }
    ]
  }
];