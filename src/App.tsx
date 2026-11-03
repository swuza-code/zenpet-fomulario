import React, { useState } from "react";
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  const [tutor, setTutor] = useState("");
  const [pet, setPet] = useState("");
  const [raca, setRaca] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [servico, setServico] = useState("Banho e Tosa");
  const [observacao, setObservacao] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const salvarCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await addDoc(collection(db, "leads"), {
        tutor,
        pet,
        raca,
        telefone,
        email,
        servico,
        observacao: servico === "Outros" ? observacao : "",
        status: "Novo contato",
        criadoEm: serverTimestamp(),
      });

      alert("Contato enviado com sucesso! A nossa equipe entrará em contato em breve.");

      setSucesso(true);
      setTutor("");
      setPet("");
      setRaca("");
      setTelefone("");
      setEmail("");
      setServico("Banho e Tosa");
      setObservacao("");
    } catch (error) {
      console.error("Erro ao enviar dados: ", error);
      alert("Houve um erro ao enviar os seus dados. Por favor, tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "10px",
    border: "1.5px solid #D1C9B9", // Borda num tom de areia mais escuro
    fontSize: "0.95rem",
    color: "#3C5135", // Texto verde musgo
    background: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#3C5135", // Títulos dos campos em verde musgo
    marginBottom: "8px",
  };

  return (
    /* Fundo da página inteira no tom bege/areia da logo */
    <div style={{ minHeight: "100vh", backgroundColor: "#E9E3D5", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        
        <header style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(255, 255, 255, 0.6)",
            padding: "8px 22px",
            borderRadius: "50px",
            border: "1px solid #D1C9B9",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
            marginBottom: "12px"
          }}>
            <span style={{ fontSize: "1.6rem" }}>🐾</span>
            <h1 style={{
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              margin: 0
            }}>
              <span style={{ color: "#3C5135" }}>Zen</span><span style={{ color: "#9284AF" }}>Pet</span>
            </h1>
          </div>
          <p style={{ color: "#3C5135", fontSize: "1rem", fontWeight: 600, margin: 0, letterSpacing: "0.5px" }}>
            CENTRO DE CUIDADO E BEM-ESTAR
          </p>
        </header>

        <section style={{
          backgroundColor: "#F5F0E6", // Fundo do cartão num bege ligeiramente mais claro
          borderRadius: "20px",
          padding: "36px 32px",
          boxShadow: "0 12px 32px -4px rgba(60, 81, 53, 0.1), 0 4px 12px -2px rgba(60, 81, 53, 0.05)",
          border: "1px solid #E0D9CA",
        }}>
          <div style={{ borderBottom: "1px solid #E0D9CA", paddingBottom: "16px", marginBottom: "26px", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.35rem", color: "#3C5135", fontWeight: 700, margin: 0 }}>
              Ficha de Pré-Agendamento
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#5F6D55", marginTop: "6px" }}>
              Preencha os campos abaixo para que a nossa equipe entre em contato com você.
            </p>
          </div>

          {sucesso && (
            <div style={{
              backgroundColor: "#E4DFD1",
              border: "1px solid #3C5135",
              color: "#3C5135",
              padding: "14px 18px",
              borderRadius: "10px",
              marginBottom: "22px",
              textAlign: "center",
              fontSize: "0.95rem",
              fontWeight: 600
            }}>
              ✨ Ficha enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}

          <form onSubmit={salvarCadastro} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={labelStyle}>Nome do Tutor</label>
              <input
                type="text"
                placeholder="Ex: Clara Ribeiro"
                value={tutor}
                onChange={(e) => setTutor(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Nome do Pet</label>
              <input
                type="text"
                placeholder="Ex: Luna"
                value={pet}
                onChange={(e) => setPet(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Raça do Pet</label>
              <input
                type="text"
                placeholder="Ex: Golden Retriever, SRD, Shih Tzu..."
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Telefone / WhatsApp</label>
              <input
                type="tel"
                placeholder="Ex: (11) 98765-4321"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>E-mail de Contato</label>
              <input
                type="email"
                placeholder="Ex: clara@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Serviço Desejado</label>
              <select
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                style={inputStyle}
              >
                <option value="Banho e Tosa">🛁 Banho e Tosa</option>
                <option value="Consulta Veterinária">🩺 Consulta Veterinária</option>
                <option value="Hotelzinho / Creche">🏨 Hotelzinho / Creche</option>
                <option value="Vacinação">💉 Vacinação</option>
                <option value="Adestramento">🎾 Adestramento</option>
                <option value="Outros">✨ Outros</option>
              </select>
            </div>

            {servico === "Outros" && (
              <div>
                <label style={labelStyle}>Qual serviço?</label>
                <input
                  type="text"
                  placeholder="Descreva o serviço desejado..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={enviando}
              style={{
                padding: "15px",
                backgroundColor: "#3C5135", // Verde musgo da logo
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: enviando ? "not-allowed" : "pointer",
                boxShadow: "0 6px 18px rgba(60, 81, 53, 0.25)",
                marginTop: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {enviando ? "A enviar..." : "Enviar Meu Contato"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}