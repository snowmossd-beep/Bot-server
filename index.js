const mineflayer = require('mineflayer')

const host = process.env.MC_HOST
const port = parseInt(process.env.MC_PORT || '25565')
const version = process.env.MC_VERSION || false
const username = process.env.MC_USER || 'AFK_Bot'
const auth = process.env.MC_AUTH || 'offline'

function start() {
  const bot = mineflayer.createBot({ host, port, username, version, auth })
  let timer

  bot.once('spawn', () => {
    console.log('joined')
    timer = setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 300)
      bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * Math.PI / 2, true)
    }, 15000)
  })

  bot.on('end', reason => {
    console.log('disconnected', reason)
    clearInterval(timer)
    setTimeout(start, 20000)
  })

  bot.on('kicked', reason => console.log('kicked', reason))
  bot.on('error', err => console.log('error', err.message))
}

start()
