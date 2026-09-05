export enum DialogSize {
  Default = 'default',
  Large = 'lg',
}

export interface DialogContextValue {
  size: DialogSize
  dismissible: boolean
  pending: boolean
  exhibitionMode: boolean
}
