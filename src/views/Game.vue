<template>
  <div class="Game">
    <div class="container">
      <div class="info-holder">
        <div class="left">
          <h2>Good Luck, {{ name }} !</h2>
          <p>Pick up the right cards</p>
        </div>
        <div class="right">
          <p class="score">
            <img src="@/assets/img/timer.svg" alt="timer" class="timer">Your score: <span>{{ timer.count }}</span> seconds</p>
          <p>The faster the better!</p>
        </div>
      </div>
      <div class="cards">
        <div class="img"
             v-for="item in topObjects"
             :style="{ order: item.order }"
             :class="{
              used: hasId(item),
              drag: item.drag
             }"
             :key='item.title'
             :draggable="!hasId(item)"
             @dragstart='startDrag($event, item)'
             @dragend="endDrag($event, item)"
        >
          <img :src='item.img' alt="cards" draggable="false">
        </div>
      </div>
      <div class="drop">
        <p class="again">...and drop here to make hte logo great again!</p>
        <div class="boxes">
          <div
              v-for="(item,index) in bottomObjects"
              class="box"
              :class="{active: item.slot, dragenter: item.dragenter}"
              :draggable="item.slot"
              @dragstart='startDrag($event, item.slot)'
              @drop="onDrop($event, item, index)"
              @dragenter="item.dragenter = true"
              @dragleave="item.dragenter = false"
              @dragover.prevent
              @click="item.slot = null"
          >
            <img :src='item.slot.img' alt="cards" draggable="false" v-if="item.slot">
          </div>
        </div>
      </div>
    </div>
    <template>
        <v-dialog
            v-model="timer.end"
            width="500"
        >
            <v-alert type="success" class="mb-0">
              You did it ! Congratulations ! The game will restart in {{reloadTimer}}s.
            </v-alert>
        </v-dialog>
    </template>
  </div>
</template>
<script>
export default {
  name: "Game",

  data() {
    return {
      topObjects: [
        {
          id: 0,
          img: require('@/assets/img/zoovu-z.svg'),
          order: Math.floor(Math.random() * 1000),
          position: 0,
          drag: false
        },
        {
          id: 1,
          img: require('@/assets/img/zoovu-o.svg'),
          order: Math.floor(Math.random() * 1000),
          position: 1,
          drag: false
        },
        {
          id: 2,
          img: require('@/assets/img/zoovu-o.svg'),
          order: Math.floor(Math.random() * 1000),
          position: 1,
          drag: false
        },
        {
          id: 3,
          img: require('@/assets/img/zoovu-u.svg'),
          order: Math.floor(Math.random() * 1000),
          position: 2,
          drag: false
        },
        {
          id: 4,
          img: require('@/assets/img/zoovu-v.svg'),
          order: Math.floor(Math.random() * 1000),
          position: 3,
          drag: false
        },
      ],
      bottomObjects: [
        {
          expectedPosition: 0,
          slot: null,
          dragenter: false
        },
        {
          expectedPosition: 1,
          slot: null,
          dragenter: false
        },
        {
          expectedPosition: 1,
          slot: null,
          dragenter: false
        },
        {
          expectedPosition: 2,
          slot: null,
          dragenter: false
        },
        {
          expectedPosition: 3,
          slot: null,
          dragenter: false
        }
      ],
      timer: {
        count: 0,
        start: false,
        interval: null,
        end: false
      },
      reloadTimer: 10
    }
  },
  computed: {
    name() {
      return this.$store.state.name
    },
    bottomObjectsSlot() {
      return this.bottomObjects.map(object => object.slot)
    }
  },
  methods: {
    startDrag(evt, item) {
      item.drag = true

      evt.dataTransfer.setData('item', JSON.stringify(item))
      this.startTimer()
    },
    endDrag(evt, item) {
      item.drag = false
    },
    onDrop(evt, item, index) {
      item.dragenter = false
      let dropItem = JSON.parse(evt.dataTransfer.getData('item'))

      if (!item.slot) {
        this.bottomObjects.forEach(object => {
          if (object.slot && object.slot.id === dropItem.id) {
            object.slot = null
          }
        })
        this.$set(this.bottomObjects[index], 'slot', dropItem)
      }

      if (dropItem.position !== item.expectedPosition) {
        this.timer.count += 10;
      }
    },
    hasId(item) {
      return this.bottomObjects.map(item => item.slot && item.slot.id).includes(item.id)
    },
    startTimer() {
      if (!this.timer.start) {
        this.timer.interval = setInterval(() => {
          this.timer.count++
        }, 1000)
        this.timer.start = true;
      }
    },
    startReloadTimer() {
      let th = this
      setInterval(() => {
        th.reloadTimer--
      }, 1000)
    }
  },
  watch: {
    bottomObjectsSlot() {
      if (this.bottomObjects.filter(item => !item.slot || item.expectedPosition !== item.slot.position).length === 0) {
        clearInterval(this.timer.interval)
        let th = this
        this.startReloadTimer()
       setTimeout(() => {
          th.$router.go()
        }, 10000)
        this.timer.end = true;
      }
    }
  }
}
</script>

<style lang="scss">

.Game {
  p {
    color: #adb5c3;
  }
  .container {
    width: 1080px;
    margin: 0 auto;

    .info-holder {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;

      .left {
        flex-direction: column;

        h2 {
          margin-bottom: 16px;
          font-family: 'TT Norms Pro Bold';
        }
      }

      .right {
        flex-direction: column;
        text-align: right;

        .score {
          color: #382779;
          font-family: 'TT Norms Pro Bold';
          img {
            width: 18px;
            margin-right: 8px;
          }

          span {
            min-width: 26px;
            display: inline-block;
            text-align: center;
          }
        }
      }
    }

    .cards {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 40px;

      .img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 180px;
        height: 180px;
        box-shadow: 0 0 15px 2px rgba(0, 0, 0, .1), inset 0 0 0 0 rgba(0, 0, 0, .1);
        border-radius: 10px;
        background: white;
        transition: all .5s;

        &.used, &.drag {
          box-shadow: 0 0 0 0 rgba(0, 0, 0, .1), inset 0 0 15px 2px rgba(0, 0, 0, .1);
          opacity: .6;
        }

        img {
          width: 50%;
        }
      }
    }

    .drop {
      margin-top: 160px;
      margin-bottom: 200px;

      .boxes {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 75px;

        .box {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #228b22;
          background: rgb(247 248 250);
          width: 180px;
          height: 180px;
          border-radius: 10px;

          &.active {
            box-shadow: 0 0 15px 2px rgba(0, 0, 0, .1), inset 0 0 0 0 rgba(0, 0, 0, .1);
            background: white;
            border: 0;
          }

          &.dragenter {
            box-shadow: inset 0 0 20px 2px rgba(0, 0, 0, .2);
          }
        }
      }
    }
  }
}


</style>
