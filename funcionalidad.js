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
    toString(){
        return  "Id: "+this.id+"\n"+
                "Nombre: "+this.nombre+"\n"+
                "Apellido: "+this.apellido+"\n"+
                "Edad: "+this.edad.toString()+"\n";
    }
    toJson(){
        return JSON.stringify(this);
    }
}
class Empleado extends Persona{
    sueldo=0;
    ventas=0;
    constructor(id,nombre,apellido,edad,sueldo,ventas){
        super(id,nombre,apellido,edad);
        this.sueldo=sueldo;
        this.ventas=ventas;
    }
    toString(){
        return  "DATOS DEL EMPLEADO\n"+
                super.toString()+
                "Sueldo: "+this.sueldo.toString()+"\n"+
                "Venta: "+this.ventas.toString()+"\n";
    }
    toJson(){
        return JSON.stringify(this);
    }
}
class Cliente extends Persona{
    compras=0;
    telefono=0;
    constructor(id,nombre,apellido,edad,compras,telefono){
        super(id,nombre,apellido,edad);
        this.compras=compras;
        this.telefono=telefono;
    }
    toString(){
        return  "DATOS DEL CLIENTE\n"+
                super.toString()+
                "Compras: "+this.compras.toString()+"\n"+
                "Teleforo: "+this.telefono.toString()+"\n";
    }
    toJson(){
        return JSON.stringify(this);
    }
}

let cadena='[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "ventas":15000, "sueldo":2000},{"id":2,"nombre":"Ramiro", "apellido":"Escobar", "edad":35, "ventas": 6000, "sueldo": 1000},{"id":3, "nombre":"Facundo","apellido":"Cairo", "edad":30, "ventas":500, "sueldo":15000},{"id":4, "nombre":"Fernando", "apellido":"Nieto","edad":18, "compras":8000, "telefono":"152111131"},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20,"compras":50000, "telefono":"42040077"},{"id":666, "nombre":"Nicolas", "apellido":"Serrano", "edad":23,"compras":7000, "telefono":"1813181563"}]';

let arrayObjetos=JSON.parse(cadena).map(
    (elemento)=>{
        let objeto=null;
        if("ventas" in elemento){
            objeto=new Empleado(elemento.id,elemento.nombre,elemento.apellido,elemento.edad,elemento.sueldo, elemento.ventas);
        }else if("compras" in elemento){
            objeto=new Cliente(elemento.id,elemento.nombre,elemento.apellido,elemento.edad,elemento.compras,elemento.telefono);
        }
        return objeto;
    }
);

function $(id){
    return document.getElementById(id);
}

function CrearCelda(texto, fila, nameClass){
    let nuevaCol= document.createElement("td");
    let nuevoNodo=document.createTextNode(texto);
    nuevaCol.setAttribute("class",nameClass);
    nuevaCol.appendChild(nuevoNodo);
    fila.appendChild(nuevaCol);
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
function BuscarObjetoPorID(id){
    for(let i=0;i<arrayObjetos.length;i++){
        if(arrayObjetos[i].id==parseInt(id)){
            console.log(arrayObjetos[i]);
            return arrayObjetos[i];
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

    if(objetoEncontrado instanceof Cliente){
        $("formSelectOption").value="Cliente";
        $("comprasForm").value=objetoEncontrado.compras;
        $("telefonoForm").value=objetoEncontrado.telefono;

        $("opcionesEmpleado").style.display="none";
        $("opcinesCliente").style.display="flex";
    }else if(objetoEncontrado instanceof Empleado){
        $("formSelectOption").value="Empleado";
        $("sueldoForm").value=objetoEncontrado.sueldo;
        $("ventasForm").value=objetoEncontrado.ventas;

        $("opcinesCliente").style.display="none";
        $("opcionesEmpleado").style.display="flex";
    }
}
function limpiarABM(idMasAlto){
    $("idForm").value=idMasAlto;
    $("nombreForm").value="";
    $("apellidoForm").value="";
    $("edadForm").value="";

    $("formSelectOption").disabled=false;
    $("formSelectOption").value="Cliente";
    $("opcionesEmpleado").style.display="none";
    $("opcinesCliente").style.display="flex";
    $("comprasForm").value="";
    $("telefonoForm").value="";

    $("sueldoForm").value="";
    $("ventasForm").value="";
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
        if(elemento instanceof Empleado){
            CrearCelda(elemento[arrayClaves[4]],nuevaFila,arrayClaves[4]+"Col");
            CrearCelda(elemento[arrayClaves[5]],nuevaFila,arrayClaves[5]+"Col");
            CrearCelda("-",nuevaFila,"comprasCol");
            CrearCelda("-",nuevaFila,"telefonoCol");
            nuevaFila.setAttribute("class","filaEmpleado");
        }else if(elemento instanceof Cliente){
            CrearCelda("-",nuevaFila,"ventasCol");
            CrearCelda("-",nuevaFila,"sueldoCol");
            CrearCelda(elemento[arrayClaves[4]],nuevaFila,arrayClaves[4]+"Col");
            CrearCelda(elemento[arrayClaves[5]],nuevaFila,arrayClaves[5]+"Col");
            nuevaFila.setAttribute("class","filaCliente");
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
        });
    }
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
    if(tipoPersona=="Empleado"){
        return validarinput(patronLetra,"nombreForm","spanNombreForm","No valido- Ejemplo: Jonathan") &&
        validarinput(patronLetra,"apellidoForm","spanApellidoForm","No valido- Ejemplo: Alanoca")&&
        validarinput(patronEdad,"edadForm","spanEdadForm","No valido- Ejemplo: 22")&&
        validarinput(patronNumeros,"sueldoForm","spanSueldoForm","No valido- Ejemplo: 120000")&&
        validarinput(patronNumeros,"ventasForm","spanVentasForm","No valido- Ejemplo: 120");
    }else if(tipoPersona=="Cliente"){
        return validarinput(patronLetra,"nombreForm","spanNombreForm","No valido- Ejemplo: Jonathan") &&
        validarinput(patronLetra,"apellidoForm","spanApellidoForm","No valido- Ejemplo: Alanoca")&&
        validarinput(patronEdad,"edadForm","spanEdadForm","No valido- Ejemplo: 22")&&
        validarinput(patronNumeros,"comprasForm","spanComprasForm","No valido- Ejemplo: 120") &&
        validarinput(patronTelefono,"telefonoForm","spanTelefonoForm","No valido- Ejemplo: 1125607164");
    }



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
    $("chk_sueldo").checked=true;
    $("chk_ventas").checked=true;
    $("chk_compras").checked=true;
    $("chk_telefono").checked=true;
}


///



window.addEventListener("load",()=>{
    dibujarTabla(arrayObjetos);
    // FUNCIONALIDAD CHECKBOX
    MostrarOcultarCol("chk_id_Persona","idCol");
    MostrarOcultarCol("chk_nombre","nombreCol");
    MostrarOcultarCol("chk_apellido","apellidoCol");
    MostrarOcultarCol("chk_edad","edadCol");
    MostrarOcultarCol("chk_sueldo","sueldoCol");
    MostrarOcultarCol("chk_ventas","ventasCol");
    MostrarOcultarCol("chk_compras","comprasCol");
    MostrarOcultarCol("chk_telefono","telefonoCol");

    //FUNCIONALIDAD OPTION
    $("selectOption").addEventListener("change",(event)=>{
        if(event.target.value=="Cliente"){
            MostrarOcultarFila("filaCliente",true);
            MostrarOcultarFila("filaEmpleado",false);
        }else if(event.target.value=="Empleado"){
            MostrarOcultarFila("filaCliente",false);
            MostrarOcultarFila("filaEmpleado",true);
        }else{
            MostrarOcultarFila("filaCliente",true);
            MostrarOcultarFila("filaEmpleado",true);
        }
    });

    //promedio
    $("btnPromedio").addEventListener("click",(event)=>{
        let selectOption=$("selectOption").value;
        let arrayFiltrado;
        if(selectOption=="Cliente"){
            arrayFiltrado=arrayObjetos.filter((elemento)=>elemento instanceof Cliente);
        }else if(selectOption=="Empleado"){
            arrayFiltrado=arrayObjetos.filter((elemento)=>elemento instanceof Empleado);
        }else{
            arrayFiltrado=arrayObjetos.filter((elemento)=>elemento instanceof Persona);
        }
        $("txtPromedio").value=ObtenerPromedioDeEdades(arrayFiltrado);
    });


    //funcionalidad Elegir opcion ABM
    $("formSelectOption").addEventListener("change",(event)=>{
        if(event.target.value=="Cliente"){
            $("opcionesEmpleado").style.display="none";
            $("opcinesCliente").style.display="flex";
        }else if(event.target.value="Empleado"){
            $("opcionesEmpleado").style.display="flex";
            $("opcinesCliente").style.display="none";
        }
    });
    //funcionalidad boton cancelar
    $("bntABMCancelar").addEventListener("click",(event)=>{
        $("tablaContainer").style.display="block";
        $("formularioABM").style.display="none";
    });

    //funcionalidad btn tabla-Agregar
    $("btnTablaAgregar").addEventListener("click",(event)=>{
        let nuevoId=obtenerNuevoId();
        limpiarABM(nuevoId);
        $("tablaContainer").style.display="none";
        $("formularioABM").style.display="flex";
    });
    //funcionalidad btn ABM-Agregar
    $("bntABMAgregar").addEventListener("click",(event)=>{

        if($("idForm").value==obtenerNuevoId()){
            let nuevoUsuario;
            if($("formSelectOption").value=="Cliente"){
                nuevoUsuario=new Cliente(
                    obtenerNuevoId(),
                    $("nombreForm").value,
                    $("apellidoForm").value,
                    parseInt($("edadForm").value),
                    parseInt($("comprasForm").value),
                    parseInt($("telefonoForm").value)
                );
            }else{
                nuevoUsuario=new Empleado(
                    obtenerNuevoId(),
                    $("nombreForm").value,
                    $("apellidoForm").value,
                    parseInt($("edadForm").value),
                    parseFloat($("sueldoForm").value),
                    parseInt($("ventasForm").value)
                );
            }
            //validamos el form
            if(validarFormulario($("formSelectOption").value)==true){
                arrayObjetos.push(nuevoUsuario);
                $("tablaContainer").style.display="block";
                $("formularioABM").style.display="none";
            }
        }else{

            let objetoEncontrado=BuscarObjetoPorID($("idForm").value);
            objetoEncontrado.nombre=$("nombreForm").value;
            objetoEncontrado.apellido=$("apellidoForm").value;
            objetoEncontrado.edad=parseInt($("edadForm").value);
            if(objetoEncontrado instanceof Empleado){
                objetoEncontrado.ventas=parseInt($("ventasForm").value);
                objetoEncontrado.sueldo= parseFloat($("sueldoForm").value);
            }else{
                objetoEncontrado.compras=parseInt($("comprasForm").value);
                objetoEncontrado.telefono=parseInt($("telefonoForm").value);
            }
            if(validarFormulario($("formSelectOption").value)==true){
                $("tablaContainer").style.display="block";
                $("formularioABM").style.display="none";
            }
        }
        resetearChkbox();
        dibujarTabla(arrayObjetos);
    });
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
});