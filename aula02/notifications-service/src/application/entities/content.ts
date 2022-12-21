export class Content {
  private readonly content: string

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLegnth(content)

    if (!isContentLengthValid) throw new Error('Content length error.')

    this.content = content
  }

  private validateContentLegnth(content: string): boolean {
    return content.length >= 5 && content.length <= 240
  }

  get value(): string {
    return this.content
  }
}
