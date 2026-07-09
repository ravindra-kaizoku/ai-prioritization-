import { spawn } from 'node:child_process'
import process from 'node:process'

const commands = [
  { command: process.platform === 'win32' ? 'npm.cmd' : 'npm', args: ['run', 'dev:frontend'] },
  { command: process.platform === 'win32' ? 'npm.cmd' : 'npm', args: ['run', 'dev:backend'] },
]

const children = commands.map(({ command, args }) => spawn(command, args, { stdio: 'inherit', shell: process.platform === 'win32' }))

process.on('SIGINT', () => {
  for (const child of children) child.kill('SIGINT')
  process.exit(0)
})
