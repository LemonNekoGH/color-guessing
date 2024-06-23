import { ref } from 'vue'

export const availableColors = ['rgba(255,82,120,1)', 'rgba(23,214,255,1)', 'rgba(244,244,61,1)', 'rgba(71,253,109,1)', 'rgba(225,225,225,1)', 'rgba(236,124,251,1)'] as const
export type Color = typeof availableColors[number] | '#FFFFFF'

export function generateEmptyHistory<T>(defaultValue: T): T[][] {
  const ret: T[][] = []
  for (let i = 0; i < 8; i++) {
    const colors: T[] = []
    for (let j = 0; j < 4; j++) {
      colors.push(defaultValue)
    }
    ret.push(colors)
  }
  return ret
}

export function useGame() {
  const correctAnswer = ref<Color[]>([])
  const win = ref(false)
  const gameOver = ref(false)
  const history = ref<Color[][]>(generateEmptyHistory('#FFFFFF'))
  const hintHistory = ref<number[][]>(generateEmptyHistory(0))
  const round = ref(0)
  const selectingColor = ref(0)

  function reset() {
    correctAnswer.value = availableColors.toSorted(() => Math.random() - 0.5).slice(0, 4) // 随机生成 4 个颜色，比循环随机生成更简洁，也不需要处理重复颜色
    win.value = false
    gameOver.value = false
    round.value = 0
    history.value = generateEmptyHistory('#FFFFFF')
    hintHistory.value = generateEmptyHistory(0)
  }

  function checkAnswer(guess: Color[], answer: Color[]): [number, number] {
    if (guess.includes('#FFFFFF')) {
      throw new Error('Invalid input')
    }

    const positionAndColorMatched: Set<Color> = new Set()
    const colorMatched: Set<Color> = new Set()

    for (const i in guess) {
      for (const c in answer) {
        const isColorMatched = guess[i] === answer[c]
        if (isColorMatched && !colorMatched.has(guess[i]) && !positionAndColorMatched.has(guess[i])) {
          colorMatched.add(guess[i])
        }
        if (isColorMatched && i === c && !positionAndColorMatched.has(guess[i])) {
          colorMatched.delete(guess[i])
          positionAndColorMatched.add(guess[i])
        }
      }
    }

    return [positionAndColorMatched.size, colorMatched.size]
  }

  function convertHintHistory(hint: [number, number]): number[] {
    let hintPart1: number[] = []
    while (hintPart1.length < hint[0])
      hintPart1.push(2)

    const hintPart2: number[] = []
    while (hintPart2.length < hint[1])
      hintPart2.push(1)

    hintPart1 = hintPart1.concat(hintPart2)
    while (hintPart1.length < 4) {
      hintPart1.push(0)
    }

    return hintPart1
  }

  function onCheckAnswer() {
    const hint = checkAnswer(history.value[round.value], correctAnswer.value)
    hintHistory.value[round.value] = convertHintHistory(hint)
    selectingColor.value = 0

    if (hint[0] === 4) {
      win.value = true
      gameOver.value = true
      return
    }

    if (round.value === 7) {
      gameOver.value = true
      return
    }

    round.value++
  }

  function selectColor(color: Color) {
    if (gameOver.value || !history.value[round.value].includes('#FFFFFF'))
      return
    history.value[round.value][selectingColor.value] = color
    for (let i = 0; i < 5; i++) {
      if (history.value[round.value][i] === '#FFFFFF') {
        selectingColor.value = i
        break
      }
      selectingColor.value = 4
    }
  }

  function unselectColor(index: number) {
    if (gameOver.value)
      return
    history.value[round.value][index] = '#FFFFFF'
    selectingColor.value = index
  }

  return {
    checkAnswer,
    onCheckAnswer,
    reset,
    win,
    gameOver,
    history,
    correctAnswer,
    selectColor,
    unselectColor,
    hintHistory,
    round,
  }
}
