const pokimon = ["audino", "bagon", "baltoy", "banette",
"bidoof", "braviary", "bronzor", "carracosta", "charmeleon",
"cresselia", "croagunk", "darmanitan", "deino", "emboar",
"emolga", "exeggcute", "gabite", "girafarig", "gulpin",
"haxorus", "heatmor", "heatran", "ivysaur", "jellicent",
"jumpluff", "kangaskhan", "kricketune", "landorus", "ledyba",
"loudred", "lumineon", "lunatone", "machamp", "magnezone",
"mamoswine", "nosepass", "petilil", "pidgeotto", "pikachu",
"pinsir", "poliwrath", "poochyena", "porygon2", "porygonz",
"registeel", "relicanth", "remoraid", "rufflet", "sableye",
"scolipede", "scrafty", "seaking", "sealeo", "silcoon",
"simisear", "snivy", "snorlax", "spoink", "starly", "tirtouga",
"trapinch", "treecko", "tyrogue", "vigoroth", "vulpix",
"wailord", "wartortle", "whismur", "wingull", "yamask"];


 const lastLtr = word => word[word.length - 1];

 const candidates = (words, used) => words.filter(e => !used.includes(e));
  
 
 const buildMap = words => {
   const lookup = new Map();
   words.forEach(e => {
     const start = e[0];
     lookup.set(start, [...(lookup.get(start) || []), e]);
   });
   return lookup;
 };
  


 const findPaths = names => {
   const t0 = process.hrtime();
   console.log('Checking:', names.length, 'names');
   const lookup = buildMap(names);
  
   let maxNum = 0;
   let maxPaths = [];

  
   const parseResult = arr => {
     if (typeof arr[0] === 'object') {
       arr.forEach(el => parseResult(el))
     } else {
       if (arr.length > maxNum) {
         maxNum = arr.length;
         maxPaths = [arr];
       }
       if (arr.length === maxNum) {
         maxPaths.push(arr)
       }
     }
   };
  
   const searchWords = (word, res) => {
     const cs = candidates(lookup.get(lastLtr(word)) || [], res);
     return cs.length ? cs.map(e => searchWords(e, [...res, e])) : res;
   };
  
   names.forEach(word => {
     const res = searchWords(word, [word]);
     parseResult(res);
   });
  
   const t1 = process.hrtime(t0);

   
   
   
   console.info('Execution time (hr): %ds %dms', t1[0], t1[1] / 1000000);
   console.log('Max Path:', maxNum);
   console.log('Matching Paths:', maxPaths.length);
   console.log('Example Path:', maxPaths[0]);
   
  
 };
  


 findPaths(pokimon)