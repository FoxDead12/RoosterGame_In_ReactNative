import { awaitExpression } from '@babel/types';
import React from 'react';
import { Animated, Button, StyleSheet, Text, TouchableWithoutFeedback, TouchableHighlight , View, Pressable, TouchableOpacity, TextInput, SafeAreaView  } from 'react-native';
import { useState } from 'react';
import { Input } from 'react-native-elements';
import Sound from 'react-native-sound';
import { VERTICAL } from 'react-native/Libraries/Components/ScrollView/ScrollViewContext';

const App = () => {

  const [menu, setMenu] = useState('flex')
  const [jogoArray, setJogoArray] = useState(['X','0'])
  const [player1, setPlayer1] = useState({Nume: 0, Nome: ''}) // Guardar Simbolo Player 1
  const [player2, setPlayer2] = useState({Nume: 1, Nome: ''}) // Guardar Simbolo Player 2
  const [plataformasUsadas, setplataformasUsadas] = useState([]) // "", "", "" ,"", "", "", "", "", "", "", "" //São as posições dos simoblos no jogo
  const [currentObj, setcurrentObj] = useState(jogoArray[player1.Nume]) // Simbolo que vai jogar
  const [mensagem, setmensagem] = useState("")
  const [mensagemVitoria, setmensagemVitoria] = useState("")
  const [menuVitoria, setmenuVitoria] = useState("none")
  const [acabou, setAcabou] = useState(false)
  const [playerJogou, setplayerJogou] = useState(true)

  const [timePlay, settimePlay] = useState(5)
  const [tempo_plyaer_jogou, settempo_plyaer_jogou] = useState(0);

  const [music, setMusic] = useState(null);

  function OnPresss (id){

    // Jogada
    if(acabou == true) return
    if(playerJogou == false) return

    id--;
    //console.log("Id: " + id)

    //Primeiro Verificar se esta casa já não possui um valor 
    if(VerificarCasa(id) == true){

      // console.log("ERRO: Está casa já tem um simbolo");
      // setmensagem("Não pode jogar aqui!")
      return;
    }

    //console.log(currentObj)
    plataformasUsadas[id] = currentObj;
    setplataformasUsadas(plataformasUsadas)
    //console.log(plataformasUsadas)

    if(VerificarJogada(currentObj) == true){

       setAcabou(true)
      return
    }

    //Tocar Som
    PlaySound();

    //Vamos trocar ordem do jogo
    TrocarOrdem();


    settimePlay(5)
    setplayerJogou(false);

  
  }

  function VerificarCasa(id){

    var JaUsada = false;

    if(plataformasUsadas[id] != undefined ){

      JaUsada = true;
    }
    //console.log(plataformasUsadas[id])

 

    return JaUsada
  }

  function TrocarOrdem(){

    if(currentObj == jogoArray[player1.Nume]){

      setcurrentObj(jogoArray[player2.Nume])
      setmensagem("Vez do Player " + player2.Nome)
      //Aqui VAMOS IMPLEMENTAR O CODIGO PARA O COMPUTADOR JOGAR;
      

    }
    else{
      setcurrentObj(jogoArray[player1.Nume])
      setmensagem("Vez do Player " + player1.Nome)

    }
  }

  function VerificarJogada(SimboloToCheck){


    var ganhou = false;
    var PlayerNome = "";

    if(currentObj == jogoArray[player1.Nume]){

      PlayerNome = player1.Nome;
    }
    else{

      PlayerNome = player2.Nome
    }

    // Horizontais
    if(plataformasUsadas[0] == SimboloToCheck && plataformasUsadas[1] == SimboloToCheck && plataformasUsadas[2] == SimboloToCheck){

      setmensagemVitoria("Player " + PlayerNome + " ganhou")
      ganhou = true;
    }
    else if(plataformasUsadas[3] == SimboloToCheck && plataformasUsadas[4] == SimboloToCheck && plataformasUsadas[5] == SimboloToCheck){
      
      setmensagemVitoria("Player " + PlayerNome + " ganhou")
      ganhou = true;

    }
    else if(plataformasUsadas[6] == SimboloToCheck && plataformasUsadas[7] == SimboloToCheck && plataformasUsadas[8] == SimboloToCheck){
      
      setmensagemVitoria("Player " + PlayerNome + " ganhou")
      ganhou = true;

    }
    // Diagonais
    else if(plataformasUsadas[0] == SimboloToCheck && plataformasUsadas[4] == SimboloToCheck && plataformasUsadas[8] == SimboloToCheck){
      
      setmensagemVitoria("Player " + PlayerNome + " ganhou")
      ganhou = true;

    }
    else if(plataformasUsadas[2] == SimboloToCheck && plataformasUsadas[4] == SimboloToCheck && plataformasUsadas[6] == SimboloToCheck){
      
      setmensagemVitoria("Player " + PlayerNome + " ganhou")
      ganhou = true;

    }
    // Verticais
    else if(plataformasUsadas[0] == SimboloToCheck && plataformasUsadas[3] == SimboloToCheck && plataformasUsadas[6] == SimboloToCheck){

      setmensagemVitoria("Player " + PlayerNome + " ganhou")
      ganhou = true;
    }
    else if(plataformasUsadas[1] == SimboloToCheck && plataformasUsadas[4] == SimboloToCheck && plataformasUsadas[7] == SimboloToCheck){
      
      setmensagemVitoria("Player " + PlayerNome + " ganhou")
      ganhou = true;

    }
    else if(plataformasUsadas[2] == SimboloToCheck && plataformasUsadas[5] == SimboloToCheck && plataformasUsadas[8] == SimboloToCheck){
      
      setmensagemVitoria("Player " + PlayerNome + " ganhou")
      ganhou = true;

    }

    if(ganhou == true){

      setmenuVitoria("flex")
      
    }

    if(ganhou == false){

      var empate = true;
      for(var i = 0; i <= 8; i++){

        if(plataformasUsadas[i] == "" || plataformasUsadas[i] == undefined){
          empate = false;  
        }


      }

      if(empate == true){

        setmensagemVitoria("Empate")
        setmenuVitoria("flex")
        
        ganhou = true;

      }

    }
    return ganhou

  }

  function RecomeçarJogo(){

    setcurrentObj(jogoArray[player1.Nume])
    setmensagem("Vez do Player " + player1.Nome)
    setplataformasUsadas([])
    setAcabou(false)
    setmenuVitoria("none")
    setmensagemVitoria("")
    settimePlay(5)
    setplayerJogou(true)
  }

  function Player1(element){

    //console.log(element)
    player1.Nome = element;
  }

  function Player2(element){

   // console.log(element)
    player2.Nome = element;
  }

  function ComeçarJogo(){

    //console.log(player2.Nome)
    if(player1.Nome == ""){

      setmensagem("Define o nome do player 1")
      return
    }

    if(player2.Nome == ""){

      setmensagem("Define o nome do player 2")
      return
    }

    setMenu('none')
    setmensagem("Vez do Player " + player1.Nome);

  }

  function JogadaComputador(){

   

    var min = 1;
    var max = 9;

    var validCase = false;

    while(validCase == false){

      var rand =  min + (Math.random() * (max-min));
      var id = Math.trunc(rand);
      id--;

      //console.log("A id selecionado é " + id)
      id = ComputadorAcharCasaDeJogo();
      if(VerificarCasa(id) == true){

        console.log("ERRO: Está casa já tem um simbolo");
        setmensagem("Não pode jogar aqui!")
        
        var casasCheias = true;

        /*for(var i = 0; i <= (plataformasUsadas.length - 1); i++){

          if(plataformasUsadas[id] == undefined){

            casasCheias = false;
          }
        }

        // console.log("COUNT DE CASAS " + count)
        if(casasCheias == true){

          validCase = true;
        }*/

      }
      else{   

        validCase = true;
      }
    }


    plataformasUsadas[id] = currentObj;
    setplataformasUsadas(plataformasUsadas)
  //  console.log(plataformasUsadas)

    if(VerificarJogada(currentObj) == true){

      setAcabou(true)
     return
   }

    PlaySound();
    TrocarOrdem();

  }

  function ComputadorAcharCasaDeJogo(){
    
    var id = -1;

    //Buscar Casas Livres
    var casasLivres = []; //AQUI VAI GUARDAR O ID DA CASA  
    for(var i = 0; i <= 8; i++){

      if(plataformasUsadas[i] == undefined){
        casasLivres.push(i)
      }
    }
    //JÁ TEMOS AS CASAS VAZIAS

    for(var i = 0; i <= casasLivres.length - 1; i++){

        var idCasa = casasLivres[i];

        // VERTICAL
        if(idCasa < 3){
          //PRIMEIRA LINHA
          
          if(plataformasUsadas[0] == currentObj || plataformasUsadas[1] == currentObj || plataformasUsadas[2] == currentObj ){
            
            if(plataformasUsadas[0] != jogoArray[0] && plataformasUsadas[1] != jogoArray[0] && plataformasUsadas[2] != jogoArray[0]){


              id = idCasa;
            }
            
            
          }

        }
        else if(idCasa < 6){
          //SEGUNDA LINHA
          if(plataformasUsadas[3] == currentObj || plataformasUsadas[4] == currentObj || plataformasUsadas[5] == currentObj || plataformasUsadas[3] == undefined && plataformasUsadas[4] == undefined && plataformasUsadas[5] == undefined){
            if(plataformasUsadas[3] != jogoArray[0] && plataformasUsadas[4] != jogoArray[0] && plataformasUsadas[5] != jogoArray[0]){

                
              id = idCasa;
            }
          }
        } 
        else{
          //TERÇEIRA LINHA
          if(plataformasUsadas[6] == currentObj || plataformasUsadas[7] == currentObj || plataformasUsadas[8] == currentObj || plataformasUsadas[6] == undefined && plataformasUsadas[7] == undefined && plataformasUsadas[8] == undefined){
            
            if(plataformasUsadas[6] != jogoArray[0] && plataformasUsadas[7] != jogoArray[0] && plataformasUsadas[8] != jogoArray[0]){

                
              id = idCasa;
            }
          }
        }

        if(id == -1){
          if(idCasa < 3){
            //PRIMEIRA LINHA
            
            if(plataformasUsadas[idCasa] == currentObj || plataformasUsadas[idCasa + 3] == currentObj || plataformasUsadas[idCasa + 6] == currentObj || plataformasUsadas[idCasa] == undefined && plataformasUsadas[idCasa + 3] == undefined && plataformasUsadas[idCasa + 6] == undefined){
              if(plataformasUsadas[idCasa] != jogoArray[0] && plataformasUsadas[idCasa + 3] != jogoArray[0] && plataformasUsadas[idCasa + 6] != jogoArray[0]){

                
                id = idCasa;
              }
            }
  
          }
          else if(idCasa < 6){
            //SEGUNDA LINHA
            if(plataformasUsadas[idCasa - 3] == currentObj || plataformasUsadas[idCasa] == currentObj || plataformasUsadas[idCasa + 3] == currentObj || plataformasUsadas[idCasa - 3] == undefined && plataformasUsadas[idCasa ] == undefined && plataformasUsadas[idCasa + 3] == undefined){
              if(plataformasUsadas[idCasa - 3] != jogoArray[0] && plataformasUsadas[idCasa] != jogoArray[0] && plataformasUsadas[idCasa + 3] != jogoArray[0]){

                
                id = idCasa;
              }
            }
          } 
          else{
            //TERÇEIRA LINHA
            if(plataformasUsadas[idCasa - 6] == currentObj || plataformasUsadas[idCasa - 3] == currentObj || plataformasUsadas[idCasa] == currentObj || plataformasUsadas[idCasa - 6] == undefined && plataformasUsadas[idCasa -3] == undefined && plataformasUsadas[idCasa ] == undefined){
              if(plataformasUsadas[idCasa - 6] != jogoArray[0] && plataformasUsadas[idCasa - 3] != jogoArray[0] && plataformasUsadas[idCasa] != jogoArray[0]){

                
                id = idCasa;
              }
            }
          }
        }

    }

    if(id == -1){

      //console.log("CASA NÃO SELECIONADA");
      id = casasLivres[0];
    }

    return id;
  }

  function PlaySound(){

    //console.log(require('sound1.mp3'));
    let sound = new Sound('soundplay.mp3', Sound.MAIN_BUNDLE, (err) => {

      if(err){
        console.log(err);
        return
      }

      sound.play((success) => {

        //console.log(success);
      })


    });

    //console.log(sound)
    setMusic(sound);
  }

  if(playerJogou == false){


    //Aqui vai executar a jogada do computador
    JogadaComputador();

    settimePlay(5)

    setplayerJogou(true);

  }
  else if(menu === "none" && playerJogou == true && acabou == false){

    //Aqui vai descontar o tempo do player


    if(timePlay > 0){

      setTimeout (() => {

        var temp = timePlay - 1
        settimePlay(temp)

      }, 1000)
    }
    else{

              
      if(timePlay == 0){
        console.log("JOGADOR PERDEU A VEZ");
        settimePlay(-1)
        setplayerJogou(false);      
        TrocarOrdem();

      }
    }
    

    // seila = setInterval( () => {

    //   var tempTime = timePlay - 1;
    //   settimePlay(tempTime)

    //   console.log(tempTime)

    //   if(tempTime >= 0){
    //     clearInterval(seila);
    //   }


    // }, 1000)
  }


  
  



  return (
    
    <View style={{position: 'relative', width: '100%', height:'100%'}}>


    <View style={styless.body}>
     
      <Text style={{ textTransform: 'uppercase', letterSpacing: 3 ,fontSize: 30, textAlign: 'center', position: 'absolute', width: '100%', top: 20, color: 'black', fontWeight: 'bold',}}>{mensagem} {timePlay}</Text>


        <View style={styless.grid}>
          
            <View style={styless.row}>
              <TouchableOpacity onPress={() => OnPresss(1)}>
                <View  style={styless.cell}><Text style={{fontSize: 30, color: 'black'}}>{plataformasUsadas[0]}</Text></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => OnPresss(2)}>
                <View  style={styless.cell}><Text style={{fontSize: 30, color: 'black'}}>{plataformasUsadas[1]}</Text></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => OnPresss(3)}>
                <View  style={styless.cell}><Text style={{fontSize: 30, color: 'black'}}>{plataformasUsadas[2]}</Text></View>
              </TouchableOpacity>

            </View>

            
            <View style={styless.row}>
              <TouchableOpacity onPress={() => OnPresss(4)}>
                <View  style={styless.cell}><Text style={{fontSize: 30, color: 'black'}}>{plataformasUsadas[3]}</Text></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => OnPresss(5)}>
                <View  style={styless.cell}><Text style={{fontSize: 30, color: 'black'}}>{plataformasUsadas[4]}</Text></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => OnPresss(6)}>
                <View  style={styless.cell}><Text style={{fontSize: 30, color: 'black'}}>{plataformasUsadas[5]}</Text></View>
              </TouchableOpacity>

            </View>

           
            
            <View style={styless.row}>
              <TouchableOpacity onPress={() => OnPresss(7)}>
                <View  style={styless.cell}><Text style={{fontSize: 30, color: 'black'}}>{plataformasUsadas[6]}</Text></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => OnPresss(8)}>
                <View  style={styless.cell}><Text style={{fontSize: 30, color: 'black'}}>{plataformasUsadas[7]}</Text></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => OnPresss(9)}>
                <View  style={styless.cell}><Text style={{fontSize: 30, color: 'black'}}>{plataformasUsadas[8]}</Text></View>
              </TouchableOpacity>

            </View>

            {/* Bordas */}
            <View style={{ borderBottomWidth: 2,  width: 320, position: 'absolute', bottom: 125}}></View>
            <View style={{ borderBottomWidth: 2,  width: 320, position: 'absolute', top: 125}}></View>
            <View style={{borderLeftWidth: 2,  height: 320, position: 'absolute', left: 155}}></View>
            <View style={{borderLeftWidth: 2,  height: 320, position: 'absolute', right: 155}}></View>

        </View>
       


        <View style={{ display: menuVitoria ,position: 'absolute', zIndex: 2, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#fff', width: '90%', height: 200,borderRadius: 10,}}>
            <Text style={{ textTransform: 'uppercase', letterSpacing: 3 ,fontSize: 28, textAlign: 'center', position: 'absolute', width: '100%', top: 20, color: 'black', fontWeight: 'bold',}}>{mensagemVitoria}</Text>
            <TouchableOpacity style={{position: 'absolute', bottom: 20}} onPress={() => RecomeçarJogo()}>
              <View ><Text style={{padding: 15, textTransform: 'uppercase', letterSpacing: 3 ,backgroundColor: '#00008B', fontSize: 20,  color: 'white', fontWeight: 'bold'}} >Recomeçar Jogo</Text></View> 
            </TouchableOpacity>
        </View>

    </View>



    <View style={{ display: menu, justifyContent: 'center', alignItems: 'center',position: 'absolute', width: '100%', height: '100%', padding: 5 , backgroundColor: '#eee', zIndex: 2}}>

    <Text style={{ textTransform: 'uppercase', letterSpacing: 3 ,fontSize: 30, textAlign: 'center', position: 'absolute', width: '100%', top: 20, color: 'black', fontWeight: 'bold',}}>{mensagem}</Text>

      <Text style={{fontSize: 30, width: 300}}>Player 1</Text>
      <TextInput   style={{width: 300 ,fontSize: 30, borderBottomWidth: 2}} onChangeText={Player1} />

      <Text  style={{ marginTop: 100 ,fontSize: 30, width: 300}}>Player 2</Text>
      <TextInput style={{fontSize: 30, borderBottomWidth: 2, width: 300}} onChangeText={Player2} />

      <TouchableOpacity style={{position: 'relative', top: 50}} onPress={() => ComeçarJogo()}>
          <View ><Text style={{padding: 15, textTransform: 'uppercase', letterSpacing: 3 ,backgroundColor: '#00008B', fontSize: 20,  color: 'white', fontWeight: 'bold'}} >Jogar</Text></View> 
       </TouchableOpacity>
    </View>


    </View>
  );
}

const styless = StyleSheet.create({

  body: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    zIndex: 1,
    
  },

  menu:{

    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',

  },

  menuTitulo: {

    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },

  grid: {

    position: 'relative',
    width: '100%',
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    width: 320,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 0,
  },

  cell:{

    borderWidth: 0,
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    margin: 0,


  },

  bordaBottom: {

  }
  
})


export default App;