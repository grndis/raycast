const models = [
  {
    id: "raycast-ray1",
    name: "Ray-1",
    description: "GPT-4o-based model optimized for Raycast AI Extensions.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands"],
    suggestions: [],
    capabilities: {
      web_search: "full",
      image_generation: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
      },
      image_generation: {
        model: "dall-e-3",
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: false,
      },
      tools: {
        supported: true,
        limit: 128,
      },
    },
    in_better_ai_subscription: false,
    model: "ray1",
    provider: "raycast",
    provider_name: "Raycast",
    provider_brand: "raycast",
    availability: "public",
    speed: 3,
    intelligence: 3,
    requires_better_ai: false,
    context: 127,
  },
  {
    id: "raycast-ray1-mini",
    name: "Ray-1 mini",
    description: "GPT-4o mini-based model for Raycast AI Extensions.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands"],
    suggestions: [],
    capabilities: {
      web_search: "full",
      image_generation: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
      },
      image_generation: {
        model: "dall-e-3",
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: false,
      },
      tools: {
        supported: true,
        limit: 128,
      },
    },
    in_better_ai_subscription: false,
    model: "ray1-mini",
    provider: "raycast",
    provider_name: "Raycast",
    provider_brand: "raycast",
    availability: "public",
    speed: 2,
    intelligence: 2,
    requires_better_ai: false,
    context: 127,
  },
  {
    id: "openai-gpt-4.1",
    name: "GPT-4.1",
    description:
      "OpenAI's flagship model optimized for complex problem solving.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: ["chat"],
    capabilities: {
      web_search: "full",
      image_generation: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
      },
      image_generation: {
        model: "dall-e-3",
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "gpt-4.1",
    provider: "openai",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 2,
    intelligence: 3,
    requires_better_ai: true,
    context: 1000,
  },
  {
    id: "openai-gpt-4.1-mini",
    name: "GPT-4.1 mini",
    description:
      "Balanced GPT-4.1 variant optimized for speed and cost efficiency.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: ["chat"],
    capabilities: {
      web_search: "full",
      image_generation: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
      },
      image_generation: {
        model: "dall-e-3",
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "gpt-4.1-mini",
    provider: "openai",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 3,
    intelligence: 3,
    requires_better_ai: false,
    context: 1000,
  },
  {
    id: "openai-gpt-4.1-nano",
    name: "GPT-4.1 nano",
    description: "Fastest and most cost-effective GPT-4.1 variant.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: ["chat"],
    capabilities: {
      web_search: "full",
      image_generation: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
      },
      image_generation: {
        model: "dall-e-3",
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "gpt-4.1-nano",
    provider: "openai",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 4,
    intelligence: 3,
    requires_better_ai: false,
    context: 1000,
  },
  {
    id: "openai-gpt-4",
    name: "GPT-4",
    description:
      "Previous generation GPT-4 model with broad knowledge and complex instruction handling.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {
      web_search: "full",
      image_generation: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
      },
      image_generation: {
        model: "dall-e-3",
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "gpt-4",
    provider: "openai",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 1,
    intelligence: 1,
    requires_better_ai: true,
    context: 8,
  },
  {
    id: "openai-gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "Previous generation GPT-4 with expanded context window.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {
      web_search: "full",
      image_generation: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
      },
      image_generation: {
        model: "dall-e-3",
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "gpt-4-turbo",
    provider: "openai",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 1,
    intelligence: 1,
    requires_better_ai: true,
    context: 127,
  },
  {
    id: "openai-gpt-4o",
    name: "GPT-4o",
    description:
      "Advanced OpenAI model optimized for speed and complex problem solving.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: ["chat"],
    capabilities: {
      web_search: "full",
      image_generation: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
      },
      image_generation: {
        model: "dall-e-3",
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "gpt-4o",
    provider: "openai",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 3,
    intelligence: 3,
    requires_better_ai: true,
    context: 127,
  },
  {
    id: "openai-gpt-4o-mini",
    name: "GPT-4o mini",
    description: "Fast and intelligent model for everyday tasks.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: ["chat", "quick_ai", "commands"],
    capabilities: {
      web_search: "full",
      image_generation: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
      },
      image_generation: {
        model: "dall-e-3",
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "gpt-4o-mini",
    provider: "openai",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 2,
    intelligence: 2,
    requires_better_ai: false,
    context: 127,
  },
  {
    id: "openai_o1-o3",
    name: "o3",
    description:
      "Advanced model excelling in math, science, coding, and visual tasks.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: false,
      },
      streaming: {
        supported: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      reasoning_effort: {
        supported: true,
        options: ["low", "medium", "high"],
        default: "low",
      },
      tools: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "o3",
    provider: "openai_o1",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 2,
    intelligence: 4,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "openai_o1-o4-mini",
    name: "o4-mini",
    description:
      "Fast, efficient model optimized for coding and visual tasks.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: false,
      },
      streaming: {
        supported: true,
      },
      reasoning_effort: {
        supported: true,
        options: ["low", "medium", "high"],
        default: "low",
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      tools: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "o4-mini",
    provider: "openai_o1",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 3,
    intelligence: 4,
    requires_better_ai: false,
    context: 200,
  },
  {
    id: "openai_o1-o1-mini",
    name: "o1-mini",
    description: "Fast reasoning model optimized for coding tasks.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      system_message: {
        supported: false,
      },
      temperature: {
        supported: false,
      },
      streaming: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "o1-mini",
    provider: "openai_o1",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "deprecated",
    speed: 3,
    intelligence: 3,
    requires_better_ai: true,
    context: 128,
  },
  {
    id: "openai_o1-o1",
    name: "o1",
    description: "Advanced reasoning model for complex STEM problems.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: false,
      },
      streaming: {
        supported: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      reasoning_effort: {
        supported: true,
        options: ["low", "medium", "high"],
        default: "low",
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "o1-2024-12-17",
    provider: "openai_o1",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 2,
    intelligence: 4,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "openai_o1-o3-mini",
    name: "o3-mini",
    description: "Fast reasoning model optimized for STEM tasks.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: false,
      },
      streaming: {
        supported: true,
      },
      reasoning_effort: {
        supported: true,
        options: ["low", "medium", "high"],
        default: "low",
      },
      tools: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "o3-mini",
    provider: "openai_o1",
    provider_name: "OpenAI",
    provider_brand: "openai",
    availability: "public",
    speed: 3,
    intelligence: 4,
    requires_better_ai: false,
    context: 200,
  },
  {
    id: "anthropic-claude-haiku",
    name: "Claude 3.5 Haiku",
    description:
      "Anthropic's fastest model with large context window for code and text analysis.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api"],
    suggestions: ["quick_ai"],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "claude-3-5-haiku-latest",
    provider: "anthropic",
    provider_name: "Anthropic",
    provider_brand: "anthropic",
    availability: "public",
    speed: 1,
    intelligence: 2,
    requires_better_ai: false,
    context: 200,
  },
  {
    id: "anthropic-claude-sonnet",
    name: "Claude 3.5 Sonnet",
    description:
      "Enhanced Claude model for complex tasks and visual reasoning.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api"],
    suggestions: ["commands", "chat"],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "claude-3-5-sonnet-latest",
    provider: "anthropic",
    provider_name: "Anthropic",
    provider_brand: "anthropic",
    availability: "public",
    speed: 2,
    intelligence: 3,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "anthropic-claude-3-7-sonnet-latest",
    name: "Claude 3.7 Sonnet",
    description: "Anthropic's most intelligent model.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api"],
    suggestions: ["commands", "chat"],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "claude-3-7-sonnet-latest",
    provider: "anthropic",
    provider_name: "Anthropic",
    provider_brand: "anthropic",
    availability: "public",
    speed: 2,
    intelligence: 3,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "anthropic-claude-3-7-sonnet-latest-reasoning",
    name: "Claude 3.7 Sonnet (Reasoning)",
    description:
      "Most intelligent Claude model with enhanced reasoning capabilities.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api"],
    suggestions: ["commands", "chat"],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: false,
      },
      reasoning_effort: {
        supported: true,
        options: ["low", "medium", "high"],
        default: "low",
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "claude-3-7-sonnet-latest-reasoning",
    provider: "anthropic",
    provider_name: "Anthropic",
    provider_brand: "anthropic",
    availability: "public",
    speed: 2,
    intelligence: 3,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "anthropic-claude-opus",
    name: "Claude 3 Opus",
    description:
      "Anthropic's model for complex tasks with exceptional fluency.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api"],
    suggestions: [],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "claude-3-opus-20240229",
    provider: "anthropic",
    provider_name: "Anthropic",
    provider_brand: "anthropic",
    availability: "deprecated",
    speed: 1,
    intelligence: 2,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "anthropic-claude-sonnet-4",
    name: "Claude 4 Sonnet",
    description: "Anthropic's most intelligent model.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api"],
    suggestions: ["commands", "chat"],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "claude-sonnet-4-20250514",
    provider: "anthropic",
    provider_name: "Anthropic",
    provider_brand: "anthropic",
    availability: "public",
    speed: 2,
    intelligence: 3,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "anthropic-claude-opus-4",
    name: "Claude 4 Opus",
    description:
      "Anthropic's model for complex tasks with exceptional fluency.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api"],
    suggestions: [],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "claude-opus-4-20250514",
    provider: "anthropic",
    provider_name: "Anthropic",
    provider_brand: "anthropic",
    availability: "public",
    speed: 1,
    intelligence: 3,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "anthropic-claude-sonnet-4-reasoning",
    name: "Claude 4 Sonnet (Reasoning)",
    description:
      "Most intelligent Claude model with enhanced reasoning capabilities.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api"],
    suggestions: ["commands", "chat"],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: false,
      },
      reasoning_effort: {
        supported: true,
        options: ["low", "medium", "high"],
        default: "low",
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "claude-sonnet-4-20250514-reasoning",
    provider: "anthropic",
    provider_name: "Anthropic",
    provider_brand: "anthropic",
    availability: "public",
    speed: 2,
    intelligence: 4,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "anthropic-claude-opus-4-reasoning",
    name: "Claude 4 Opus (Reasoning)",
    description:
      "Most intelligent Claude model with enhanced reasoning capabilities.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api"],
    suggestions: [],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      reasoning_effort: {
        supported: true,
        options: ["low", "medium", "high"],
        default: "low",
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "claude-opus-4-20250514-reasoning",
    provider: "anthropic",
    provider_name: "Anthropic",
    provider_brand: "anthropic",
    availability: "public",
    speed: 2,
    intelligence: 4,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "perplexity-sonar",
    name: "Sonar",
    description: "Fast Perplexity model with integrated search capabilities.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: ["quick_ai"],
    capabilities: {
      web_search: "always_on",
    },
    abilities: {
      web_search: {
        toggleable: false,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp"],
      },
    },
    in_better_ai_subscription: false,
    model: "sonar",
    provider: "perplexity",
    provider_name: "Perplexity",
    provider_brand: "perplexity",
    availability: "public",
    speed: 2,
    intelligence: 3,
    requires_better_ai: false,
    context: 127,
  },
  {
    id: "perplexity-sonar-pro",
    name: "Sonar Pro",
    description:
      "Advanced Perplexity model for complex queries with search integration.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: ["quick_ai"],
    capabilities: {
      web_search: "always_on",
    },
    abilities: {
      web_search: {
        toggleable: false,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp"],
      },
    },
    in_better_ai_subscription: true,
    model: "sonar-pro",
    provider: "perplexity",
    provider_name: "Perplexity",
    provider_brand: "perplexity",
    availability: "public",
    speed: 2,
    intelligence: 3,
    requires_better_ai: true,
    context: 200,
  },
  {
    id: "perplexity-sonar-reasoning",
    name: "Sonar Reasoning",
    description: "Fast reasoning model powered by DeepSeek R1.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: ["quick_ai"],
    capabilities: {
      web_search: "always_on",
    },
    abilities: {
      web_search: {
        toggleable: false,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp"],
      },
    },
    in_better_ai_subscription: false,
    model: "sonar-reasoning",
    provider: "perplexity",
    provider_name: "Perplexity",
    provider_brand: "perplexity",
    availability: "public",
    speed: 2,
    intelligence: 3,
    requires_better_ai: false,
    context: 127,
  },
  {
    id: "perplexity-sonar-reasoning-pro",
    name: "Sonar Reasoning Pro",
    description: "Premium reasoning model with DeepSeek R1 capabilities.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: ["quick_ai"],
    capabilities: {
      web_search: "always_on",
    },
    abilities: {
      web_search: {
        toggleable: false,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp"],
      },
    },
    in_better_ai_subscription: false,
    model: "sonar-reasoning-pro",
    provider: "perplexity",
    provider_name: "Perplexity",
    provider_brand: "perplexity",
    availability: "public",
    speed: 1,
    intelligence: 3,
    requires_better_ai: false,
    context: 127,
  },
  {
    id: "groq-meta-llama/llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout",
    description: "Advanced 17B parameter multimodal model with 16 experts.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    provider: "groq",
    provider_name: "Groq",
    provider_brand: "meta",
    availability: "public",
    speed: 4,
    intelligence: 2,
    requires_better_ai: false,
    context: 131,
  },
  {
    id: "groq-llama-3.3-70b-versatile",
    name: "Llama 3.3 70B",
    description:
      "Meta's state-of-the-art model for reasoning and general knowledge.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "llama-3.3-70b-versatile",
    provider: "groq",
    provider_name: "Groq",
    provider_brand: "meta",
    availability: "public",
    speed: 4,
    intelligence: 3,
    requires_better_ai: false,
    context: 128,
  },
  {
    id: "groq-llama-3.1-8b-instant",
    name: "Llama 3.1 8B",
    description: "Fast, instruction-optimized open-source model.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "llama-3.1-8b-instant",
    provider: "groq",
    provider_name: "Groq",
    provider_brand: "meta",
    availability: "public",
    speed: 5,
    intelligence: 2,
    requires_better_ai: false,
    context: 128,
  },
  {
    id: "groq-llama3-70b-8192",
    name: "Llama 3 70B",
    description: "Capable open-source LLM for text-related tasks.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: ["commands"],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "llama3-70b-8192",
    provider: "groq",
    provider_name: "Groq",
    provider_brand: "meta",
    availability: "deprecated",
    speed: 4,
    intelligence: 2,
    requires_better_ai: false,
    context: 8,
  },
  {
    id: "together-meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
    name: "Llama 3.1 405B",
    description:
      "Meta's flagship model with advanced capabilities across multiple domains.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
    provider: "together",
    provider_name: "Together AI",
    provider_brand: "meta",
    availability: "public",
    speed: 1,
    intelligence: 3,
    requires_better_ai: true,
    context: 8,
  },
  {
    id: "mistral-open-mistral-nemo",
    name: "Mistral Nemo",
    description: "Small, Apache-licensed model built with NVIDIA.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "open-mistral-nemo",
    provider: "mistral",
    provider_name: "Mistral",
    provider_brand: "mistral",
    availability: "public",
    speed: 3,
    intelligence: 2,
    requires_better_ai: false,
    context: 128,
  },
  {
    id: "mistral-mistral-large-latest",
    name: "Mistral Large",
    description: "Top-tier reasoning model with strong multilingual support.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "mistral-large-latest",
    provider: "mistral",
    provider_name: "Mistral",
    provider_brand: "mistral",
    availability: "public",
    speed: 1,
    intelligence: 2,
    requires_better_ai: true,
    context: 128,
  },
  {
    id: "mistral-mistral-medium-latest",
    name: "Mistral Medium",
    description:
      "A powerful, cost-effective, frontier-class multimodal model.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "mistral-medium-latest",
    provider: "mistral",
    provider_name: "Mistral",
    provider_brand: "mistral",
    availability: "public",
    speed: 2,
    intelligence: 3,
    requires_better_ai: true,
    context: 128,
  },
  {
    id: "mistral-mistral-small-latest",
    name: "Mistral Small 3",
    description:
      "Latest enterprise-grade small model with improved reasoning.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "mistral-small-latest",
    provider: "mistral",
    provider_name: "Mistral",
    provider_brand: "mistral",
    availability: "public",
    speed: 2,
    intelligence: 2,
    requires_better_ai: false,
    context: 32,
  },
  {
    id: "mistral-codestral-latest",
    name: "Codestral",
    description: "Specialized model for code-related tasks and testing.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "codestral-latest",
    provider: "mistral",
    provider_name: "Mistral",
    provider_brand: "mistral",
    availability: "public",
    speed: 3,
    intelligence: 2,
    requires_better_ai: false,
    context: 256,
  },
  {
    id: "groq-deepseek-r1-distill-llama-70b",
    name: "DeepSeek R1 Distill Llama 3.3 70B",
    description:
      "Fine-tuned Llama model with enhanced reasoning capabilities.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "deepseek-r1-distill-llama-70b",
    provider: "groq",
    provider_name: "Groq",
    provider_brand: "deepseek",
    availability: "public",
    speed: 3,
    intelligence: 3,
    requires_better_ai: false,
    context: 128,
  },
  {
    id: "google-gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description: "Advanced thinking model for complex problem solving.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp"],
      },
      tools: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "gemini-2.5-pro",
    provider: "google",
    provider_name: "Google",
    provider_brand: "google",
    availability: "public",
    speed: 3,
    intelligence: 4,
    requires_better_ai: true,
    context: 1000,
  },
  {
    id: "google-gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description: "Fast, well-rounded thinking model.\n",
    status: null,
    features: [
      "chat",
      "quick_ai",
      "commands",
      "api",
      "emoji_search",
      "summary",
    ],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp"],
      },
      tools: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
      reasoning_effort: {
        supported: true,
        options: ["auto", "low", "medium", "high"],
        default: "auto",
      },
    },
    in_better_ai_subscription: false,
    model: "gemini-2.5-flash",
    provider: "google",
    provider_name: "Google",
    provider_brand: "google",
    availability: "public",
    speed: 3,
    intelligence: 3,
    requires_better_ai: false,
    context: 1000,
  },
  {
    id: "google-gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    description: "Low-latency model optimized for agentic experiences.\n",
    status: null,
    features: [
      "chat",
      "quick_ai",
      "commands",
      "api",
      "emoji_search",
      "summary",
    ],
    suggestions: [],
    capabilities: {},
    abilities: {
      web_search: {
        toggleable: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp"],
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "gemini-2.0-flash",
    provider: "google",
    provider_name: "Google",
    provider_brand: "google",
    availability: "public",
    speed: 3,
    intelligence: 3,
    requires_better_ai: false,
    context: 1000,
  },
  {
    id: "together-moonshotai/Kimi-K2-Instruct",
    name: "Kimi K2 Instruct",
    description:
      "Kimi K2 is a powerful and versatile AI model designed for a wide range of tasks.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "moonshotai/Kimi-K2-Instruct",
    provider: "together",
    provider_name: "Together AI",
    provider_brand: "moonshotai",
    availability: "public",
    speed: 1,
    intelligence: 3,
    requires_better_ai: false,
    context: 128,
  },
  {
    id: "together-deepseek-ai/DeepSeek-R1",
    name: "DeepSeek-R1",
    description: "Open-source model matching OpenAI-o1 performance.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "deepseek-ai/DeepSeek-R1",
    provider: "together",
    provider_name: "Together AI",
    provider_brand: "deepseek",
    availability: "public",
    speed: 1,
    intelligence: 4,
    requires_better_ai: true,
    context: 64,
  },
  {
    id: "together-deepseek-ai/DeepSeek-V3",
    name: "DeepSeek-V3",
    description: "Advanced Mixture-of-Experts model.\n",
    status: null,
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {},
    abilities: {
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "deepseek-ai/DeepSeek-V3",
    provider: "together",
    provider_name: "Together AI",
    provider_brand: "deepseek",
    availability: "public",
    speed: 1,
    intelligence: 3,
    requires_better_ai: false,
    context: 128,
  },
  {
    id: "xai-grok-4",
    name: "Grok-4",
    description:
      "Advanced language model with enhanced reasoning and tool capabilities.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "grok-4-0709",
    provider: "xai",
    provider_name: "xAI",
    provider_brand: "xai",
    availability: "public",
    speed: 2,
    intelligence: 5,
    requires_better_ai: true,
    context: 256,
  },
  {
    id: "xai-grok-3",
    name: "Grok-3 Beta",
    description:
      "Enterprise-focused model for data, coding, and summarization tasks.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "grok-3-fast-beta",
    provider: "xai",
    provider_name: "xAI",
    provider_brand: "xai",
    availability: "public",
    speed: 1,
    intelligence: 3,
    requires_better_ai: true,
    context: 127,
  },
  {
    id: "xai-grok-3-mini",
    name: "Grok-3 Mini Beta",
    description: "Fast, lightweight model for logic-based tasks.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      reasoning_effort: {
        supported: true,
        options: ["low", "medium", "high"],
        default: "low",
      },
      tools: {
        supported: true,
      },
      thinking: {
        supported: true,
      },
    },
    in_better_ai_subscription: false,
    model: "grok-3-mini-fast-beta",
    provider: "xai",
    provider_name: "xAI",
    provider_brand: "xai",
    availability: "public",
    speed: 1,
    intelligence: 3,
    requires_better_ai: false,
    context: 127,
  },
  {
    id: "xai-grok-2-latest",
    name: "Grok-2",
    description:
      "Advanced language model with strong reasoning capabilities.\n",
    status: "beta",
    features: ["chat", "quick_ai", "commands", "api", "emoji_search"],
    suggestions: [],
    capabilities: {
      web_search: "full",
    },
    abilities: {
      web_search: {
        toggleable: true,
        native: true,
      },
      vision: {
        formats: ["image/png", "image/jpeg", "image/webp", "image/gif"],
      },
      system_message: {
        supported: true,
      },
      temperature: {
        supported: true,
      },
      tools: {
        supported: true,
      },
    },
    in_better_ai_subscription: true,
    model: "grok-2-latest",
    provider: "xai",
    provider_name: "xAI",
    provider_brand: "xai",
    availability: "public",
    speed: 1,
    intelligence: 3,
    requires_better_ai: true,
    context: 127,
  },
];

module.exports = { models };
