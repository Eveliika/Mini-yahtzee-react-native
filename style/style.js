import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 30,
    backgroundColor: '#ab8ee1',
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: '#ab8ee1',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 30
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#dfd1f8ff",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  points: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 15,
    textAlign: 'center'
  },
  dicepoints: {
    flexDirection: 'row',
    width: 280,
    alignContent: 'center'
  },
  textinput: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    padding: 15,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 15,
    backgroundColor: '#ab8ee120'
  },
  rulessymbol: {
    textAlign: 'center',
    padding: 10,
    color: '#ab8ee1',
    backgroundColor: '#fff',
  },
  rulesheader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingBottom: 10
  },
  rules: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  lucktext: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  playbutton: {
    margin: 30,
    flexDirection: "row",
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 28,
    paddingRight: 28,
    backgroundColor: "#dfd1f8ff",
    width: 'auto',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  player: {
    paddingTop: 30,
    fontSize: 20
  },
  scores: {
    flexDirection: 'row',
  },
  playerinfo: {
    fontSize: 17
  }
});