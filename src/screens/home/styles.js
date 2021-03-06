const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  container:{
    flex:1,
    
  },
  list: {
   
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    marginVertical: 8,
    backgroundColor:"white",
    flexBasis: '45%',
  
  },
  cardContent: {
    paddingVertical: 17,
    justifyContent: 'space-between',
  },
  cardImage:{
    flex: 1,
    width: null,
    height: null,
  },
  imageContainer:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
    color:"#778899"
  },
  count:{
    fontSize:18,
    flex:1,
    color:"#B0C4DE"
  },
  avatar: {
    width: 280,
    height: 280,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:20
  },
  viewStyle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 1,
 
  },
  childStyle: {
    width: '1%',
  
   
   
  },
  childStyle1: {
    width: '99%',
  
  
  }
};
