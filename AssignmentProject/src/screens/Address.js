import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { View, Container, Content, Item, Input, Button, Text } from 'native-base';

import HeaderCart from './../component/HeaderCart';
import {addaddress} from './../action/Act_AddAddress';

class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address1: '',
            address2: '',
            city: '',
            state: '',
            country: ''
        }
    }

    handleNext = () => {
        let address = this.state;
        this.props.address(address);
        this.props.navigation.navigate('Cart');
      }

    render() {
        return (
            <Container>
                <View>
                    <HeaderCart title="Address" navigation={this.props.navigation} />
                </View>
                <Content>
                    <ScrollView>
                        <View>
                            <Item style={{ marginBottom: 8, width: "85%", marginLeft: "9%" }}>
                                <Input
                                    placeholder="Address line 1"
                                    value={this.state.address1}
                                    onChangeText={address1 => this.setState({ address1 })} />
                            </Item>
                            <Item style={{ marginBottom: 8, width: "85%", marginLeft: "9%" }}>
                                <Input
                                    placeholder="Address line 2"
                                    value={this.state.address2}
                                    onChangeText={address2 => this.setState({ address2 })} />
                            </Item>
                            <Item style={{ marginBottom: 8, width: "85%", marginLeft: "9%" }}>
                                <Input
                                    placeholder="City"
                                    value={this.state.city}
                                    onChangeText={city => this.setState({ city })} />
                            </Item>
                            <Item style={{ marginBottom: 8, width: "85%", marginLeft: "9%" }}>
                                <Input
                                    placeholder="State"
                                    value={this.state.state}
                                    onChangeText={state => this.setState({ state })} />
                            </Item>
                            <Item style={{ marginBottom: 8, width: "85%", marginLeft: "9%" }}>
                                <Input
                                    placeholder="Country"
                                    value={this.state.country}
                                    onChangeText={country => this.setState({ country })} />
                            </Item>
                        </View>
                    </ScrollView>
                </Content>
                <View style={{ width: '100%' }}>
                    <Button block onPress={this.handleNext}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>Next</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        address: data => {
          dispatch(addaddress(data))
        }
      }
}

export default connect( null,mapDispatchToProps)(Address);