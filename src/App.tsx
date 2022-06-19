import { useState } from 'react';
import styles from './app.module.css'
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { levels, calculeteImc, Level } from './helpers/IMC';
import{ GridItem } from './components/GridItem';


const App = () => {

  const [hieghtFiled, SetHieghtField] = useState<number>(0);
  const [weightFiled, SetWeightField] = useState<number>(0);
const[toShow, setToShow] = useState<Level | null>(null);


const handleCalculateButton = () => {
  if (hieghtFiled && weightFiled) {
    setToShow(calculeteImc(hieghtFiled, weightFiled));
  }else {
      alert("Digite todos os campos.")
  }
}

const handleBackButton = () =>{
  setToShow(null);
  SetHieghtField(0);
  SetWeightField(0);
}


  return (
    <div className={styles.main}>
        <header>
            <div className={styles.headerContainer}>
                <img src={poweredImage} alt="imagem powered"  width={150}/>
            </div>
        </header>
        <div className={styles.container}>
            <div className={styles.leftSide}>
              <h1>Calcule o seu IMC</h1>
              <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Munda de Saúde para calcular o peso ideal de cada pessoa.</p>

              <input 
                type="number"
                placeholder="Digite a sua altura. Ex: 1,5 (em métros)"
                value={hieghtFiled > 0 ? hieghtFiled : ' '}
                onChange={e => SetHieghtField(parseFloat(e.target.value))}
                disabled={toShow ? true : false}
                />
              <input
                type="number"
                placeholder="Digite o seu peso. Ex: 75,3 (em Kg)"
                value={weightFiled > 0 ? weightFiled : ' '}
                onChange={e => SetWeightField(parseFloat(e.target.value))}
                disabled={toShow ? true : false}
              />

              <button onClick={handleCalculateButton}
                disabled={toShow ? true : false}
                >Calcular IMC
              </button>

            </div>

            <div className={styles.rightSide}>
                 
                 {!toShow &&
                 <div className={styles.grid}>
                    {levels.map((item, key) =>(
                      <GridItem key={key} item={item} />
                    ))}
                 </div>
                 }

                 {toShow &&
                  <div className={styles.rightBig}>
                    <div className={styles.rightArrow} onClick={handleBackButton}>
                        <img src={leftArrowImage}  alt="" width={25}/>
                    </div>
                    <GridItem item={toShow}/>
                  </div>
                 
                 }

            </div>
        </div>
    </div>
  );
}

export default App;
