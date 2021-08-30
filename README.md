# Conway's Game of Life

<p align="center"><img width="150" src="./gol_logo.png"></p>

> Una dimostrazione del funzionamento dell'implementazione del Game of Life e disponibile clonanado la repository e aprendo in browser il file index.html presente all'interno

## Utilizzo

```javascript
const game = new GameOfLife(document.querySelector("canvas"), 600, 600, 20, {
            aliveColor: "#9dcc5f",
            penColor: "orange"
        })

game.initGrid()
game.randGenPop()
game.displayPop()

console.log(game.grid)
```

## Configurazione

|Name|Type|Requred|Default|Description|
|-|-|-|-|-|
|`canvas`|`DOM`|`true`||L'oggetto canvas necessario per la costruzione e configurazione dell'ambiente|
|`width`|`Number`|`true`||La lunghezza e' necessaria per il calcolo del numero totale di celle (in una riga) nella griglia|
|`height`|`Number`|`true`||La larghezza e' necessaria per il calcolo del numero totale di celle (in una colonna) nella griglia|
|`cellSize`|`Number`|`true`||La dimensione dei lati di una cella|
|`{borderWidth}`|`Number`|`false`|`1`|Lo spessore del bordo di una cella|
|`{borderColor}`|`String`|`false`|`#000000`|Il colore del bordo della cella|
|`{aliveColor}`|`String`|`false`|`#000000`|Colore delle celle in vita|
|`{deadColor}`|`String`|`false`|`#00000020`|Colore delle celle morte|
|`{penColor}`|`String`|`false`|`grey`|Colore delle celle inserite mediante l'interfaccia IO (mouse)|

## Osservazioni

Ovviamente ci troviamo di fronte ad una versione molto inefficiente se confrontata ad altre versioni in linguaggi come C++ o Java. Tale inefficienza e’ data dall’architettura del motore di interpretazione che sta alla base del Javascript Vanilla. Delle possibili soluzioni per minimizzare i tempi morti della CPU e sfruttare la tecnologia multi-threading, potrebbero essere:
1. Utilizzo dei `Web Workers` nei browser che ci permette di elaborare molteplice righe della matrice in parallelo
1. Utilizzo della libreria `worker_threads` in NodeJS che ci fornisce una soluzione simile ai `Web Workers` ma che può essere sfruttata maggiormente da applicazioni Electron
1. Utilizzare la libreria `gpu.js`; L’utilizzo di questa libreria e efficiente solo nel caso in cui la matrice sulla quale si esegue la simulazione presenta delle dimensioni che renderebbero la CPU molto inefficiente o potrebbe causare memory leaks
