import React, { useState } from "react"
import { AsyncStorage, StyleSheet, KeyboardAvoidingView, Text, View } from "react-native"
import { WebView } from "react-native-webview"
import { CLOVER_REDIRECT_URI, CLOVER_CLIENT_ID } from 'react-native-dotenv';
import { useMutation, useQuery } from '@apollo/react-hooks';
import LoadingContainer from '../components/LoadingContainer';
import { GET_MENU_ITEMS } from '../constants/graphql-query';
import { LOGIN, ADD_ACCESS_TOKEN_TO_LOCATION } from '../constants/graphql-mutation';
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Container,
  TextField,
  Button,
  Touchable
} from "@draftbit/ui"
import { NO_USER_FOUND } from '../constants/error-messages';

function ErrorMessage({error, theme}){
  if(error){
    return <Text style={[styles.Text_ncc, theme.typography.headline5, {color: theme.colors.error}]}>
        Cannot Log In, Invalid Username or Password
      </Text>
  }
  return null
}

function CloverWebview({shouldUseWebView, setShouldUseWebView, navigation}){
  const [addAccessTokenToLocation, { data, token }] = useMutation(ADD_ACCESS_TOKEN_TO_LOCATION);

  this.handleWebViewNavigationStateChange = newNavState => {
    const { url } = newNavState
    const isJasperRedirectURL = url.includes('jasper') && !url.includes('clover')
    if(isJasperRedirectURL) {
      this.webview.stopLoading();

      const merchantIdIndex = url.indexOf("?merchant_id=") + 13
      const codeIndex = url.indexOf("&code=") + 6
      const employeeIdIndex = url.indexOf("&employee_id=")
  
      const merchantId = url.slice(merchantIdIndex, employeeIdIndex)
      const accessToken = url.slice(codeIndex)

      addAccessTokenToLocation({
        variables: {
          merchantId,
          accessToken
        }
      })
      setShouldUseWebView(false)
      navigation.navigate('SimpleWelcomeScreen')
    }
  }

  if(shouldUseWebView){
    return <View style={{position: 'absolute', zIndex:1000, top: 0, left: 0}}>
      <Text style={{fontSize: 35, marginTop: -200, marginLeft: -30}}>Please Enable Clover Permissions</Text>
      <WebView
          ref={ref => (this.webview = ref)}
          style={{width: 1100, height: 700, marginLeft: -360, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.00,
          borderRadius: 30
        }}
          source={{uri:`https://clover.com/oauth/authorize?client_id=${CLOVER_CLIENT_ID}&redirect_uri=${CLOVER_REDIRECT_URI}`}}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
        />
    </View>
  }
  return null
}

function SignInForm({ theme, navigation, connection }) {
  const [login, { data, token }] = useMutation(LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState(null);
  const [ shouldUseWebView, setShouldUseWebView ] = useState(false)

  return (
    <Container style={styles.Signin_Form_Container} elevation={0} useThemeGutterPadding={true}>
      <CloverWebview 
        shouldUseWebView={shouldUseWebView} 
        setShouldUseWebView={setShouldUseWebView}
        navigation={navigation}
        />
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
                  token,
                  user
                }
              }
            }) => {
              const cloverMetaData = user.locations[0].cloverMetaData
              if (cloverMetaData !== null){              
                AsyncStorage.setItem('userToken', token)
                  .then((data) => {})
                  .catch((err) => {});
                setSignInError(false)
                navigation.navigate("SimpleWelcomeScreen")
              } else {
                AsyncStorage.setItem('userToken', token)
                  .then((data) => {})
                  .catch((err) => {});
                setSignInError(false)
                setShouldUseWebView(true)
              }
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

  this.skipToMenu = () => {
    const { data, error } = useQuery(
      GET_MENU_ITEMS,
      {
        onCompleted: (res) => {
          const { menuItems } = res;
          if (menuItems.length > 0) {
            navigation.navigate("LandingScreen");
          } else {
            setLoading(false);
            // navigation.navigate("SimpleWelcomeScreen");
          }
        },
        onError: (e) => {
          setLoading(false);
        }
      }
    );
  }

  this.skipToMenu()
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
