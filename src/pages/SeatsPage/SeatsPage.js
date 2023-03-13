import styled from "styled-components"
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SeatsPage(props) {

    const params=useParams();
    console.log(params)


    useEffect(() => {
        const promiseSeats = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`);
        promiseSeats.then(resposta => {
            props.setAssentos(resposta.data);
        });
    }, []);

    console.log(props.assentos)
    const lista= props.assentos.seats
    console.log(lista)

    function Reservation(event){
        event.preventDefault()

        const nom= document.querySelector("#buyer")
        const cpf= document.querySelector("#reg")
        const NOM= nom.value
        const CPF=cpf.value

        const object= { ids: props.selecionados, name:NOM, cpf:CPF}

        const promisseReserve=axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",object)
    }


    function Selection(item){
        {props.setSelecionados(item.id)}
    }





  

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>{lista?.map((c)=>  (<SeatItem data-test="seat" onClick={() => Selection(c)}>{c.name}</SeatItem>))}</SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={Reservation}>
                Nome do Comprador:
                <input id="buyer" data-test="client-name" placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input id="reg" data-test="client-cpf" placeholder="Digite seu CPF..." />

                <Link to={`/sucesso`}><button id="btn">Reservar Assento(s)</button></Link>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={props.assentos.movie?.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{props.assentos.movie?.title}</p>
                    <p>{props.assentos.day?.weekday} - {props.assentos.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.button`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`