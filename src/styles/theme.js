import { Colors, ThemeManager, Typography, Text } from "react-native-ui-lib";

/**
 * https://wix.github.io/react-native-ui-lib/foundation/colors
 */
Colors.loadColors({
  primary: "#3D405B",
  secondary: "#E07A5F",
  egg: "#F4F1DE",
  green: "#81B29A",
  yellow: "#F2CC8F",
  white: "#ffffff",
  black: "#000000",
});

/**
 * https://wix.github.io/react-native-ui-lib/foundation/style
 */
Typography.loadTypographies({
  h1: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 35,
  },
  h2: {
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 30,
  },
  h3: {
    fontSize: 24,
    fontWeight: "300",
    lineHeight: 24,
  },
  h4: {
    fontSize: 22,
    fontWeight: "300",
    lineHeight: 22,
  },
  h5: {
    fontSize: 20,
    fontWeight: "300",
    lineHeight: 20,
  },
});

/**
 * https://wix.github.io/react-native-ui-lib/foundation/theme-manager
 */
ThemeManager.setComponentTheme("View", (props, context) => ({
  backgroundColor: props.main ? "#F4F1DE" : "transparent",
}));

ThemeManager.setComponentTheme("TextField", (props, context) => {
  let styles = {
    hideUnderline: true,
    style: {
      marginTop: 15,
      height: 45,
      paddingHorizontal: 15,
      borderColor: "#E8E8E8",
      borderWidth: 1,
      backgroundColor: "#F6F6F6",
      borderRadius: 5,
    },
  };
  if (props.search) {
    styles.style.borderRadius = 35;
  }
  return styles;
});

ThemeManager.setComponentTheme("Text", (props, context) => {
  return {
    text70: true, // will set the text70 typography modifier prop to be true by default
    dark10: true, // will set the dark10 color modifier prop to be true by default
  };
});

ThemeManager.setComponentTheme("Button", (props, context) => {
  let styles = {
    style: {
      margin: 15,
    },
    backgroundColor: "#3D405B",
  };
  if (props.link) {
    styles.color = Colors.primary;
    styles.margin = 15;
  }
  if (props.search) {
    styles.fontSize = 16;
    styles.color = "#BDBDBD";
    styles.backgroundColor = "#F6F6F6";
  }
  return styles;
});
