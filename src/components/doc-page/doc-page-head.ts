export function docPageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} · flyingsalmon` },
      { name: 'description', content: description },
    ],
  }
}
