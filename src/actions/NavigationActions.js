
function toggleStatusBar(hidden) {
  return {
    type: 'TOGGLE_STATUS_BAR',
    hidden: hidden
  }
}

module.exports = {
  toggleStatusBar
}
