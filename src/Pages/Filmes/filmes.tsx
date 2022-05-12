import { Header } from "../../Components/header/header"
import { Footer } from "../../Components/footer/footer"
import Cinema from '../../Assets/IMG/cinema1.png'
import '../../Assets/Css/mdFilmes.css'

import Swal from 'sweetalert2'

import '../../Assets/Css/filmes.css'
import '../../Assets/Css/global.css'
import React, { useEffect, useState } from "react"

import { ModalFilmes } from "../../Components/modalFilmes/modalFilmes"

import { FilmesGeneros } from '../../Services/api'

let headerQuatro: any = {
    descricao: 'Cadastre os filmes de sua preferência'
}

export const Filmes = (props:any): JSX.Element => {

    // Generos e filmes - tem constrant<any[]>
    const [generos, setGeneros] = useState<any[]>([]);
    const [filmes, setFilmes] = useState<any[]>([]);

    const ListarGeneros = () => {

        FilmesGeneros.get('Generos')
        .then(resultado => {
            setGeneros(resultado.data)
        })

    }


    let filmesListados: boolean = false
    
    const ListarFilmes = () => {
        let quantidadeDeElementos: number = generos.length
        
        
        for (let i = 0; i < quantidadeDeElementos; i++) {
            FilmesGeneros.get(`Generos/${i + 1}/Filmes`)
                .then(resultado =>{
                    setFilmes(filmes => filmes.concat(resultado.data))
                })
        }
        
    }
    

    useEffect(() => {
        FilmesGeneros.get('Generos')
        .then(resultado => {
            setGeneros(resultado.data)
        })
    }, [])

    useEffect(() => {
        ListarFilmes()
    }, [generos.length])

    useEffect(() => {
        console.log(filmes);
    }, [filmes])

    const Excluir = (id:number, idFilme:number) => {
        if(window.confirm('Certeza meu xapa?')){

            FilmesGeneros.delete(`Generos/${id}/Filmes/${idFilme}`)
            .then(() => window.location.reload())
        }
    }


    const [nomeFilme, setNomeFilme] = useState('')
    const [idGenero, setIdGenero] = useState('')

    const Salvar = (id:any) => {
        if(nomeFilme != ''){

            FilmesGeneros.post(`Generos/${id}/Filmes`, {nomeFilme : nomeFilme})
            .then(() => setNomeFilme(''))
            .then(() => window.location.reload())
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

    
    const [idFilmes, setIdFilmes] = useState('')
    const [modall, setModal] = useState('hide')
    const AbrirFechar = (estado:any, id:any):any => {

        if(estado === 'hide'){
            setModal('show')
        }
        else{
            setModal('hide')
        }

        setIdFilmes(id)
        setIdGenero(id)
        
    }

    

    return (

        <div>
            <Header objeto={headerQuatro}></Header>
            <ModalFilmes id="topo" mostrar={modall} funcao={AbrirFechar} pegarId={idFilmes} pegarIdGenero={idGenero}></ModalFilmes>
            <main className="mainFilmes">
                <section className="alinhamentoMainFilmes">
                    <section>

                        <div className="divH1Filme">
                            <h1 className="h1Filme">Filmes</h1>
                            <img src={Cinema} alt="Bobina de cinema" className="imgFilme" />
                        </div>
                        <div className="alinhamentoInputsFilmes">
                            <div className="divH2Filmes">
                                <h2 className="h2Cadastrar">Cadastrar Filmes</h2>
                            </div>
                            <div className="nucleoInputFilmes">
                                <div>
                                    <input
                                     className="inputCadastrarFilmes"
                                     type="text" 
                                     placeholder="Título do Filme"
                                     value={nomeFilme}
                                     onChange={(estadoDoInput) => setNomeFilme(estadoDoInput.target.value)}
                                     maxLength={20}
                                      />
                                </div>
                                <select name="selectDoUsuario" className="sectionFilmes" onChange={(estadoDoSelect) => setIdGenero(estadoDoSelect.target.value)}>
                                    <option className="tamanhoPlaceholder" value="" hidden>Genêro</option>
                                    {generos.map((item):any => {
                                        return(
                                            <option className="tamanhoPlaceholder" key={item.id} value={item.id}>{item.nomeGenero}</option>
                                        )
                                    })}
                                    
                                </select>
                                
                                
                                <button className="salvarFIlmes" onClick={() => {Salvar(idGenero)}}>Salvar</button>
                                    
                                
                                    
                               
                            </div>
                        </div>
                    </section>

                    <section className="sectionDoisFilmes">

                        <div className="alinhamentoFilmesDois">
                            {filmes.map((item):any => {
                                
                                return(
                                    <div className="listas" key={item.id}>
                                        <div className="pDosFilmes">
                                            <div>
                                                <p className="pFilmes">{item.nomeFilme}</p>
                                            </div>
                                            <div className="tamanhoDosGeneros">
                                                <p className="pFilmes">{item.Genero.nomeGenero}</p> 
                                            </div>
                                        </div>

                                        <div>
                                            <a href="#topo">
                                                <button className="editarFilmes" onClick={ () => {AbrirFechar(modall, item.id)}}>Editar</button>
                                            </a>
                                            <button className="excluirFilmes" onClick={() => Excluir(item.Genero.id, item.id)}>Excluir</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </section>
                    
                    


                </section>
               
                
            </main>
            <Footer></Footer>
            <div className={'fundo ' + modall}></div>
        </div>
    )
}