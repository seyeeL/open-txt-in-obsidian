import { Plugin, TextFileView, WorkspaceLeaf } from 'obsidian'

const VIEW_TYPE_TXT = 'txt-view'

class TxtView extends TextFileView {
  textArea: HTMLTextAreaElement

  getViewData() {
    return this.data
  }

  setViewData(data: string, clear: boolean) {
    this.data = data
    if (this.textArea) {
      this.textArea.value = data
    }
  }

  clear() {
    this.data = ''
    if (this.textArea) {
      this.textArea.value = ''
    }
  }

  getViewType() {
    return VIEW_TYPE_TXT
  }

  async onOpen() {
    this.contentEl.empty()
    this.textArea = this.contentEl.createEl('textarea', {
      attr: {
        class: 'txt-view-textarea'
      }
    })
    this.textArea.value = this.data
    this.textArea.addEventListener('input', () => {
      this.data = this.textArea.value
      this.requestSave()
    })

    // 添加自定义样式
    this.addStyle()
  }

  async onClose() {
    this.contentEl.empty()
  }

  private addStyle() {
    const style = document.createElement('style')
    style.textContent = `
      .txt-view-textarea {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
        background-color: var(--background-primary);
        color: var(--text-normal);
        font-family: var(--font-monospace);
        padding: 16px;
        box-sizing: border-box;
      }
      .txt-view-textarea:focus {
        box-shadow: none;
      }
    `
    document.head.append(style)
  }
}

export default class TxtAsMdPlugin extends Plugin {
  async onload() {
    super.onload()

    this.registerView(VIEW_TYPE_TXT, (leaf: WorkspaceLeaf) => new TxtView(leaf))

    this.registerExtensions(['txt'], VIEW_TYPE_TXT)
  }
}
