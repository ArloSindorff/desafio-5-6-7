import { Header } from "../../Components/header/header"
import { Footer } from "../../Components/footer/footer"
import React, { useEffect, useState } from "react"
import { FilmesGeneros } from '../../Services/api'

import Swal from 'sweetalert2'

import { ModalGenero } from "../../Components/modalGenero/modalGenero"

import '../../Assets/Css/generos.css'

import teatro from '../../Assets/IMG/theater1.png'

let headerTres:any = {
    descricao: 'Cadastre os gêneros dos filmes'
}

export const Genero = (props:any):JSX.Element => {

    const [modal, setModal] = useState('hide')
    const [idGenero, setIdGenero] = useState(0)
    const AbrirFechar = (estado:any, id:number) => {

        if(estado === 'hide'){
            setModal('show')
        }
        else{
            setModal('hide')
        }

        setIdGenero(id)
    }

    const [generos, setGeneros] = useState<any[]>([]);

    const ListarGeneros = ():any => {

        FilmesGeneros.get('Generos')
        .then(resultado => {

            setGeneros(resultado.data)
        })
        

    }

    useEffect(() => {
        ListarGeneros()
    }, [])

   
    
    const [nomeGenero, setNomeGenero] = useState('');
    
    const Salvar = () => {
        if(nomeGenero != ''){

            FilmesGeneros.post('Generos', {nomeGenero : nomeGenero})
            .then(ListarGeneros()) 
            .then(() => window.location.reload())   
        }
        else{
            Swal.fire({
                title: 'Putz... Está vazio meu xapa',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#41B8D2',
                cancelButtonColor: '#F6511D',
              }).then((result) => {
               
            })
        }
    }
    
    const Excluir = (id:number) => {
        if(window.confirm('Tem certeza meu xapa?')){
            FilmesGeneros.delete(`Generos/${id}`)
            .then(() => window.location.reload())
        }
    }


    
   
    return(
        <div>
            <Header objeto = {headerTres}></Header>
            <ModalGenero mostrar={modal} funcao={AbrirFechar} idGenero={idGenero}></ModalGenero>
            <main className="mainGenero">
                <section className="alinhamentoGenero">
                    <section className="primeiraSectionGeneros">
                        <div className="tituloGenero">
                            <h1 className="h1Generos">Gêneros</h1>
                            <img src={teatro} alt="Mascaras de teatro" className="imgGeneros" />
                        </div>
                        <div className="baseDoTituloGenero">
                            <div className="nucleoBase">
                                <h2 className="h2Generos">Cadastrar Gênero</h2>
                                <input
                                    type="text"
                                    placeholder="Gênero"
                                    className="inputGenero"
                                    value={nomeGenero}
                                    onChange={(estadoDoInput) => setNomeGenero(estadoDoInput.target.value)}
                                    maxLength={30}
                                />
                            </div>
                            <button className="salvarGeneros" id="salvar" onClick={() => Salvar()}>Salvar</button>
                        </div>
                    </section>
                    <section className="segundaSectionGeneros">


                        {generos.map((item):any =>{

                            return(
                                <div key={item.id}>
                                    <div className="generos">
                                        
                                        <div>
                                            <p className="pGeneros" id="generoItem">{item.nomeGenero}</p>
                                        </div>
                                            
                                        <div>
                                            <button className="editarGenero" onClick={ () => {AbrirFechar(modal, item.id)}}>Editar</button>
                                            <button className="excluirGenero" onClick={() => Excluir(item.id)}>Excluir</button>
                                        </div>
                                        
                                    </div>
                                </div>   
                            )
                            
                        })}

                        
                    </section>
                </section>
                <div className={'fundo ' + modal}></div>
            </main>
            <Footer></Footer>
        </div>
    )
}