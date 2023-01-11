import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
} from 'react-native';
import styles from './styles';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      precoAlcool: Number,
      precoGasolina: Number,
      modalVisible: false,
      frase: '',
    };
    this.Calcular = this.Calcular.bind(this);
  }
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  Calcular() {
    let gasolina = this.state.precoGasolina;
    let alcool = this.state.precoAlcool;
    let Valor = alcool / gasolina;

    if (Valor <= 0.7) {
      this.setState({frase: 'Compensa usar Álcool'});
    } else {
      this.setState({frase: 'Compensa usar Gasolina'});
    }

    this.setModalVisible();
  }

  render() {
    const {modalVisible} = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}>
        <View style={styles.container}>
          <View style={styles.viewContainer}>
            <Image source={require('../../images/logo.png')} />
            <Text style={styles.textLogo}>Qual a melhor opção?</Text>
          </View>

          <View style={styles.containerImput}>
            <Text style={styles.txtImput}>Álcool (Preço por litro):</Text>
            <TextInput
              value={this.state.precoAlcool}
              onChangeText={item => this.setState({precoAlcool: item})}
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Preço álcool"
            />
            <Text style={styles.txtImput2}>Gasolina (Preço por litro):</Text>
            <TextInput
              value={this.state.precoGasolina}
              onChangeText={item => this.setState({precoGasolina: item})}
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Preço gasolina"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={this.Calcular}>
            <Text style={styles.txtButton}>Calcular</Text>
          </TouchableOpacity>

          <View style={styles.container}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}>
              <View>
                <View style={styles.modalView}>
                  <View style={styles.viewContainer}>
                    <Image source={require('../../images/gas.png')} />
                    <Text style={styles.textLogo2}>{this.state.frase}</Text>
                  </View>
                  <View style={styles.viewContainer}>
                    <Text style={styles.txtModaltitlle}>Com os preços:</Text>
                    <Text style={styles.txt2}>
                      Álcool: R$ {this.state.precoAlcool}
                    </Text>
                    <Text style={styles.txt2}>
                      Gasolina: R$ {this.state.precoGasolina}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.setModalVisible(!modalVisible)}>
                    <Text style={styles.txtButton}>Calcular Novamente</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default App;
