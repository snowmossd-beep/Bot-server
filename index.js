const mineflayer = require('mineflayer')

const host = process.env.MC_HOST || 'minhnguvcl.aternos.me'
const port = parseInt(process.env.MC_PORT || '47047')
const version = process.env.MC_VERSION || '1.21'
const username = process.env.MC_USER || 'AFK_Bot'
const auth = process.env.MC_AUTH || 'offline'

function start() {
  const bot = mineflayer.createBot({ host, port, username, version, auth })
  bot.physicsEnabled = false
  let timer

  bot.once('spawn', () => {
    console.log('joined')
    let i = 0
    timer = setInterval(() => {
      try {
        bot.swingArm('right')
        bot.setQuickBarSlot(i++ % 9)
      } catch (e) {}
    }, 15000)
  })

  bot.on('end', reason => {
    console.log('disconnected', reason)
    clearInterval(timer)
    setTimeout(start, 20000)
  })

  bot.on('kicked', reason => console.log('kicked', JSON.stringify(reason)))
  bot.on('error', err => console.log('error', err.message))
}

start()
