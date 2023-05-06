class Persona{
    id=0;
    nombre="";
    apellido="";
    edad=0;
    constructor(id,nombre, apellido, edad){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
    }
}
class Heroe extends Persona{
    alterEgo="";
    ciudad="";
    publicado=0;
    constructor(id,nombre,apellido,edad,alterEgo,ciudad,publicado){
        super(id,nombre,apellido,edad);
        this.alterEgo=alterEgo;
        this.ciudad=ciudad;
        this.publicado=publicado;
    }

}
class Villano extends Persona{
    enemigo="";
    robos=0;
    asesinatos=0;
    constructor(id,nombre,apellido,edad,enemigo,robos,asesinatos){
        super(id,nombre,apellido,edad);
        this.enemigo=enemigo;
        this.robos=robos;
        this.asesinatos=asesinatos;
    }
}
let cadena='[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis","publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica","publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}]'


function $(id){
    return document.getElementById(id);
}

let arrayObjetos=JSON.parse(cadena).map(
    (elemento)=>{
        let objeto=null;
        if("alterego" in elemento){
            objeto=new Heroe(elemento.id,elemento.nombre,elemento.apellido,elemento.edad,elemento.alterego, elemento.ciudad,elemento.publicado);
        }else if("enemigo" in elemento){
            objeto=new Villano(elemento.id,elemento.nombre,elemento.apellido,elemento.edad,elemento.enemigo,elemento.robos,elemento.asesinatos);
        }
        return objeto;
    }
);
function CrearCelda(texto, fila, nameClass){
    let nuevaCol= document.createElement("td");
    let nuevoNodo=document.createTextNode(texto);
    nuevaCol.setAttribute("class",nameClass);
    nuevaCol.appendChild(nuevoNodo);
    fila.appendChild(nuevaCol);
}
function BuscarObjetoPorID(id){
    for(let i=0;i<arrayObjetos.length;i++){
        if(arrayObjetos[i].id==parseInt(id)){
            console.log(arrayObjetos[i]);
            return arrayObjetos[i];
        }
    }
}
function BucarIndexPorId(id){
    for(let i=0;i<arrayObjetos.length;i++){
        if(arrayObjetos[i].id==parseInt(id)){
            return i;
        }
    }
}
function llenarFormPorID(colId){
    let objetoEncontrado=BuscarObjetoPorID(colId.textContent);
    $("idForm").value=objetoEncontrado.id;
    $("nombreForm").value=objetoEncontrado.nombre;
    $("apellidoForm").value=objetoEncontrado.apellido;
    $("edadForm").value=objetoEncontrado.edad;

    $("formSelectOption").disabled=true;

    if(objetoEncontrado instanceof Heroe){
        $("formSelectOption").value="Heroe";
        $("alteregoForm").value=objetoEncontrado.alterEgo;
        $("ciudadForm").value=objetoEncontrado.ciudad;
        $("publicadoForm").value=objetoEncontrado.publicado;

        $("opcinesVillano").style.display="none";
        $("opcionesHeroe").style.display="flex";
    }else if(objetoEncontrado instanceof Villano){
        $("formSelectOption").value="Villano";
        $("enemigoForm").value=objetoEncontrado.enemigo;
        $("robosForm").value=objetoEncontrado.robos;
        $("asesinatosForm").value=objetoEncontrado.asesinatos;

        $("opcionesHeroe").style.display="none";
        $("opcinesVillano").style.display="flex";
    }
}
function dibujarTabla(array){
    let arrayFilas=$("cuerpoTabla").rows;
    for(let i=arrayFilas.length-1;i>=0;i--){
        $("cuerpoTabla").deleteRow(i);
    }
    array.forEach(elemento => {
        let nuevaFila=document.createElement("tr");
        let arrayClaves=Object.keys(elemento);
        for(let i=0;i<4;i++){
            CrearCelda(elemento[arrayClaves[i]],nuevaFila, arrayClaves[i]+"Col");
        }
        if(elemento instanceof Heroe){
            CrearCelda(elemento[arrayClaves[4]],nuevaFila,arrayClaves[4]+"Col");
            CrearCelda(elemento[arrayClaves[5]],nuevaFila,arrayClaves[5]+"Col");
            CrearCelda(elemento[arrayClaves[6]],nuevaFila,arrayClaves[6]+"Col");
            CrearCelda("-",nuevaFila,"enemigoCol");
            CrearCelda("-",nuevaFila,"robosCol");
            CrearCelda("-",nuevaFila,"asesinatosCol");
            nuevaFila.setAttribute("class","filaHeroe");
        }else if(elemento instanceof Villano){
            CrearCelda("-",nuevaFila,"alterEgoCol");
            CrearCelda("-",nuevaFila,"ciudadCol");
            CrearCelda("-",nuevaFila,"publicadoCol");
            CrearCelda(elemento[arrayClaves[4]],nuevaFila,arrayClaves[4]+"Col");
            CrearCelda(elemento[arrayClaves[5]],nuevaFila,arrayClaves[5]+"Col");
            CrearCelda(elemento[arrayClaves[6]],nuevaFila,arrayClaves[6]+"Col");
            nuevaFila.setAttribute("class","filaVillano");
        }
        $("cuerpoTabla").appendChild(nuevaFila);
    });
    //update
    let filasTabla=$("cuerpoTabla").rows;
    for(let i=0;i<filasTabla.length;i++){
        filasTabla[i].addEventListener("click",(event)=>{
            let celdasFila=filasTabla[i].cells;
            llenarFormPorID(celdasFila[0]);
            $("tablaContainer").style.display="none";
            $("formularioABM").style.display="flex";

            $("bntABMAgregar").style.display="none";
            $("bntABMModificar").style.display="block";
            $("bntABMEliminar").style.display="block";
        });
    }
}
function MostrarOcultarFila(classFila,opcion){//true: mostramos;false Ocultamos
    let arrayClases=document.getElementsByClassName(classFila);
    for(let i=0;i<arrayClases.length;i++){
        if(opcion==true){
            arrayClases[i].style.display="table-row";
        }else{
            arrayClases[i].style.display="none";
        }
    }
}
function ObtenerPromedioDeEdades(array){
    let suma=array.reduce((acumulador,elemento)=>{
        return acumulador+elemento.edad;
    },0);
    return suma/array.length;
}
function MostrarOcultarCol(idChk,classCol){

    $(idChk).addEventListener("change",(event)=>{
        let arrayElementos= document.getElementsByClassName(classCol);
        if(event.target.checked==false){
            for(let i=0;i<arrayElementos.length;i++){
                arrayElementos[i].style.display="none";
            }
        }else{
            for(let i=0;i<arrayElementos.length;i++){
                arrayElementos[i].style.display="table-cell";
            }
        }

    });
}
function obtenerNuevoId(id){
    let idMasAlto=arrayObjetos.reduce((anterior,elemento)=>{
        if(elemento.id>anterior){
            return elemento.id;
        }else{
            return anterior;
        }
    },0);
    return idMasAlto+1;
}
function limpiarABM(idMasAlto){
    $("idForm").value=idMasAlto;
    $("nombreForm").value="";
    $("apellidoForm").value="";
    $("edadForm").value="";

    $("formSelectOption").disabled=false;
    $("formSelectOption").value="Heroe";
    $("opcinesVillano").style.display="none";
    $("opcionesHeroe").style.display="flex";

    $("alteregoForm").value="";
    $("ciudadForm").value="";
    $("publicadoForm").value="";
    $("enemigoForm").value="";
    $("robosForm").value="";
    $("asesinatosForm").value="";
}
function resetearChkbox(){
    let arrayCeldas=$("thTableHead").cells;
    for(let j=0;j<arrayCeldas.length;j++){
        arrayCeldas[j].style.display="table-cell";
    }
    $("chk_id_Persona").checked=true;
    $("chk_nombre").checked=true;
    $("chk_apellido").checked=true;
    $("chk_edad").checked=true;

    $("chk_alterEgo").checked=true;
    $("chk_ciudad").checked=true;
    $("chk_publicado").checked=true;
    $("chk_enemigo").checked=true;
    $("chk_robos").checked=true;
    $("chk_asesinatos").checked=true;
}
function ordernarArray(nombreCol){
    let arraySorteado=arrayObjetos.sort((a,b)=>{
        if(a[nombreCol]>b[nombreCol]){
            return 1;
        }else if(a[nombreCol]<b[nombreCol]){
            return -1;
        }else{
            return 0;
        }
    });
    return arraySorteado;
}
function validarinput(patron, idInput,idSpam, mensaje){
    if(patron.test($(idInput).value)){
        $(idSpam).textContent="";
        return true;
    }else{
        $(idSpam).textContent=mensaje;
        return false;
    }
}
function validarFormulario(tipoPersona){
    const patronLetra=/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
    const patronTelefono=/^(46[0-9]{6}|11[0-9]{8})$/;
    const patronEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const patronEdad=/^(1[8-9]|[2-9][0-9])$/;
    const patronNumeros=/^[1-9]\d*$/;
    const patronAnios=/^19[4-9]\d|20[0-2]\d|203[0-1]$/;
    if(tipoPersona=="Heroe"){
        return validarinput(patronLetra,"nombreForm","spanNombreForm","No valido- Ejemplo: Jonathan") &&
        validarinput(patronLetra,"apellidoForm","spanApellidoForm","No valido- Ejemplo: Alanoca")&&
        validarinput(patronEdad,"edadForm","spanEdadForm","No valido- Ejemplo: 22")&&
        validarinput(patronLetra,"alteregoForm","spanAlteregoForm","No valido- Ejemplo: Batman")&&
        validarinput(patronLetra,"ciudadForm","spanCiudadForm","No valido- Ejemplo: Gotica")&&
        validarinput(patronAnios,"publicadoForm","spanPublicadoForm","No valido- Ejemplo: 1941");
    }else if(tipoPersona=="Villano"){
        return validarinput(patronLetra,"nombreForm","spanNombreForm","No valido- Ejemplo: Jonathan") &&
        validarinput(patronLetra,"apellidoForm","spanApellidoForm","No valido- Ejemplo: Alanoca")&&
        validarinput(patronEdad,"edadForm","spanEdadForm","No valido- Ejemplo: 22")&&
        validarinput(patronLetra,"enemigoForm","spanEnemigoForm","No valido- Ejemplo: Robin") &&
        validarinput(patronNumeros,"robosForm","spanRobosForm","No valido- Ejemplo: 12") &&
        validarinput(patronNumeros,"asesinatosForm","spanAsesinatosForm","No valido- Ejemplo: 11");
    }



}

window.addEventListener("load",()=>{
    
    dibujarTabla(arrayObjetos);
    //funconalidad options
    $("selectOption").addEventListener("change",(event)=>{
        if(event.target.value=="Heroe"){
            MostrarOcultarFila("filaVillano",false);
            MostrarOcultarFila("filaHeroe",true);
        }else if(event.target.value=="Villano"){
            MostrarOcultarFila("filaVillano",true);
            MostrarOcultarFila("filaHeroe",false);
        }else{
            MostrarOcultarFila("filaVillano",true);
            MostrarOcultarFila("filaHeroe",true);
        }
    });
    
    //promedio por edades
    $("btnPromedio").addEventListener("click",(event)=>{
        let selectOption=$("selectOption").value;
        let arrayFiltrado;
        if(selectOption=="Heroe"){
            arrayFiltrado=arrayObjetos.filter((elemento)=>elemento instanceof Heroe);
        }else if(selectOption=="Villano"){
            arrayFiltrado=arrayObjetos.filter((elemento)=>elemento instanceof Villano);
        }else{
            arrayFiltrado=arrayObjetos.filter((elemento)=>elemento instanceof Persona);
        }
        $("txtPromedio").value=ObtenerPromedioDeEdades(arrayFiltrado);
    });
    //funcionalidad checkboxs-ocultarMostrar columnas
    MostrarOcultarCol("chk_id_Persona","idCol");
    MostrarOcultarCol("chk_nombre","nombreCol");
    MostrarOcultarCol("chk_apellido","apellidoCol");
    MostrarOcultarCol("chk_edad","edadCol");
    MostrarOcultarCol("chk_alterEgo","alterEgoCol");
    MostrarOcultarCol("chk_ciudad","ciudadCol");
    MostrarOcultarCol("chk_publicado","publicadoCol");
    MostrarOcultarCol("chk_enemigo","enemigoCol");
    MostrarOcultarCol("chk_robos","robosCol");
    MostrarOcultarCol("chk_asesinatos","asesinatosCol");

    // FUNCIONALIDAD ORDENADO POR COLUMNA
    let arrayCeldas=$("thTableHead").cells;
    for(let i=0;i<arrayCeldas.length;i++){
        arrayCeldas[i].addEventListener("click",(event)=>{
            //reseteo
            resetearChkbox();
            //funcionarlidad
            arrayObjetos=ordernarArray(event.target.dataset.value);
            dibujarTabla(arrayObjetos);// Al dibujar tabla resetar los checks y mostrar las columnas
        });
    }


    //funcionalidad boton agregar de la tabla
    $("btnTablaAgregar").addEventListener("click",(event)=>{
        let nuevoId=obtenerNuevoId();
        limpiarABM(nuevoId);
        $("tablaContainer").style.display="none";
        $("formularioABM").style.display="flex";

        $("bntABMAgregar").style.display="block";
        $("bntABMModificar").style.display="none";
        $("bntABMEliminar").style.display="none";
    });
    //funcionalidad Elegir opcion heroe villano en el ABM
    $("formSelectOption").addEventListener("change",(event)=>{
        if(event.target.value=="Heroe"){
            $("opcinesVillano").style.display="none";
            $("opcionesHeroe").style.display="flex";
        }else if(event.target.value="Villano"){
            $("opcinesVillano").style.display="flex";
            $("opcionesHeroe").style.display="none";
        }
    });
    //funcionalidad boton cancelar
    $("bntABMCancelar").addEventListener("click",(event)=>{
        $("tablaContainer").style.display="block";
        $("formularioABM").style.display="none";
    });

    //funcionalidad Agregarn en el ABM

    $("bntABMAgregar").addEventListener("click",(event)=>{
        let nuevoUsuario;
        if($("formSelectOption").value=="Heroe"){
            nuevoUsuario=new Heroe(
                obtenerNuevoId(),
                $("nombreForm").value,
                $("apellidoForm").value,
                parseInt($("edadForm").value),
                $("alteregoForm").value,
                $("ciudadForm").value,
                parseInt($("publicadoForm").value)
            );
        }else{
            nuevoUsuario=new Villano(
                obtenerNuevoId(),
                $("nombreForm").value,
                $("apellidoForm").value,
                parseInt($("edadForm").value),
                $("enemigoForm").value,
                parseFloat($("robosForm").value),
                parseInt($("asesinatosForm").value)
            );
        }
        //validamos el form
        if(validarFormulario($("formSelectOption").value)==true){
            arrayObjetos.push(nuevoUsuario);
            $("tablaContainer").style.display="block";
            $("formularioABM").style.display="none";
            resetearChkbox();
            dibujarTabla(arrayObjetos);
        }
    });

    //funcionalidad Eliminar
    $("bntABMEliminar").addEventListener("click",(event)=>{
        arrayObjetos=arrayObjetos.filter((elemento)=>elemento.id!=$("idForm").value);
        dibujarTabla(arrayObjetos);
        $("tablaContainer").style.display="block";
        $("formularioABM").style.display="none";
    });
    //funcionalidad Modificar 
    $("bntABMModificar").addEventListener("click",(event)=>{
        let objetoEncontrado=BuscarObjetoPorID($("idForm").value);
        objetoEncontrado.nombre=$("nombreForm").value;
        objetoEncontrado.apellido=$("apellidoForm").value;
        objetoEncontrado.edad=parseInt($("edadForm").value);
        if(objetoEncontrado instanceof Heroe){
            objetoEncontrado.alterEgo=$("alteregoForm").value;
            objetoEncontrado.ciudad=$("ciudadForm").value;
            objetoEncontrado.publicado= parseFloat($("publicadoForm").value);
        }else{
            objetoEncontrado.enemigo=$("enemigoForm").value;
            objetoEncontrado.robos=parseInt($("robosForm").value);
            objetoEncontrado.asesinatos=parseInt($("asesinatosForm").value);
        }
        if(validarFormulario($("formSelectOption").value)==true){
            $("tablaContainer").style.display="block";
            $("formularioABM").style.display="none";
            resetearChkbox();
            dibujarTabla(arrayObjetos);
        }
    });
});
