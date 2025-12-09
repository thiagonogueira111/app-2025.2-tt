import "./styles.css";
import React, { useState, useEffect } from "react";

export default function RPGSystem() {
  const [health, setHealth] = useState(100);
  const [maxHealth, setMaxHealth] = useState(100);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [inventory, setInventory] = useState([
    "Poção de Cura",
    "Espada Longa",
    "Mapa Antigo",
  ]);

  const [missions, setMissions] = useState([
    { id: 1, text: "Derrotar o Dragão", completed: false, type: "Principal" },
    { id: 2, text: "Coletar Ervas", completed: false, type: "Secundária" },
  ]);
  const [newMission, setNewMission] = useState("");
  const [missionType, setMissionType] = useState("Principal");

  const [spellInput, setSpellInput] = useState("");
  const [generatedSpell, setGeneratedSpell] = useState("");

  const [heroes, setHeroes] = useState([
    { id: 1, name: "Aragorn", level: 5, class: "Guerreiro" },
    { id: 2, name: "Gandalf", level: 8, class: "Mago" },
    { id: 3, name: "Legolas", level: 6, class: "Arqueiro" },
  ]);

  const [attributePoints, setAttributePoints] = useState(10);
  const [attributes, setAttributes] = useState({
    forca: 5,
    resistencia: 5,
    inteligencia: 5,
    sorte: 5,
  });

  const [characterName, setCharacterName] = useState("Herói");
  const [race, setRace] = useState("Humano");
  const [characterClass, setCharacterClass] = useState("Guerreiro");
  const [statusEffectsVisible, setStatusEffectsVisible] = useState(false);
  const [gold, setGold] = useState(50);
  const [shopVisible, setShopVisible] = useState(false);
  const [shopItems] = useState([
    { id: 1, name: "Poção de Vida", price: 15 },
    { id: 2, name: "Poção de Mana", price: 20 },
    { id: 3, name: "Armadura", price: 50 },
  ]);

  useEffect(() => {
    if (xp >= level * 300) {
      setLevel((prev) => prev + 1);
      setAttributePoints((prev) => prev + 5);
      setMaxHealth((prev) => prev + 20);
      setHealth((prev) => prev + 20);
    }
  }, [xp, level]);

  useEffect(() => {
    const baseHealth = 100;
    const bonusHealth = attributes.resistencia * 5;
    setMaxHealth(baseHealth + bonusHealth);
  }, [attributes.resistencia]);

  const takeDamage = () => {
    setHealth((prev) => Math.max(0, prev - 15));
  };

  const heal = () => {
    if (inventory.includes("Poção de Cura")) {
      setHealth((prev) => Math.min(maxHealth, prev + 10));
      setInventory((prev) => prev.filter((item) => item !== "Poção de Cura"));
    }
  };

  const getHealthColor = () => {
    if (health > 70) return "green";
    if (health > 30) return "yellow";
    return "red";
  };

  const completeMissionXP = () => {
    setXp((prev) => prev + 100);
  };

  const defeatEnemyXP = () => {
    setXp((prev) => prev + 50);
  };

  const xpProgress = ((xp % 300) / 300) * 100;

  const toggleInventory = () => {
    setInventoryOpen(!inventoryOpen);
  };

  const addMission = () => {
    if (newMission.trim()) {
      setMissions((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: newMission,
          completed: false,
          type: missionType,
        },
      ]);
      setNewMission("");
    }
  };

  const completeMission = (id) => {
    setMissions((prev) =>
      prev.map((mission) =>
        mission.id === id ? { ...mission, completed: true } : mission
      )
    );
    completeMissionXP();
    setGold((prev) => prev + 25);
  };

  const completedMissionsCount = missions.filter((m) => m.completed).length;

  const generateSpell = () => {
    if (spellInput) {
      const reversed = spellInput.split("").reverse().join("");
      const enchanted = `✨${reverted.toUpperCase()}✨`;
      setGeneratedSpell(enchanted);
    }
  };

  const updateHeroLevel = (id, newLevel) => {
    setHeroes((prev) =>
      prev.map((hero) => (hero.id === id ? { ...hero, level: newLevel } : hero))
    );
  };

  const sortedHeroes = [...heroes].sort((a, b) => b.level - a.level);

  const increaseAttribute = (attribute) => {
    if (attributePoints > 0) {
      setAttributes((prev) => ({
        ...prev,
        [attribute]: prev[attribute] + 1,
      }));
      setAttributePoints((prev) => prev - 1);
    }
  };

  const decreaseAttribute = (attribute) => {
    if (attributes[attribute] > 1) {
      setAttributes((prev) => ({
        ...prev,
        [attribute]: prev[attribute] - 1,
      }));
      setAttributePoints((prev) => prev + 1);
    }
  };

  const buyItem = (item) => {
    if (gold >= item.price) {
      setGold((prev) => prev - item.price);
      setInventory((prev) => [...prev, item.name]);
    }
  };

  return (
    <div className="rpg-system">
      <h1>Guerreiros do amanhã</h1>

      <div className="layout">
        <div className="left-column">
          <div className="panel character-panel">
            <h2>Personagem</h2>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Nome do Personagem"
              className="character-name-input"
            />

            <div className="character-info">
              <select value={race} onChange={(e) => setRace(e.target.value)}>
                <option value="Humano">Humano</option>
                <option value="Elfo">Elfo</option>
                <option value="Anão">Anão</option>
                <option value="Orc">Orc</option>
              </select>

              <select
                value={characterClass}
                onChange={(e) => setCharacterClass(e.target.value)}
              >
                <option value="Guerreiro">Guerreiro</option>
                <option value="Mago">Mago</option>
                <option value="Arqueiro">Arqueiro</option>
                <option value="Ladino">Ladino</option>
              </select>
            </div>

            <button
              onClick={() => setStatusEffectsVisible(!statusEffectsVisible)}
            >
              {statusEffectsVisible ? "Ocultar" : "Mostrar"} Efeitos de Status
            </button>

            {statusEffectsVisible && (
              <div className="status-effects">
                <div className="status-effect">💪 Força Aprimorada</div>
                <div className="status-effect">🛡️ Proteção Divina</div>
              </div>
            )}
          </div>

          <div className="panel combat-panel">
            <h2>Combate</h2>
            <div className="health-bar-container">
              <div
                className="health-bar"
                style={{
                  width: `${(health / maxHealth) * 100}%`,
                  backgroundColor: getHealthColor(),
                }}
              ></div>
            </div>
            <div className="health-text">
              {health}/{maxHealth} HP
              {health < 30 && <span className="critical"> ⚠️ CRÍTICO!</span>}
            </div>

            <div className="combat-controls">
              <button
                onClick={heal}
                disabled={!inventory.includes("Poção de Cura")}
              >
                Curar (+10 HP)
              </button>
              <button onClick={takeDamage}>Sofrer Dano (-15 HP)</button>
            </div>
          </div>

          <div className="panel xp-panel">
            <h2>Nível {level}</h2>
            <div className="xp-bar-container">
              <div className="xp-bar" style={{ width: `${xpProgress}%` }}></div>
            </div>
            <div className="xp-text">{xp} XP</div>
            <button onClick={completeMissionXP}>
              Completar Missão (+100 XP)
            </button>
            <button onClick={defeatEnemyXP}>Derrotar Inimigo (+50 XP)</button>
          </div>

          <div className="panel attributes-panel">
            <h2>Atributos</h2>
            <div className="points">Pontos disponíveis: {attributePoints}</div>

            {Object.entries(attributes).map(([attr, value]) => (
              <div key={attr} className="attribute-row">
                <span className="attribute-name">
                  {attr.charAt(0).toUpperCase() + attr.slice(1)}
                </span>
                <div className="attribute-controls">
                  <button onClick={() => decreaseAttribute(attr)}>-</button>
                  <span className="attribute-value">{value}</span>
                  <button onClick={() => increaseAttribute(attr)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-column">
          <div className="panel inventory-panel">
            <h2>Inventário</h2>
            <button onClick={toggleInventory} className="inventory-toggle">
              {inventoryOpen ? "🔒 Fechar" : "🎒 Abrir"} Mochila
            </button>

            {inventoryOpen && (
              <div className="inventory-items">
                {inventory.map((item, index) => (
                  <div key={index} className="inventory-item">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel missions-panel">
            <h2>
              Missões ({completedMissionsCount}/{missions.length} completas)
            </h2>

            <div className="mission-input">
              <input
                type="text"
                value={newMission}
                onChange={(e) => setNewMission(e.target.value)}
                placeholder="Nova missão..."
              />
              <select
                value={missionType}
                onChange={(e) => setMissionType(e.target.value)}
              >
                <option value="Principal">Principal</option>
                <option value="Secundária">Secundária</option>
                <option value="Urgente">Urgente</option>
              </select>
              <button onClick={addMission}>Adicionar</button>
            </div>

            <div className="missions-list">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className={`mission ${mission.type.toLowerCase()} ${
                    mission.completed ? "completed" : ""
                  }`}
                >
                  <span className="mission-text">{mission.text}</span>
                  <span className="mission-type">{mission.type}</span>
                  {!mission.completed && (
                    <button onClick={() => completeMission(mission.id)}>
                      Concluir
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="panel spells-panel">
            <h2>Gerador de Encantamentos</h2>
            <input
              type="text"
              value={spellInput}
              onChange={(e) => setSpellInput(e.target.value)}
              placeholder="Digite uma palavra mágica..."
            />
            <button onClick={generateSpell}>Gerar Encantamento</button>
            {generatedSpell && (
              <div className="generated-spell">{generatedSpell}</div>
            )}
          </div>

          <div className="panel ranking-panel">
            <h2>Ranking dos Heróis</h2>
            <div className="heroes-list">
              {sortedHeroes.map((hero, index) => (
                <div key={hero.id} className="hero-rank">
                  <span className="rank">#{index + 1}</span>
                  <span className="hero-name">{hero.name}</span>
                  <span className="hero-class">{hero.class}</span>
                  <input
                    type="number"
                    value={hero.level}
                    onChange={(e) =>
                      updateHeroLevel(hero.id, parseInt(e.target.value))
                    }
                    min="1"
                    max="99"
                    className="level-input"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="panel economy-panel">
            <h2>Economia</h2>
            <div className="gold-display">💰 {gold} moedas de ouro</div>

            <button onClick={() => setShopVisible(!shopVisible)}>
              {shopVisible ? "Fechar" : "Abrir"} Loja
            </button>

            {shopVisible && (
              <div className="shop">
                <h3>Loja</h3>
                {shopItems.map((item) => (
                  <div key={item.id} className="shop-item">
                    <span>{item.name}</span>
                    <span>{item.price} moedas</span>
                    <button
                      onClick={() => buyItem(item)}
                      disabled={gold < item.price}
                    >
                      Comprar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
