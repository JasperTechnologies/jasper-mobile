import React, { useState } from "react"
import { StatusBar, StyleSheet, KeyboardAvoidingView, Text } from "react-native"
import { AsyncStorage } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_MENU_ITEMS } from '../constants/graphql-query';
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Container,
  Image,
  TextField,
  Button,
  Touchable
} from "@draftbit/ui"
import Images from "../config/Images.js"

const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
    }
  }
}
`;

function SignInForm({ theme, navigation }) {
  const [login, { data, token }] = useMutation(LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container style={styles.Container_n4k} elevation={0} useThemeGutterPadding={true}>
      <Text
        style={[
          styles.Text_nsa,
          theme.typography.overline,
          {
            color: theme.colors.medium
          }
        ]}
      >
        ENTER YOUR CREDENTIALS:
      </Text>
      <TextField
        style={styles.TextField_n09}
        type="solid"
        label="Email Address"
        placeholder="joe@example.com"
        keyboardType="email-address"
        leftIconMode="inset"
        value={email}
        controlled={true}
        onChangeText={(value) => {
          setEmail(value);
        }}
      />
      <TextField
        style={styles.TextField_n3z}
        type="solid"
        label="Password"
        placeholder="**********"
        leftIconMode="inset"
        secureTextEntry={true}
        value={password}
        controlled={true}
        onChangeText={(value) => {
          setPassword(value);
        }}
      />
      <Button
        style={styles.Button_nnl}
        type="solid"
        color={theme.colors.primary}
        onPress={() => {
          login({
            variables: {
              email,
              password
            }
          }).then(
            ({
              data: {
                login: {
                  token
                }
              }
            }) => {
              AsyncStorage.setItem('userToken', token)
                .then((data) => {})
                .catch((err) => {});
              navigation.navigate("SimpleWelcomeScreen")
            },
            (error) => {
              console.log(error)
            },
          )
        }}
      >
        SIGN IN
      </Button>
    </Container>
  );
}

function CheckQuery({navigation}) {
  const { data, loading, error } = useQuery(
    GET_MENU_ITEMS,
    {
      onCompleted: (res) => {
        const { menuItems } = res;
        if (menuItems) {
          navigation.navigate("LandingScreen")
        }
      }
    }
  );
  return null;
}

class EmailPasswordLoginScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("dark-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  render() {
    const { theme } = this.state
    return (
      <ScreenContainer hasSafeArea={true} scrollable={true} style={styles.Root_nll}>
        <KeyboardAvoidingView
          style={styles.KeyboardAvoidingView_nit}
          enabled={true}
          behavior="padding"
          keyboardVerticalOffset={0}
        >
          <CheckQuery navigation={this.props.navigation}/>
          <Container style={styles.Container_n5z} elevation={0} useThemeGutterPadding={true}>
            <Image style={styles.Image_n71} source={Images.DraftbitMark} resizeMode="contain" />
            <Text
              style={[
                styles.Text_nj7,
                theme.typography.headline5,
                {
                  color: theme.colors.primary
                }
              ]}
            >
              Jasper Technologies
            </Text>
          </Container>
          <SignInForm theme={theme} navigation={this.props.navigation} />
          <Container style={styles.Container_nul} elevation={0} useThemeGutterPadding={true}>
            <Touchable
              style={styles.Touchable_n2m}
              onPress={() => {
                this.props.navigation.navigate("SignupWithEmailScreen")
              }}
            >
              <Text
                style={[
                  styles.Text_ncc,
                  theme.typography.button,
                  {
                    color: theme.colors.primary
                  }
                ]}
              >
                Create Account
              </Text>
            </Touchable>
            <Touchable
              style={styles.Touchable_nbr}
              onPress={() => {
                this.props.navigation.navigate("ForgotPasswordScreen")
              }}
            >
              <Text
                style={[
                  styles.Text_nwf,
                  theme.typography.button,
                  {
                    color: theme.colors.primary
                  }
                ]}
              >
                Lost Password?
              </Text>
            </Touchable>
            <Text
              style={[
                styles.Text_nfs,
                theme.typography.caption,
                {
                  color: theme.colors.light
                }
              ]}
            >
              By tapping "Sign In", you agree to our Terms of Service, Privacy Policy and Cookie
              Policy.
            </Text>
          </Container>
        </KeyboardAvoidingView>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Button_nnl: {
    height: 48,
    marginVertical: 24
  },
  Container_n4k: {
  },
  Container_n5z: {
    alignItems: "center",
  },
  Container_nul: {
    justifyContent: "flex-end",
  },
  Image_n71: {
    width: 100,
    height: 100
  },
  KeyboardAvoidingView_nit: {
    justifyContent: "space-around",
    flexGrow: 1
  },
  TextField_n09: {
    height: 82,
    marginBottom: 8
  },
  TextField_n3z: {
    height: 82
  },
  Text_ncc: {
    textAlign: "center"
  },
  Text_nfs: {
    textAlign: "center",
    marginTop: 24
  },
  Text_nj7: {
    textAlign: "center",
    width: "100%"
  },
  Text_nsa: {
    textAlign: "center",
    width: "100%",
    marginBottom: 16
  },
  Text_nwf: {
    textAlign: "center"
  },
  Touchable_n2m: {
    width: "100%"
  },
  Touchable_nbr: {
    width: "100%",
    marginTop: 24
  }
})

export default withTheme(EmailPasswordLoginScreen)
