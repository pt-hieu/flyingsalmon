const textFieldSelector =
  'textarea, select, [contenteditable="true"], input:not([type="checkbox"], [type="radio"], [type="button"], [type="submit"], [type="reset"], [type="range"], [type="color"], [type="file"])'

function isInTextField(target: EventTarget | null) {
  return target instanceof Element && target.closest(textFieldSelector) !== null
}

export function isApplePlatform() {
  return /Mac|iPhone|iPad/.test(navigator.userAgent)
}

export function isSearchShortcut(event: KeyboardEvent, applePlatform: boolean) {
  const commandKeyPressed = applePlatform ? event.metaKey : event.ctrlKey
  if (event.key.toLowerCase() === 'k' && commandKeyPressed) return true

  return event.key === '/' && !isInTextField(event.target)
}
