import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Alert
} from 'react-native';
import { Button, Card, Container, Icon } from 'native-base';
import { connect } from 'react-redux';
import HeaderCart from '../component/HeaderCart';
import { removefromcart } from '../action/Act_RemoveCart';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartdata: [],
      total: 0
    }
  }

  componentDidMount() {
    this.setState({
      cartdata: this.props.cartdata
    });
    this.calculateTotal(this.props.cartdata);
  }

  increamentFunction = (item) => {
    let data = this.state.cartdata;
    let currentitem = item;
    let index;
    data.map((element, indx) => {
      if (item.id === element.id) {
        index = indx;
      }
    });
    currentitem.quantity = currentitem.quantity + 1;
    data.splice(index, 1, currentitem);
    this.calculateTotal(data);
  }

  decreamentFunction = (item) => {
    let data = this.state.cartdata;
    let currentitem = item;
    let index;
    data.map((element, indx) => {
      if (item.id === element.id) {
        index = indx;
      }
    });
    currentitem.quantity = currentitem.quantity - 1;
    data.splice(index, 1, currentitem);
    this.calculateTotal(data);
  }

  calculateTotal = (data) => {
    let total = 0 ;
    data.map( item => {
      let price = item.quantity * item.price ;
      total = total + price ;
    });
    this.setState({ total: total , cartdata: data });
  }

  handleNext = () => {
    Alert.alert(
      "Order Placed",
      "Thank you for order",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <Container>
        <HeaderCart title="Cart" navigation={this.props.navigation} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Card style={styles.card}>
            <View style={{ alignSelf: 'center', margin: '3%' }}>
              <Text>Address</Text>
            </View>
            <View style={{ margin: '2%' }}>
              <Text>Line 1: {this.props.address.address1}</Text>
              <Text>Line 2: {this.props.address.address2}</Text>
              <Text>City: {this.props.address.city}</Text>
              <Text>State: {this.props.address.state}</Text>
              <Text>Country: {this.props.address.country}</Text>
            </View>
          </Card>
          <View>
            {this.state.cartdata.map(item => {
              return (
                <View>
                  <Card style={styles.card}>
                    <View style={{ margin: '2%', display: 'flex', flexDirection: 'row' }}>
                      <View style={styles.marginside, { width: '32%' }}>
                        <Image
                          style={styles.image}
                          source={{
                            uri: item.imgUrl
                          }}
                        />
                      </View>
                      <View style={styles.marginside, { width: '36%' }}>
                        <Text>{item.name}</Text>
                        <Text>{"Author: "}{item.author}</Text>
                        <Text style={{ fontSize: 25}}>{"Price: "}{item.price}</Text>
                      </View>
                      <View style={{ alignSelf: 'flex-end' }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                          <View>
                            <Button transparent onPress={() => this.decreamentFunction(item)}>
                              <Icon
                                name="remove-circle-outline"
                                style={{ color: "#000" }}
                              />
                            </Button>
                          </View>
                          <View>
                            <Text style={{ fontSize: 25 }}>{item.quantity}</Text>
                          </View>
                          <View>
                            <Button transparent onPress={() => this.increamentFunction(item)}>
                              <Icon
                                name="add-circle"
                                style={{ color: "#000" }}
                              />
                            </Button>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                </View>
              )
            })}
          </View>
        </ScrollView>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <Text style={{ color: '#000', fontSize: 25, margin: '2%' }}>Total: {this.state.total}</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Button block onPress={this.handleNext}>
              <Text style={{ color: '#fff', fontSize: 15 }}>Place order</Text>
            </Button>
          </View>
        </View>
      </Container>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    removecart: data => {
      dispatch(removefromcart(data))
    }
  }
}

const mapStateToProps = state => {
  let data = state.selected.map(item => { return item });
  let addres = state.address ;
  return {
    cartdata: data,
    address: addres
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  card: {
    width: '96%',
    marginLeft: '3%'
  },
  image: {
    width: 110,
    height: 160
  },
  marginside: {
    margin: '2%'
  },
  button: {
    margin: '3%',
    backgroundColor: 'cyan'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);