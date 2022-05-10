import '../../Assets/Css/mdGenero.css'
import '../../Assets/Css/global.css'
import { FilmesGeneros } from '../../Services/api'
import React, { useEffect, useState } from "react"


export const ModalGenero = (props: any): JSX.Element => {


    const [nomeGenero, setNomeGenero] = useState('');
    const EditarUm = (id:any) => {
        FilmesGeneros.put(`Generos/${id}`, { nomeGenero: nomeGenero })   
        .then(() => window.location.reload())
    }
    
    return (
        


            <div>
                        <div className={'paiModal ' + props.mostrar}>
                            <div className='modal'>
                                <div className='headerMini'>
        
                                    <div className='alinhamentoHeaderMd'>
                                        <div className='alinhamentoHeaderMini'>
                                            <button className='buttunFechamento' onClick={props.funcao}>X</button>
                                        </div>
                                    </div>
                                </div>
        
        
                                <div className='bodyMd'>
                                    <div className='alinhamentoBodyMd'>
        

                                        <div>
                                            <p className='pMd'>Editar Genero</p>
                                            <input
                                                type="text"
                                                className="inputGenero"
                                                defaultValue={nomeGenero}
                                                onChange={(e) => setNomeGenero(e.target.value)}
                                            />
        
                                            <div className='buttonAlinhamento'>
                                                <button className='salvarGeneros' onClick={() => EditarUm(props.idGenero)}>Salvar</button> 
                                            </div>
                                        </div>
                                        
        
                                    </div>
                                </div>
        
                                <div className="footerMini">
        
                                </div>
                            </div>
                        </div>
                    
    
                
            </div>
            
            
    )     
}
