<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { readFileAsync } from "../utils/readFile";
import { loadImage } from "../utils/loadImage";
import { WaterMark } from "../types/WaterMark";
import { Vector2 } from '../types/Vector';
import ColorBlock from "./ColorBlock/index.vue";
import { ColorOption } from "./ColorBlock/ColorOption";
import { getImageSrc } from '/@/utils/image';
import { useFilesPicker } from '../composables/useFilePicker';

const { files, pickFiles } = useFilesPicker()

let pickColorMode = ref(false)
const image_canvas = ref<HTMLCanvasElement>()
const watermark_canvas = ref<HTMLCanvasElement>()
const icon_picker = ref<HTMLInputElement>();
let myImage = new Image()
let currentFile: File
const waterMark = reactive<WaterMark>(new WaterMark(watermark_canvas.value, {
  textContent: "@your_name",
  textSize: 50,
  iconSize: 50,
  frameWidth: 5,
  opacity: 1,
  position: new Vector2(0, 0)
}))

onMounted(async () => {
  let imageUrl = getImageSrc('sample.jpeg')
  if (files.value.length > 0) {
    imageUrl = await readFileAsync(files.value[0])
    currentFile = files.value[0]
  }
  redrawAll(imageUrl)
})

watch(() => files.value, async (newVal, oldVal) => {
  let imageUrl = await readFileAsync(files.value[0])
  currentFile = files.value[0]
  redrawAll(imageUrl)
})

let textSizeMax = ref(50)
let iconSizeMax = ref(50)

async function redrawAll(imageUrl: string) {
  try {
    myImage = await loadImage(imageUrl)

    if (image_canvas.value == undefined || watermark_canvas.value == undefined) {
      console.error("Can't find canvas")
    } else {
      let imageCanvas = image_canvas.value
      let watermarkCanvas = watermark_canvas.value
      let imageCtx = imageCanvas.getContext('2d')
      let watermarkLayerCtx = watermarkCanvas.getContext('2d')
      imageCanvas.width = myImage.width;
      imageCanvas.height = myImage.height;
      watermarkCanvas.width = myImage.width;
      watermarkCanvas.height = myImage.height;
      waterMark.canvas = watermarkCanvas

      if (imageCtx && watermarkLayerCtx) {
        waterMark.textSize = Math.floor(myImage.width * 0.03)
        waterMark.iconSize = Math.floor(myImage.width * 0.03)
        textSizeMax.value = waterMark.textSize * 2
        iconSizeMax.value = waterMark.iconSize * 2
        // waterMark.frameWidth = waterMark.textSize * 0.1
        waterMark.position.x = myImage.height * 0.5
        waterMark.position.y = myImage.width * 0.5

        imageCtx.drawImage(myImage, 0, 0)
        waterMark.refreshCanvas()
        changeWatermarkLayout('center')

        // handleMouseDown
        watermarkCanvas.addEventListener('mousedown', evt => {
          handleMouseDown(evt.clientX, evt.clientY)
          if(pickColorMode.value) {
            pickColorMode.value = false
            changeWatermarkColor(colorOptions[colorOptions.length - 1])
          }
        })

        watermarkCanvas.addEventListener('touchend', evt => {
          handleMouseDown(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY)
        })

        const handleMouseDown = (clientX: number, clientY: number) => {
          const rect = watermarkCanvas.getBoundingClientRect()
          let mousePos = new Vector2(
            (clientX - rect.left) * (watermarkCanvas.width / rect.width),
            (clientY - rect.top) * (watermarkCanvas.height / rect.height)
          )
          waterMark.isSelected = waterMark.isMouseAbove(mousePos)
          Vector2.sub(mousePos, waterMark.position, waterMark.distanceToMouse)
        }

        // handleMouseMove
        watermarkCanvas.addEventListener('mousemove', evt => {
          handleMouseMove(evt.clientX, evt.clientY)
          if(pickColorMode.value) {
            let ctx = imageCanvas.getContext('2d')
            const rect = imageCanvas.getBoundingClientRect()
            let mousePos = new Vector2(
              (evt.clientX - rect.left) * (imageCanvas.width / rect.width),
              (evt.clientY - rect.top) * (imageCanvas.height / rect.height)
            )
            if(ctx) {
              const colorData = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data
              colorOptions[colorOptions.length - 1].color = `rgb(${colorData[0]}, ${colorData[1]}, ${colorData[2]})`
            }
          }
        })

        watermarkCanvas.addEventListener('touchmove', evt => {
          handleMouseDown(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY)
        })

        const handleMouseMove = (clientX: number, clientY: number) => {
          if (waterMark.isSelected) {
            const rect = watermarkCanvas.getBoundingClientRect()
            let mousePos = new Vector2(
              (clientX - rect.left) * (watermarkCanvas.width / rect.width),
              (clientY - rect.top) * (watermarkCanvas.height / rect.height)
            )
            Vector2.sub(mousePos, waterMark.distanceToMouse, waterMark.position)
            watermarkLayerCtx?.clearRect(0, 0, watermarkCanvas.width, watermarkCanvas.height)
            waterMark.show()
          }
        }

        // handleMouseUp
        watermarkCanvas.addEventListener('mouseup', evt => {
          handleMouseUp()
        })

        watermarkCanvas.addEventListener('touchend', evt => {
          handleMouseUp()
        })

        const handleMouseUp = () => {
          waterMark.isSelected = false
          watermarkLayerCtx?.clearRect(0, 0, watermarkCanvas.width, watermarkCanvas.height)
          watermarkLayerCtx?.drawImage(myImage, 0, 0)
          waterMark.show()
        }

      } else {
        console.warn('Can\'t get context');
      }
    }
  } catch (error) {
    console.error(error)
  }
}

function selectIcon() {
  icon_picker.value?.click();
}

async function handleIconChange() {
  const files = icon_picker.value?.files;
  if (files) {
    try {
      let imageUrl = await readFileAsync(files[0])
      waterMark.icon = await loadImage(imageUrl)
    } catch (err) {
      console.error(err)
    }
  } else {
    console.warn("Can't find icon file");
  }
}

function downloadImage() {
  if (watermark_canvas.value) {
    let watermarkLayer = watermark_canvas.value
    const watermarkLayerCtx = watermarkLayer.getContext('2d')
    watermarkLayerCtx?.clearRect(0, 0, watermarkLayer.width, watermarkLayer.height)
    watermarkLayerCtx?.drawImage(myImage, 0, 0)
    waterMark.show()
    const dataUrl = watermarkLayer.toDataURL(currentFile.type)
    var tmpLink = document.createElement('a');
    tmpLink.download = currentFile.name;
    tmpLink.href = dataUrl;

    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
  }
}

type LayoutType = 'left_top' | 'left_bottom' | 'center' | 'right_top' | 'right_bottom';

interface LayoutOption {
  src: string,
  value: LayoutType,
  isActive: boolean,
}

let layoutOptions = reactive<Array<LayoutOption>>([
  {
    src: getImageSrc('watermark_layout_lb_noborder.svg'),
    value: 'left_bottom',
    isActive: true,
  },
  {
    src: getImageSrc('watermark_layout_lt_noborder.svg'),
    value: 'left_top',
    isActive: false,
  },
  {
    src: getImageSrc('watermark_layout_center_noborder.svg'),
    value: 'center',
    isActive: false,
  },
  {
    src: getImageSrc('watermark_layout_rt_noborder.svg'),
    value: 'right_top',
    isActive: false,
  },
  {
    src: getImageSrc('watermark_layout_rb_noborder.svg'),
    value: 'right_bottom',
    isActive: false,
  },
])

function changeWatermarkLayout(layoutStr: string) {
  let layout = layoutOptions.find(opt => opt.value == layoutStr)
  if(layout && !layout.isActive) {
    layoutOptions.forEach(opt => opt.isActive = false)
    layout.isActive = true
    switch (layout.value) {
      case 'left_top':
        waterMark.position = new Vector2(
          waterMark.iconSize * 1.4,
          myImage.height * 0.01 + waterMark.bigHeight
          )
        break;
      case 'left_bottom':
        waterMark.position = new Vector2(
          waterMark.iconSize * 1.4,
          myImage.height * 0.98 - waterMark.bigHeight
          )
        break;
      case 'right_top':
        const x = waterMark.textContent.length
        waterMark.position = new Vector2(
          myImage.width * 0.98 - waterMark.textWidth,
          myImage.height * 0.01 + waterMark.bigHeight
          )
        break;
      case 'right_bottom':
        waterMark.position = new Vector2(
          myImage.width * 0.98 - waterMark.textWidth,
          myImage.height * 0.98 - waterMark.bigHeight
          )
        break;
      case 'center':
        waterMark.position = new Vector2(
          (myImage.width - waterMark.textWidth) * 0.5,
          myImage.height * 0.5
          )
        break;

      default:
        break;
    }
  }
}

function changeWatermarkColor(colorOpt: ColorOption) {
  if(!colorOpt.isActived) {
    colorOptions.forEach(opt => opt.isActived = false)
    colorOpt.isActived = true
    waterMark.textColor = colorOpt.color
  }
}

let colorOptions = reactive<Array<ColorOption>>([
  new ColorOption({
    color: '#ffaa00'
  }),
  new ColorOption({
    color: '#ffffff',
    borderColor: '#e5e7eb',
    hasOutborder: true,
    isActived: true,
  }),
  new ColorOption({
    color: '#555555',
  }),
])

function togglePickColorMode() {
  pickColorMode.value = !pickColorMode.value
  if(pickColorMode.value) {
    colorOptions.push(new ColorOption({}))
  }
}

</script>

<template>
  <div class="flex flex-wrap justify-center w-screen">
    <div class="relative">
      <canvas class="w-screen sm:w-96 md:w-[30rem] border " ref="image_canvas"></canvas>
      <canvas class="w-screen sm:w-96 md:w-[30rem] border absolute top-0" ref="watermark_canvas"></canvas>
    </div>
      <!-- Control Panel -->
    <div class="flex flex-col gap-2 pt-4 font-mono">
      <button
        class="btn-primary max-w-xs"
        @click="pickFiles({accept: ['jpg', 'jpeg', 'png']})"
      >
        Choose Image
      </button>
      <div class="flex flex-wrap gap-1 items-center">
        <img class="w-6" src="../assets/image.svg" @click="selectIcon" alt="icon image">
        <p class="text-lg">Icon</p>
        <img class="w-6 p-0.5 active:scale-95"  src="../assets/add.svg" @click="selectIcon">
        <input type="range" v-model="waterMark.iconSize" class="w-36" min="10" :max="iconSizeMax" step="5"/>
        <input  type="number" v-model="waterMark.iconSize" step="5" class="w-8">
        <input class="invisible w-0" type="file" ref="icon_picker" accept="image/*" @change="handleIconChange">
      </div>
      <div class="flex flex-wrap gap-1">
        <img class="w-6 p-0.5" src="../assets/input.svg" alt="text image">
        <input v-model="waterMark.textContent" type="text" class="w-28 text-lg" placeholder="watermark">
        <input type="range" v-model="waterMark.textSize" class="w-36" min="10" :max="textSizeMax" step="5"/>
        <input type="number" v-model="waterMark.textSize" step="5" class="w-8">
      </div>
      <div class="flex align-middle gap-1">
        <img class="w-6" src="../assets/opacity_block.svg" alt="opacity image">
        <p class="text-lg">Opacity</p>
        <input type="range" v-model="waterMark.opacity" class="w-36" min="0" :max="1" step="0.1"/>
        <input v-model="waterMark.opacity" type="number" step="0.1" max="1" min="0" class="w-8">
      </div>

      <div class="flex items-center gap-1.5">
        <img class="w-6" src="../assets/color.svg" alt="color image">
        <ColorBlock v-for="colorOpt of colorOptions"
          :colorOpt="colorOpt"
          @click="changeWatermarkColor(colorOpt)"
        ></ColorBlock>
        <img
          @click="togglePickColorMode"
          class="w-6 active:scale-95 color-picker rounded-md"
          :class="{
            'border-blue-500': pickColorMode,
            'border': pickColorMode
            }"
          src="../assets/color_picker.svg" alt="color picker image"
        >
        <input v-model="waterMark.textColor" type="string" class="w-20">
      </div>

      <div class="flex flex-wrap gap-2">
        <img v-for="layout of layoutOptions"
          @click="changeWatermarkLayout(layout.value)"
          :key="layout.value"
          :src="layout.src" :alt="layout.value" 
          class="pt-1 rounded-lg border"
          :class="{
            'border-2': layout.isActive,
            'border-blue-500': layout.isActive,
            'border-gray-500': !layout.isActive,
          }"
        >
      </div>

      <div class="flex flex-wrap gap-1 align-middle">
        <img class="w-6 p-0.5" src="../assets/download_bold.svg" @click="downloadImage" alt="download image">
        <button @click="downloadImage" class="active:scale-95">
          <p class="font-semibold text-m">Download</p>
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
  input[type=number] {
    -moz-appearance: textfield;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
