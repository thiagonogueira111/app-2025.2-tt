import React, { useState, useEffect } from "react";
import "./styles.css";

const StatusMissao = ({ distanciaPercorrida, distanciaTotal }) => {
  const porcentagem = Math.min(
    100,
    Math.round((distanciaPercorrida / distanciaTotal) * 100)
  );

  return (
    <div className="panel">
      <h2>Status da Missão</h2>
      <p>Destino: Orbitando Lua de Saturno</p>
      <div className="progress-container">
        <div className="progress-fill" style={{ width: `${porcentagem}%` }}>
          {porcentagem}%
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.8rem",
          marginTop: "5px",
        }}
      >
        <span>Partida: Terra</span>
        <span>
          {distanciaPercorrida.toLocaleString()} /{" "}
          {distanciaTotal.toLocaleString()} UA
        </span>
      </div>
    </div>
  );
};

const DadosPlaneta = ({ planeta }) => {
  const { nome, temperatura, gravidade, descricao } = planeta;

  const getIconeTemperatura = (temp) => {
    if (temp > 100) return "🔥";
    if (temp > 30) return "☀️";
    if (temp < 0) return "❄️";
    return "🌤️";
  };

  return (
    <div className="panel">
      <h2>Dados do Destino: {nome}</h2>
      <div className="info-grid">
        <div className="info-item">
          <strong>Temp. Média:</strong>
          <br />
          <span style={{ fontSize: "1.2rem" }}>
            {getIconeTemperatura(temperatura)} {temperatura}°C
          </span>
        </div>
        <div className="info-item">
          <strong>Gravidade:</strong>
          <br />
          {gravidade} m/s²
        </div>
      </div>
      <div className="info-item" style={{ marginTop: "10px" }}>
        <strong>Análise:</strong> {descricao}
      </div>
    </div>
  );
};

const PrevisaoEspacial = ({ previsao }) => {
  return (
    <div className="panel">
      <h2>Meteorologia Espacial</h2>
      <div className="weather-row">
        <div>
          <span className="weather-icon">🌪️</span>
          <small>Vento Solar</small>
          <br />
          <strong>{previsao.vento} km/s</strong>
        </div>
        <div>
          <span className="weather-icon">☢️</span>
          <small>Radiação</small>
          <br />
          <strong
            style={{
              color: previsao.radiacao === "ALTA" ? "#ff3333" : "#00f3ff",
            }}
          >
            {previsao.radiacao}
          </strong>
        </div>
        <div>
          <span className="weather-icon">☄️</span>
          <small>Densidade</small>
          <br />
          <strong>{previsao.densidade}%</strong>
        </div>
      </div>
    </div>
  );
};

const DiarioBordo = ({ eventos }) => {
  return (
    <div className="panel" style={{ gridColumn: "1 / -1" }}>
      <h2>Diário de Bordo - Logs Recentes</h2>
      <ul className="log-list">
        {eventos.map((evento) => (
          <li key={evento.id}>
            <span className="log-time">[{evento.hora}]</span>
            {evento.mensagem}
          </li>
        ))}
      </ul>
    </div>
  );
};

const DashboardEspacial = () => {
  const [dataGalactica, setDataGalactica] = useState("");

  const comandante = "Th";

  const missaoDados = {
    percorrido: 78000000,
    total: 120000000,
  };

  const planetaAlvo = {
    nome: "Lua de Saturno",
    temperatura: -45,
    gravidade: 11.2,
    descricao:
      "única lua do Sistema Solar com uma atmosfera substancial e corpos líquidos de hidrocarbonetos (metano e etano) em sua superfície, como rios, lagos e mares.",
  };

  const previsaoDados = {
    vento: 450,
    radiacao: "ALTA",
    densidade: 12,
  };

  const logsMissao = [
    { id: 1, hora: "08:00", mensagem: "Sistemas de suporte à vida: Estáveis." },
    { id: 2, hora: "10:30", mensagem: "Correção de trajetória iniciada." },
    {
      id: 3,
      hora: "14:15",
      mensagem: "Detectada anomalia magnética no setor 4.",
    },
    {
      id: 4,
      hora: "16:45",
      mensagem: "Transmissão de dados para a Terra concluída.",
    },
    {
      id: 5,
      hora: "19:00",
      mensagem: "Início do ciclo de descanso da tripulação.",
    },
  ];

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const starDate = `SD-${now.getFullYear()}.${
        now.getMonth() + 1
      }${now.getDate()}.${now.getHours()}${now.getMinutes()}`;
      setDataGalactica(starDate);
    };

    tick();
    const timerID = setInterval(tick, 1000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header-section">
        <h1>Olá, Comandante {comandante}</h1>
        <div className="galactic-time">HORA ESTELAR: {dataGalactica}</div>
      </div>

      <StatusMissao
        distanciaPercorrida={missaoDados.percorrido}
        distanciaTotal={missaoDados.total}
      />

      <PrevisaoEspacial previsao={previsaoDados} />

      <DadosPlaneta planeta={planetaAlvo} />

      <DiarioBordo eventos={logsMissao} />
    </div>
  );
};

export default DashboardEspacial;
