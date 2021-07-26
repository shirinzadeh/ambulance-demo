//HIDE NAVBAR MENU
const hideMenu = document.querySelector('#hideMenu');
const nav = document.querySelector('.navbar');

hideMenu.addEventListener('click',() => {
   nav.classList.toggle('hide')
})

//Drag and Drop
const listContents = document.querySelectorAll('.list__content');
const listItems = document.querySelectorAll('.query');
const ambulances = document.querySelectorAll('.ambulance');
const ambulanceActive = document.querySelectorAll('.ambulance__active')
draggedItem = null; //query
draggedAmbulance = null

listItems.forEach(item => {
   item.addEventListener('dragstart', () => {
      draggedItem = item;

      setTimeout(() => {
         item.classList.add('hide') //hide list item when drag
      }, 0);
   })

   item.addEventListener('dragend', () => {
      setTimeout(() => {
         item.classList.remove('hide')
         item.classList.add('show') //show list item when drop
         draggedItem = null;
      }, 0);
   })

   ambulanceActive.forEach(act => {
      // console.log(act,i)
      act.addEventListener('dragover', e => e.preventDefault())
      act.addEventListener('dragenter', (e) => {
         e.preventDefault();
         act.style.backgroundColor = "rgba(255,255,255,)" //change list background color while dragging item
      })

      act.addEventListener('dragend', (e) => {
         ambulances.forEach(ambulance => {
            ambulance.addEventListener('dragstart', () => {
               draggedAmbulance = ambulance;
         
               setTimeout(() => {
                  ambulance.classList.remove('show') //hide list item when drag
                  ambulance.classList.add('hide') //hide list item when drag
               }, 0);

            })
         
            ambulance.addEventListener('dragend', () => {
               setTimeout(() => {
                  ambulance.classList.remove('hide')
                  ambulance.classList.add('show') //show list item when drop
                  draggedAmbulance = null;
               }, 0);
            })
         
            listContents.forEach((list, i) => {
               list.addEventListener('dragover', e => e.preventDefault());
               list.addEventListener('dragenter', (e) => {
                  e.preventDefault();
                  list.style.backgroundColor = "#e6e6e6"
               })
         
               list.addEventListener('dragleave', (e) => {
                  list.style.backgroundColor = "#efefef"
               })
         
               list.addEventListener('drop', (e) => {  
                  e.preventDefault();
                  if (draggedAmbulance) {
                     list.append(draggedAmbulance); 
                  }      
               })
            });
         });
      })

      act.addEventListener('dragover', e => e.preventDefault());
      act.addEventListener('dragenter', e => e.preventDefault());

      act.addEventListener('drop', (e) => {  
         if(draggedItem) {
            act.append(draggedItem); //add dragged list item to another list
            act.parentElement.setAttribute('draggable', 'true') //Make active ambulance draggable after getting query
         }
      })
   });
});

// ADD NEW QUERY
const addQuery = document.querySelector('#addQuery');
const hiddenQuery = document.querySelector('.query.hide')

addQuery.addEventListener('click', () => hiddenQuery.classList.remove('hide'))

const removeAction = document.querySelector('#removeAction');
const lists = document.querySelectorAll('.list');

removeAction.addEventListener('click', () => {
   const listsContentArr = Array.from(listContents) //Convert nodelist to array
   let assignedAmbulance = listsContentArr[listsContentArr.length-1].lastElementChild; 
   
   if(assignedAmbulance) {
      //Remove query inside ambulance
      assignedAmbulance.lastElementChild.children[0].remove(); 
      //Remove ambulance
      assignedAmbulance.remove();
      //Insert to first index of list array
      listsContentArr[1].appendChild(assignedAmbulance) 
      assignedAmbulance.setAttribute('draggable', 'false') 
   }
})
