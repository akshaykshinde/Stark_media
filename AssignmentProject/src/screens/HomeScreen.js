import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    Alert
  } from 'react-native';
import { connect } from 'react-redux';
import HeaderHome from '../component/HeaderHome';
import { Button, Card, Container, CheckBox } from 'native-base';
import {
    Colors
  } from 'react-native/Libraries/NewAppScreen';
import { addtocart } from '../action/Act_AddToCart';
import { productselected } from '../action/Act_ProductChecked';
import { productunchecked } from '../action/Act_ProductUnChecked';

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
  }

  handleCheckBox = (item) => {
    if(item.check){
      var data = item ;
      data.check = false ;
      this.props.productunchecked(data);
    } else {
      var data = item ;
      data.check = true ;
      this.props.productselected(data);
    }
  }

  handleNext = () => {
    if(this.props.selected.length > 0){
    this.props.navigation.navigate('Address');
    } else {
      Alert.alert(
        "Attention",
        "Please select at least 1 Product.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
  }

    render() {
        return (
          <Container>
            <HeaderHome navigation={this.props.navigation}/>
            <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
            {this.props.bookdata.map( item => {
              return(
                <View>
                <Card style={styles.card}>
                  <View style={{ margin:'2%', display:'flex', flexDirection:'row'}}>
                    <View style={styles.marginside,{ width:'35%'}}>
                      <Image
                      style={styles.image}
                      source={{
                        uri: item.imgUrl
                      }} 
                      />
                    </View>
                    <View style={styles.marginside,{ width:'55%'}}>
                    <Text>{item.name}</Text>
                    <Text>{"Author: "}{item.author}</Text>
                    <Text>{"Price: "}{item.price}</Text>
                    </View>
                    <View >
                      <View style={{  display:'flex', flexDirection:'row'}}>
                        <CheckBox 
                          checked={item.check}
                          onPress={() => this.handleCheckBox(item)}
                          />
                      </View>
                    </View>
                  </View>
                </Card>
                </View>
              )
            })}
          </View>
        </ScrollView>
        <View style={{  width:'100%'}}>
        <Button block onPress={this.handleNext}>
          <Text style={{ color:'#fff' , fontSize:20}}>Next</Text>
        </Button>
        </View>
        </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      addcart: data => {
        dispatch(addtocart(data))
      },
      productselected: data => {
        dispatch(productselected(data))
      },
      productunchecked: data => {
        dispatch(productunchecked(data))
      }
    }
}

const mapStateToProps = (state) => {
    let data = state.selected.map( item => { return item})
    return {
        selected: data,
        bookdata: state.bookdata,
        cartdata: state.cartdata
    }
}
const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    card: {
      width: '94%',
      marginLeft: '3%'
    },
    image: {
      width:110,
      height:160
    },
    marginside: {
      margin:'2%'
    },
    button: {
      margin:'3%',
      backgroundColor:'cyan'
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);