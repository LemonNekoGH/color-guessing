<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { availableColors, useGame } from './gameplay/game'
import Dialog from './components/Dialog.vue'
import DialogTitle from './components/DialogTitle.vue'
import DialogCloseButton from './components/DialogCloseButton.vue'
import Button from './components/Button.vue'
import GameUnit from './components/GameUnit.vue'
import CorrectColorBlock from './components/CorrectColorBlock.vue'

const game = useGame()
const showHelp = ref(false)
const showReset = ref(false)
const showAnswer = ref(false)
const showWin = ref(false)
const showLost = ref(false)
const manuallyShowAnswer = ref(false)

watchEffect(() => {
  if (!game.gameOver.value) {
    return
  }

  setTimeout(() => {
    if (game.win.value) {
      showWin.value = true
    }
    else if (!manuallyShowAnswer.value) {
      showLost.value = true
    }
  }, 500)
})

onMounted(() => {
  game.reset()
})
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="flex justify-between w-257">
      <div class="text-2xl flex justify-center items-center">
        猜颜色
      </div>
      <div class="flex">
        <div @click="showHelp = true">
          <button class="mdi-set mdi-help w-16 h-16 text-2xl text-black border-none transition-all duration-250 bg-white hover:bg-black hover:text-white active:scale-90" />
        </div>
        <div id="reset-btn" @click="showReset = true">
          <button
            id="reset-btn-inner"
            class="mdi-set mdi-refresh w-16 h-16 text-2xl border-none transition-all duration-250"
            :class="{
              'bg-black text-white animate-scaling hover:animate-none': game.gameOver.value,
              'bg-white text-black hover:bg-black hover:text-white active:scale-90': !game.gameOver.value,
            }"
          />
        </div>
      </div>
    </div>
    <div class="flex gap-4 border-y-2 border-y-black border-y-solid py-4">
      <GameUnit
        v-for="(_, index) in Array(8).fill(0)"
        :key="index"
        :colors="game.history.value[index]"
        :hint="game.hintHistory.value[index]"
        :current="game.round.value === index && !game.gameOver.value"
        @unselect="game.unselectColor"
        @confirm="game.onCheckAnswer"
      />
      <div
        id="correct-answer"
        class="border-white border-2 border-solid p-4  gap-4 transition-colors duration-250"
      >
        <Button class="w-16 h-16 border-black border-2 border-solid border-box" @click="game.gameOver.value ? '' : showAnswer = true">
          <div class="mdi-set mdi-lightbulb-on w-full h-full text-2xl flex justify-center items-center" />
        </Button>
        <div
          id="selected-colors" class="flex flex-col gap-4 mt-4"
        >
          <CorrectColorBlock
            v-for="(color, index) in game.correctAnswer.value"
            :key="index"
            :color="color"
            :show="game.gameOver.value"
            class="w-16 h-16"
          />
        </div>
      </div>
    </div>
    <div id="available-colors" class="flex gap-4 p-4 mt-4">
      <Button v-for="color in availableColors" :key="color" class="w-16 h-16" :color="color" @click="game.selectColor(color)" />
    </div>
    <Dialog v-model="showHelp">
      <DialogTitle>
        <div class="flex-1 text-2xl h-16 flex items-center pl-4">
          帮助
        </div>
        <DialogCloseButton class="text-2xl w-16" @click="showHelp = false" />
      </DialogTitle>
      <div class="p-4">
        <pre class="m-none">
欢迎游玩猜颜色游戏，本游戏规则与 Switch 中 51 游戏大全中的猜颜色游戏一致。
1. 一共存在 6 种颜色的图块：红、蓝、绿、粉、黄、白。你需要猜出 4 个图块的排列顺序。
2. 每次猜测后，会给出提示：
- 全对：位置与颜色都对
- 半对：颜色对但位置不对
例子：
- 一个全对，一个半对：你猜的颜色中有一个位置和颜色都对，有一个颜色对但位置不对，其它的颜色和位置都不对。
- 两个全对，零个半对：你猜的颜色中有两个位置和颜色都对，其它的颜色和位置都不对。
- 四个全对：你猜对了所有的颜色和位置。
5. 不会存在重复颜色。
6. 你有 8 次机会进行猜测。
        </pre>
      </div>
    </Dialog>
    <Dialog v-model="showReset">
      <div class="p-4 border-b-2 border-b-black border-b-solid">
        你确定要重新开始吗？
      </div>
      <div id="dialog-actions" class="flex">
        <button class="flex-1" @click="showReset = false">
          <div class="active:border-white border-white border-solid hover:border-black border-2 border-solid hover:bg-black hover:color-white box-border py-2 transition-all">
            取消
          </div>
        </button>
        <div class="bg-black w-0.5" />
        <button class="flex-1" @click="showReset = false; game.reset(); manuallyShowAnswer = false">
          <div class="active:border-white border-white border-solid hover:border-#f00 border-2 border-solid hover:bg-#f00 hover:color-white box-border py-2 transition-all">
            确定
          </div>
        </button>
      </div>
    </Dialog>
    <Dialog v-model="showAnswer">
      <div class="p-4 border-b-2 border-b-black border-b-solid">
        你确定要查看答案吗？
      </div>
      <div id="dialog-actions" class="flex">
        <button class="flex-1" @click="showAnswer = false">
          <div class="active:border-white border-white border-solid hover:border-black border-2 border-solid hover:bg-black hover:color-white box-border py-2 transition-all">
            取消
          </div>
        </button>
        <div class="bg-black w-0.5" />
        <button class="flex-1" @click="game.gameOver.value = true; showAnswer = false; manuallyShowAnswer = true">
          <div class="active:border-white border-white border-solid hover:border-#f00 border-2 border-solid hover:bg-#f00 hover:color-white box-border py-2 transition-all">
            确定
          </div>
        </button>
      </div>
    </Dialog>
    <Dialog v-model="showWin">
      <div class="p-4 border-b-2 border-b-black border-b-solid">
        你猜对了！
      </div>
      <div id="dialog-actions" class="flex">
        <button class="flex-1" @click="showWin = false">
          <div class="active:border-white border-white border-solid hover:border-black border-2 border-solid hover:bg-black hover:color-white box-border py-2 transition-all">
            泰酷辣
          </div>
        </button>
      </div>
    </Dialog>
    <Dialog v-model="showLost">
      <div class="p-4 border-b-2 border-b-black border-b-solid">
        遗憾，但是你可以再来一次
      </div>
      <div id="dialog-actions" class="flex">
        <button class="flex-1" @click="showLost = false">
          <div class="active:border-white border-white border-solid hover:border-black border-2 border-solid hover:bg-black hover:color-white box-border py-2 transition-all">
            好的
          </div>
        </button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped lang="less">
#color, #hint-item {
  --uno: border-2 border-solid border-black;
}

#color {
  --uno: w-16 h-16;
}

#hint-item {
  --uno: w-4 h-4;
}

#dialog-actions {
  button {
    --uno: border-none bg-white m-0 p-0;
  }
}

@keyframes scaling {
  0%, 100% {
    transform: scale(1);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  50% {
    transform: scale(0.9);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
}

.animate-scaling {
  animation: scaling 500ms infinite;
}
</style>
