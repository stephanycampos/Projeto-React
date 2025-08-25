import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function FormIMC() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [genero, setGenero] = useState("");
  const [resultado, setResultado] = useState(null);

  function calcularIMC(e) {
    e.preventDefault();

    const alt = parseFloat(altura.replace(",", "."));
    const pes = parseFloat(peso.replace(",", "."));

    if (!alt || !pes || alt <= 0 || pes <= 0 || !genero) {
      alert("Por favor, insira altura, peso e selecione o gênero!");
      return;
    }

    const alturaMetros = alt / 100;
    const imc = (pes / (alturaMetros ** 2)).toFixed(2);

    let classificacao = "";
    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 25) classificacao = "Peso normal";
    else if (imc < 30) classificacao = "Sobrepeso";
    else if (imc < 35) classificacao = "Obesidade Grau I";
    else if (imc < 40) classificacao = "Obesidade Grau II";
    else classificacao = "Obesidade Grau III";

    setResultado({ imc, classificacao, genero });
  }

  return (
    <div className="form-container">
      <h2>Calculadora de IMC</h2>
      <form onSubmit={calcularIMC}>
        <div className="input-group">
          <label>Altura:</label>
          <div className="input-with-unit">
            <NumericFormat
              value={altura}
              onValueChange={(values) => setAltura(values.value)}
              thousandSeparator={false}
              decimalSeparator=","
              decimalScale={2}
              allowNegative={false}
              placeholder="Ex: 170"
              suffix=" cm"
              customInput="input"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Peso:</label>
          <div className="input-with-unit">
            <NumericFormat
              value={peso}
              onValueChange={(values) => setPeso(values.value)}
              thousandSeparator={false}
              decimalSeparator=","
              decimalScale={2}
              allowNegative={false}
              placeholder="Ex: 54"
              suffix=" kg"
              customInput="input"
            />
          </div>
        </div>

        <div className="genero">
          <label>Gênero:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="genero"
                value="Masculino"
                checked={genero === "Masculino"}
                onChange={(e) => setGenero(e.target.value)}
              />
              Masculino
            </label>
            <label>
              <input
                type="radio"
                name="genero"
                value="Feminino"
                checked={genero === "Feminino"}
                onChange={(e) => setGenero(e.target.value)}
              />
              Feminino
            </label>
          </div>
        </div>

        <button type="submit">Calcular</button>
      </form>

      {resultado && (
        <div className="resultado">
          <h3>Resultado</h3>
          <p>IMC: <strong>{resultado.imc} kg/m²</strong></p>
          <p>Classificação: <strong>{resultado.classificacao}</strong></p>
          <p>Gênero selecionado: <strong>{resultado.genero}</strong></p>
        </div>
      )}
    </div>
  );
}
