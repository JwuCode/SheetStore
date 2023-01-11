import Comp from './comp';
import Typewriter from "typewriter-effect";


/*<div style={homeStyles.hobbiesTitle}><p>Here's some stuff I like to do:</p></div>
            <div style={homeStyles.hobbies1}><img width="40px" height="40px" src="https://static.techspot.com/images2/downloads/topdownload/2020/06/2020-06-09-ts3_thumbs-7fd.png"/><p style={homeStyles.hobbyText1}> - Pro Valorant Player                           **iron**</p></div>
            <div style={homeStyles.hobbies2}><img width="40px" height="40px" src="https://pentagram-production.imgix.net/cc7fa9e7-bf44-4438-a132-6df2b9664660/EMO_LOL_02.jpg?rect=0%2C0%2C1440%2C1512&w=640&crop=1&fm=jpg&q=70&auto=format&fit=crop&h=672"/><p style={homeStyles.hobbyText1}> - Professional League Thrower</p></div>
            <div style={homeStyles.hobbies3}><img width="40px" height="40px" src="https://www.pngrepo.com/png/216680/512/coding-browser.png"/><p style={homeStyles.hobbyText1}> - Code websites and bots</p></div>
            */
const Home = () => {
  const homeStyles = {
    container: {
      overflowX: "hidden",
      fontFamily: "Pixel",
      height: "1500px",
      backgroundColor: "#3484b3"
    },
    title: {
      fontSize: "100px",
      zIndex: "0",
      backgroundColor: "transparent",
      width: "1005px",
      position: "absolute",
      top: "175px",
      left: "250px",
      height: "98px",
      textAlign: "center",
      borderRadius: "0 40px 40px 0",
      color: "#c7c7c7"
      
    },
    bio: {
      fontSize: "25px",
      
      backgroundColor: "transparent",
      width: "200px",
      position: "absolute",
     top: "860px",
  zIndex: "4",
      left: "140px",
      height: "98px",
      textAlign: "center",
      borderRadius: "40px 0px 0px 40px",
      color: "#c7c7c7"
    },
    hobbiesTitle: {
      fontSize: "25px",
      
      backgroundColor: "transparent",
      width: "300px",
      position: "absolute",
     bottom: "-360px",
  
      right: "150px",
      height: "98px",
      textAlign: "center",
      
      color: "#c7c7c7",
      zIndex: "4",

    },
    hobbies1: {
      display: "flex",
      flexDirection: "row",
      fontSize: "20px",
      
      backgroundColor: "transparent",
      width: "100px",
      position: "absolute",
     bottom: "-335px",
  
     right: "380px",
      height: "98px",
    zIndex: "4",
      
      color: "#c7c7c7"
    },
    hobbyText1: {
      position: "absolute",
     bottom: "-30px",
      width: "300px",
      right: "-245px",
      height: "98px",
      
    
    },
    hobbies2: {
      display: "flex",
      flexDirection: "row",
      fontSize: "20px",
      
      backgroundColor: "transparent",
      width: "100px",
      position: "absolute",
      bottom: "-385px",
   
      right: "380px",
       height: "98px",
     zIndex: "4",
    
      
      color: "#c7c7c7"
    },
    hobbyText2: {
      position: "absolute",
     bottom: "-30px",
      width: "400px",
      right: "90px",
      height: "98px",
      
    
    },
    hobbies3: {
      display: "flex",
      flexDirection: "row",
      fontSize: "20px",
      zIndex: "4",
      backgroundColor: "transparent",
      width: "100px",
      position: "absolute",
     bottom: "-435px",
  
      right: "380px",
      height: "98px",
    zIndex: "4",
      color: "#c7c7c7"
    },
    tip: {
      
        fontSize: "40px",
        
        backgroundColor: "transparent",
        width: "700px",
        position: "absolute",
       bottom: "200px",
    
        right: "430px",
        height: "98px",
        textAlign: "center",
        zIndex:"1",
        color: "#c7c7c7"
    },
    comp: {
      zIndex: "3",
      position: "absolute"
    },
    fish: {
      fontSize: "25px",
      
      backgroundColor: "transparent",
      width: "75px",
      position: "absolute",
     bottom: "-570px",
  
      right: "685px",
      height: "98px",
      textAlign: "center",
      
      color: "#c7c7c7",
      zIndex: "4",

    }
  };

 

/*<p style={homeStyles.title}>This is my personal website, where I test stuff</p>
           
  */
  return (

          <div style={homeStyles.container} >
           
            <div style={homeStyles.title}><Typewriter options={{
    cursor: " "
  }}
  
  onInit={(typewriter)=> {
    
typewriter.changeDelay(70)
  typewriter.typeString("This is my personal website, where I test stuff")
    
  

  .start();
  }}
  /></div>
            <div style={homeStyles.bio}><p></p></div>
            <div style={homeStyles.tip} > <Typewriter options={{
    cursor: " "
  }}
  
  onInit={(typewriter)=> {
    typewriter.pauseFor(6000)
typewriter.changeDelay(70)
  typewriter.typeString("[Bing Chilling]")
    
  

  .start();
  }}
  /></div>
             <p style={homeStyles.bio}>Hi ! <br></br>I'm a computer engineering student at the University of Waterloo.</p>
             <p style={homeStyles.fish}>Try grabbing the koi</p>
             <p style={homeStyles.hobbiesTitle}> I'm an avid learner who loves to find new things to do. Right now, I'm obsessed with with learning how to play piano, code websites, and make sushi.</p>
            <div style={homeStyles.comp}><Comp/></div>
          </div>
      );
      
    }

  
  export default Home;

