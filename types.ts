
export interface GenerationState {
  isGenerating: boolean;
  progress: number;
  error: string | null;
  resultUrl: string | null;
}

export interface AppState {
  originalImage: string | null;
  generation: GenerationState;
}
