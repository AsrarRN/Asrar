import React, {useRef, useState} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import {
  Rnicon,
  emailColorIcon,
  emailIcon,
  passwordColorIcon,
  passwordIcon,
} from '../../assets/images';
import {Colors} from '../../Common/Colours';
import {isEmailValid, isNotEmpty} from '../../Common/Helper';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusInputOne, setFocusInputOne] = useState(false);
  const [focusInputTwo, setFocusInputTwo] = useState(false);
  const passwordRef = useRef(null);

  const onSubmit = () => {
    var matchEmail = 'reactnative@tot.com';
    var matchPassword = 'Tot@123';
    if (!isNotEmpty(email, 'email.')) {
    } else if (!isEmailValid(email)) {
    } else if (!isNotEmpty(password, 'password.')) {
    } else if (matchEmail !== email) {
      alert('Please enter the valid email');
    } else if (matchPassword !== password) {
      // alert('Please enter the valid password');
    } else {
    }
    navigation.navigate('TabScreen');
  };

  return (
    <SafeAreaView style={styles.safeAreStyle}>
      <View style={styles.container}>
        <View style={styles.backgroundView}>
          <View style={styles.style1}>
            <Image resizeMode="contain" source={Rnicon} style={styles.style2} />
          </View>
          <View>
            <Text style={styles.style3}>LOGIN</Text>
          </View>

          <View style={styles.style4}>
            <View
              style={[
                styles.style5,
                {
                  borderBottomColor: focusInputOne
                    ? Colors.lightpink
                    : Colors.gray,
                },
              ]}>
              <Image
                resizeMode="contain"
                source={focusInputOne ? emailColorIcon : emailIcon}
                style={styles.style6}
              />

              <TextInput
                placeholder={'Email'}
                value={email}
                autoCapitalize="none"
                style={styles.style7}
                onFocus={() => setFocusInputOne(true)}
                onBlur={() => setFocusInputOne(false)}
                placeholderTextColor={Colors.gray}
                onChangeText={setEmail}
                onSubmitEditing={() => passwordRef.current.focus()}
                returnKeyType={'next'}
              />
            </View>

            <View
              style={[
                styles.style8,
                {
                  borderBottomColor: focusInputTwo
                    ? Colors.lightpink
                    : Colors.gray,
                },
              ]}>
              <Image
                resizeMode="contain"
                source={focusInputTwo ? passwordColorIcon : passwordIcon}
                style={styles.style6}
              />

              <TextInput
                ref={passwordRef}
                autoCapitalize="none"
                placeholder={'Password'}
                secureTextEntry
                value={password}
                onFocus={() => setFocusInputTwo(true)}
                onBlur={() => setFocusInputTwo(false)}
                style={styles.style7}
                placeholderTextColor={Colors.gray}
                onChangeText={setPassword}
                onSubmitEditing={() => onSubmit()}
                returnKeyType={'done'}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              onSubmit();
            }}
            style={[
              styles.style11,
              {
                backgroundColor:
                  email && password ? Colors.lightpink : Colors.gray,
              },
            ]}>
            <Text style={styles.style12}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
