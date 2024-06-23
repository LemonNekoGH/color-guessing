import { describe, expect, it } from 'vitest'
import { Game } from './game'

describe('game', () => {
  it('should give correct hint', () => {
    const game = new Game()
    expect(game.checkAnswer('红 红 蓝 蓝', ['红', '蓝', '白', '绿'])).toEqual([1, 1])
    expect(game.checkAnswer('蓝 蓝 绿 绿', ['红', '蓝', '白', '绿'])).toEqual([2, 0])
    expect(game.checkAnswer('粉 粉 黄 黄', ['红', '蓝', '白', '绿'])).toEqual([0, 0])
    expect(game.checkAnswer('白 白 黄 黄', ['红', '蓝', '白', '绿'])).toEqual([0, 1])
    expect(game.checkAnswer('红 蓝 绿 白', ['红', '蓝', '白', '绿'])).toEqual([2, 2])
    expect(game.checkAnswer('红 蓝 白 绿', ['红', '蓝', '白', '绿'])).toEqual([4, 0])
  })

  it('should throw error if input is invalid', () => {
    const game = new Game()
    expect(() => game.checkAnswer('红 蓝 白', ['红', '蓝', '白', '绿'])).toThrowError('你一共需要输入 4 个颜色，并使用空格分开。')
    expect(() => game.checkAnswer('红 蓝 白 绿 粉', ['红', '蓝', '白', '绿'])).toThrowError('你一共需要输入 4 个颜色，并使用空格分开。')
    expect(() => game.checkAnswer('红 蓝 灰 绿', ['红', '蓝', '白', '绿'])).toThrowError('你输入的颜色“灰”并不在游戏规则中。')
  })
})
