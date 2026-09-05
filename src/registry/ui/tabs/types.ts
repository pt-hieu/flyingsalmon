export enum TabsActivationMode {
  Automatic = 'automatic',
  Manual = 'manual',
}

export interface TabsSharedState {
  activeValue: string | undefined
  focusedValue: string | undefined
  setFocusedValue: React.Dispatch<React.SetStateAction<string | undefined>>
}
