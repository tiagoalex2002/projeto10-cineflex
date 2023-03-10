import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

    const[movies,setMovies]= useState([]);
    const [sessions,setSessions]=useState([]);
    const [assentos,setAssentos]=useState([])
    const [selecionados,setSelecionados]=useState([])
    const [objeto, setObjeto]= useState({})
    const [date,setDate]= useState();

    return (
        <BrowserRouter>
           <NavContainer>CINEFLEX</NavContainer>
            <Routes>
               <Route path="/" element={<HomePage movies={movies} setMovies={setMovies}/>}/>
               <Route path="/sessoes/:idFilme" element={<SessionsPage  sessions={sessions} setSessions={setSessions}/>} />
               <Route path="/assentos/:idSessao" element={<SeatsPage assentos={assentos} setAssentos={setAssentos} selecionados={selecionados} setSelecionados={setSelecionados}
               objeto={objeto} setObjeto={setObjeto} date={date} setDate={setDate}/>}/>
               <Route path="/sucesso" element={<SuccessPage objeto={objeto} date={date} assentos={assentos} />}/>
            </Routes>
            
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
