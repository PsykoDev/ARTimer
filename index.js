/** @format */

module.exports = function ARTimer(mod) {
  let settings = mod.settings
  mod.game.initialize("me")
  let enabled = settings.enabled
  mod.hook("S_ABNORMALITY_BEGIN", 4, (e) => {
    if (e.id === 200701 && mod.game.me.inDungeon && enabled) {
      msg("#E69F00", `AR! NOW `)
      setTimeout(() => {
        msg("#E69F00", `!!! AR UP !!! `)
      }, 90000 + Math.random() * 250)
    }
  })
  mod.hook("S_ABNORMALITY_END", 1, (e) => {
    if (e.id === 200701 && mod.game.me.inDungeon && enabled) {
      msg("#FF0000", `END OF AR!`)
    }
  })

  mod.command.add("AR", (arg) => {
    switch (arg) {
      default:
        enabled = !enabled
        mod.command.message(`ARTimer ${enabled ? '<font color="#00FF00">Enabled</font>' : '<font color="#FF0000">Disabled</font>'}`)
        break
    }
  })

  function msg(temp_color, reg_msg) {
    mod.toClient("S_CHAT", 3, {
      channel: settings.channel,
      gm: 1,
      name: "ARTimer",
      message: `<FONT color=\"${temp_color}\"><ChatLinkAction param="1#####0@0@name">${reg_msg}</ChatLinkAction></FONT>`,
    })
  }
}
