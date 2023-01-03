const d = document;
const w = window;
// Trigger
let createtrigger = document.createElement("div");
createtrigger.classList.add("trigger");
d.querySelector("body").appendChild(createtrigger);

let $trigger = d.querySelector(".trigger");
let trigger = Math.round($trigger.getBoundingClientRect().top);
// EndTrigger

// Trigger 2
let createtrigger2 = document.createElement("div");
createtrigger2.classList.add("triggerB");
d.querySelector("body").appendChild(createtrigger2);

let $triggerB = d.querySelector(".triggerB");
let triggerB = Math.round($triggerB.getBoundingClientRect().top);
// EndTrigger 2

/****** aniMoveAddRemove ******/
function aniMoveAddRemove(trigger, clase, classNum) {
  let $elements = d.querySelectorAll(clase);

  for (let i = 0; i < $elements.length; i++) {
    
    $elements[i].classList.add(classNum + i);
    let $elNum = d.querySelector(`.${classNum + i}`);
    
    let $elementsAtt = $elements[i].getAttribute("data-aniMovimiento");

    let $starValue = parseInt($elNum.getAttribute("data-aniMove-star")) || 0;
    let $endValue = parseInt($elNum.getAttribute("data-aniMove-end")) || 0;

    // Añadir clase
    switch($elementsAtt) {
      case "up":
        $elNum.classList.add('aniUpOff');
        break;
      case "down":
        $elNum.classList.add('aniDownOff');
        break;
      case "left":
        $elNum.classList.add('aniLeftOff');
        break;
      case "right":
        $elNum.classList.add('aniRightOff');
        break;
      default:
        // code block
    }
    
    if ($elNum) {
      d.addEventListener('scroll', (e) =>{

        // Valores de comienzo y final de la animacion
        let $star = Math.round($elNum.getBoundingClientRect().top) - $starValue;
        let $end = Math.round($elNum.getBoundingClientRect().bottom) + $endValue;

        if ($star < trigger && $end > trigger) {
          switch($elementsAtt) {
            case "up":
              $elNum.classList.add('aniUpOn');
              $elNum.classList.remove('aniUpOff');
              break;
            case "down":
              $elNum.classList.add('aniDownOn');
              $elNum.classList.remove('aniDownOff');
              break;
            case "left":
              $elNum.classList.add('aniLeftOn');
              $elNum.classList.remove('aniLeftOff');
              break;
            case "right":
              $elNum.classList.add('aniRightOn');
              $elNum.classList.remove('aniRightOff');
              break;
            default:
              // code block
          }
        }else{
          switch($elementsAtt) {
            case "up":
              $elNum.classList.remove('aniUpOn');
              $elNum.classList.add('aniUpOff');
              break;
            case "down":
              $elNum.classList.remove('aniDownOn');
              $elNum.classList.add('aniDownOff');
              break;
            case "left":
              $elNum.classList.remove('aniLeftOn');
              $elNum.classList.add('aniLeftOff');
              break;
            case "right":
              $elNum.classList.remove('aniRightOn');
              $elNum.classList.add('aniRightOff');
              break;
            default:
              // code block
          }
        }

      });
    }
  }
}
/****** End aniMoveAddRemove ******/

/****** aniMoveSnippet ******/
function aniMoveSnippet(trigger, claseContElemet, claseElemet, classNum, elementClassNum) {
  let $SniptContElemet = d.querySelectorAll(claseContElemet);
  let $SniptElements = d.querySelectorAll(claseElemet);

  for (let i = 0; i <  $SniptContElemet.length; i++) {

    $SniptContElemet[i].classList.add(classNum + i);
    $SniptElements[i].classList.add(elementClassNum + i);

    let $elAddnewClass = d.querySelector(`.${classNum + i}`);
    let $elAddnewClassElement = d.querySelector(`.${elementClassNum + i}`);

    let $SniptElementsAtt = $SniptContElemet[i].getAttribute("data-transform");

    let $ContStarValue = parseInt($elAddnewClass.getAttribute("data-aniMove-star")) || 0;
    let $ContEndValue = parseInt($elAddnewClass.getAttribute("data-aniMove-end")) || 0;
    let $ContRotarValue = parseInt($elAddnewClass.getAttribute("data-aniMove-rotar")) || 0;

    // Valores de top left element
    let $SniptLeft = $elAddnewClassElement.offsetLeft;
    let $heightObjetc = $elAddnewClass.offsetHeight;
    $elAddnewClass.style.height = `${$heightObjetc}px`;
  
    if ($elAddnewClass) {
      d.addEventListener('scroll', (e) =>{

        // Valores de comienzo y final de la animacion
        let $Sniptstar = Math.round($elAddnewClass.getBoundingClientRect().top) - $ContStarValue;
        let $Sniptend = Math.round($elAddnewClass.getBoundingClientRect().bottom) + $ContEndValue;

        if ($Sniptstar < trigger && $Sniptend > trigger) {
          $elAddnewClassElement.style.position = "fixed";
          $elAddnewClassElement.style.top = `${trigger}px`;
          $elAddnewClassElement.style.left = `${$SniptLeft}px`;
          $elAddnewClassElement.classList.add('reset');

          // primero se resta el top(del top de la ventana al top del div) del gatillo con el top del div contenedor osea el resultado es de 1-500(Alto div)
          let num = trigger - $Sniptstar;
          // console.log(num);

          switch($SniptElementsAtt) {
            case "rotar":
              // el resultado lo convertimos en por sentaje de 0 a 100 (Math.ceil((numero_entero_que_tiene_la_posicion_del_trigger / alto_del_div_contenedor) * 100))
              let porcentaje = Math.ceil((num / $elAddnewClass.clientHeight) * 100);
              // despues lo convertimos en grados haciendo la operacion inversa ala de arriba (Math.ceil((numero_convertico_a_pocentaje_osea_de_1-100 * grados_a_girar) / 100))
              let grados = Math.ceil((porcentaje * $ContRotarValue) / 100);

              $elAddnewClassElement.style.transition = `transform 0.05s`;
              $elAddnewClassElement.style.transform = `rotate(${grados}deg)`;
              break;
            case "escalar":
            // console.log("escalar");
              break;
            default:
              // code block
          }
        }else{
          $elAddnewClassElement.style.position = "relative";
          $elAddnewClassElement.style.left = `0px`;
          $elAddnewClassElement.classList.remove('reset');

          switch($SniptElementsAtt) {
            case "rotar":
              if ($Sniptstar >= trigger) { $elAddnewClassElement.style.top = `0px`; num = 0; grados = 0;}
              if ($Sniptend <= trigger) { $elAddnewClassElement.style.top = `${$heightObjetc + $ContEndValue}px`; num = 100; grados = $ContRotarValue;}

              $elAddnewClassElement.style.transition = `transform 0.05s`;
              $elAddnewClassElement.style.transform = `rotate(${grados}deg)`;
              break;
            case "escalar":
              // console.log("escalar");
              break;
            default:
              // code block
          }
        }

      });
    }

  }
}
/****** End aniMoveSnippet ******/

/****** aniMoveColor ******/
function aniMoveColor(trigger, claseContElemet, elementClassNum) {
  let $ColorContElemet = d.querySelectorAll(claseContElemet);

  for (let i = 0; i < $ColorContElemet.length; i++) {
    $ColorContElemet[i].classList.add(elementClassNum + i);
    
    let $colorElAddnewClass = d.querySelector(`.${elementClassNum + i}`);

    if ($colorElAddnewClass) {   
      d.addEventListener('scroll', (e) =>{
        // Valores de comienzo y final de la animacion
        let $Colorstar = Math.round($colorElAddnewClass.getBoundingClientRect().top);
        let $Colorend = Math.round($colorElAddnewClass.getBoundingClientRect().bottom);
  
        // console.log();
  
        if ($Colorstar < trigger && $Colorend > trigger) {
          // console.log('start');
          let num = trigger - $Colorstar;
          let porcentaje = Math.ceil((num / $colorElAddnewClass.clientHeight) * 100);
          let opacidad = (porcentaje * 100) / 10000;
  
          $colorElAddnewClass.style.background= `rgb(0, 0, 0, ${opacidad})`;
        }else{
          if ($Colorstar >= trigger) { $colorElAddnewClass.style.background= `rgb(0, 0, 0, 0)`;}
          if ($Colorend <= trigger) { $colorElAddnewClass.style.background= `rgb(0, 0, 0, 1)`;}
        }
      });
    }
    
  }
}
/****** End aniMoveColor ******/



d.addEventListener('DOMContentLoaded', (e) =>{

  aniMoveAddRemove(trigger, ".aniMoveAddRemove", "aniMoveA");
  aniMoveAddRemove(triggerB, ".aniMoveAddRemoveB", "aniMoveB");

  aniMoveSnippet(triggerB, ".aniMoveTransform", ".elemetAction", "transformA", "elementTransformA");

  aniMoveColor(trigger, ".aniMoveColor", "colorA", "elemetColorA");

});


// imagen segura guardar