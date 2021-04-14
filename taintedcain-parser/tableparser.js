function parseTable2(id) {
    var recipes = parseTable(document.getElementById(id));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(recipes, null, 2)], {
        type: "application.json"
    }));
    a.setAttribute("download", "recipes.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);


}


function mapRow(headings) {
  return function mapRowToObject({ cells }) {
    return [...cells].reduce(function(result, cell, i) {

      if(headings[i] == undefined){
          headings[i] = 'recipes'+(i-2);
      }
      const input = cell.querySelector("input,select");
      var value;

      if (input) {
        value = input.type === "checkbox" ? input.checked : input.value;
      } else {
        value = cell.innerText;
      }
      let table = cell.querySelector("table");
      if(table){
          let pickupCells = table.querySelectorAll(".image");
          
        let items = [];
          for(let j = 0; j<pickupCells.length;j++){
            
            let m = pickupCells[j].href.match(/^\d+|\d+\b|\d+(?=\w)/g);
            
            let itemNumber = m[0] //=> '123'
           
                    
            items.push(itemNumber);
            
            
          }
          value = items;
      }
    
      return Object.assign(result, { [headings[i]]: value });
    }, {});
  };
}

function parseTable(table) {

  var headings = [...table.tHead.rows[0].cells].map(
    heading => heading.innerText
  );
    var theReturn = [...table.tBodies[0].rows].map(mapRow(headings));
    for(var i = 0; i<theReturn.length; i++){
        theReturn[i]['recipes'] = [theReturn[i].Recipes, theReturn[i].recipes1,theReturn[i].recipes2,theReturn[i].recipes3];
        delete theReturn[i].recipes1;
        delete theReturn[i].recipes2;
        delete theReturn[i].recipes3;
        delete theReturn[i].CollapseRecipes;
        delete theReturn[i].Recipes;
    }
    
  return theReturn;
}