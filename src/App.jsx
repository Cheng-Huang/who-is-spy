import React, { useState } from 'react';
import SetupScreen from './components/SetupScreen';
import RoleReveal from './components/RoleReveal';
import GamePhase from './components/GamePhase';
import { wordManager } from './utils/WordManager';

function App() {
  const [phase, setPhase] = useState('setup'); // setup, reveal, game
  const [playerCount, setPlayerCount] = useState(4);
  const [spyCount, setSpyCount] = useState(1);
  const [whiteboardEnabled, setWhiteboardEnabled] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentWordId, setCurrentWordId] = useState(null);

  const startGame = () => {
    // 1. Get random unused word pair
    const wordPair = wordManager.getUnusedWord();

    if (!wordPair) {
      alert('所有词汇已用完！请重置历史记录。');
      return;
    }

    setCurrentWordId(wordPair.id);

    // 2. Create roles array
    let roles = [];

    // Add spies
    for (let i = 0; i < spyCount; i++) {
      roles.push({ role: 'spy', word: wordPair.spy, image: wordPair.spyImage });
    }

    // Add whiteboard if enabled
    if (whiteboardEnabled && playerCount >= 5) {
      roles.push({ role: 'whiteboard', word: '', image: '' });
    }

    // Fill rest with civilians
    const civilianCount = playerCount - roles.length;
    for (let i = 0; i < civilianCount; i++) {
      roles.push({ role: 'civilian', word: wordPair.civilian, image: wordPair.civilianImage });
    }

    // 3. Shuffle roles
    roles = roles.sort(() => Math.random() - 0.5);

    setPlayers(roles);
    setPhase('reveal');
  };

  const handleRevealComplete = () => {
    // Mark word as used when game actually starts
    if (currentWordId) {
      wordManager.markAsUsed(currentWordId);
    }
    setPhase('game');
  };

  const handleRestart = () => {
    setPhase('setup');
    setPlayers([]);
  };

  return (
    <div className="font-sans antialiased">
      {phase === 'setup' && (
        <SetupScreen
          playerCount={playerCount}
          setPlayerCount={setPlayerCount}
          spyCount={spyCount}
          setSpyCount={setSpyCount}
          whiteboardEnabled={whiteboardEnabled}
          setWhiteboardEnabled={setWhiteboardEnabled}
          onStart={startGame}
        />
      )}

      {phase === 'reveal' && (
        <RoleReveal
          players={players}
          onRevealComplete={handleRevealComplete}
        />
      )}

      {phase === 'game' && (
        <GamePhase
          players={players}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
