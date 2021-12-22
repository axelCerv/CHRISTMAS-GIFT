
  const addItem = document.querySelector(".addItem");

  addItem.addEventListener("click", (e) => {
    e.preventDefault();
    const extraItems = document.querySelector(".extraItem");
    const item = `<div class="new-item">
                        <input type="text" id="name" placeholder="Nombre completo" class="itemData">
                        
                        <button type="button" class="deleteBtn"><i class='bx bxs-trash-alt'></i></button> 
                      </div>`;

    extraItems.insertAdjacentHTML("beforeend", item);

    const deleteBtn = document.querySelectorAll(".deleteBtn");

    deleteBtn.forEach((e) => {
      e.addEventListener("click", (e) => {
        e.preventDefault();
        var deletedItem = e.path[1];
        deletedItem.remove();
      });
    });
  });

  const next1 = document.querySelector(".nextBtn");
  const ventanaParticipantes = document.querySelector(".main-participantes");
  const ventanaDetalles = document.querySelector(".main-detalles");

  const instructions = document.querySelectorAll(".instructionsContent");

  function removeActiveInst() {
    instructions.forEach((e) => {
      const inst1 = e.childNodes[1];
      const inst2 = e.childNodes[3];
      const inst3 = e.childNodes[5];
      inst1.classList.remove("active");
      inst2.classList.remove("active");
      inst3.classList.remove("active");
    });
  }

  // ===========================FIRST NEXT=============================

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  }

  next1.addEventListener("click", () => {
    const formParticipants = document.querySelectorAll(".itemData");
    const mailOrganizador = document.getElementById('mailOrganizador');
    var validationName = false;
    var validationMail = false;

    formParticipants.forEach((item) => {
      if(expresiones.nombre.test(item.value)){
        validationName = true;
      }
      else{
        validationName = false;
      }
    });
    if(expresiones.correo.test(mailOrganizador.value)){
      validationMail = true;
    }
    else{
      validationMail = false;
    }

    if(validationName && validationMail){
          instructions.forEach((e) => {
            const inst2 = e.childNodes[3];
            removeActiveInst();
            inst2.classList.add("active");
          });
    
          ventanaParticipantes.style.display = "none";
          ventanaDetalles.style.display = "block";
          // ============================ OBTENCION DE DATA==============================
          const mainList = [];
          const list2 = [];
        
          const listaHtml1 = document.querySelector(".col1");
          const listaHtml2 = document.querySelector(".col2");
    
          formParticipants.forEach((item) => {
            const nombre = item.value;
            mainList.push(nombre);
            list2.push(nombre);
          });
    
          mainList.forEach((item) => {
            // lista 1
            var itemList1 = `<p>${item}</p>`;
    
            listaHtml1.insertAdjacentHTML("beforeend", itemList1);

            // lista 2
            do {
              random = Math.floor(Math.random() * list2.length);
            } while (item == list2[random]);
    
            if (item == list2[random]) {
              random = Math.floor(Math.random() * list2.length);
            } else {
              var itemList2 = `<p>${list2[random]}</p>`;
              listaHtml2.insertAdjacentHTML("beforeend", itemList2);
            }
            list2.splice(random, 1);
          });
      }else if(!validationMail && !validationName){
        alert('Por favor revise que haya rellenado todos los campos correctamente')
      }
      else if(!validationName){
        alert('Por favor revise que los nombres sean correctos')
      }
      else if(!validationMail){
        alert('Por favor revise que el correo sea correcto')
      }
      
        
      
      // ==================END IF================
  
     
  });

  // ===============================BACK BUTTON==========================
  const btnBack = document.querySelector(".backBtn");

  btnBack.addEventListener("click", () => {
    instructions.forEach((e) => {
      const inst1 = e.childNodes[1];
      removeActiveInst();
      inst1.classList.add("active");
    });
    ventanaParticipantes.style.display = "block";
    ventanaDetalles.style.display = "none";
  });

  // ============================ OBTENCION DE DETALLES==============================

  const next2 = document.querySelector(".nextBtn-two");
  const ventanaFinal = document.querySelector(".ventanaFinal");

  next2.addEventListener("click", () => {
    //   ==========CAMBIO DE PANTALLA===================
    instructions.forEach((e) => {
        const inst3 = e.childNodes[5];
        removeActiveInst();
        inst3.classList.add("active");
      });
    const ventanaDetalles = document.querySelector(".main-detalles");
    ventanaDetalles.style.display = "none";
    ventanaFinal.style.display = "grid";

    // =====================DATOS DETALLES======================
    const fecha = document.getElementById("fecha").value;
    const monto = document.getElementById("monto").value;
    const descripcion = document.getElementById("descripcion").value;

  
  });

  // ==========================VALIDACION INPUTS===========================
  

  
  const downloadPDF = document.getElementById('getPDF');

  downloadPDF.addEventListener('click',()=>{
    
    var specialElementHandlers = {
      '#getPDF': function(element, renderer){
        return true;
      },
      '.controls': function(element, renderer){
        return true;
      }
    };

    var doc = new jsPDF('p','pt','a4');   
    var col1 = document.querySelector('.col1');
    var col2 = document.querySelector('.col2');
    doc.fromHTML((col1), {
      width: 1000, 
      'elementHandlers': specialElementHandlers
    });
    doc.fromHTML((col2), {
      width: 1200, 
      'elementHandlers': specialElementHandlers
    });
    doc.save('Intercambio.pdf')
    console.log(printSection)
  })

