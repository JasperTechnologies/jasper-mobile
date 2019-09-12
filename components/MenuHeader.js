import React from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { connect } from 'react-redux';
import { yummy as screenTheme } from "../config/Themes"
import { updateCurrentMenuCategory } from "../reducers/reducer";
import MenuHeaderItem from "./MenuHeaderItem"
import {
  withTheme,
  Touchable,
  Icon,
} from "@draftbit/ui"

class MenuHeader extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
			theme: Object.assign(props.theme, screenTheme),
			selected: 0
    }
	}

  componentWillMount() {
    this.props.updateCurrentMenuCategory(this.props.menuCategories[0]);
  }

	selectMenuHeaderItem(category) {
		this.props.updateCurrentMenuCategory(category);
	}

  render() {
    const { theme } = this.state
    const { menuCategories, currentMenuCategory } = this.props;
    return (
			<View style={styles.Menu_Header_Container}>
				<View style={styles.Menu_Category_Container}>
          {menuCategories.map((category, index) => <MenuHeaderItem
            key={index}
						name={category.name}
						selected={currentMenuCategory.id === category.id}
						onPress={() => { this.selectMenuHeaderItem(category) }}
						/>
					)}
				</View>
        <View style={styles.Header_Buttons_Container}>
  				<Touchable
  					style={styles.Cart_Touchable}
  					onPress={() => {
  						this.props.navigateToCheckout()
  					}}
  				>
  					<Icon
  						style={styles.Icon_n49}
  						name="Entypo/shopping-cart"
  						size={48}
  						color={theme.colors.strong}
  					/>
  				</Touchable>
        </View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  Menu_Header_Container: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10
  },
  Menu_Category_Container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20
  },
  Header_Buttons_Container: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end'
  },
  Button_nqn: {
    marginTop: 40
  },
  CardContainer_ntj: {
    width: 300
  },
  Cart_Touchable: {
    marginTop: 10,
    marginRight: 20
  },
  Icon_n49: {
  },
  ScrollView_na3: {
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 150,
    paddingBottom: 200,
    flexWrap: "wrap"
  }
})

const mapStateToProps = state => {
  return {
    menuCategories: state.menuCategories,
    currentMenuCategory: state.currentMenuCategory
  };
};

const mapDispatchToProps = {
  updateCurrentMenuCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MenuHeader));
