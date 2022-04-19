import { Client } from 'boardgame.io/react'
import OndiUnoBoard from './Board'
import { OndiUno } from './Game'
import { Box } from '@chakra-ui/react'
import { Local } from 'boardgame.io/multiplayer'

const OndiUnoClient = Client({
  game: OndiUno,
  board: OndiUnoBoard,
  multiplayer: Local(),
})

const App = () => (
  <Box h="100vh">
    <OndiUnoClient playerID="0" />
  </Box>
)

export default App
