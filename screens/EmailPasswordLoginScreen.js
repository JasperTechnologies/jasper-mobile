import React, { useState } from "react"
import { StatusBar, StyleSheet, KeyboardAvoidingView, Text } from "react-native"
import { AsyncStorage } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoadingContainer from '../components/LoadingContainer';
import { GET_MENU_ITEMS } from '../constants/graphql-query';
import { LOGIN } from '../constants/graphql-mutation';
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
import { NO_USER_FOUND } from '../constants/error-messages';
import Images from "../config/Images.js";

function ErrorMessage({error, theme}){
  console.log('error', error)
  if(error){
    return <Text style={[styles.Text_ncc, theme.typography.headline5, {color: theme.colors.error}]}>
        Cannot Log In, Invalid Username or Password
      </Text>
  }
  return null
}

function SignInForm({ theme, navigation, connection }) {
  const [login, { data, token }] = useMutation(LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState(null);

  return (
    <Container style={styles.Signin_Form_Container} elevation={0} useThemeGutterPadding={true}>
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
              setSignInError(false)
              navigation.navigate("SimpleWelcomeScreen")
            },
            (error) => {
              const authenticationErrorMessage = JSON.stringify(error).includes(NO_USER_FOUND)
              if(authenticationErrorMessage){
                setSignInError(true)
              }
            },
          )
        }}
      >
        SIGN IN
      </Button>
      <ErrorMessage theme={theme} error={signInError}/>
    </Container>
  );
}

function LoadingView({loading}) {
  if (loading) {
    return <LoadingContainer message={'Logging in...'} />;
  }
  return null;
}

function EmailPasswordLoginScreen({ navigation }) {
  const theme = Object.assign({}, screenTheme);
  const [loading, setLoading] = useState(true);

  const { data, error } = useQuery(
    GET_MENU_ITEMS,
    {
      onCompleted: (res) => {
        const { menuItems } = res;
        if (menuItems) {
          navigation.navigate("LandingScreen");
        } else {
          setLoading(false);
        }
      },
      onError: (e) => {
        setLoading(false);
      }
    }
  );
  return (
    <ScreenContainer hasSafeArea={true} style={styles.Root_nll}>
      <LoadingView loading={loading} />
      <KeyboardAvoidingView
        style={styles.Signin_Container}
        enabled={true}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <Container>
          <Text
            style={[
              styles.Text_nj7,
              {
                fontFamily: "LilitaOne",
                fontSize: 84
              }
            ]}
          >
            Jasper
          </Text>
        </Container>
        <SignInForm theme={theme} navigation={navigation} />
        <Container style={styles.Container_nul} elevation={0} useThemeGutterPadding={true}>
          <Touchable
            style={styles.Touchable_n2m}
            onPress={() => {
              navigation.navigate("SignupWithEmailScreen")
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
              navigation.navigate("ForgotPasswordScreen")
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
  );
}

const styles = StyleSheet.create({
  Button_nnl: {
    height: 48,
    marginVertical: 24
  },
  Signin_Form_Container: {
    width: "30%",
    marginVertical: 24
  },
  Container_n4k: {
  },
  Container_nul: {
    justifyContent: "flex-end",
  },
  Image_n71: {
    width: 100,
    height: 100
  },
  Signin_Container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

export default withTheme(EmailPasswordLoginScreen);
