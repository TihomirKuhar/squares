const numberOfRows=3;
const numberOfColumns=3;
//counter for interval timer
let waits=0;
//bool for hit and miss logic 
let hit=true;
//will hold grid and its properties
let gridFields=[];
//method on button click end reloads the page
function handleEnd(){
    window.location.reload(false);
}
//method on button click start, starts the app
function handleStart(){
    //displaying end button
    document.getElementById("endButton").style.display="inline-block";
    //hiding start button
    document.getElementById("startButton").style.display="none";
    //creating grid item 
    const grid = clickableGrid(numberOfRows,numberOfColumns,function(itemId){
        hit=false;
        //checking if clicked element is red in color and if it has already been clicked, displaying proper message
        if(gridFields[itemId].color==='red'&&gridFields[itemId].clicked===true) {
            console.log("already hit!!!!!");
            document.getElementById("hitMessage").style.display="none";
            document.getElementById("missMessage").style.display="none";
            document.getElementById("alreadyHitMessage").style.display="block";
            hit=true;
        }
        //checking if clicked element is red in color and if it hasn't already been clicked, displaying proper message
        if(gridFields[itemId].color==='red'&&gridFields[itemId].clicked===false) {
            console.log("red hit nice!!!!!");
            document.getElementById("hitMessage").style.display="block";
            document.getElementById("missMessage").style.display="none";
            document.getElementById("alreadyHitMessage").style.display="none";
            gridFields[itemId].clicked=true;
            hit=true;
        }
        //if flag hit is false user has missed, displaying proper message
        //user LOSES here
        if(!hit){
            document.getElementById("hitMessage").style.display="none";
            document.getElementById("missMessage").style.display="block";
            document.getElementById("alreadyHitMessage").style.display="none";
            document.getElementById("grid").style.pointerEvents="none";
            console.log("MISS!!!!!");
            gridFields[itemId].clicked=true;
            colorGridToSetColor();
            return;
        }
        //calling method for checking if there are any reds remaining if yes, returns true, else returns false, displaying proper message
        //user WINS here!
        if(!checkForReds()){
            document.getElementById("winMessage").style.display="block";
            document.getElementById("hitMessage").style.display="none";
            document.getElementById("missMessage").style.display="none";
            document.getElementById("alreadyHitMessage").style.display="none";
            document.getElementById("grid").style.pointerEvents="none";
            colorGridToSetColor();
            return;
        }
    });
}
//method for checking if there are any reds remaining if yes, returns true, else returns false
function checkForReds(){
    for(let i=0;i<gridFields.length;i++){
        if (gridFields[i].clicked===false && gridFields[i].color==="red") {
            return true;
        }
    }
    return false;
}
//method runs x seconds after which it changes the background color of all tr elements to white and colors grid white
function handleIntervalSecond(){
    const wait=setInterval(()=>{
        //counter gets +1 every sec
        waits++;
        if(waits>3){
            colorGrid("whitesmoke");
            setGridToClickable(document.getElementById('grid'));
            waits=0;
            clearInterval(wait);
        }
    }, 1000);
}
//method colors the grid to the state it was generated at grid create
function colorGridToSetColor(){
    let gridFieldsElements = document.getElementsByClassName('grid-field');
    for (i = 0; i < gridFieldsElements.length; i++) {
        gridFieldsElements[i].style.backgroundColor = gridFields[i].color;
    }
}
//setting color of certain td element
function colorField(cell,color){
    cell.style.backgroundColor=color;
}
//setting color of the entire grid
function colorGrid(color){
    let gridFieldsElements = document.getElementsByClassName('grid-field');
    for (i = 0; i < gridFieldsElements.length; i++) {
        gridFieldsElements[i].style.backgroundColor = color;
    }
}
//disabling mouse click on grid
function setGridToNonClickable(grid){
    grid.style.pointerEvents="none";
}
//enabling mouse click on grid
function setGridToClickable(grid){
    grid.style.pointerEvents="visiblePainted";
}
function clickableGrid( rows, cols, callback ){
    //counter for in grid elements
    let i=0;
    //single elements id
    let id=0;
    //creating grid (table with rows and cols)
    let grid = document.createElement('table');
    //appending newly created grid with innerContainer div class
    document.getElementById("gridContainer").appendChild(grid);
    //adding class name to grid
    grid.className = 'grid';
    //adding id to grid
    grid.id='grid';
    //using for to "walk" trough grid elements
    for (let r=0;r<rows;++r){
        //inside rows
        //creating tr element inside table element
        let tr = grid.appendChild(document.createElement('tr'));
        for (let c=0;c<cols;++c){
            //inside cols
            //creating grid objects
            const gridField={
                id:'',
                color:'',
                clicked:false,
            }
            //creating td element inside tr element
            let cell = tr.appendChild(document.createElement('td'));
            //setting id of an tr element to a generated id
            tr.id=id;
            //setting gridFields objects id to generated id
            gridField.id=id
            //increasing id by 1 so it would not repeat
            id++;
            //setting class name to td element
            cell.className='grid-field'
            //showing number inside td field (setting it to a value of counter created on line 44)
            cell.innerHTML = i;
            //adding eventListener click to each grid field
            cell.addEventListener('click',(function(i){
                return function(){
                    callback(i);
                }
            })(i),false);
            //generating random number from 1 to 9999999999 and using modulo getting either 1 or 0 to color fields randomly in red and blue color
            if((Math.floor(Math.random() * 9999999999) + 1)%2===0){
                //setting color 
                gridField.color="red"
                //adding gridField to the grid Fields collection
                colorField(cell,"red")
            }
            //else 0
            else {
                //setting color
                gridField.color="blue"
                //adding gridField to the grid Fields collection
                colorField(cell,"blue");
            }
            //pushing object to an array gridFields
            gridFields.push(gridField);
            //increasing in greed elements counter
            i++;
        }
    }
    //disabling mouse click on grid
    setGridToNonClickable(grid);
    //calling interval that colors fields white after x seconds
    handleIntervalSecond();
    //returning grid
    return grid;
}
