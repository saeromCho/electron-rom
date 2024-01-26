const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    /// 페이지가 표시되기 전에 실행할 전처리 코드를 지정. 스크립트는 반드시 절대 경로로 전달해야한다.
     webPreferences: { preload: path.join(__dirname, 'preload.js') }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
console.log('process.platform::', process.platform);
  if (process.platform !== 'darwin') {
    app.quit()
  }
})