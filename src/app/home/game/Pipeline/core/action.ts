import PipelineGame from './game'

export default class ActionManager {
  private game: PipelineGame

  constructor(game: PipelineGame) {
    this.game = game
    this._bindEvents()
  }

  private _bindEvents() {
    this.game.canvas.addEventListener('click', this._handleClick)
  }

  private _handleClick = (e: MouseEvent) => {
    const rect = this.game.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    for (let i = this.game.entities.length - 1; i >= 0; i--) {
      const entity = this.game.entities[i]
      if (entity.containsPoint && entity.containsPoint(x, y)) {
        entity.onClick?.(x, y)
        break
      }
    }
  }
}
