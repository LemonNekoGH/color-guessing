import * as readline from 'node:readline/promises'
import { Game } from './game'

console.log(`
欢迎游玩猜颜色游戏，本游戏规则与 Switch 中 51 游戏大全中的猜颜色游戏一致。
1. 一共存在 6 种颜色的图钉：红、蓝、绿、粉、黄、白。你需要猜出 4 个颜色图钉的排列顺序。
2. 每次猜测后，会给出提示：
   - 全对：位置与颜色都对
   - 半对：颜色对但位置不对
   例子：
   - 一个全对，一个半对：你猜的颜色中有一个位置和颜色都对，有一个颜色对但位置不对，其它的颜色和位置都不对。
   - 两个全对，零个半对：你猜的颜色中有两个位置和颜色都对，其它的颜色和位置都不对。
   - 四个全对：你猜对了所有的颜色和位置。
4. 请按顺序输入 4 个颜色并使用空格分开，例如：红 蓝 绿 粉
5. 不会存在重复颜色。
6. 你有 10 次机会进行猜测。
7. 在不想继续游戏时，按下 Ctrl + C 即可退出游戏，游戏会将答案显示出来。
`)

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
await rl.question('准备好开始了吗？请按回车键开始游戏。')

const game = new Game(rl)
process.on('SIGINT', () => {
    if (game.gameOver) {
        process.exit(0)
    }
    console.log(`\n你退出了游戏，正确答案是：${game.correctAnswerString}`)
    process.exit(0)
})

while (true) {
    await game.start()
    if (game.win) {
        console.log(`恭喜你猜对了！`)
    } else {
        console.log(`很抱歉游戏结束，正确答案是：${game.correctAnswerString}`)
    }

    const answer = await rl.question('要重新开始吗？（是/否）')
    if (answer !== '是') {
        process.exit(0)
    }
}


