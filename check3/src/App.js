import React, { useState, useEffect, useRef } from "react";

const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #000;
  color: #fff;
  overflow: hidden;
}

.spotify-clone {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a1a 0%, #000 100%);
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #000;
  border-bottom: 1px solid #282828;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-buttons {
  display: flex;
  gap: 8px;
}

.nav-btn {
  background: #000;
  border: none;
  color: #b3b3b3;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: #282828;
  color: #fff;
}

.search-bar {
  position: relative;
  width: 300px;
}

.search-bar input {
  width: 100%;
  padding: 8px 16px 8px 40px;
  background: #242424;
  border: none;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  outline: none;
}

.search-bar input:focus {
  background: #2a2a2a;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #b3b3b3;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 8px;
  background: #000;
  border-radius: 23px;
  transition: background 0.2s;
}

.user-info:hover {
  background: #282828;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
}

/* Layout principal */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 280px;
  background: #000;
  padding: 24px 16px;
  overflow-y: auto;
  border-right: 1px solid #282828;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
}

/* Playlists */
.playlists-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #b3b3b3;
  margin-bottom: 16px;
}

.playlist-form {
  background: #121212;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.playlist-form h3 {
  margin-bottom: 16px;
  color: #fff;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  color: #b3b3b3;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  background: #242424;
  border: 1px solid #404040;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  outline: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #1db954;
}

.create-btn {
  background: #1db954;
  color: #000;
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.create-btn:hover {
  transform: scale(1.04);
}

.playlists-grid {
  display: grid;
  gap: 12px;
}

.playlist-card {
  background: #121212;
  padding: 16px;
  border-radius: 8px;
  transition: background 0.2s;
  cursor: pointer;
}

.playlist-card:hover {
  background: #1a1a1a;
}

.playlist-card h4 {
  margin-bottom: 4px;
  color: #fff;
  font-size: 16px;
}

.playlist-card p {
  color: #b3b3b3;
  font-size: 14px;
  margin-bottom: 8px;
}

.playlist-stats {
  font-size: 12px;
  color: #1db954;
  font-weight: 600;
}

/* Lista de Músicas */
.music-header {
  display: grid;
  grid-template-columns: 40px 3fr 2fr 2fr 60px 100px;
  gap: 16px;
  padding: 16px;
  color: #b3b3b3;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #282828;
  margin-bottom: 16px;
}

.music-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.music-item {
  display: grid;
  grid-template-columns: 40px 3fr 2fr 2fr 60px 100px;
  gap: 16px;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  transition: background 0.2s;
  cursor: pointer;
}

.music-item:hover {
  background: #1a1a1a;
}

.music-item.playing {
  background: #282828;
}

.track-number {
  color: #b3b3b3;
  text-align: center;
}

.track-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.track-cover {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.track-details h4 {
  color: #fff;
  margin-bottom: 4px;
  font-size: 16px;
}

.track-details p {
  color: #b3b3b3;
  font-size: 14px;
}

.artist,
.album {
  color: #b3b3b3;
  font-size: 14px;
}

.duration {
  color: #b3b3b3;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
  position: relative;
}

.icon-btn {
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.icon-btn:hover {
  color: #fff;
  background: #282828;
}

.icon-btn.favorite {
  color: #1db954;
}

/* Dropdown Menu */
.playlist-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #282828;
  border-radius: 4px;
  padding: 8px;
  min-width: 200px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.dropdown-header {
  padding: 8px 12px;
  color: #b3b3b3;
  font-size: 12px;
  border-bottom: 1px solid #404040;
  margin-bottom: 8px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #404040;
}

.dropdown-item input {
  margin: 0;
}

/* Player */
.player {
  background: linear-gradient(90deg, #181818, #000);
  border-top: 1px solid #282828;
  padding: 16px 32px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  gap: 24px;
  height: 90px;
}

.now-playing {
  display: flex;
  align-items: center;
  gap: 16px;
}

.now-playing-cover {
  width: 56px;
  height: 56px;
  border-radius: 4px;
  object-fit: cover;
}

.now-playing-info h4 {
  color: #fff;
  margin-bottom: 4px;
  font-size: 14px;
}

.now-playing-info p {
  color: #b3b3b3;
  font-size: 12px;
}

.player-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 24px;
}

.control-btn {
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  transition: color 0.2s;
}

.control-btn:hover {
  color: #fff;
}

.control-btn.play {
  background: #fff;
  color: #000;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn.play:hover {
  transform: scale(1.04);
}

.progress-bar {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
}

.time {
  color: #b3b3b3;
  font-size: 11px;
  min-width: 40px;
}

.progress-track {
  flex: 1;
  height: 4px;
  background: #404040;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #1db954;
  border-radius: 2px;
  width: 0%;
}

.progress-thumb {
  position: absolute;
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}

.progress-track:hover .progress-thumb {
  opacity: 1;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}

.volume-slider {
  width: 100px;
  height: 4px;
  background: #404040;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.volume-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #1db954;
  border-radius: 2px;
}

.volume-thumb {
  position: absolute;
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}

.volume-slider:hover .volume-thumb {
  opacity: 1;
}

/* Responsividade */
@media (max-width: 1200px) {
  .sidebar {
    width: 240px;
  }
  
  .music-header,
  .music-item {
    grid-template-columns: 40px 3fr 2fr 60px 100px;
  }
  
  .music-header .album,
  .music-item .album {
    display: none;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 12px 16px;
  }
  
  .search-bar {
    width: 200px;
  }
  
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #282828;
  }
  
  .player {
    grid-template-columns: 1fr;
    gap: 16px;
    height: auto;
    padding: 12px 16px;
  }
  
  .now-playing {
    justify-content: center;
  }
  
  .volume-control {
    justify-content: center;
  }
  
  .music-header,
  .music-item {
    grid-template-columns: 40px 1fr 60px;
  }
  
  .music-header .artist,
  .music-header .album,
  .music-item .artist,
  .music-item .album {
    display: none;
  }
}

/* Animações */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.playing .track-cover {
  animation: pulse 2s infinite;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #888;
}
`;

function Header({ busca, setBusca, usuario }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="nav-buttons">
          <button className="nav-btn">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="nav-btn">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Buscar músicas, artistas ou álbums"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="user-info">
        <img src={usuario.foto} alt={usuario.nome} className="user-avatar" />
        <span className="user-name">{usuario.nome}</span>
      </div>
    </header>
  );
}

function Player({
  musicaAtual,
  isPlaying,
  togglePlay,
  progresso,
  setProgresso,
  volume,
  setVolume,
  proximaMusica,
  musicaAnterior,
  audioRef,
}) {
  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgresso(percent * 100);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setVolume(Math.min(100, Math.max(0, Math.round(percent * 100))));
  };

  return (
    <div className="player">
      <div className="now-playing">
        {musicaAtual ? (
          <>
            <img
              src={`https://picsum.photos/seed/${musicaAtual.id}/56`}
              alt={musicaAtual.titulo}
              className="now-playing-cover"
            />
            <div className="now-playing-info">
              <h4>{musicaAtual.titulo}</h4>
              <p>{musicaAtual.artista}</p>
            </div>
          </>
        ) : (
          <div className="now-playing-info">
            <h4>Nenhuma música selecionada</h4>
            <p>Clique em uma música para começar</p>
          </div>
        )}
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <button className="control-btn" onClick={musicaAnterior}>
            <i className="fas fa-step-backward"></i>
          </button>
          <button className="control-btn play" onClick={togglePlay}>
            <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>
          <button className="control-btn" onClick={proximaMusica}>
            <i className="fas fa-step-forward"></i>
          </button>
        </div>

        <div className="progress-bar">
          <span className="time">
            {audioRef.current
              ? formatTime(audioRef.current.currentTime)
              : "0:00"}
          </span>
          <div className="progress-track" onClick={handleProgressClick}>
            <div
              className="progress-fill"
              style={{ width: `${progresso}%` }}
            ></div>
            <div className="progress-thumb"></div>
          </div>
          <span className="time">
            {audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}
          </span>
        </div>
      </div>

      <div className="volume-control">
        <button className="control-btn">
          <i className="fas fa-volume-up"></i>
        </button>
        <div className="volume-slider" onClick={handleVolumeClick}>
          <div className="volume-fill" style={{ width: `${volume}%` }}></div>
          <div className="volume-thumb"></div>
        </div>
      </div>
    </div>
  );
}

function ListaMusicas({
  musicas,
  tocarMusica,
  musicaAtual,
  toggleFavorito,
  playlists,
  adicionarMusicaPlaylist,
}) {
  const [playlistAberta, setPlaylistAberta] = useState(null);

  const togglePlaylistMenu = (id) => {
    setPlaylistAberta(playlistAberta === id ? null : id);
  };

  return (
    <div className="music-container">
      <div className="music-header">
        <span>#</span>
        <span>Título</span>
        <span>Artista</span>
        <span>Álbum</span>
        <span>Duração</span>
        <span>Ações</span>
      </div>

      <div className="music-list">
        {musicas.map((musica, index) => (
          <div
            key={musica.id}
            className={`music-item ${
              musicaAtual?.id === musica.id ? "playing" : ""
            }`}
            onClick={() => tocarMusica(musica)}
          >
            <span className="track-number">
              {musicaAtual?.id === musica.id ? (
                <i className={`fas ${musicaAtual && "fa-volume-up"}`}></i>
              ) : (
                index + 1
              )}
            </span>

            <div className="track-info">
              <img
                src={`https://picsum.photos/seed/${musica.id}/40`}
                alt={musica.album}
                className="track-cover"
              />
              <div className="track-details">
                <h4>{musica.titulo}</h4>
                <p>{musica.artista}</p>
              </div>
            </div>

            <span className="artist">{musica.artista}</span>
            <span className="album">{musica.album}</span>
            <span className="duration">{musica.duracao}</span>

            <div className="actions" onClick={(e) => e.stopPropagation()}>
              <button
                className={`icon-btn ${musica.favorita ? "favorite" : ""}`}
                onClick={() => toggleFavorito(musica.id)}
              >
                <i className="fas fa-heart"></i>
              </button>

              <div className="playlist-dropdown">
                <button
                  className="icon-btn"
                  onClick={() => togglePlaylistMenu(musica.id)}
                >
                  <i className="fas fa-plus"></i>
                </button>

                {playlistAberta === musica.id && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">Adicionar à playlist</div>
                    {playlists.map((playlist) => {
                      const isInPlaylist = playlist.musicaIds.includes(
                        musica.id
                      );
                      return (
                        <label key={playlist.id} className="dropdown-item">
                          <input
                            type="checkbox"
                            checked={isInPlaylist}
                            onChange={() =>
                              adicionarMusicaPlaylist(musica.id, playlist.id)
                            }
                          />
                          {playlist.nome}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Playlists({
  playlists,
  novaPlaylist,
  setNovaPlaylist,
  criarPlaylist,
  musicas,
}) {
  const getMusicasPlaylist = (musicaIds) => {
    return musicas.filter((m) => musicaIds.includes(m.id));
  };

  const calcularDuracaoTotal = (musicaIds) => {
    const musicasPlaylist = getMusicasPlaylist(musicaIds);
    return musicasPlaylist.reduce((total, musica) => {
      const [min, sec] = musica.duracao.split(":").map(Number);
      return total + min * 60 + sec;
    }, 0);
  };

  const formatDuracao = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);

    if (horas > 0) {
      return `${horas} hr ${minutos} min`;
    }
    return `${minutos} min`;
  };

  return (
    <div className="playlists-section">
      <h2 className="section-title">Suas Playlists</h2>

      <div className="playlist-form">
        <h3>Criar nova playlist</h3>
        <div className="form-group">
          <label htmlFor="nome">Nome da Playlist</label>
          <input
            type="text"
            id="nome"
            value={novaPlaylist.nome}
            onChange={(e) =>
              setNovaPlaylist({ ...novaPlaylist, nome: e.target.value })
            }
            placeholder="Digite o nome da playlist"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={novaPlaylist.descricao}
            onChange={(e) =>
              setNovaPlaylist({ ...novaPlaylist, descricao: e.target.value })
            }
            placeholder="Descreva sua playlist"
            rows="3"
          />
        </div>

        <button className="create-btn" onClick={criarPlaylist}>
          Criar Playlist
        </button>
      </div>

      <div className="playlists-grid">
        {playlists.map((playlist) => {
          const duracaoTotal = calcularDuracaoTotal(playlist.musicaIds);
          const numMusicas = playlist.musicaIds.length;

          return (
            <div key={playlist.id} className="playlist-card">
              <h4>{playlist.nome}</h4>
              <p>{playlist.descricao}</p>
              <div className="playlist-stats">
                {numMusicas} {numMusicas === 1 ? "música" : "músicas"} •{" "}
                {formatDuracao(duracaoTotal)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpotifyClone() {
  const [musicas, setMusicas] = useState([
    {
      id: 1,
      titulo: "Blinding Lights",
      artista: "The Weeknd",
      album: "After Hours",
      duracao: "3:20",
      favorita: true,
      playlists: [],
    },
    {
      id: 2,
      titulo: "Starboy",
      artista: "The Weeknd ft. Daft Punk",
      album: "Starboy",
      duracao: "3:50",
      favorita: false,
      playlists: [],
    },
    {
      id: 3,
      titulo: "Save Your Tears",
      artista: "The Weeknd",
      album: "After Hours",
      duracao: "3:35",
      favorita: true,
      playlists: [],
    },
    {
      id: 4,
      titulo: "Levitating",
      artista: "Dua Lipa",
      album: "Future Nostalgia",
      duracao: "3:23",
      favorita: false,
      playlists: [],
    },
    {
      id: 5,
      titulo: "Don't Start Now",
      artista: "Dua Lipa",
      album: "Future Nostalgia",
      duracao: "3:03",
      favorita: true,
      playlists: [],
    },
    {
      id: 6,
      titulo: "Watermelon Sugar",
      artista: "Harry Styles",
      album: "Fine Line",
      duracao: "2:54",
      favorita: false,
      playlists: [],
    },
    {
      id: 7,
      titulo: "As It Was",
      artista: "Harry Styles",
      album: "Harry's House",
      duracao: "2:47",
      favorita: true,
      playlists: [],
    },
    {
      id: 8,
      titulo: "Bad Guy",
      artista: "Billie Eilish",
      album: "When We All Fall Asleep",
      duracao: "3:14",
      favorita: false,
      playlists: [],
    },
    {
      id: 9,
      titulo: "Shape of You",
      artista: "Ed Sheeran",
      album: "÷",
      duracao: "3:53",
      favorita: false,
      playlists: [],
    },
    {
      id: 10,
      titulo: "Flowers",
      artista: "Miley Cyrus",
      album: "Endless Summer Vacation",
      duracao: "3:20",
      favorita: true,
      playlists: [],
    },
  ]);

  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      nome: "Minhas Favoritas",
      descricao: "Suas músicas favoritas",
      musicaIds: [1, 3, 5, 7, 10],
    },
    {
      id: 2,
      nome: "Pop Internacional",
      descricao: "As melhores do pop",
      musicaIds: [2, 4, 6, 8],
    },
  ]);

  const [musicaAtual, setMusicaAtual] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [volume, setVolume] = useState(70);
  const [busca, setBusca] = useState("");
  const [novaPlaylist, setNovaPlaylist] = useState({ nome: "", descricao: "" });

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const musicasFiltradas = musicas.filter(
    (musica) =>
      musica.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      musica.artista.toLowerCase().includes(busca.toLowerCase()) ||
      musica.album.toLowerCase().includes(busca.toLowerCase())
  );

  const tocarMusica = (musica) => {
    if (musicaAtual?.id === musica.id && isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    } else {
      setMusicaAtual(musica);
      setIsPlaying(true);
      setProgresso(0);
    }
  };

  const togglePlay = () => {
    if (!musicaAtual) return;

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const proximaMusica = () => {
    if (!musicaAtual) return;
    const index = musicas.findIndex((m) => m.id === musicaAtual.id);
    const nextIndex = (index + 1) % musicas.length;
    setMusicaAtual(musicas[nextIndex]);
    setProgresso(0);
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  const musicaAnterior = () => {
    if (!musicaAtual) return;
    const index = musicas.findIndex((m) => m.id === musicaAtual.id);
    const prevIndex = (index - 1 + musicas.length) % musicas.length;
    setMusicaAtual(musicas[prevIndex]);
    setProgresso(0);
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  const toggleFavorito = (id) => {
    setMusicas(
      musicas.map((musica) =>
        musica.id === id ? { ...musica, favorita: !musica.favorita } : musica
      )
    );
  };

  const criarPlaylist = () => {
    if (!novaPlaylist.nome.trim()) return;

    const novaPlay = {
      id: playlists.length + 1,
      nome: novaPlaylist.nome,
      descricao: novaPlaylist.descricao,
      musicaIds: [],
    };

    setPlaylists([...playlists, novaPlay]);
    setNovaPlaylist({ nome: "", descricao: "" });
  };

  const adicionarMusicaPlaylist = (musicaId, playlistId) => {
    setPlaylists(
      playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          const novaLista = playlist.musicaIds.includes(musicaId)
            ? playlist.musicaIds.filter((id) => id !== musicaId)
            : [...playlist.musicaIds, musicaId];
          return { ...playlist, musicaIds: novaLista };
        }
        return playlist;
      })
    );
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          const progress =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgresso(isNaN(progress) ? 0 : progress);
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (musicaAtual && isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .catch((e) => console.log("Erro ao tocar:", e));
        }
      }, 100);
    }
  }, [musicaAtual]);

  return (
    <div className="spotify-clone">
      {musicaAtual && (
        <audio
          ref={audioRef}
          src={`https://assets.codepen.io/4358584/Blinding-Lights.mp3`}
          onEnded={proximaMusica}
        />
      )}

      <Header
        busca={busca}
        setBusca={setBusca}
        usuario={{
          nome: "Usuário Spotify",
        }}
      />

      <div className="main-content">
        <div className="sidebar">
          <Playlists
            playlists={playlists}
            novaPlaylist={novaPlaylist}
            setNovaPlaylist={setNovaPlaylist}
            criarPlaylist={criarPlaylist}
            musicas={musicas}
          />
        </div>

        <div className="content">
          <ListaMusicas
            musicas={musicasFiltradas}
            tocarMusica={tocarMusica}
            musicaAtual={musicaAtual}
            toggleFavorito={toggleFavorito}
            playlists={playlists}
            adicionarMusicaPlaylist={adicionarMusicaPlaylist}
          />
        </div>
      </div>

      <Player
        musicaAtual={musicaAtual}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        progresso={progresso}
        setProgresso={setProgresso}
        volume={volume}
        setVolume={setVolume}
        proximaMusica={proximaMusica}
        musicaAnterior={musicaAnterior}
        audioRef={audioRef}
      />
    </div>
  );
}

function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    document.head.appendChild(link);

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }, []);

  return <SpotifyClone />;
}

export default App;
