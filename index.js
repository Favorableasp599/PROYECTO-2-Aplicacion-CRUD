const formulario = document.querySelector("#form");
const almacenamiento = document.querySelector("#table");
let arrayActividades = [];
document.querySelector("#form").reset();
let current = null;

const Guardar = (name, job, exp) => {
  const baseDatos = JSON.parse(localStorage.getItem("Almacen"));
  baseDatos.push({
    name: name,
    job: job,
    exp: exp,
  });
  localStorage.setItem("Almacen", JSON.stringify(baseDatos));
  Decorar();
};

const Decorar = () => {
  almacenamiento.innerHTML = "";
  arrayActividades = JSON.parse(localStorage.getItem("Almacen"));
  if (arrayActividades == null) {
    localStorage.setItem("Almacen", JSON.stringify([]));
  } else {
    arrayActividades.forEach((element) => {
      almacenamiento.innerHTML += `  
      <table border="2" id="table">
        <tr>
        <td class="col">${element.name}</td>
        <td class="col">${element.job}</td>
        <td class="col">${element.exp}</td>
        <td class="col"><button onclick= edit(this)>Editar</button> 
                                <button onclick= remove(this)>Eliminar</button></td>
        </tr>
     </table> `;
    });
  }
};
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let name1 = document.querySelector("#name").value;
  let job1 = document.querySelector("#job").value;
  let exp1 = document.querySelector("#exp").value;

  if (current === null) {
    Guardar(name1, job1, exp1);
  } else {
    update(name1, job1, exp1);
  }
  formulario.reset();
});

document.addEventListener("DOMContentLoaded", Decorar);

function edit(td) {
  current = td.parentElement.parentElement;
  document.querySelector("#name").value = current.cells[0].innerHTML;
  document.querySelector("#job").value = current.cells[1].innerHTML;
  document.querySelector("#exp").value = current.cells[2].innerHTML;
}
function update(name, job, exp) {
  let baseDatos = JSON.parse(localStorage.getItem("Almacen"));
  baseDatos = baseDatos.map((usuario, index) => {
    if (current.rowIndex == index) {
      usuario.name = name;
      usuario.job = job;
      usuario.exp = exp;
    }
    return usuario;
  });
  current = null;
  localStorage.setItem("Almacen", JSON.stringify(baseDatos));
  Decorar();
}

function remove(td) {
  var ans = confirm("Are you sure you want to delete this record?");
  if (ans === true) {
    const baseDatos = JSON.parse(localStorage.getItem("Almacen"));
    let row = td.parentElement.parentElement;
    baseDatos.splice(row.rowIndex, 1);
    localStorage.setItem("Almacen", JSON.stringify(baseDatos));
    Decorar();
  }
}
