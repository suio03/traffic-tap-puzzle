// types/game.ts
export interface Feature {
    title: string;
    description: string;
  }
  
  export interface FAQ {
    question: string;
    answer: string;
  }
  
  export interface GameData {
    id?: number;
    title: string;
    slug: string;
    category_id: number;
    thumbnail_url: string;
    embed_url: string;
    meta_title: string;
    meta_description: string;
    short_description: string;
    long_description: string;
    how_to_play: string;
    features: {
      core_features: Feature[];
      game_modes: Feature[];
      technical_features: Feature[];
      social_features: Feature[];
    };
    faqs: FAQ[];
    created_at?: string;
    updated_at?: string;
  }
  
  // lib/validations/game.ts
  import * as z from "zod"
  
  export const featureSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  })
  
  export const faqSchema = z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
  })
  
  export const gameSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
    category_id: z.number().min(1, "Category is required"),
    thumbnail_url: z.string().url("Invalid URL").optional().or(z.literal("")),
    embed_url: z.string().url("Invalid URL").optional().or(z.literal("")),
    // metadata is a json object
    metadata: z.object({
        meta_title: z.string().max(60, "Meta title should be under 60 characters"),
        meta_description: z.string().max(160, "Meta description should be under 160 characters"),
    }),
    content: z.string().min(1, "Content is required"),
  })
  
  export type GameFormData = z.infer<typeof gameSchema>