import { Routes, Route } from "react-router-dom";
import { Home } from "../index";
import { Admin } from "../index";
import { Kardex } from "../index";
import { Reportes } from "../index";
import { Motatomic } from "../index";
import { Configurar } from "../index";

export function MyRoutes() {
  return ( 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/kardex" element={<Kardex />}/>
        <Route path="/reportes" element={<Reportes />}/>
        <Route path="/motatomic" element={<Motatomic />}/>
        <Route path="/configurar" element={<Configurar />}/>
      </Routes>
    
      
  );
}
