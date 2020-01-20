import React, { Component } from "react";
import { Image } from "react-native";
import User from '../../State/Model/User';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";

const drawerCover = require("../../../assets/drawer-cover.png");

const datas = [
  {
    name: "Home",
    route: "Home",
    icon: "home",
    bg: "#C5F442"
  },
  {
    name: "About Us",
    route: "AboutUs",
    icon: "person",
    bg: "#477EEA",
  
  },
  {
    name: "Privacy Policy",
    route: "Privacy",
    icon: "clipboard",
    bg: "#DA4437",
  
  },
  {
    name: "Terms & Conditions",
    route: "TC",
    icon: "clipboard",
    bg: "#C5F442",
  
  },
  {
    name: "Work With Us",
    route: "WorkWithUs",
    icon: "camera",
    bg: "#C5F442"
  },
  {
    name: "Help",
    route: "Help",
    icon: "help-circle",
    bg: "#4DCAE0"
  },
  {
    name: "Logout",
    route: "Logout",
    icon: "md-exit",
    bg: "#4DCAE0"
  },
 

];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }
  async sideNav(routeName){
    if(routeName === 'Logout'){
      User.deleteAll();
      this.props.navigation.navigate('AuthLoading');
    }
   else{
    this.props.navigation.navigate(routeName)
    }
  }
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
         

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.sideNav(data.route) }
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
