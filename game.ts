import * as readline from 'node:readline/promises'

export class Game {
    private readonly allColors = ['红', '蓝', '绿', '粉', '黄', '白']
    private correctAnswer: string[] = []
    private _gameOver = false
    private _win = false
    private round = 0
    private rl?: readline.Interface

    constructor(rl?: readline.Interface) {
        this.rl = rl
    }

    get gameOver() {
        return this._gameOver
    }

    get win() {
        return this._win
    }

    get correctAnswerString() {
        return this.correctAnswer.join(' ')
    }

    reset() {
        this.correctAnswer = this.allColors.sort(() => Math.random() - 0.5).slice(0, 4) // 随机生成 4 个颜色，比循环随机生成更简洁，也不需要处理重复颜色
        this._gameOver = false
        this.round = 0
    }

    checkAnswer(inputAnswer: string, correctAnswer: string[]): [number, number] {
        let positionAndColorMatched: Set<string> = new Set()
        let colorMatched: Set<string> = new Set()

        const input = inputAnswer.split(' ').filter(it => it.trim() !== '')
        if (input.length !== 4) {
            throw new Error('你一共需要输入 4 个颜色，并使用空格分开。')
        }

        input.forEach(color => {
            if (!this.allColors.includes(color)) {
                throw new Error(`你输入的颜色“${color}”并不在游戏规则中。`)
            }
        })

        for (const i in input) {
            for (const c in correctAnswer) {
                let isColorMatched = input[i] === correctAnswer[c]
                if (isColorMatched && !colorMatched.has(input[i]) && !positionAndColorMatched.has(input[i])) {
                    colorMatched.add(input[i])
                }
                if (isColorMatched && i === c && !positionAndColorMatched.has(input[i])) {
                    colorMatched.delete(input[i])
                    positionAndColorMatched.add(input[i])
                }
            }
        }

        return [positionAndColorMatched.size, colorMatched.size]
    }

    async start() {
        this.reset()
        while (this.round < 10) {
            const answer = await this.rl!.question(`第 ${this.round + 1} 回合，请输入 4 个颜色：`)
            try {
                const result = this.checkAnswer(answer, this.correctAnswer)
                console.log(`${result[0]} 个全对，${result[1]} 个半对。`)

                if (result[0] === 4) {
                    this._win = true
                    break
                }
            } catch (e) {
                console.error((e as Error).message)
                continue
            }
            this.round++
        }

        this._gameOver = true
    }
}
