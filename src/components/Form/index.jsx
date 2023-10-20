import { useState } from 'react'
import { IMaskInput } from "react-imask";
import NumericInput from 'react-numeric-input';
import weightIcon from '../../assets/images/weight-icon.svg'
import heightIcon from '../../assets/images/height-icon.svg'
import styles from './Form.module.css'

const Form = () => {
    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [resultado, setResultado] = useState(0);
    const [carregarResultado, setcarregarResultado] = useState(false);
    const [situacao, setSituacao] = useState('');
    const [invalidInput, setInvalidInput] = useState(false);

    const verificaSituacao = () =>  {
        if (resultado < 17) {
            setSituacao('muito abaixo do peso');
        } else if (resultado >= 17 && resultado <= 18.49) {
            rsetSituacao('abaixo do peso');
        } else if (resultado >= 18.5 && resultado <= 24.99) {
            setSituacao('peso normal');
        } else if (resultado >= 25 && resultado <= 29.99) {
            setSituacao('acima do peso');
        } else if (resultado >= 30 && resultado <= 34.99) {
            setSituacao('obesidade I');
        } else if (resultado >= 35 && resultado <= 39.99) {
            setSituacao('obesidade II (severa)');
        } else if (resultado > 40) {
            setSituacao('obesidade III (mórbida)');
        }        
    }

    const calculaIMC = () => {
        if(peso != 0 && altura != 0) {
            const calculo = (peso / (altura * altura)).toFixed(2);
            const calculoFinal = parseFloat(calculo);
            setInvalidInput(false);
            setResultado(calculoFinal);
            verificaSituacao();
            setcarregarResultado(true);
        } else {
            setInvalidInput(true);
        }    
    }

    return (
        <>
            <div className='container2'>            
                <form className='section'>
                    <h2 className='sectionTitle'>
                        Preencha os dados e calcule seu IMC:
                    </h2>
                    <div className={styles.formItems}>
                        <div className={styles.item}>
                            <label className={styles.itemName}>
                                <img src={weightIcon} alt="icone de balança" className={styles.itemIcon}/>
                                <p className={styles.itemData}>Peso em Kg:</p>
                            </label>
                            <IMaskInput mask="000" className={styles.itemInput} type="number" placeholder='70' onChange={evento => setPeso(Number(evento.target.value))}/>
                        </div>
                        <div className={styles.item}>
                            <label className={styles.itemName}>
                                <img src={heightIcon} alt="icone de altura" className={styles.itemIcon}/>
                                <p className={styles.itemData}>Altura em metros:</p>
                            </label>
                            <IMaskInput mask="0.00" className={styles.itemInput} type="number" placeholder='1.74' onChange={evento => setAltura(Number(evento.target.value))} onBlur={calculaIMC} /> 
                        </div>
                        <button type="button" className={styles.button} onClick={calculaIMC}>Calcular</button>
                    </div>
                </form>
                {invalidInput &&
                    <p className={styles.invalidInput}><b>Digite um valor válido.</b></p>
                }
            </div>
            {carregarResultado &&
                <div className='container'>
                    <section className='section'>
                        <h2 className='sectionTitle'>
                            Resultado: 
                        </h2>
                        <div className={styles.items}>
                            <h4 className={styles.itemName}>
                                Seu IMC é de {resultado} kg/m2.
                            </h4>
                            <p className={styles.itemDetails}>
                                De acordo com a Organização Mundial da Saúde, seu IMC é considerado <b>{situacao}</b>.
                            </p>
                            <p className={styles.itemNote}>
                                <b>Nota:</b> o cálculo de IMC não leva em consideração a composição corporal. Por esse motivo, pessoas com muita massa muscular, como é o caso de alguns atletas, podem apresentar um IMC acima do normal. O ideal é consultar um nutricionista para fazer uma avaliação mais detalhada.
                            </p>
                        </div>
                    </section>
                </div>
            }
        </>
        
        
    )
}

export default Form