import '../../Assets/Css/mdFilmes.css'
import '../../Assets/Css/global.css'

import Swal from 'sweetalert2'

import React, { useEffect, useState } from "react"

import { FilmesGeneros } from '../../Services/api'

export const ModalFilmes = (props:any):JSX.Element => {

    const [generos, setGeneros] = useState<any[]>([]);
    const ListarGeneros = (): any => {

        FilmesGeneros.get('Generos')
            .then(resultado => {

                setGeneros(resultado.data)
            })


    }
    useEffect(() => {
        ListarGeneros()
    }, [])

    const [nomeFilme, setNomeFilme] = useState('');
    const EditarFilme = (id:any, idFilmes:string):any => {
        if (nomeFilme != '') {
            
            FilmesGeneros.put(`Generos/${id}/Filmes/${idFilmes}`, { nomeFilme : nomeFilme })  
            .then(() => setNomeFilme('')) 
            .then(() => window.location.reload())
            console.log(props);
        }
        else{
            Swal.fire({
                title: 'Putz... Está vazio meu xapa',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#41B8D2',
                cancelButtonColor: '#F6511D',
        })
        }
    }

    return(
        
        <div>
            <div className={'modal ' + props.mostrar}>
                <div>

                    <div className='headerMiniFilme'>
                        <div className='alinhamentoHeaderMd'>
                            <div className='alinhamentoHeaderMini'>
                                <button className='buttunFechamento' onClick={props.funcao}>X</button>
                            </div>  
                        </div>
                    </div>
                    <div className='bodyMiniFilme'>
                        <div className='alinhamentoBodyMiniFilme'>
                            <div>
                                <p className='pModal'>Renomear filme</p>
                                <input type="text"
                                className='inputGenero'
                                defaultValue={nomeFilme}
                                onChange={(e) => setNomeFilme(e.target.value)}
                                />
                            </div>
                            <div>
                                <p className='pModal'>Recadastrar Genêro</p>
                                <select name="selectDoUsuario" className="sectionFilmes">
                                    <option hidden value={''}>Generos</option>
                                    {generos.map((item):any => {
                                        return(
                                            <option className="tamanhoPlaceholder" key={item.id} defaultValue={item.id}>{item.nomeGenero}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div>
                                <button className='buttonCadastrar' onClick={() => EditarFilme(props.pegarIdGenero, props.pegarId)}>Cadastrar</button>
                            </div>

                        </div>
                    </div>
                    <div className='footerMiniLaranja'>
                    </div>
                </div>
            </div>
        </div>
    )
}