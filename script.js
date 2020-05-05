//---------------------------------------------------
// Dynamically generated table
var totalRows = 6; // including header row
var cellsInRow = 4; // including header column

var tableParent = document.createElement("div");
tableParent.setAttribute('id', 'table-wrapper');
document.body.appendChild(tableParent);

function drawTable() { 
    // get the reference for the body
    var tableWrapper = document.getElementById('table-wrapper');

    // creates a <table> element
    var tbl = document.createElement("table");
    
    tbl.setAttribute("class", "table");
    tbl.setAttribute("id", "example1"); // set the id of the table for future reference
    
    var buttonGroup = document.createElement("div");
    buttonGroup.setAttribute("class", 'button-group');

    document.body.appendChild(buttonGroup); // appends <div class="button-group">

    //Create button left
    var leftBtn = document.createElement("button");
    var leftBtnText = document.createTextNode("left");
    leftBtn.setAttribute('class', 'left-button');
    leftBtn.appendChild(leftBtnText);

    //Create button right
    var rightBtn = document.createElement("button");
    var rightBtnText = document.createTextNode("right");
    rightBtn.setAttribute('class', 'right-button');
    rightBtn.appendChild(rightBtnText);

    //Create button top
    var topBtn = document.createElement("button");
    var topBtnText = document.createTextNode("up");
    topBtn.setAttribute('class', 'up-button');
    topBtn.appendChild(topBtnText);

    //Create button top
    var bottomBtn = document.createElement("button");
    var bottomBtnText = document.createTextNode("down");
    bottomBtn.setAttribute('class', 'down-button');
    bottomBtn.appendChild(bottomBtnText); 
    
    //Create button top
    var markBtn = document.createElement("button");
    var markBtnText = document.createTextNode("Mark Cell");
    markBtn.setAttribute('class', 'mark-button');
    markBtn.appendChild(markBtnText);  
    
    buttonGroup.appendChild(leftBtn); // Created left button
    buttonGroup.appendChild(topBtn); // Created up button
    buttonGroup.appendChild(rightBtn);  // Created right button
    buttonGroup.appendChild(bottomBtn); // Created down button
    buttonGroup.appendChild(markBtn);  // Created mark button
    
    leftBtn.addEventListener("click",function(){
        removeAllBorders();
        compareBtnEntity('left');
    });
    
    topBtn.addEventListener("click",function(){
        removeAllBorders();
        compareBtnEntity('up');
    });
    
    rightBtn.addEventListener("click",function(){
        removeAllBorders();
        compareBtnEntity('right');
    });
    
    bottomBtn.addEventListener("click",function(){
        removeAllBorders();
        compareBtnEntity('down');
    });
    
    markBtn.addEventListener("click",function(){
        markedCell();
    });
    
            
    var all = document.getElementsByTagName('button');
    for (var i = 0; i < all.length; i++) {
      all[i].style.margin = '10px 2px 0 2px';
    }

    
    // creating rows
    for (var r = 0; r < totalRows; r++) {
        var row = document.createElement("tr");

        if (r == 0) {
            // create table header row
            for (var c = 0; c < cellsInRow; c++) {
                var cell = document.createElement("th");
                var cellText = document.createTextNode('Header' + '\u00a0' + (c + 1));
                cell.appendChild(cellText);
                cell.style.border = "1px solid grey";
                row.appendChild(cell);
            }

        } else {
            // create cells in row
            for (var c = 0; c < cellsInRow; c++) {
                
                var cell = document.createElement("td");
                cellNumber = c + 1;
                
                var cellText = document.createTextNode( r+ ',' +cellNumber);
                
                cell.appendChild(cellText);
                row.appendChild(cell);
                cell.setAttribute("tabindex", c + 1);
                cell.setAttribute("class", 'cell-' + c + '-' + r);
                cell.style.border = "1px solid grey";
                row.setAttribute("data-row", r + 1);
            }
        }
        tbl.appendChild(row); // add the row to the end of the table body
    }

    tableWrapper.appendChild(tbl); // appends <table> into <div>

    var dat = document.getElementsByTagName('td');  
    var numOfColumns = document.getElementsByTagName('tr').length;
    var numOfRows = document.getElementsByTagName('tr').length;
    var currIndex = 0;
    var rowObj = document.getElementsByTagName('tr');
    var oneColLength = rowObj[0].children.length;
    var colObj = document.getElementsByTagName('td');
    var totalData = rowObj.length * colObj.length;
    var dataCounter = 0;
    var matrixObj = new Array(rowObj.length);
    var currentX = 0;
    var currentY = 0;
    var buttons = document.getElementsByTagName('button');

    console.log(dataCounter);

    for(var i = 0; i < matrixObj.length; i++){
       matrixObj[i] = new Array(oneColLength);
    }

    for(var i = 0; i < numOfRows; i++){
      for(var j = 0; j < oneColLength; j++){
         matrixObj[i][j] = colObj[dataCounter++];
      }
    }

    for(var i = 0; i < dat.length; i++){
      dat[i].addEventListener("click",function(){
        removeAllBorders();
        this.style.border = "1px solid red";
        this.setAttribute('class', 'active');
        compareEntity(this);
      });
    }

    window.addEventListener("keyup",function(e){
       switch(e.keyCode){
            case 37: 
                if(currentX > 0){
                  currentX--;
                  repaint();
                }
                break;
            case 38: 
                if(currentY > 0){
                  currentY--;
                  repaint();
                }
                break;
            case 39: 
                if(currentX < oneColLength-1){
                  currentX++;
                  repaint();
                }
                break;
            case 40: 
                if(currentY < matrixObj.length-1){
                  currentY++;
                  repaint();
                }
                break;          
        }
    })

    function removeAllBorders(){
      for(var i = 0; i < dat.length; i++){
        dat[i].style.border = "1px solid grey";
        //dat[i].removeAttribute('class', 'active');
      }
    }

    function compareEntity(ele){
      for(var i = 0; i < matrixObj.length; i++){
        for(var j = 0; j < oneColLength; j++){
           if(ele == matrixObj[i][j]){
              currentX = j;
              currentY = i;
           }
        }
      }
    }

    function compareBtnEntity(ele){
        switch(ele){
            case "left": 
                if(currentX > 0){
                  currentX--;
                  repaint();
                }
                break;
            case "up": 
                if(currentY > 0){
                  currentY--;
                  repaint();
                }
                break;
            case "right": 
                if(currentX < oneColLength-1){
                  currentX++;
                  repaint();
                }
                break;
            case "down": 
                if( currentY < matrixObj.length-1 ){
                  currentY++;
                  repaint();
                }
                break;       
          }
         repaint();
      }


    function repaint(){
      removeAllBorders();
      matrixObj[currentY][currentX].style.border = "1px solid red";
      //matrixObj[currentY][currentX].setAttribute('class', 'active');
    }
    
    function markedCell (){
      matrixObj[currentY][currentX].setAttribute('class', 'markedCell');
      matrixObj[currentY][currentX].style.backgroundColor = "yellow";
    }

}
window.onload = drawTable();
